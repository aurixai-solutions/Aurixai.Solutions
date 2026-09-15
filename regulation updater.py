#!/usr/bin/env python3
"""
aurix_weekly_updater_pg.py

Production-ready weekly sync script for agenta_db (PostgreSQL).
Populates reference tables from free authoritative sources.

Dependencies:
  pip install psycopg2-binary requests python-dateutil

Usage:
  python3 aurix_weekly_updater_pg.py
  # Or via cron: 0 2 * * 0 /usr/bin/python3 /var/www/agenta.red/scripts/aurix_weekly_updater_pg.py >> /var/log/aurix_updater.log 2>&1

Config: Edit DB_CONFIG below or set env vars AURIX_DB_HOST, AURIX_DB_USER, etc.
"""

import logging
import os
import sys
import time
import json
import datetime
from typing import Any, Dict, List, Optional, Set

import requests
import psycopg2
import psycopg2.extras

# ─────────────────────────────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────────────────────────────
DB_CONFIG = {
    "host":     os.environ.get("AURIX_DB_HOST", "localhost"),
    "port":     int(os.environ.get("AURIX_DB_PORT", 5432)),
    "user":     os.environ.get("AURIX_DB_USER", "postgres"),
    "password": os.environ.get("AURIX_DB_PASS", "9BaseRimbaud99xc9"),
    "dbname":   os.environ.get("AURIX_DB_NAME", "agenta_db"),
}

DB_SCHEMA = os.environ.get("AURIX_DB_SCHEMA", "public")

RATE_LIMIT_SLEEP = 1.0
REQUEST_TIMEOUT  = 30
USER_AGENT       = "AurixBot/1.0 (weekly-sync)"

# ─────────────────────────────────────────────────────────────────────
# LOGGING
# ─────────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s — %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("aurix_updater")

# ─────────────────────────────────────────────────────────────────────
# DB HELPERS
# ─────────────────────────────────────────────────────────────────────
def get_connection():
    cnx = psycopg2.connect(**DB_CONFIG)
    cnx.autocommit = False
    return cnx


def fetchone(cnx, sql: str, params: tuple = ()) -> Optional[dict]:
    with cnx.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute(sql, params)
        return cur.fetchone()


def fetchall(cnx, sql: str, params: tuple = ()) -> List[dict]:
    with cnx.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute(sql, params)
        return cur.fetchall()


def check_column_exists(cnx, table: str, column: str) -> bool:
    row = fetchone(cnx,
        "SELECT COUNT(*) AS cnt FROM information_schema.columns "
        "WHERE table_catalog = current_database() "
        "AND table_schema = %s AND table_name = %s AND column_name = %s",
        (DB_SCHEMA, table, column))
    return row is not None and row["cnt"] > 0


# ─────────────────────────────────────────────────────────────────────
# IDENTIFIER QUOTING
# ─────────────────────────────────────────────────────────────────────
def qi(name: str) -> str:
    return '"' + name.replace('"', '""') + '"'


# ─────────────────────────────────────────────────────────────────────
# EFFECTIVE-DATED UPSERT
# ─────────────────────────────────────────────────────────────────────
def upsert(cnx, table: str, key_cols: Dict[str, Any], data_cols: Dict[str, Any]):
    has_active    = check_column_exists(cnx, table, "is_active")
    has_eff_end   = check_column_exists(cnx, table, "effective_end_date")
    has_eff_start = check_column_exists(cnx, table, "effective_start_date")

    cur = cnx.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    try:
        where_parts = []
        params = []
        for k, v in key_cols.items():
            if v is None:
                where_parts.append(f"{qi(k)} IS NULL")
            else:
                where_parts.append(f"{qi(k)} = %s")
                params.append(v)

        where_sql = " AND ".join(where_parts)
        if has_active:
            where_sql += ' AND "is_active" = TRUE'

        cur.execute(
            f"SELECT * FROM {qi(table)} WHERE {where_sql} LIMIT 1",
            tuple(params)
        )
        current = cur.fetchone()

        full_record = {**key_cols, **data_cols}

        skip_cols = {"id", "is_active", "effective_start_date", "effective_end_date",
                     "created_on", "created_by", "modified_on", "modified_by"}
        if current:
            identical = True
            for k, v in full_record.items():
                if k in skip_cols:
                    continue
                cur_val = current.get(k)
                if isinstance(v, (dict, list)):
                    v_str = json.dumps(v, sort_keys=True)
                else:
                    v_str = v
                if v_str is not None:
                    if str(cur_val) != str(v_str):
                        identical = False
                        break
                else:
                    if cur_val is not None:
                        identical = False
                        break
            if identical:
                return

        if current and has_active:
            update_parts = ['"is_active" = FALSE']
            update_params = []
            if has_eff_end:
                update_parts.append('"effective_end_date" = %s')
                update_params.append(datetime.date.today())
            update_params.append(current["id"])
            cur.execute(
                f'UPDATE {qi(table)} SET {", ".join(update_parts)} WHERE "id" = %s',
                tuple(update_params)
            )

        insert_data = dict(full_record)
        if has_active:
            insert_data["is_active"] = True
        if has_eff_start:
            insert_data["effective_start_date"] = datetime.date.today()
        if has_eff_end:
            insert_data["effective_end_date"] = None
        insert_data["created_on"] = datetime.datetime.utcnow()

        cols = [qi(c) for c in insert_data.keys()]
        placeholders = ["%s"] * len(insert_data)
        vals = []
        for v in insert_data.values():
            if isinstance(v, (dict, list)):
                vals.append(json.dumps(v, sort_keys=True))
            else:
                vals.append(v)

        try:
            cur.execute(
                f"INSERT INTO {qi(table)} ({', '.join(cols)}) VALUES ({', '.join(placeholders)})",
                tuple(vals)
            )
            cnx.commit()
            logger.info("Upserted %s key=%s", table, key_cols)
        except Exception as e:
            cnx.rollback()
            if current and has_active:
                try:
                    restore_parts = ['"is_active" = TRUE']
                    restore_params = []
                    if has_eff_end:
                        restore_parts.append('"effective_end_date" = NULL')
                    restore_params.append(current["id"])
                    cur.execute(
                        f'UPDATE {qi(table)} SET {", ".join(restore_parts)} WHERE "id" = %s',
                        tuple(restore_params)
                    )
                    cnx.commit()
                    logger.warning("Restored previous record for %s id=%s", table, current["id"])
                except Exception:
                    cnx.rollback()
            logger.exception("Insert failed for %s key=%s: %s", table, key_cols, e)
            raise
    finally:
        cur.close()


def simple_insert(cnx, table: str, data: Dict[str, Any]) -> Optional[int]:
    cur = cnx.cursor()
    try:
        cols = [qi(c) for c in data.keys()]
        vals = []
        for v in data.values():
            if isinstance(v, (dict, list)):
                vals.append(json.dumps(v, sort_keys=True))
            else:
                vals.append(v)
        cur.execute(
            f"INSERT INTO {qi(table)} ({', '.join(cols)}) VALUES ({', '.join(['%s'] * len(data))}) RETURNING \"id\"",
            tuple(vals)
        )
        row = cur.fetchone()
        cnx.commit()
        return row[0] if row else None
    except Exception as e:
        cnx.rollback()
        logger.exception("Simple insert failed for %s: %s", table, e)
        return None
    finally:
        cur.close()


# ─────────────────────────────────────────────────────────────────────
# DATA SOURCES
# ─────────────────────────────────────────────────────────────────────

def _get(url: str, **kwargs) -> Optional[requests.Response]:
    try:
        r = requests.get(url, timeout=REQUEST_TIMEOUT,
                         headers={"User-Agent": USER_AGENT}, **kwargs)
        if r.status_code == 429:
            logger.warning("Rate limited on %s, sleeping 10s", url)
            time.sleep(10)
            return _get(url, **kwargs)
        r.raise_for_status()
        return r
    except Exception as e:
        logger.exception("HTTP error for %s: %s", url, e)
        return None


def fetch_ofac_names() -> Set[str]:
    names = set()
    for url in [
        "https://www.treasury.gov/ofac/downloads/sdn.csv",
        "https://www.treasury.gov/ofac/downloads/consolidated/consolidated.csv",
    ]:
        r = _get(url)
        if r:
            for line in r.text.splitlines()[1:]:
                parts = line.split(",")
                if parts and parts[0].strip().strip('"'):
                    names.add(parts[0].strip().strip('"').upper())
    logger.info("OFAC: loaded %d watchlist names", len(names))
    return names


def is_on_watchlist(name: str, watchlist: Set[str]) -> bool:
    upper = name.upper()
    return any(upper in w or w in upper for w in watchlist)


def fetch_crypto_exchanges() -> List[dict]:
    results = []
    page = 1
    while True:
        r = _get(f"https://api.coingecko.com/api/v3/exchanges?per_page=250&page={page}")
        if not r:
            break
        data = r.json()
        if not data:
            break
        for ex in data:
            results.append({
                "name": ex.get("name", "Unknown"),
                "type": "CEX",
                "hq_country": ex.get("country"),
                "support_url": ex.get("url"),
                "metadata_json": json.dumps({"coingecko_id": ex.get("id"), "trust_score": ex.get("trust_score")}),
            })
        page += 1
        time.sleep(RATE_LIMIT_SLEEP)
    logger.info("CoinGecko: fetched %d exchanges", len(results))
    return results


def fetch_evm_networks() -> List[dict]:
    r = _get("https://chainid.network/chains.json")
    if not r:
        return []
    nets = []
    for ch in r.json():
        nets.append({
            "name": ch.get("name", "Unknown"),
            "chain_id": ch.get("chainId"),
            "rpc_url_example": (ch.get("rpc") or [None])[0],
            "explorer_url": (ch.get("explorers") or [{}])[0].get("url"),
            "native_symbol": (ch.get("nativeCurrency") or {}).get("symbol"),
            "is_mainnet": True,
        })
    logger.info("Chainlist: fetched %d networks", len(nets))
    return nets


def fetch_holidays(year: int) -> List[dict]:
    r = _get("https://date.nager.at/api/v3/AvailableCountries")
    if not r:
        return []
    results = []
    for c in r.json():
        code = c.get("countryCode")
        if not code:
            continue
        hr = _get(f"https://date.nager.at/api/v3/PublicHolidays/{year}/{code}")
        if hr and hr.status_code == 200:
            for h in hr.json():
                results.append({
                    "name": h.get("name"),
                    "holiday_date": h.get("date"),
                    "country_iso2": code,
                    "is_bank_holiday": True,
                    "is_market_holiday": False,
                    "metadata_json": json.dumps(h),
                })
        time.sleep(0.05)
    logger.info("Nager: fetched %d holidays for %d", len(results), year)
    return results


# --- Static Reference Data ---

PAYMENT_GATEWAYS = [
    {"name":"Stripe","hq_country":"US","hq_city":"San Francisco","api_base_url":"https://api.stripe.com","api_auth_method":"api_key","registration_url":"https://dashboard.stripe.com/register","api_docs_url":"https://stripe.com/docs/api"},
    {"name":"PayPal","hq_country":"US","hq_city":"San Jose","api_base_url":"https://api-m.paypal.com","api_auth_method":"oauth2","registration_url":"https://www.paypal.com/signup","api_docs_url":"https://developer.paypal.com/docs/api"},
    {"name":"Adyen","hq_country":"NL","hq_city":"Amsterdam","api_base_url":"https://checkout-test.adyen.com/v71","api_auth_method":"api_key","registration_url":"https://www.adyen.com/signup","api_docs_url":"https://docs.adyen.com"},
    {"name":"Amazon Pay","hq_country":"US","hq_city":"Seattle","api_base_url":"https://pay-api.amazon.com","api_auth_method":"signature","registration_url":"https://pay.amazon.com","api_docs_url":"https://developer.amazon.com/docs/amazon-pay"},
    {"name":"Alipay","hq_country":"CN","hq_city":"Hangzhou","api_base_url":"https://openapi.alipay.com/gateway.do","api_auth_method":"rsa2","registration_url":"https://global.alipay.com","api_docs_url":"https://global.alipay.com/docs"},
    {"name":"WeChat Pay","hq_country":"CN","hq_city":"Shenzhen","api_base_url":"https://api.mch.weixin.qq.com","api_auth_method":"key","registration_url":"https://pay.weixin.qq.com","api_docs_url":"https://pay.weixin.qq.com/doc"},
    {"name":"Mollie","hq_country":"NL","hq_city":"Amsterdam","api_base_url":"https://api.mollie.com/v2","api_auth_method":"api_key","registration_url":"https://www.mollie.com/signup","api_docs_url":"https://docs.mollie.com"},
    {"name":"Square","hq_country":"US","hq_city":"San Francisco","api_base_url":"https://connect.squareup.com/v2","api_auth_method":"oauth2","registration_url":"https://squareup.com/signup","api_docs_url":"https://developer.squareup.com/docs"},
]

GNSS_SYSTEMS = [
    {"code":"GPS",     "name":"GPS (NAVSTAR)","operator":"US Space Force","reference_url":"https://www.gps.gov"},
    {"code":"GLONASS", "name":"GLONASS",      "operator":"Roscosmos",     "reference_url":"https://glonass-iac.ru/en/"},
    {"code":"GALILEO", "name":"Galileo",       "operator":"ESA / EU",     "reference_url":"https://www.gsc-europa.eu"},
    {"code":"BEIDOU",  "name":"BeiDou (BDS)",  "operator":"CNSA",         "reference_url":"http://en.beidou.gov.cn"},
    {"code":"QZSS",    "name":"QZSS (Michibiki)","operator":"JAXA",      "reference_url":"https://qzss.go.jp/en/"},
    {"code":"NAVIC",   "name":"NavIC (IRNSS)", "operator":"ISRO",         "reference_url":"https://www.isro.gov.in"},
]

GNSS_ACCURACY = [
    ("GPS",     "open_sky",  12, 2.0),   ("GPS",     "urban",      6, 5.0),
    ("GPS",     "suburban",   8, 3.0),   ("GPS",     "indoor",     4, 10.0),
    ("GLONASS", "open_sky",  12, 3.0),   ("GLONASS", "urban",      6, 7.0),
    ("GLONASS", "suburban",   8, 4.0),   ("GLONASS", "indoor",     4, 12.0),
    ("GALILEO", "open_sky",  12, 1.0),   ("GALILEO", "urban",      6, 3.0),
    ("GALILEO", "suburban",   8, 2.0),   ("GALILEO", "indoor",     4, 5.0),
    ("BEIDOU",  "open_sky",  12, 1.5),   ("BEIDOU",  "urban",      6, 4.0),
    ("BEIDOU",  "suburban",   8, 2.5),   ("BEIDOU",  "indoor",     4, 8.0),
]

QUANTUM_BROKERS = [
    {"name":"AWS Braket","hq_country":"US","api_base_url":"https://braket.aws.amazon.com","sdk_name":"amazon-braket-sdk","sdk_language":"python","sdk_ubuntu_install":"pip install amazon-braket-sdk","docs_url":"https://docs.aws.amazon.com/braket/"},
    {"name":"IBM Quantum","hq_country":"US","api_base_url":"https://quantum-computing.ibm.com","sdk_name":"qiskit","sdk_language":"python","sdk_ubuntu_install":"pip install qiskit","docs_url":"https://qiskit.org/documentation/"},
    {"name":"IonQ","hq_country":"US","api_base_url":"https://api.ionq.co/v0.2","sdk_name":"cirq-ionq","sdk_language":"python","sdk_ubuntu_install":"pip install cirq-ionq","docs_url":"https://docs.ionq.com"},
    {"name":"Rigetti","hq_country":"US","api_base_url":"https://api.qcs.rigetti.com","sdk_name":"pyquil","sdk_language":"python","sdk_ubuntu_install":"pip install pyquil","docs_url":"https://docs.rigetti.com"},
    {"name":"Xanadu","hq_country":"CA","api_base_url":"https://cloud.xanadu.ai","sdk_name":"pennylane","sdk_language":"python","sdk_ubuntu_install":"pip install pennylane","docs_url":"https://pennylane.ai/"},
    {"name":"Azure Quantum","hq_country":"US","api_base_url":"https://quantum.microsoft.com","sdk_name":"azure-quantum","sdk_language":"python","sdk_ubuntu_install":"pip install azure-quantum","docs_url":"https://learn.microsoft.com/azure/quantum/"},
]

QUANTUM_SERVICES = [
    {"broker":"IBM Quantum","name":"IBM Eagle r3","provider_native_id":"ibm_eagle_r3","qubit_count":127,"physical_qubit_count":127,"single_qubit_error_rate":0.001,"two_qubit_error_rate":0.01,"readout_error_rate":0.015,"error_mitigation_supported":True},
    {"broker":"IBM Quantum","name":"IBM Heron","provider_native_id":"ibm_heron","qubit_count":133,"physical_qubit_count":133,"single_qubit_error_rate":0.0005,"two_qubit_error_rate":0.005,"readout_error_rate":0.01,"error_mitigation_supported":True},
    {"broker":"IonQ","name":"IonQ Aria-1","provider_native_id":"ionq.aria-1","qubit_count":25,"physical_qubit_count":25,"single_qubit_error_rate":0.0003,"two_qubit_error_rate":0.005,"readout_error_rate":0.003,"error_mitigation_supported":True},
    {"broker":"IonQ","name":"IonQ Forte","provider_native_id":"ionq.forte","qubit_count":36,"physical_qubit_count":36,"single_qubit_error_rate":0.0002,"two_qubit_error_rate":0.003,"readout_error_rate":0.002,"error_mitigation_supported":True},
    {"broker":"Rigetti","name":"Rigetti Ankaa-2","provider_native_id":"rigetti.ankaa-2","qubit_count":84,"physical_qubit_count":84,"single_qubit_error_rate":0.002,"two_qubit_error_rate":0.02,"readout_error_rate":0.03,"error_mitigation_supported":True},
]

GPU_PROVIDERS = [
    {"name":"RunPod","hq_country":"US","api_base_url":"https://api.runpod.io/v2","console_url":"https://www.runpod.io/console","sdk_name":"runpod","sdk_language":"python","sdk_ubuntu_install":"pip install runpod","docs_url":"https://docs.runpod.io"},
    {"name":"Lambda Labs","hq_country":"US","api_base_url":"https://cloud.lambdalabs.com/api/v1","console_url":"https://cloud.lambdalabs.com","sdk_name":"lambda-cloud","sdk_language":"python","sdk_ubuntu_install":"pip install lambda-cloud","docs_url":"https://docs.lambdalabs.com"},
    {"name":"Vast.ai","hq_country":"US","api_base_url":"https://console.vast.ai/api/v0","console_url":"https://vast.ai","sdk_name":"vastai","sdk_language":"python","sdk_ubuntu_install":"pip install vastai","docs_url":"https://vast.ai/docs"},
    {"name":"CoreWeave","hq_country":"US","api_base_url":"https://api.coreweave.com","console_url":"https://cloud.coreweave.com","sdk_name":"kubernetes","sdk_language":"python","sdk_ubuntu_install":"pip install kubernetes","docs_url":"https://docs.coreweave.com"},
]

GPU_INSTANCES = [
    {"provider":"RunPod","name":"RTX 4090 24GB","vram_gb":24,"gpu_count":1,"cpu_cores":16,"memory_gb":64,"hourly_rate_usd":0.69},
    {"provider":"RunPod","name":"A100 80GB SXM","vram_gb":80,"gpu_count":1,"cpu_cores":16,"memory_gb":128,"hourly_rate_usd":1.64},
    {"provider":"RunPod","name":"H100 80GB SXM","vram_gb":80,"gpu_count":1,"cpu_cores":26,"memory_gb":200,"hourly_rate_usd":3.89},
    {"provider":"Lambda Labs","name":"A100 80GB","vram_gb":80,"gpu_count":1,"cpu_cores":30,"memory_gb":200,"hourly_rate_usd":2.49},
    {"provider":"Lambda Labs","name":"H100 80GB","vram_gb":80,"gpu_count":1,"cpu_cores":26,"memory_gb":200,"hourly_rate_usd":3.29},
    {"provider":"Vast.ai","name":"RTX 4090 24GB","vram_gb":24,"gpu_count":1,"cpu_cores":8,"memory_gb":64,"hourly_rate_usd":0.35},
]

AI_PROVIDERS = [
    {"name":"OpenAI","hq_country":"US","api_base_url":"https://api.openai.com/v1","docs_url":"https://platform.openai.com/docs","sdk_name":"openai","sdk_language":"python","sdk_ubuntu_install":"pip install openai"},
    {"name":"Anthropic","hq_country":"US","api_base_url":"https://api.anthropic.com/v1","docs_url":"https://docs.anthropic.com","sdk_name":"anthropic","sdk_language":"python","sdk_ubuntu_install":"pip install anthropic"},
    {"name":"Google DeepMind","hq_country":"US","api_base_url":"https://generativelanguage.googleapis.com/v1beta","docs_url":"https://ai.google.dev/docs","sdk_name":"google-generativeai","sdk_language":"python","sdk_ubuntu_install":"pip install google-generativeai"},
    {"name":"Cohere","hq_country":"CA","api_base_url":"https://api.cohere.ai/v2","docs_url":"https://docs.cohere.com","sdk_name":"cohere","sdk_language":"python","sdk_ubuntu_install":"pip install cohere"},
    {"name":"Meta AI","hq_country":"US","api_base_url":"https://huggingface.co/meta-llama","docs_url":"https://llama.meta.com","sdk_name":"transformers","sdk_language":"python","sdk_ubuntu_install":"pip install transformers"},
    {"name":"Mistral AI","hq_country":"FR","api_base_url":"https://api.mistral.ai/v1","docs_url":"https://docs.mistral.ai","sdk_name":"mistralai","sdk_language":"python","sdk_ubuntu_install":"pip install mistralai"},
    {"name":"OpenRouter","hq_country":"US","api_base_url":"https://openrouter.ai/api/v1","docs_url":"https://openrouter.ai/docs","sdk_name":"openai","sdk_language":"python","sdk_ubuntu_install":"pip install openai"},
]

AI_MODELS = [
    {"provider":"OpenAI","name":"GPT-4o","api_model_id":"gpt-4o","model_family":"GPT-4","context_window_tokens":128000,"input_price_per_1k":0.005,"output_price_per_1k":0.015,"capabilities_csv":"chat,vision,function_calling,json_mode"},
    {"provider":"OpenAI","name":"GPT-4o mini","api_model_id":"gpt-4o-mini","model_family":"GPT-4","context_window_tokens":128000,"input_price_per_1k":0.00015,"output_price_per_1k":0.0006,"capabilities_csv":"chat,vision,function_calling,json_mode"},
    {"provider":"Anthropic","name":"Claude Opus 4","api_model_id":"claude-opus-4-20250514","model_family":"Claude 4","context_window_tokens":200000,"input_price_per_1k":0.015,"output_price_per_1k":0.075,"capabilities_csv":"chat,vision,function_calling,extended_thinking"},
    {"provider":"Anthropic","name":"Claude Sonnet 4","api_model_id":"claude-sonnet-4-20250514","model_family":"Claude 4","context_window_tokens":200000,"input_price_per_1k":0.003,"output_price_per_1k":0.015,"capabilities_csv":"chat,vision,function_calling,extended_thinking"},
    {"provider":"Anthropic","name":"Claude Haiku 3.5","api_model_id":"claude-haiku-3-5-20241022","model_family":"Claude 3.5","context_window_tokens":200000,"input_price_per_1k":0.0008,"output_price_per_1k":0.004,"capabilities_csv":"chat,vision,function_calling"},
    {"provider":"Google DeepMind","name":"Gemini 2.0 Flash","api_model_id":"gemini-2.0-flash","model_family":"Gemini 2","context_window_tokens":1000000,"input_price_per_1k":0.0001,"output_price_per_1k":0.0004,"capabilities_csv":"chat,vision,function_calling,grounding"},
    {"provider":"Mistral AI","name":"Mistral Large","api_model_id":"mistral-large-latest","model_family":"Mistral","context_window_tokens":128000,"input_price_per_1k":0.002,"output_price_per_1k":0.006,"capabilities_csv":"chat,function_calling,json_mode"},
]

AURIX_DIMENSIONS = [
    {"code":"SECURITY",    "name":"Security",     "description":"Technical and operational security posture including encryption, access control, vulnerability management."},
    {"code":"PRIVACY",     "name":"Privacy",       "description":"Data protection, minimization, consent management, and cross-border transfer compliance."},
    {"code":"GOVERNANCE",  "name":"Governance",    "description":"Organizational policies, oversight structures, audit trails, and accountability."},
    {"code":"TRANSPARENCY","name":"Transparency",  "description":"Explainability, auditability, decision traceability, and documentation."},
    {"code":"RELIABILITY", "name":"Reliability",   "description":"Uptime, error rates, failover, disaster recovery, and SLA adherence."},
    {"code":"FAIRNESS",    "name":"Fairness",      "description":"Bias detection, equitable outcomes, and non-discrimination in AI systems."},
]

AURIX_PROFILES = [
    {"code":"AURIX_MAX",      "name":"Aurix Maximum Strictness","strictness_level":"high","description":"Full compliance with all dimensions. Required for financial, healthcare, and government sectors."},
    {"code":"AURIX_STANDARD", "name":"Aurix Standard",          "strictness_level":"medium","description":"Balanced compliance suitable for most enterprise deployments."},
    {"code":"AURIX_BASELINE", "name":"Aurix Baseline",          "strictness_level":"low","description":"Minimum viable compliance for development and internal tooling."},
]

REG_FRAMEWORKS = [
    {"code":"GDPR",     "name":"General Data Protection Regulation",    "type":"regulation","issuing_body":"European Union","global_applicability":False,"reference_url":"https://gdpr-info.eu","industry_scope_csv":"all"},
    {"code":"NIS2",     "name":"NIS2 Directive",                        "type":"regulation","issuing_body":"European Union","global_applicability":False,"reference_url":"https://eur-lex.europa.eu","industry_scope_csv":"critical_infrastructure,digital_services"},
    {"code":"AI_ACT",   "name":"EU AI Act",                             "type":"regulation","issuing_body":"European Union","global_applicability":False,"reference_url":"https://artificialintelligenceact.eu","industry_scope_csv":"all"},
    {"code":"SOC2",     "name":"SOC 2",                                 "type":"standard",  "issuing_body":"AICPA","global_applicability":True,"reference_url":"https://www.aicpa.org","industry_scope_csv":"technology,saas"},
    {"code":"ISO27001", "name":"ISO/IEC 27001",                         "type":"standard",  "issuing_body":"ISO/IEC","global_applicability":True,"reference_url":"https://www.iso.org/standard/27001","industry_scope_csv":"all"},
    {"code":"CCPA",     "name":"California Consumer Privacy Act",       "type":"regulation","issuing_body":"State of California","global_applicability":False,"reference_url":"https://oag.ca.gov/privacy/ccpa","industry_scope_csv":"all"},
    {"code":"HIPAA",    "name":"Health Insurance Portability Act",      "type":"regulation","issuing_body":"US HHS","global_applicability":False,"reference_url":"https://www.hhs.gov/hipaa","industry_scope_csv":"healthcare"},
    {"code":"PCI_DSS",  "name":"Payment Card Industry Data Security Standard","type":"standard","issuing_body":"PCI SSC","global_applicability":True,"reference_url":"https://www.pcisecuritystandards.org","industry_scope_csv":"payments,retail,finance"},
]


# ─────────────────────────────────────────────────────────────────────
# SYNC FUNCTIONS
# ─────────────────────────────────────────────────────────────────────

def sync_crypto_exchanges(cnx, watchlist: Set[str]):
    exchanges = fetch_crypto_exchanges()
    for ex in exchanges:
        upsert(cnx, "crypto_exchange",
            key_cols={"name": ex["name"]},
            data_cols={
                "type": ex["type"],
                "hq_country": ex.get("hq_country"),
                "support_url": ex.get("support_url"),
                "on_federal_watchlist": is_on_watchlist(ex["name"], watchlist),
                "usage_allowed_usa": True,
                "metadata_json": ex.get("metadata_json"),
            })


def sync_evm_networks(cnx):
    for net in fetch_evm_networks():
        if net["chain_id"] is None:
            continue
        upsert(cnx, "crypto_evm_network",
            key_cols={"chain_id": net["chain_id"]},
            data_cols={
                "name": net["name"],
                "rpc_url_example": net.get("rpc_url_example"),
                "explorer_url": net.get("explorer_url"),
                "native_symbol": net.get("native_symbol"),
                "is_mainnet": net.get("is_mainnet", True),
            })


def sync_holidays(cnx):
    year = datetime.datetime.utcnow().year
    holidays = fetch_holidays(year)
    for h in holidays:
        iso2 = h.get("country_iso2")
        country_id = None
        if iso2:
            row = fetchone(cnx, 'SELECT "id" FROM "gps_country" WHERE "iso_alpha2" = %s', (iso2,))
            if row:
                country_id = row["id"]
            else:
                country_id = simple_insert(cnx, "gps_country", {
                    "iso_alpha2": iso2,
                    "iso_alpha3": iso2 + "X",
                    "iso_numeric": "000",
                    "name": iso2,
                    "created_on": datetime.datetime.utcnow(),
                })

        existing = fetchone(cnx,
            'SELECT "id" FROM "cost_holiday" WHERE "name" = %s AND "holiday_date" = %s AND '
            '("gps_country_id" = %s OR ("gps_country_id" IS NULL AND %s IS NULL))',
            (h["name"], h["holiday_date"], country_id, country_id))
        if not existing:
            simple_insert(cnx, "cost_holiday", {
                "name": h["name"],
                "holiday_date": h["holiday_date"],
                "gps_country_id": country_id,
                "is_bank_holiday": h["is_bank_holiday"],
                "is_market_holiday": h["is_market_holiday"],
                "metadata_json": h["metadata_json"],
                "created_on": datetime.datetime.utcnow(),
            })


def sync_payment_gateways(cnx):
    for g in PAYMENT_GATEWAYS:
        upsert(cnx, "payment_gateway",
            key_cols={"name": g["name"]},
            data_cols={
                "hq_city": g.get("hq_city"),
                "hq_country": g.get("hq_country"),
                "api_base_url": g.get("api_base_url"),
                "api_auth_method": g.get("api_auth_method"),
                "registration_url": g.get("registration_url"),
                "api_docs_url": g.get("api_docs_url"),
                "usage_allowed_usa": True,
                "on_federal_watchlist": False,
            })


def sync_gnss(cnx):
    for g in GNSS_SYSTEMS:
        upsert(cnx, "gps_gnss_system",
            key_cols={"code": g["code"]},
            data_cols={
                "name": g["name"],
                "operator": g["operator"],
                "reference_url": g["reference_url"],
            })

    for code, env, sats, acc in GNSS_ACCURACY:
        row = fetchone(cnx, 'SELECT "id" FROM "gps_gnss_system" WHERE "code" = %s', (code,))
        if not row:
            continue
        existing = fetchone(cnx,
            'SELECT "id" FROM "gps_gnss_accuracy_profile" '
            'WHERE "gps_gnss_system_id" = %s AND "environment_type" = %s',
            (row["id"], env))
        if not existing:
            simple_insert(cnx, "gps_gnss_accuracy_profile", {
                "gps_gnss_system_id": row["id"],
                "environment_type": env,
                "typical_satellites": sats,
                "accuracy_meters": acc,
                "accuracy_unit": "meter",
                "created_on": datetime.datetime.utcnow(),
            })


def sync_quantum(cnx):
    for b in QUANTUM_BROKERS:
        upsert(cnx, "quantum_broker",
            key_cols={"name": b["name"]},
            data_cols={k: v for k, v in b.items() if k != "name"})

    for s in QUANTUM_SERVICES:
        broker = fetchone(cnx, 'SELECT "id" FROM "quantum_broker" WHERE "name" = %s', (s["broker"],))
        if not broker:
            continue
        upsert(cnx, "quantum_service",
            key_cols={"quantum_broker_id": broker["id"], "name": s["name"]},
            data_cols={
                "provider_native_id": s["provider_native_id"],
                "access_model": "managed",
                "qubit_count": s["qubit_count"],
                "physical_qubit_count": s["physical_qubit_count"],
                "single_qubit_error_rate": s["single_qubit_error_rate"],
                "two_qubit_error_rate": s["two_qubit_error_rate"],
                "readout_error_rate": s["readout_error_rate"],
                "error_mitigation_supported": s["error_mitigation_supported"],
            })


def sync_gpu(cnx):
    for p in GPU_PROVIDERS:
        upsert(cnx, "gpu_provider",
            key_cols={"name": p["name"]},
            data_cols={k: v for k, v in p.items() if k != "name"})

    for inst in GPU_INSTANCES:
        prov = fetchone(cnx, 'SELECT "id" FROM "gpu_provider" WHERE "name" = %s', (inst["provider"],))
        if not prov:
            continue
        upsert(cnx, "gpu_instance_type",
            key_cols={"gpu_provider_id": prov["id"], "name": inst["name"]},
            data_cols={
                "vram_gb": inst["vram_gb"],
                "gpu_count": inst["gpu_count"],
                "cpu_cores": inst["cpu_cores"],
                "memory_gb": inst["memory_gb"],
                "hourly_rate_usd": inst["hourly_rate_usd"],
            })


def sync_ai(cnx):
    for p in AI_PROVIDERS:
        upsert(cnx, "ai_model_provider",
            key_cols={"name": p["name"]},
            data_cols={k: v for k, v in p.items() if k != "name"})

    for m in AI_MODELS:
        prov = fetchone(cnx, 'SELECT "id" FROM "ai_model_provider" WHERE "name" = %s', (m["provider"],))
        if not prov:
            continue
        upsert(cnx, "ai_model",
            key_cols={"ai_model_provider_id": prov["id"], "name": m["name"]},
            data_cols={
                "model_family": m["model_family"],
                "api_model_id": m["api_model_id"],
                "context_window_tokens": m["context_window_tokens"],
                "input_price_per_1k": m["input_price_per_1k"],
                "output_price_per_1k": m["output_price_per_1k"],
                "capabilities_csv": m["capabilities_csv"],
            })


def sync_agentic_protocols(cnx):
    upsert(cnx, "agentic_protocol_openai_assistants",
        key_cols={"name": "OpenAI Assistants API"},
        data_cols={"description":"OpenAI's assistant framework with tools, files, and vector stores",
                   "api_base_url":"https://api.openai.com/v1/assistants","docs_url":"https://platform.openai.com/docs/assistants",
                   "supports_tools":True,"supports_files":True,"supports_vector_stores":True})
    upsert(cnx, "agentic_protocol_langchain",
        key_cols={"name": "LangChain"},
        data_cols={"description":"LangChain framework for chains, agents, and LangGraph",
                   "repo_url":"https://github.com/langchain-ai/langchain","docs_url":"https://python.langchain.com/docs",
                   "supports_graphs":True,"supports_runnables":True})
    upsert(cnx, "agentic_protocol_llamaindex",
        key_cols={"name": "LlamaIndex"},
        data_cols={"description":"LlamaIndex for RAG, indices, and agent workflows",
                   "repo_url":"https://github.com/run-llama/llama_index","docs_url":"https://docs.llamaindex.ai",
                   "supports_indices":True,"supports_agents":True})
    upsert(cnx, "agentic_protocol_autogen",
        key_cols={"name": "AutoGen"},
        data_cols={"description":"Microsoft AutoGen for multi-agent conversation patterns",
                   "repo_url":"https://github.com/microsoft/autogen","docs_url":"https://microsoft.github.io/autogen/",
                   "supports_multi_agent":True})
    upsert(cnx, "agentic_marketplace",
        key_cols={"name": "AgenticMind (Agenta)"},
        data_cols={"description":"Aurix AI internal visual workflow automation platform",
                   "provider_type":"internal","api_base_url":"https://agenta.red/api/api-registry.php"})


def sync_aurix_standard(cnx):
    for d in AURIX_DIMENSIONS:
        upsert(cnx, "aurix_dimension",
            key_cols={"code": d["code"]},
            data_cols={"name": d["name"], "description": d["description"]})
    for p in AURIX_PROFILES:
        upsert(cnx, "aurix_profile",
            key_cols={"code": p["code"]},
            data_cols={"name": p["name"], "strictness_level": p["strictness_level"], "description": p["description"]})


def sync_reg_frameworks(cnx):
    for f in REG_FRAMEWORKS:
        upsert(cnx, "reg_framework",
            key_cols={"code": f["code"]},
            data_cols={
                "name": f["name"],
                "type": f["type"],
                "issuing_body": f["issuing_body"],
                "global_applicability": f["global_applicability"],
                "reference_url": f["reference_url"],
                "industry_scope_csv": f["industry_scope_csv"],
            })


# ─────────────────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────────────────

def main():
    logger.info("=" * 60)
    logger.info("Aurix Weekly Updater (PostgreSQL) — starting")
    logger.info("=" * 60)

    try:
        cnx = get_connection()
        logger.info("Connected to %s@%s/%s", DB_CONFIG["user"], DB_CONFIG["host"], DB_CONFIG["dbname"])
    except Exception as e:
        logger.critical("DB connection failed: %s", e)
        sys.exit(1)

    try:
        logger.info("--- Syncing GNSS systems ---")
        sync_gnss(cnx)

        logger.info("--- Syncing payment gateways ---")
        sync_payment_gateways(cnx)

        logger.info("--- Syncing quantum brokers & services ---")
        sync_quantum(cnx)

        logger.info("--- Syncing GPU providers & instances ---")
        sync_gpu(cnx)

        logger.info("--- Syncing AI providers & models ---")
        sync_ai(cnx)

        logger.info("--- Syncing agentic protocols ---")
        sync_agentic_protocols(cnx)

        logger.info("--- Syncing Aurix trust standard ---")
        sync_aurix_standard(cnx)

        logger.info("--- Syncing regulatory frameworks ---")
        sync_reg_frameworks(cnx)

        logger.info("--- Fetching OFAC watchlist ---")
        watchlist = fetch_ofac_names()

        logger.info("--- Syncing crypto exchanges (CoinGecko) ---")
        sync_crypto_exchanges(cnx, watchlist)

        logger.info("--- Syncing EVM networks (Chainlist) ---")
        sync_evm_networks(cnx)

        logger.info("--- Syncing holidays (Nager.Date) ---")
        sync_holidays(cnx)

        logger.info("=" * 60)
        logger.info("Aurix Weekly Updater (PostgreSQL) — complete")
        logger.info("=" * 60)

    except Exception as e:
        logger.exception("Sync failed: %s", e)
        sys.exit(1)
    finally:
        try:
            cnx.close()
        except Exception:
            pass


if __name__ == "__main__":
    main()