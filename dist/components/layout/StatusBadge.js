import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../utils/cn";
const OK_PATTERNS = /^(active|enabled|pass|ready|ok|online|healthy|running|completed|success|green)$/i;
const WARN_PATTERNS = /^(warn|warning|pending|degraded|partial|slow|flaky|amber|yellow|queued)$/i;
const ERROR_PATTERNS = /^(error|fail|failed|disabled|revoked|inactive|offline|unhealthy|stopped|blocked|red|critical)$/i;
/** Detect tone from a status string. Exported for sort-value and test use. */
export function detectTone(value) {
    if (OK_PATTERNS.test(value))
        return "ok";
    if (WARN_PATTERNS.test(value))
        return "warning";
    if (ERROR_PATTERNS.test(value))
        return "error";
    return "neutral";
}
/** Numeric sort weight: ok=0, warning=1, neutral=2, error=3. */
export function toneSortWeight(tone) {
    if (tone === "ok")
        return 0;
    if (tone === "warning")
        return 1;
    if (tone === "neutral")
        return 2;
    return 3;
}
const TONE_CLASSES = {
    ok: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700",
    warning: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700",
    error: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700",
    neutral: "bg-secondary text-secondary-foreground border-secondary/20",
};
const TONE_ICONS = {
    ok: "\u2713", // checkmark
    warning: "\u26A0", // warning sign
    error: "\u2717", // cross
    neutral: "\u2014", // em dash
};
export function StatusBadge(props) {
    const tone = props.tone ?? detectTone(props.value);
    const icon = TONE_ICONS[tone];
    return (_jsxs("span", { className: cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium", TONE_CLASSES[tone], props.className), role: "status", "aria-label": `Status: ${props.value}`, children: [_jsx("span", { "aria-hidden": "true", children: icon }), props.value] }));
}
