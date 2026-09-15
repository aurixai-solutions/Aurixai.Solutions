/**
 * Safe local content wrapper.
 *
 * The full site content lives in content.json, but importing it statically
 * causes a hard build failure whenever the file contains a JSON syntax error.
 * All runtime content-loading already uses fetch('/content.json') or the
 * Supabase API, so this module simply provides a safe empty-object fallback
 * that keeps the module graph intact even when content.json is malformed.
 *
 * Replace any `import localContent from "…/data/content.json"` with
 * `import localContent from "…/data/localContent"`.
 */

const localContent: Record<string, any> = {};

export default localContent;
