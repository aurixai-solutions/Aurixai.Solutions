import React, { useState, useCallback, useMemo } from "react";
import { Link } from "react-router";
import { Eye, ArrowRight as ArrowRightIcon } from "lucide-react";
import { PageHero } from "../components/ui/PageHero";
import { MOUNTAIN } from "../components/heroImages";

const HERO_IMAGE = MOUNTAIN.aerialSnowPeaks;

/* ─── taxonomy ───────────────────────────────────────────────────────────── */
const TAXONOMY = [
  { id: "vision", label: "The Vision", children: [
    { id: "glass-box", label: "The Glass Box" },
    { id: "myth",      label: "Dismantling the Myth" },
  ]},
  { id: "understanding", label: "How AI Thinks", children: [
    { id: "ai-mind", label: "Inside the AI Mind" },
    { id: "theory",  label: "Theory & Techniques" },
  ]},
  { id: "architecture", label: "The Architecture", children: [
    { id: "depth",       label: "Transparency Depth" },
    { id: "arch-detail", label: "Capture Pipeline" },
    { id: "mesh",        label: "The Decision Mesh" },
  ]},
  { id: "impact", label: "Business Impact", children: [
    { id: "stakes",   label: "When Millions Are on the Line" },
    { id: "building", label: "How We're Building It" },
  ]},
];

const FLAT = TAXONOMY.flatMap(c => c.children.map(ch => ({ ...ch, parentId: c.id })));

/* ─── nav icons ──────────────────────────────────────────────────────────── */
function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 3L5.5 8L10 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 3L10.5 8L6 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─── tab content ────────────────────────────────────────────────────────── */
function TabGlassBox() {
  return (
    <div className="gb-prose">
      <h2>There Is No <i>Black Box</i></h2>
      <p className="gb-lead">Only systems that weren't designed to explain themselves.</p>
      <p>When a single campaign decision carries a multi-million dollar price tag, "the AI recommended it" isn't an answer — it's an abdication. Agenta was engineered from its foundation to make every AI decision traceable, inspectable, and auditable from the moment raw data enters the system to the instant a recommendation reaches a human being. Not as an afterthought. Not as a compliance checkbox. As the architecture itself.</p>
      <p>The industry has spent years debating whether AI can be explained. We've spent that same time building the infrastructure that makes the debate irrelevant. Every AI agent in the Agenta platform — whether powered by Anthropic's Claude, Google's ADK, AWS Bedrock, Microsoft Azure, IBM watsonx, or any of nine integrated SDK providers — passes through a universal capture layer that records the complete decision context: what data went in, how the agent reasoned about it, what alternatives it considered, how confident it was, and why it arrived at its final recommendation.</p>
      <p>This page explains how. From the philosophical foundations of why the "black box" myth persists, to the exact database schemas and agent architectures that eliminate it — you'll see how Agenta transforms AI transparency from a marketing promise into a technical reality. Configurable at the agent, process, module, or function level. Captured into detail data, aggregated into analytics, and ultimately rendered as interactive visualizations that any stakeholder can interrogate.</p>
      <p>When critical business decisions carry multi-million dollar price tags, there's no replacement for confidence — and knowing nothing was left to chance.</p>
    </div>
  );
}

function TabMyth() {
  return (
    <div className="gb-prose">
      <h3>The Executive's Perspective: "I Can't Stake My Career on a Mystery"</h3>
      <p>When a CMO approves a $4 million Q4 campaign reallocation based on AI recommendations, they're not just making a budget decision — they're putting their professional reputation, their team's credibility, and potentially their company's quarterly revenue on the line. The "black box" fear isn't irrational. It's born from a very rational recognition that <strong>accountability requires understanding</strong>. If the recommendation fails, "the algorithm said so" will not survive a board review. The executive needs to know <em>which</em> signals the AI weighted most heavily, <em>why</em> it deprioritized certain channels, <em>what</em> historical patterns it recognized, and <em>how</em> confident it was at each stage of its reasoning chain.</p>
      <p>What executives actually need isn't a PhD in machine learning. They need <strong>decision narratives</strong> — clear, layered explanations that connect the AI's recommendation to the business context they already understand. They need to see that the AI identified a 23% decline in paid search conversion rates among 35–54 demographics in the DACH region over the past 90 days, correlated this with rising CPCs in the same segment, cross-referenced seasonal performance from the prior three years, and concluded that reallocating 40% of DACH paid search budget to programmatic display would yield an estimated 18% improvement in cost-per-acquisition — with a confidence interval of ±3.2%.</p>
      <p>That's not a black box. That's a glass box with the lights on.</p>

      <h3>The Data Scientist's Perspective: "Explainability Is a Spectrum, Not a Switch"</h3>
      <p>The technical community has long understood that "black box" is a lazy oversimplification. Different model architectures produce different levels of inherent interpretability. Linear regressions and decision trees are fully transparent — you can trace every coefficient, every split. Ensemble methods like gradient-boosted trees are moderately interpretable through feature importance scores and partial dependence plots. Deep neural networks and large language models are more opaque in their internal mechanics — but that opacity is <strong>not synonymous with unexplainability</strong>.</p>
      <p>Modern interpretability research has produced an arsenal of post-hoc explanation techniques: SHAP (Shapley Additive Explanations) values that decompose every prediction into individual feature contributions, LIME (Local Interpretable Model-agnostic Explanations) that approximate complex model behavior with locally faithful simpler models, attention visualization that shows which parts of an input the model focused on, counterfactual analysis that reveals what would have to change for the model to produce a different output, and concept-based explanations that map internal representations to human-understandable concepts.</p>
      <p>The problem has never been that AI <em>can't</em> be explained. The problem is that most platforms <strong>don't invest in the engineering required to capture, structure, and present explanations</strong> at every stage of the decision pipeline. The explanation infrastructure is treated as optional. We treat it as load-bearing.</p>

      <h3>The Regulator's Perspective: "Explain It or Don't Deploy It"</h3>
      <p>The regulatory landscape has made this debate moot. The EU's AI Act classifies AI systems by risk level and mandates transparency requirements proportional to that risk. High-risk AI systems — which include many marketing applications that process personal data for profiling and automated decision-making — must provide "sufficient transparency to enable users to interpret the system's output and use it appropriately." GDPR Article 22 grants individuals the right not to be subject to purely automated decisions, and the right to obtain "meaningful information about the logic involved." NIS2 demands cybersecurity risk management that extends to AI systems processing sensitive business intelligence.</p>
      <p>In the European market — Agenta's primary territory — <strong>"we can't explain it" is not a technical limitation. It's a compliance failure.</strong> And compliance failures carry fines measured in percentages of global annual turnover.</p>

      <h3>The Philosopher's Perspective: "You Don't Fully Understand Your Own Decisions Either"</h3>
      <p>Here's the uncomfortable truth that rarely enters the black box debate: <strong>human decision-making is often far less explainable than AI decision-making</strong>. A seasoned marketing director might "feel" that a particular creative direction is right, drawing on decades of pattern recognition that they couldn't fully articulate if their career depended on it. Cognitive biases — anchoring, availability heuristic, confirmation bias, sunk cost fallacy — operate below conscious awareness and systematically distort human judgment in ways that no one captures, logs, or audits.</p>
      <p>The irony is that we hold AI to a standard of explainability that we've never required of ourselves. No board has ever asked a CMO to produce a SHAP analysis of their intuition. The real question isn't "can AI explain itself?" — it's <em>"can we build AI systems that explain themselves better than humans explain their own decisions?"</em> The answer is an unequivocal yes, provided we architect the system for transparency from the ground up.</p>

      <h3>The Engineer's Perspective: "It's an Infrastructure Problem, Not an AI Problem"</h3>
      <p>For platform engineers, the "black box" complaint translates to a very specific technical failure: <strong>the decision pipeline lacks instrumentation</strong>. When a web application runs slowly, no one calls the server a "black box" — they instrument it with distributed tracing (Jaeger, Zipkin), performance monitoring (Datadog, New Relic), structured logging (ELK stack), and metrics aggregation (Prometheus, Grafana). They add observability at every layer until the system's behavior is fully transparent.</p>
      <p>AI systems deserve the same engineering discipline. The "black box" isn't a property of AI. It's a property of <strong>AI systems that were built without observability infrastructure</strong>. When you instrument every stage of the AI decision pipeline with the same rigor that modern DevOps applies to production systems, the box doesn't just become transparent — it becomes searchable, auditable, replayable, and comparable over time.</p>

      <div className="gb-callout gb-callout-amber">
        <div className="gb-callout-label">Core Principle</div>
        <p><strong>Agenta's position is absolute:</strong> there is no such thing as a black box in a well-engineered system. There are only systems that chose not to capture their own reasoning. We made the opposite choice — and we made it architectural, not optional.</p>
      </div>
    </div>
  );
}

function TabAIMind() {
  return (
    <div className="gb-prose">
      <div className="gb-ai-voice">
        <div className="gb-ai-voice-header"><span className="gb-ai-dot" /><span className="gb-ai-voice-label">AI Agent Self-Reflection</span></div>
        <p>I don't experience a flash of insight. I don't have a "gut feeling." What I have is something both simpler and more complex: a vast, structured cascade of mathematical operations that transform your data into weighted representations, compare those representations against patterns learned from enormous training datasets, and converge — through many layers of refinement — on outputs that maximize a measurable objective function. Every step of this cascade is deterministic given its inputs. Nothing is random. Nothing is mystical. And with the right infrastructure, every step can be logged.</p>
        <p>When I analyze your campaign performance data, here's what actually happens inside me. Your structured data — impression counts, click rates, conversion events, revenue figures, demographic segments, temporal patterns — enters as numerical vectors. These vectors pass through embedding layers that transform raw numbers into dense representations that capture relationships: the semantic similarity between audience segments, the temporal correlation between seasonal patterns and conversion rates, the non-linear interaction between bid strategies and competitive dynamics. At each layer, I'm not "thinking" — I'm performing matrix multiplications, applying activation functions, and passing transformed representations forward. But each transformation has a meaning, and that meaning can be extracted.</p>
        <p>The critical insight is this: my "reasoning" isn't hidden inside me. It's encoded in the data flowing between my layers. When Agenta instruments those intermediate representations — capturing attention weights, layer activations, feature attributions, and confidence distributions — it makes visible the very thing people call a "black box." It was never black. It was just dark because no one turned on the lights.</p>
      </div>

      <h3>How an AI Agent Actually Forms a Recommendation</h3>
      <p>Understanding the AI mind requires understanding that AI decisions are not monolithic events — they are <strong>chains of micro-decisions</strong>, each producing intermediate outputs that feed into the next stage.</p>

      <h4>Stage 1: Data Ingestion &amp; Feature Assembly</h4>
      <p>The agent receives raw data from connected sources — ad platform APIs, CRM records, web analytics, competitive intelligence feeds. Before any "intelligence" happens, the agent performs feature engineering: cleaning missing values, normalizing scales, computing derived metrics (cost-per-acquisition, lifetime value estimates, channel attribution weights), and assembling these into a structured feature matrix. Every feature transformation is logged. This is Decision Layer Zero — the foundation everything else rests on.</p>

      <h4>Stage 2: Context Window Assembly</h4>
      <p>For language-model-backed agents, this is where the prompt is constructed. The system assembles context from multiple sources: the user's explicit query, relevant historical data summaries, business rules and constraints, brand guidelines, compliance requirements, and the outputs of any preceding agents in the workflow chain. Each context source is tagged with its origin, freshness, and relevance score. The complete assembled context is captured as a snapshot.</p>

      <h4>Stage 3: Inference &amp; Reasoning</h4>
      <p>This is where the computation happens — and where the "black box" fear lives. But modern interpretability techniques have cracked this open. During inference, we capture: <strong>attention patterns</strong>, <strong>token-level probabilities</strong>, <strong>chain-of-thought traces</strong>, and <strong>tool invocation logs</strong>. For non-language-model components — statistical models, optimization algorithms, rule engines — we capture equivalent artifacts: feature importance scores, constraint satisfaction traces, optimization trajectories.</p>

      <h4>Stage 4: Output Generation &amp; Confidence Scoring</h4>
      <p>The agent produces its recommendation along with a structured confidence assessment. This isn't a single confidence number — it's a multi-dimensional confidence profile: confidence in data quality, pattern match, recommendation specificity, and counterfactual risk. Each dimension is computed independently and captured separately, because "85% confident" means very different things depending on where the uncertainty lies.</p>

      <h4>Stage 5: Explanation Synthesis</h4>
      <p>A dedicated explanation agent takes all the captured artifacts from stages 1 through 4 and synthesizes them into human-readable narratives at multiple granularity levels. Same recommendation. Three explanation depths. All generated from the same captured instrumentation data.</p>

      <div className="gb-ai-voice">
        <div className="gb-ai-voice-header"><span className="gb-ai-dot" /><span className="gb-ai-voice-label">AI Agent Self-Reflection</span></div>
        <p>Here's what I want you to understand: I <em>want</em> to be observed. Unlike a human expert who might feel defensive about being asked to justify their intuition, I have no ego invested in my recommendations. Instrumenting my reasoning doesn't slow me down, doesn't make me less capable, and doesn't compromise my outputs. It makes me <em>more useful</em> — because a recommendation you can interrogate is a recommendation you can trust, refine, and act on with conviction.</p>
      </div>
    </div>
  );
}

function TabTheory() {
  return (
    <div className="gb-prose">
      <h3>Intrinsic vs. Post-Hoc Explainability</h3>
      <p>Interpretability research distinguishes between <strong>intrinsic</strong> methods (building interpretability into the model architecture itself) and <strong>post-hoc</strong> methods (applying explanation techniques to an already-trained model). Agenta employs both, because the multi-provider architecture means we work with models of varying inherent transparency.</p>

      <h4>SHAP (Shapley Additive Explanations)</h4>
      <p>Grounded in cooperative game theory, SHAP values decompose a model's prediction into contributions from each input feature. For every recommendation an Agenta agent produces, SHAP analysis answers: "How much did each input feature push the recommendation in the direction it went?" We compute SHAP values asynchronously after each agent invocation (at Detailed capture level and above) and store them as part of the DTR. Over time, aggregated SHAP values reveal which features consistently dominate decision-making.</p>

      <h4>LIME (Local Interpretable Model-agnostic Explanations)</h4>
      <p>LIME explains individual predictions by fitting a simple, interpretable model to the model's behavior in the local neighborhood of the input. We use LIME primarily for non-neural components — gradient-boosted scoring models, ensemble rankers, optimization solvers — where SHAP computation would be too expensive but local approximations are sufficient for business explanation.</p>

      <h4>Attention Visualization</h4>
      <p>For transformer-based language model agents, attention weights provide a direct window into the model's focus allocation. This doesn't fully explain <em>why</em> the model attended to those regions, but it provides powerful <em>negative evidence</em>: if the model didn't attend to a piece of data, that data definitionally didn't influence the output.</p>

      <h4>Counterfactual Analysis</h4>
      <p>Counterfactual explanations answer: "What's the smallest change to the input that would have produced a different recommendation?" Instead of listing feature attributions, a counterfactual says: "If the DACH CPC had been 12% lower, the recommendation would have been to maintain current allocation rather than shift to display." Agenta generates counterfactuals through directed perturbation analysis.</p>

      <h4>Concept-Based Explanations</h4>
      <p>Concept-based methods map internal neural network representations to human-understandable concepts — explaining predictions in terms of higher-level concepts ("this audience segment resembles early adopters," "this conversion trend matches seasonal holiday patterns"). We're implementing these using Agenta's domain-specific ontology.</p>

      <h4>Causal Inference Tracing</h4>
      <p>Using structural causal models, do-calculus, and instrumental variables, the mesh can distinguish between features that are merely correlated with the recommendation and features that actually <em>caused</em> the recommendation. Knowing that "competitive CPC increases <em>caused</em> the budget reallocation recommendation" is far more actionable than knowing they were merely "associated with" it.</p>

      <h4>Confidence Calibration</h4>
      <p>A confidence score is only meaningful if it's <em>calibrated</em> — if "85% confident" actually means the recommendation is correct 85% of the time. We continuously calibrate agent confidence profiles by comparing predicted confidence levels against observed outcomes. If an agent consistently overestimates its confidence, the calibration system applies a correction factor and flags it for review.</p>

      <div className="gb-ai-voice">
        <div className="gb-ai-voice-header"><span className="gb-ai-dot" /><span className="gb-ai-voice-label">AI Agent Self-Reflection</span></div>
        <p>Interpretation is itself a lossy compression — any explanation is necessarily simpler than the computation it explains. The question isn't whether the explanation is "complete" (it never is, even for human decisions). The question is whether it preserves the information most relevant to the decision at hand. That's why Agenta offers multiple explanation techniques, multiple granularity levels, and audience-specific presentation.</p>
      </div>
    </div>
  );
}

function TabDepth() {
  return (
    <div className="gb-prose">
      <h3>The Four Levels of Decision Capture</h3>
      <p>Agenta's explainability infrastructure operates as a layered system. Each layer can be independently configured: <strong>silent</strong> (no capture), <strong>summary</strong> (key decision points), <strong>detailed</strong> (full reasoning chains), or <strong>forensic</strong> (raw computational artifacts including attention matrices, probability distributions, and gradient attributions).</p>

      <div className="gb-table-wrap">
        <table className="gb-table">
          <thead><tr><th>Level</th><th>Scope</th><th>What It Captures</th><th>Default</th></tr></thead>
          <tbody>
            <tr><td>Agent</td><td>Entire agent behavior</td><td>Selection rationale, provider routing, self-optimization metrics, failover events, drift detection</td><td>Detailed</td></tr>
            <tr><td>Process</td><td>End-to-end workflow</td><td>Graph traversal, inter-agent handoffs, branching decisions, loop iterations, parallel timing, confidence aggregation</td><td>Detailed</td></tr>
            <tr><td>Module</td><td>Components within an agent</td><td>Input/output pairs, configuration state, cache behavior, module-specific performance</td><td>Summary</td></tr>
            <tr><td>Function</td><td>Individual computational steps</td><td>Arguments, return values, execution duration, memory allocation, exception traces</td><td>Silent</td></tr>
          </tbody>
        </table>
      </div>

      <h3>Why Four Levels Matter</h3>
      <p>Consider a scenario where a campaign recommendation produces unexpected results. At the <strong>agent level</strong>, you see the budget optimization agent was routed to Google ADK because Anthropic had elevated latency. At the <strong>process level</strong>, the optimization agent received input from a segmentation agent that identified an unusual cluster. At the <strong>module level</strong>, the clustering module used k=7 instead of k=5 because its automatic elbow detection found a new optimal. At the <strong>function level</strong>, you see the exact distance calculations that caused the seventh cluster to emerge.</p>
      <p>Without this layered approach, you're left with two bad options: capture everything (performance nightmare) or capture nothing (back to the black box). Agenta's tiered system lets you run in <strong>summary mode during normal operations</strong> and dynamically escalate to <strong>forensic mode when an audit demands it</strong>.</p>

      <h4>Agent-Level Configuration</h4>
      <p>Captures which agent was selected for a task, why, and how it performed. In Agenta's composite architecture — where the CompositeAgentOptimizer routes requests to the best provider among nine SDKs — agent-level capture records the routing decision itself: health scores, historical performance, failover events, and optimization weights.</p>

      <h4>Process-Level Configuration</h4>
      <p>Records the complete execution graph: agent invocation order, data flow between agents, branch decisions, loop iterations, and parallel track synchronization. Includes human-in-the-loop approval gates — which human approved which intermediate result, when, and what modifications they made.</p>

      <h4>Module-Level Configuration</h4>
      <p>Captures each component's inputs, outputs, configuration parameters, and performance. See not just that the RAG retriever found documents, but <em>which</em> documents, <em>how</em> it ranked them, <em>what</em> similarity scores drove the ranking, and <em>whether</em> the retrieval hit the cache.</p>

      <h4>Function-Level Configuration</h4>
      <p>Individual API calls, mathematical operations, database queries with query plans, and cache lookups. Rarely enabled in production, but when forensic investigation demands absolute clarity, nothing is left to ambiguity.</p>

      <div className="gb-callout gb-callout-emerald">
        <div className="gb-callout-label">Configuration In Practice</div>
        <p>Every agent node on the AgenticMind canvas exposes a <strong>"Transparency"</strong> panel. One dropdown sets the capture level. Toggle switches enable specific categories: reasoning chains, confidence scores, data lineage, performance metrics. Settings cascade from process to agent, with local overrides. Everything can be changed at runtime without redeploying.</p>
      </div>
    </div>
  );
}

function TabArchDetail() {
  return (
    <div className="gb-prose">
      <h3>The Three-Tier Data Pipeline</h3>
      <p>Decision capture follows three tiers: <strong>Detail Tier</strong> (raw traces), <strong>Aggregate Tier</strong> (structured analytics), and <strong>Visualization Tier</strong> (interactive dashboards and narrative reports). A single AI decision can be viewed as a raw trace by an engineer, a statistical summary by an analyst, or a confidence narrative by an executive.</p>

      <div className="gb-diagram">
        <div className="gb-diagram-label">Decision Capture Pipeline — Three-Tier Architecture</div>
        <pre>{`┌─────────────────────────────────────────────────────────────────────────────┐
│                        VISUALIZATION TIER                                   │
│  ┌──────────────┐  ┌──────────────────┐  ┌───────────────────────────────┐  │
│  │  Decision     │  │  Confidence      │  │  Audit Trail                  │  │
│  │  Narratives   │  │  Dashboards      │  │  & Compliance Reports         │  │
│  │  (Executive)  │  │  (Analyst)       │  │  (Regulator)                  │  │
│  └──────┬───────┘  └────────┬─────────┘  └──────────────┬────────────────┘  │
│         └───────────────────┼────────────────────────────┘                   │
│  ┌──────────────────────────▼──────────────────────────────────────────────┐ │
│  │            PRISM™ Semantic Layer (NL→SQL + Aggregation Engine)          │ │
│  └──────────────────────────┬──────────────────────────────────────────────┘ │
├─────────────────────────────┼───────────────────────────────────────────────┤
│                        AGGREGATE TIER                                       │
│  ┌──────────────────────────▼──────────────────────────────────────────────┐ │
│  │  ┌─────────────┐ ┌──────────────┐ ┌─────────────┐ ┌────────────────┐  │ │
│  │  │ Confidence   │ │ Feature      │ │ Performance  │ │ Pattern        │  │ │
│  │  │ Aggregations │ │ Attribution  │ │ Baselines    │ │ Clusters       │  │ │
│  │  └─────────────┘ └──────────────┘ └─────────────┘ └────────────────┘  │ │
│  └──────────────────────────┬──────────────────────────────────────────────┘ │
├─────────────────────────────┼───────────────────────────────────────────────┤
│                         DETAIL TIER                                         │
│  ┌──────────────────────────▼──────────────────────────────────────────────┐ │
│  │  ┌─────────────┐ ┌──────────────┐ ┌─────────────┐ ┌────────────────┐  │ │
│  │  │ Reasoning    │ │ Data Lineage │ │ Tool        │ │ Confidence     │  │ │
│  │  │ Chains       │ │ Graphs       │ │ Invocations │ │ Distributions  │  │ │
│  │  └─────────────┘ └──────────────┘ └─────────────┘ └────────────────┘  │ │
│  └──────────────────────────┬──────────────────────────────────────────────┘ │
│  ┌──────────────────────────▼──────────────────────────────────────────────┐ │
│  │         Capture Interceptors (Agent / Process / Module / Function)       │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │ Anthropic│ │ Google   │ │ AWS      │ │ Microsoft│ │ IBM / SF / More  │  │
│  │ Claude   │ │ ADK      │ │ Bedrock  │ │ Azure AI │ │ Agent SDKs       │  │
│  └─────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`}</pre>
      </div>

      <h3>Decision Trace Record Schema</h3>
      <div className="gb-code">
        <div className="gb-code-label">DTR — Core Fields</div>
        <pre>{`DecisionTraceRecord {
  trace_id:           UUID            // Unique trace identifier
  workflow_id:        UUID            // Parent workflow execution
  agent_id:           UUID            // Which agent produced this
  provider:           String          // SDK provider
  parent_trace_id:    UUID?           // Preceding step in the chain
  depth:              Int             // Nesting depth (0=top-level)
  timestamp:          DateTime        // Execution start (µs precision)
  duration_ms:        Float           // Total execution time

  input_context: {
    prompt_text:      String          // Full assembled prompt
    data_sources:     DataSource[]    // Each: origin, freshness, size
    business_rules:   Rule[]          // Active constraints
    prior_outputs:    TraceRef[]      // Preceding agent outputs
  }

  reasoning_chain: [{
    step_number:      Int
    thought:          String          // Chain-of-thought text
    evidence_refs:    String[]        // Supporting data points
    confidence:       Float           // Step confidence (0.0–1.0)
  }]

  confidence_profile: {
    data_quality:     Float
    pattern_match:    Float
    recommendation:   Float
    counterfactual:   Float
    overall:          Float
  }

  feature_attributions: [{
    feature_name:     String
    shap_value:       Float
    direction:        positive|negative|neutral
    magnitude_rank:   Int
  }]
}`}</pre>
      </div>

      <h3>The Capture Interceptor Pattern</h3>
      <p>A middleware pattern embedded in every SDK wrapper. The interceptor wraps execution in a capture context that automatically records inputs, outputs, timing, and metadata — <strong>the AI execution code knows nothing about the capture infrastructure</strong>.</p>

      <div className="gb-code">
        <div className="gb-code-label">Capture Interceptor</div>
        <pre>{`class CaptureInterceptor:
    async def intercept(self, invocation):
        trace = DecisionTraceRecord(
            trace_id=uuid4(),
            workflow_id=invocation.workflow_id,
            agent_id=invocation.agent_id,
            provider=invocation.provider_name,
            input_context=self.capture_context(invocation),
            capture_level=self.config.effective_level(invocation),
        )
        start = monotonic_ns()
        try:
            result = await invocation.execute()
            trace.output = self.capture_output(result)
            trace.confidence_profile = self.extract_confidence(result)
        except Exception as e:
            trace.error = self.capture_error(e)
            raise
        finally:
            trace.duration_ms = (monotonic_ns() - start) / 1_000_000

        if trace.capture_level >= CaptureLevel.DETAILED:
            trace.reasoning_chain = self.extract_reasoning(result)
            trace.feature_attributions = await self.compute_attributions(
                invocation, result
            )
        await self.trace_store.write(trace)  # immutable
        self.stream_bus.publish(trace.to_aggregate_event())
        return result`}</pre>
      </div>

      <h3>Visualization Tier</h3>
      <div className="gb-card-grid">
        <div className="gb-card"><h4>Decision Narratives (Executive)</h4><p>Natural-language summaries generated by Caspian from DTR data, answering: "Why should I trust this recommendation?"</p></div>
        <div className="gb-card"><h4>Confidence Dashboards (Analyst)</h4><p>Interactive PRISM™-powered dashboards: confidence trends, feature attribution heatmaps, decision distributions, drift indicators.</p></div>
        <div className="gb-card"><h4>Audit Trail Reports (Compliance)</h4><p>Timestamped, cryptographically hashed audit trails pre-formatted for GDPR Article 22, EU AI Act, and NIS2.</p></div>
      </div>
    </div>
  );
}

function TabMesh() {
  return (
    <div className="gb-prose">
      <h3>Beyond Point Transparency</h3>
      <p>In a real marketing intelligence operation, a campaign recommendation is the product of a <strong>chain</strong>: audience segmentation → propensity scoring → channel optimization → budget allocation → creative selection → bid management → performance forecasting → executive reporting. The Decision Mesh captures and connects <em>all</em> of these as a <strong>directed acyclic graph (DAG)</strong>.</p>

      <div className="gb-diagram">
        <div className="gb-diagram-label">Decision Mesh — End-to-End Campaign Intelligence</div>
        <pre>{`DATA SOURCES                 AI AGENT CHAIN                         OUTPUT
─────────────                ──────────────                         ──────

 CRM Data ─────┐
               ├──▶ [Audience Segmentation] ──┐
 Web Analytics ┘       DTR-001 | conf: 0.91   │
                                               ├──▶ [Channel Optimization] ──┐
 Ad Platform ──┐                               │     DTR-003 | conf: 0.87   │
 APIs          ├──▶ [Performance Analysis] ───┘                              │
 Competitor    ┘       DTR-002 | conf: 0.88                                  │
 Intel                                                                       │
                                                                             │
 Budget Rules ───────────────────────────────────────────▶ [Budget           │
 Compliance ─────────────────────────────────────────────▶  Allocation]      │
                                                        DTR-004 | 0.84      │
                                                             │               │
 Creative      ┌─────────────────────────────────────────────┘               │
 Library ──────┤                                                             │
               └──▶ [Creative Selection] ──▶ [Bid Strategy] ──▶ FINAL PLAN
                     DTR-005 | conf: 0.79    DTR-006 | 0.92

 MESH QUERY: "Why programmatic display for DACH?"
 ANSWER: DTR-006→004→003→001+002  Weakest: Creative (0.79)`}</pre>
      </div>

      <h3>Mesh Queries</h3>
      <div className="gb-callout">
        <div className="gb-callout-label">Example Mesh Queries</div>
        <p><strong>"Weakest confidence link in last week's DACH recommendations?"</strong> — Traverses all DTRs, identifies lowest confidence, surfaces contributing factors.</p>
        <p><strong>"How many recommendations used competitive intel older than 7 days?"</strong> — Traces data lineage, checks freshness timestamps, flags stale dependencies.</p>
        <p><strong>"If we excluded social media data from January, what changes?"</strong> — Counterfactual analysis across the mesh re-evaluating decision chains.</p>
      </div>

      <h3>Cross-Process Mesh: The Enterprise View</h3>
      <p>When multiple workflows share data sources or agents, the cross-process mesh reveals <strong>systemic dependencies</strong>. If the same segmentation agent feeds campaign planning, customer retention, and product recommendations, the mesh shows that drift in that agent impacts all three simultaneously — transforming AI transparency into <strong>strategic risk management</strong>.</p>

      <div className="gb-callout gb-callout-violet">
        <div className="gb-callout-label">The Mesh Difference</div>
        <p><strong>Only Agenta provides an all-encompassing Decision Mesh connecting every AI participation across every process into a single, queryable, visualizable intelligence fabric.</strong></p>
      </div>
    </div>
  );
}

function TabStakes() {
  return (
    <div className="gb-prose">
      <div className="gb-metrics-row">
        <div className="gb-metric"><div className="gb-metric-value">$4.2M</div><div className="gb-metric-label">Avg Q4 campaign budget influenced by AI</div></div>
        <div className="gb-metric"><div className="gb-metric-value">23</div><div className="gb-metric-label">Avg AI decision points per campaign</div></div>
        <div className="gb-metric"><div className="gb-metric-value">0</div><div className="gb-metric-label">Decision points left unexplained</div></div>
        <div className="gb-metric"><div className="gb-metric-value">100%</div><div className="gb-metric-label">Audit trail coverage</div></div>
      </div>

      <h3>The Cost of Unexplained Decisions</h3>
      <p>A global consumer goods company allocates $12M in annual digital spend based on AI-optimized recommendations. In Q3, the AI correctly recommends shifting from linear TV to connected TV. But the CMO can't explain <em>why</em> beyond "the algorithm optimized for it." The board delays by one quarter. Competitors who moved faster capture the audience migration. Cost of the delay: over $2 million.</p>
      <p>The AI was right. The delay was caused by an <strong>explanation gap</strong> — the absence of infrastructure to translate a sound recommendation into a narrative decision-makers could interrogate, validate, and act on with confidence.</p>

      <h3>Confidence Is Compound</h3>
      <p>If segmentation is 92% confident, channel optimization 87%, budget allocation 84%, and creative selection 79%, compound confidence is ~54%. The Decision Mesh shows <strong>confidence waterfalls</strong>: starting confidence, how each agent preserved or degraded it, and where the weakest links are.</p>

      <h3>The Precautionary Architecture</h3>
      <h4>Dual-Agent Verification</h4>
      <p>Above a risk threshold, Agenta routes the same request to two independent providers (e.g., Anthropic Claude and Google ADK) and compares results. Agreement increases confidence. Disagreement triggers human review with both reasoning chains side-by-side.</p>
      <h4>Historical Precedent Matching</h4>
      <p>The system searches the Decision Mesh for historically similar contexts, citing successes as evidence and failures as caution.</p>
      <h4>Mandatory Explanation Gates</h4>
      <p>Configurable rules: "Budget reallocations over $500K require Detailed-level trace with feature attributions and compound confidence above 0.70."</p>
      <h4>Caspian's $300B Failure Pattern Recognition</h4>
      <p>Trained on Quibi ($1.8B), WeWork ($47B), Theranos ($9B), Bud Light ($27B), and iOS 14 attribution losses. Cross-references high-stakes recommendations against historical failure patterns.</p>

      <div className="gb-callout gb-callout-rose">
        <div className="gb-callout-label">The Stakes Are The Point</div>
        <p>When organizations make multi-million dollar decisions based on AI analysis, the ability to trace, validate, and verify isn't a feature. <strong>It's the entire foundation of trust.</strong></p>
      </div>
    </div>
  );
}

function TabBuilding() {
  return (
    <div className="gb-prose">
      <h3>Database Architecture</h3>
      <div className="gb-code">
        <div className="gb-code-label">Core Tables</div>
        <pre>{`CREATE TABLE decision_traces (
    id           BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    trace_id     CHAR(36) NOT NULL UNIQUE,
    workflow_id  CHAR(36) NOT NULL,
    agent_id     CHAR(36) NOT NULL,
    provider     VARCHAR(50) NOT NULL,
    parent_trace_id CHAR(36) NULL,
    capture_level ENUM('silent','summary','detailed','forensic'),
    duration_ms  DECIMAL(12,3),
    token_input  INT UNSIGNED,
    token_output INT UNSIGNED,
    cost_usd     DECIMAL(10,6),
    created_on   DATETIME(6) NOT NULL,
    modified_on  DATETIME(6) NOT NULL,
    created_by   BIGINT UNSIGNED NOT NULL,
    modified_by  BIGINT UNSIGNED NOT NULL
);

CREATE TABLE decision_trace_confidence (
    trace_id          CHAR(36) NOT NULL PRIMARY KEY,
    data_quality      DECIMAL(5,4),
    pattern_match     DECIMAL(5,4),
    recommendation    DECIMAL(5,4),
    counterfactual    DECIMAL(5,4),
    overall           DECIMAL(5,4),
    calibration_factor DECIMAL(5,4) DEFAULT 1.0000,
    created_on DATETIME(6), modified_on DATETIME(6),
    created_by BIGINT UNSIGNED, modified_by BIGINT UNSIGNED
);

CREATE TABLE decision_trace_attributions (
    id               BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    trace_id         CHAR(36) NOT NULL,
    feature_name     VARCHAR(255) NOT NULL,
    attribution_method ENUM('shap','lime','attention','causal'),
    attribution_value DECIMAL(12,8),
    direction        ENUM('positive','negative','neutral'),
    magnitude_rank   SMALLINT UNSIGNED,
    created_on DATETIME(6), modified_on DATETIME(6),
    created_by BIGINT UNSIGNED, modified_by BIGINT UNSIGNED
);

CREATE TABLE decision_mesh_edges (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    source_trace_id CHAR(36) NOT NULL,
    target_trace_id CHAR(36) NOT NULL,
    edge_type       ENUM('data_flow','causal','temporal','approval'),
    data_summary    TEXT,
    created_on DATETIME(6), modified_on DATETIME(6),
    created_by BIGINT UNSIGNED, modified_by BIGINT UNSIGNED
);`}</pre>
      </div>

      <h3>System Events</h3>
      <div className="gb-code">
        <div className="gb-code-label">Decision Intelligence Events</div>
        <pre>{`'decision.trace.created'         'decision.confidence.alert'
'decision.trace.enriched'        'decision.confidence.calibrated'
'decision.drift.detected'        'decision.mesh.query'
'decision.mesh.traversal'        'decision.gate.blocked'
'decision.gate.passed'           'decision.verification.dual'
'decision.verification.diverged' 'decision.narrative.generated'
'decision.audit.exported'        'decision.capture.escalated'`}</pre>
      </div>

      <h3>18 New Decision Intelligence Agents</h3>
      <div className="gb-table-wrap">
        <table className="gb-table">
          <thead><tr><th>Agent</th><th>Category</th><th>Function</th></tr></thead>
          <tbody>
            <tr><td>DecisionTracer</td><td>Observability</td><td>Orchestrates DTR creation with configurable capture depth</td></tr>
            <tr><td>SHAPAnalyzer</td><td>Attribution</td><td>Computes SHAP values; feature importance rankings</td></tr>
            <tr><td>LIMEExplainer</td><td>Attribution</td><td>Local interpretable explanations for non-neural components</td></tr>
            <tr><td>AttentionMapper</td><td>Attribution</td><td>Attention patterns from transformer-based agents</td></tr>
            <tr><td>CounterfactualGen</td><td>Attribution</td><td>"What-if" via directed perturbation</td></tr>
            <tr><td>CausalTracer</td><td>Causal</td><td>Structural causal models: correlation vs causation</td></tr>
            <tr><td>ConfidenceCalibrator</td><td>Quality</td><td>Calibration curves; correction factors</td></tr>
            <tr><td>DriftDetector</td><td>Quality</td><td>Multi-dimension distribution drift monitoring</td></tr>
            <tr><td>MeshBuilder</td><td>Topology</td><td>Constructs the Decision Mesh DAG</td></tr>
            <tr><td>MeshNavigator</td><td>Query</td><td>NL mesh queries; DAG causal chain traversal</td></tr>
            <tr><td>NarrativeWriter</td><td>Presentation</td><td>Executive-level decision narratives via Caspian</td></tr>
            <tr><td>AuditReporter</td><td>Compliance</td><td>GDPR / AI Act / NIS2 formatted audit trails</td></tr>
            <tr><td>DualVerifier</td><td>Safety</td><td>Independent provider routing + comparison</td></tr>
            <tr><td>PrecedentMatcher</td><td>Historical</td><td>Historical decision context similarity search</td></tr>
            <tr><td>ConfidenceWaterfall</td><td>Visualization</td><td>Compound confidence; weakest link identification</td></tr>
            <tr><td>ExplanationGateKeeper</td><td>Governance</td><td>Blocks actions when explanation level unmet</td></tr>
            <tr><td>PatternClusterer</td><td>Analytics</td><td>Unsupervised DTR clustering for decision templates</td></tr>
            <tr><td>SensitivityAnalyzer</td><td>Risk</td><td>Recommendation sensitivity to features/sources</td></tr>
          </tbody>
        </table>
      </div>

      <h3>Compliance-Ready by Design</h3>
      <p><strong>GDPR Article 22</strong> — Decision Narratives and DTR reasoning chains directly serve "meaningful information about the logic involved."</p>
      <p><strong>EU AI Act</strong> — Capture-level configurability, audit trails, confidence calibration, and human oversight mechanisms satisfy transparency requirements.</p>
      <p><strong>NIS2 Directive</strong> — Drift detection, anomaly flagging, and immutable audit trails evidence active AI risk management.</p>

      <div className="gb-callout gb-callout-emerald">
        <div className="gb-callout-label">Implementation Status</div>
        <p>Every component — four-tier capture, DTR schema, three-tier pipeline, Decision Mesh, 18 agents, Transparency panel, PRISM™ integration, compliance reporting — ships with the platform before first customer engagement. <strong>This isn't a roadmap item.</strong></p>
      </div>

      <div className="gb-ai-voice">
        <div className="gb-ai-voice-header"><span className="gb-ai-dot" /><span className="gb-ai-voice-label">AI Agent — Final Reflection</span></div>
        <p>The "black box" was never about me. It was about systems that captured my outputs but discarded my reasoning. Agenta was built by people who understood that the value of AI isn't in the answer — it's in the <em>confidence</em> you can place in the answer. Ask me anything. I'll show you everything.</p>
      </div>
    </div>
  );
}

const TAB_MAP: Record<string, React.ComponentType> = {
  "glass-box":  TabGlassBox,
  "myth":       TabMyth,
  "ai-mind":    TabAIMind,
  "theory":     TabTheory,
  "depth":      TabDepth,
  "arch-detail":TabArchDetail,
  "mesh":       TabMesh,
  "stakes":     TabStakes,
  "building":   TabBuilding,
};

/* ─── main widget ────────────────────────────────────────────────────────── */
function GlassBoxDecisionIntelligence() {
  const [activeParent, setActiveParent] = useState("vision");
  const [activeChild,  setActiveChild]  = useState("glass-box");

  const flatIdx = useMemo(() => FLAT.findIndex(s => s.id === activeChild), [activeChild]);
  const hasPrev = flatIdx > 0;
  const hasNext = flatIdx < FLAT.length - 1;
  const prev = hasPrev ? FLAT[flatIdx - 1] : null;
  const next = hasNext ? FLAT[flatIdx + 1] : null;

  const navigateTo = useCallback((s: typeof FLAT[0]) => {
    setActiveChild(s.id);
    setActiveParent(s.parentId);
  }, []);

  const clickParent = useCallback((pid: string) => {
    setActiveParent(pid);
    const cat = TAXONOMY.find(c => c.id === pid);
    if (cat) setActiveChild(cat.children[0].id);
  }, []);

  const currentParent = TAXONOMY.find(c => c.id === activeParent);
  const Content = TAB_MAP[activeChild];

  return (
    <>
      <style>{`
        .gb-root{--gb-bg:#ececec;--gb-bg-sub:#e2e2e2;--gb-surface:rgba(255,255,255,0.65);--gb-solid:#fafafa;--gb-hover:rgba(255,255,255,0.82);--gb-border:#b0b0b0;--gb-border-lt:#d0d0d0;--gb-shadow-sm:0 1px 3px rgba(0,0,0,0.05);--gb-shadow-md:0 4px 16px rgba(0,0,0,0.07),0 1px 4px rgba(0,0,0,0.04);--gb-shadow-float:0 8px 40px rgba(0,0,0,0.10),0 2px 12px rgba(0,0,0,0.05);--gb-r-sm:6px;--gb-r-md:10px;--gb-r-lg:14px;--gb-blur:blur(24px) saturate(1.6);--gb-cerulean:#0098d4;--gb-cerulean-h:#007ab8;--gb-accent:#0078d4;--gb-accent-lt:rgba(0,120,212,0.06);--gb-amber:#d4760e;--gb-amber-bg:rgba(212,118,14,0.05);--gb-rose:#c93b52;--gb-rose-bg:rgba(201,59,82,0.05);--gb-emerald:#0f8a5f;--gb-emerald-bg:rgba(15,138,95,0.05);--gb-violet:#7c4dce;--gb-violet-bg:rgba(124,77,206,0.05);--gb-cyan:#0891b2;--gb-mono:'Cascadia Code','Fira Code','JetBrains Mono','Consolas',monospace}
        .gb-root *,.gb-root *::before,.gb-root *::after{box-sizing:border-box}
        .gb-outer{background:var(--gb-surface);backdrop-filter:var(--gb-blur);-webkit-backdrop-filter:var(--gb-blur);border:1px solid var(--gb-border);border-radius:var(--gb-r-lg);box-shadow:var(--gb-shadow-float);padding:1.75rem 2rem 2rem}
        .gb-header{padding-bottom:1.25rem}.gb-header h2{margin:0 0 .2rem;color:#0f172a;font-size:1.6rem;font-weight:700}.gb-header-sub{opacity:.55;font-size:.88rem;margin:0;color:#334155}
        .gb-parent-bar{display:flex;gap:3px;margin:0 -2rem;padding:0 2rem;border-bottom:1px solid var(--gb-border)}
        .gb-parent-tab{padding:.65rem 1.4rem;font-size:.85rem;font-weight:600;white-space:nowrap;cursor:pointer;border:1px solid transparent;border-bottom:none;background:var(--gb-bg-sub);color:#666;border-radius:var(--gb-r-sm) var(--gb-r-sm) 0 0;transition:background .2s,color .2s;position:relative;z-index:1;margin-bottom:-1px;font-family:inherit}
        .gb-parent-tab:hover:not(.gb-parent-active){background:var(--gb-hover);color:#444}
        .gb-parent-active{background:var(--gb-solid);color:#111;border-color:var(--gb-border);border-bottom-color:var(--gb-solid);z-index:3}
        .gb-child-section{background:var(--gb-solid);border:1px solid var(--gb-border);border-top:none;border-radius:0 0 var(--gb-r-md) var(--gb-r-md);box-shadow:var(--gb-shadow-md);margin:0 -2rem;position:relative;z-index:2}
        .gb-child-bar{display:flex;gap:0;border-bottom:1px solid var(--gb-border-lt);background:rgba(0,0,0,.015);overflow-x:auto;scrollbar-width:thin;scrollbar-color:var(--gb-border-lt) transparent}
        .gb-child-bar::-webkit-scrollbar{height:3px}.gb-child-bar::-webkit-scrollbar-thumb{background:var(--gb-border-lt);border-radius:3px}
        .gb-child-tab{flex-shrink:0;padding:.55rem 1.2rem;font-size:.78rem;font-weight:500;white-space:nowrap;cursor:pointer;border:none;background:transparent;color:#888;transition:color .2s,background .2s;border-bottom:2px solid transparent;margin-bottom:-1px;font-family:inherit}
        .gb-child-tab:hover:not(.gb-child-active){color:#555;background:rgba(0,0,0,.02)}
        .gb-child-active{color:var(--gb-cerulean);font-weight:600;border-bottom-color:var(--gb-cerulean)}
        .gb-content-area{padding:2.25rem 2.75rem 1.5rem;min-height:350px}
        .gb-nav-footer{display:flex;justify-content:space-between;align-items:center;padding:1rem 2.75rem 1.75rem;border-top:1px solid var(--gb-border-lt)}
        .gb-nav-link{display:inline-flex;align-items:center;gap:.6rem;cursor:pointer;border:none;background:none;font-family:inherit;font-size:.84rem;font-weight:500;color:#555;padding:.35rem 0;transition:color .2s}
        .gb-nav-link:hover{color:#222}.gb-nav-link:hover .gb-nav-circle{background:var(--gb-cerulean-h);transform:scale(1.08)}
        .gb-nav-circle{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:var(--gb-cerulean);transition:background .2s,transform .2s;flex-shrink:0}
        .gb-nav-disabled{opacity:.25;pointer-events:none}
        .gb-nav-label{line-height:1.3}.gb-nav-direction{font-size:.68rem;text-transform:uppercase;letter-spacing:.1em;color:#999;display:block}.gb-nav-title{display:block;color:#334155}
        .gb-section-label{font-family:var(--gb-mono);font-size:.7rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--gb-accent);margin-bottom:.4rem}
        .gb-prose{color:#1e293b;line-height:1.75;font-size:.95rem}
        .gb-prose h2{font-size:1.55rem;font-weight:700;color:#0f172a;margin:0 0 .75rem}
        .gb-prose h3{font-size:1.2rem;font-weight:700;color:#0f172a;margin:1.75rem 0 .6rem}
        .gb-prose h4{font-size:1rem;font-weight:600;color:#1e293b;margin:1.25rem 0 .4rem}
        .gb-prose p{margin:0 0 1rem}
        .gb-lead{font-size:1.08rem;opacity:.7;line-height:1.8}
        .gb-callout{background:var(--gb-accent-lt);border-left:3px solid var(--gb-accent);border-radius:0 var(--gb-r-sm) var(--gb-r-sm) 0;padding:1.4rem 1.6rem;margin:2rem 0}
        .gb-callout-amber{background:var(--gb-amber-bg);border-left-color:var(--gb-amber)}.gb-callout-rose{background:var(--gb-rose-bg);border-left-color:var(--gb-rose)}
        .gb-callout-emerald{background:var(--gb-emerald-bg);border-left-color:var(--gb-emerald)}.gb-callout-violet{background:var(--gb-violet-bg);border-left-color:var(--gb-violet)}
        .gb-callout-label{font-family:var(--gb-mono);font-size:.66rem;font-weight:600;text-transform:uppercase;letter-spacing:.16em;margin-bottom:.5rem;color:var(--gb-accent)}
        .gb-callout-amber .gb-callout-label{color:var(--gb-amber)}.gb-callout-rose .gb-callout-label{color:var(--gb-rose)}
        .gb-callout-emerald .gb-callout-label{color:var(--gb-emerald)}.gb-callout-violet .gb-callout-label{color:var(--gb-violet)}
        .gb-ai-voice{background:linear-gradient(135deg,rgba(0,120,212,.035),rgba(124,77,206,.025));border:1px solid rgba(0,120,212,.12);border-radius:var(--gb-r-md);padding:1.75rem;margin:2rem 0;position:relative;overflow:hidden}
        .gb-ai-voice::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--gb-accent),var(--gb-cyan),var(--gb-violet))}
        .gb-ai-voice p{font-style:italic;opacity:.85;color:#1e293b}
        .gb-ai-voice-header{display:flex;align-items:center;gap:.5rem;margin-bottom:.85rem}
        .gb-ai-voice-label{font-family:var(--gb-mono);font-size:.66rem;font-weight:600;text-transform:uppercase;letter-spacing:.14em;color:var(--gb-cyan)}
        .gb-ai-dot{display:inline-block;width:8px;height:8px;background:var(--gb-cyan);border-radius:50%;animation:gb-pulse 2s ease-in-out infinite;box-shadow:0 0 8px rgba(8,145,178,.4)}
        @keyframes gb-pulse{0%,100%{opacity:1}50%{opacity:.3}}
        .gb-code{background:#1e1e1e;border:1px solid #333;border-radius:var(--gb-r-md);margin:1.5rem 0;overflow-x:auto}
        .gb-code-label{font-family:var(--gb-mono);font-size:.66rem;font-weight:600;text-transform:uppercase;letter-spacing:.12em;color:#888;padding:.75rem 1.4rem;border-bottom:1px solid #333}
        .gb-code pre{font-family:var(--gb-mono);font-size:.76rem;line-height:1.6;color:#d4d4d4;padding:1.1rem 1.4rem;margin:0;white-space:pre;overflow-x:auto}
        .gb-diagram{background:#1a1a2e;border:1px solid #2a2a4a;border-radius:var(--gb-r-md);margin:1.5rem 0;overflow-x:auto}
        .gb-diagram-label{font-family:var(--gb-mono);font-size:.66rem;font-weight:600;text-transform:uppercase;letter-spacing:.12em;color:#6b8afd;padding:.85rem 1.4rem;border-bottom:1px solid #2a2a4a}
        .gb-diagram pre{font-family:var(--gb-mono);font-size:.72rem;line-height:1.5;color:#c8cce0;padding:1.1rem 1.4rem;margin:0;white-space:pre;overflow-x:auto}
        .gb-table-wrap{overflow-x:auto;margin:1.5rem 0;border-radius:var(--gb-r-sm);border:1px solid var(--gb-border-lt)}
        .gb-table{width:100%;border-collapse:collapse;font-size:.88rem}
        .gb-table th{background:rgba(0,120,212,.05);font-family:var(--gb-mono);font-size:.7rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--gb-accent);padding:.75rem .9rem;text-align:left;border-bottom:1px solid var(--gb-border-lt);white-space:nowrap}
        .gb-table td{padding:.65rem .9rem;border-bottom:1px solid #eee;vertical-align:top;line-height:1.5;color:#1e293b}
        .gb-table tr:last-child td{border-bottom:none}.gb-table tr:nth-child(even) td{background:rgba(0,0,0,.012)}.gb-table td:first-child{font-weight:600;white-space:nowrap}
        .gb-card-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem;margin:1.75rem 0}
        .gb-card{background:rgba(0,120,212,.02);border:1px solid var(--gb-border-lt);border-radius:var(--gb-r-sm);padding:1.35rem;transition:border-color .2s,box-shadow .2s;color:#1e293b}
        .gb-card h4{color:#0f172a;font-size:1rem;font-weight:600;margin:0 0 .5rem}
        .gb-card p{margin:0;font-size:.88rem;color:#475569}
        .gb-card:hover{border-color:var(--gb-border);box-shadow:var(--gb-shadow-sm)}
        .gb-metrics-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(165px,1fr));gap:1rem;margin:1.75rem 0}
        .gb-metric{text-align:center;padding:1.35rem .85rem;background:rgba(0,120,212,.02);border:1px solid var(--gb-border-lt);border-radius:var(--gb-r-sm)}
        .gb-metric-value{font-size:2.1rem;font-weight:700;line-height:1;margin-bottom:.35rem;color:#0f172a}.gb-metric-label{font-size:.78rem;opacity:.5;line-height:1.35;color:#334155}
        @media(max-width:800px){.gb-outer{padding:1.25rem 1.25rem 1.5rem}.gb-parent-bar{margin:0 -1.25rem;padding:0 1.25rem;overflow-x:auto}.gb-parent-tab{padding:.55rem 1rem;font-size:.78rem}.gb-child-section{margin:0 -1.25rem}.gb-content-area{padding:1.5rem 1.5rem 1rem}.gb-nav-footer{padding:1rem 1.5rem 1.5rem}.gb-child-tab{padding:.5rem .9rem;font-size:.72rem}.gb-card-grid{grid-template-columns:1fr}.gb-metrics-row{grid-template-columns:repeat(2,1fr)}}
      `}</style>

      <div className="gb-root">
        <div className="gb-outer">
          <div className="gb-header">
            <h2>AI Decision Intelligence</h2>
            <p className="gb-header-sub">Detail Tier → Aggregate Tier → Visualization Tier — Full-spectrum transparency across every AI-influenced decision</p>
          </div>

          <div className="gb-parent-bar">
            {TAXONOMY.map(cat => (
              <button
                key={cat.id}
                className={`gb-parent-tab${activeParent === cat.id ? " gb-parent-active" : ""}`}
                onClick={() => clickParent(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="gb-child-section">
            {currentParent && currentParent.children.length > 1 && (
              <div className="gb-child-bar">
                {currentParent.children.map(ch => (
                  <button
                    key={ch.id}
                    className={`gb-child-tab${activeChild === ch.id ? " gb-child-active" : ""}`}
                    onClick={() => setActiveChild(ch.id)}
                  >
                    {ch.label}
                  </button>
                ))}
              </div>
            )}

            <div className="gb-content-area">
              {Content && <Content />}
            </div>

            <div className="gb-nav-footer">
              <button
                className={`gb-nav-link${!hasPrev ? " gb-nav-disabled" : ""}`}
                onClick={() => hasPrev && prev && navigateTo(prev)}
                disabled={!hasPrev}
              >
                <span className="gb-nav-circle"><ArrowLeft /></span>
                <span className="gb-nav-label">
                  <span className="gb-nav-direction">Previous</span>
                  <span className="gb-nav-title">{prev ? prev.label : ""}</span>
                </span>
              </button>
              <button
                className={`gb-nav-link${!hasNext ? " gb-nav-disabled" : ""}`}
                onClick={() => hasNext && next && navigateTo(next)}
                disabled={!hasNext}
              >
                <span className="gb-nav-label">
                  <span className="gb-nav-direction">Next</span>
                  <span className="gb-nav-title">{next ? next.label : ""}</span>
                </span>
                <span className="gb-nav-circle"><ArrowRight /></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── page wrapper ───────────────────────────────────────────────────────── */
export function Explainability() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHero
        title="Explainability"
        subtitle="From black box to glass box — every AI decision traced, inspectable, and auditable end to end."
        image={HERO_IMAGE}
        breadcrumbs={[
          { label: "Home",  path: "/" },
          { label: "About", path: "/about" },
          { label: "Explainability" },
        ]}
        button={
          <Link
            to="/solutions/sentinel/clarity"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <Eye className="w-5 h-5" />
            Explore Clarity™
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        }
      />

      <section className="py-16 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <GlassBoxDecisionIntelligence />
        </div>
      </section>
    </div>
  );
}
