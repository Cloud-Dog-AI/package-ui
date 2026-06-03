import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Input } from "../../components/input/Input";
import { JsonBlock } from "../JsonBlock";
import { formatDuration, lifecycleTone, } from "./metaTypes";
const HEALTH_TONE = {
    healthy: "border-emerald-300 bg-emerald-50 text-emerald-800",
    degraded: "border-amber-300 bg-amber-50 text-amber-800",
    unhealthy: "border-rose-300 bg-rose-50 text-rose-800",
    unknown: "border-slate-300 bg-slate-50 text-slate-700",
};
const LIFECYCLE_TONE_CLASS = {
    ok: "border-emerald-300 bg-emerald-50 text-emerald-800",
    warning: "border-amber-300 bg-amber-50 text-amber-800",
    error: "border-rose-300 bg-rose-50 text-rose-800",
    neutral: "border-slate-300 bg-slate-50 text-slate-700",
};
function jobHref(base, jobId) {
    const href = base ?? "/jobs";
    const separator = href.includes("?") ? "&" : "?";
    return `${href}${separator}job_id=${encodeURIComponent(jobId)}`;
}
/** PS-72 v2 §1 top-of-page status badge (healthy/degraded/unhealthy/unknown only). */
export function Ps72HealthBadge(props) {
    return (_jsx("span", { "data-testid": props.testId, className: `inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${HEALTH_TONE[props.state]}`, children: props.state }));
}
/**
 * PS-72 v2 §2 API-key field. Defaults to the logged-in user's bound identity.
 * The admin override is masked (type=password) and the value is only sent on the
 * API call, never logged client-side (§2.4).
 */
export function Ps72ApiKeyField(props) {
    const helper = props.hasBoundKey
        ? "Defaults to your bound key. Override only if you need to test as a different identity."
        : "You have no API key bound. Ask an administrator to bind a key, or enter an admin override below.";
    return (_jsxs("div", { "data-testid": `${props.testIdPrefix}-apikey-field`, className: "space-y-2 rounded-md border bg-slate-50 p-3", children: [_jsxs("div", { className: "flex items-center justify-between gap-2", children: [_jsx("span", { className: "text-xs font-semibold uppercase tracking-wide text-slate-600", children: "API key" }), _jsx("span", { className: "font-mono text-xs text-slate-700", children: props.boundLabel })] }), _jsx("p", { "data-testid": `${props.testIdPrefix}-apikey-helper`, className: "text-xs text-slate-500", children: helper }), _jsx("label", { className: "block text-xs font-medium text-slate-600", htmlFor: `${props.testIdPrefix}-apikey-override`, children: "Admin override key" }), _jsx(Input, { id: `${props.testIdPrefix}-apikey-override`, "data-testid": `${props.testIdPrefix}-apikey-override`, type: "password", autoComplete: "off", value: props.overrideValue, onChange: (event) => props.onOverrideChange(event.target.value), placeholder: "Leave blank to use your bound key", "aria-label": "Admin override key" })] }));
}
/**
 * PS-72 v2 §5 result widget + meta panel. The meta panel is a horizontal row of
 * labelled chips directly below the result widget. correlation_id / request_id
 * are NEVER N/A (client-generated fallback is flagged per §5.1).
 */
export function Ps72ResultMeta(props) {
    const tone = props.meta ? LIFECYCLE_TONE_CLASS[lifecycleTone(props.meta.status)] : LIFECYCLE_TONE_CLASS.neutral;
    return (_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "text-xs font-semibold uppercase tracking-wide text-slate-600", children: "Result" }), _jsxs("div", { "data-testid": `${props.testIdPrefix}-result`, className: `rounded-md border p-3 ${props.denied ? "border-rose-300 bg-rose-50" : "border-slate-200 bg-white"}`, children: [props.result === null ? (_jsx("p", { className: "text-sm text-slate-500", children: "No result yet. Select a tool and submit a request." })) : (_jsx(JsonBlock, { value: props.result, defaultCollapsed: false })), props.jobId ? (_jsxs("p", { className: "mt-2 text-sm", children: ["Async job", " ", _jsx("a", { "data-testid": `${props.testIdPrefix}-job-link`, href: jobHref(props.jobsHref, props.jobId), className: "font-mono font-semibold text-sky-700 hover:underline", children: props.jobId }), " ", "\u2014 track on the Jobs page."] })) : null] }), _jsx("div", { "data-testid": `${props.testIdPrefix}-meta`, className: "flex flex-wrap items-center gap-2", children: props.meta ? (_jsxs(_Fragment, { children: [_jsx(MetaChip, { testId: `${props.testIdPrefix}-meta-correlation-id`, label: "correlation_id", value: props.meta.correlationId, suffix: props.meta.clientGenerated ? " (client-generated)" : "" }), _jsx(MetaChip, { testId: `${props.testIdPrefix}-meta-request-id`, label: "request_id", value: props.meta.requestId, suffix: props.meta.clientGenerated ? " (client-generated)" : "" }), _jsx(MetaChip, { testId: `${props.testIdPrefix}-meta-duration`, label: "duration", value: formatDuration(props.meta.durationMs) }), _jsx("span", { "data-testid": `${props.testIdPrefix}-meta-status`, className: `inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${tone}`, children: props.meta.status })] })) : (_jsx("span", { className: "text-xs text-slate-500", children: "Submit a request to populate metadata." })) })] }));
}
function MetaChip(props) {
    return (_jsxs("span", { "data-testid": props.testId, className: "inline-flex items-center gap-1 rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs", children: [_jsxs("span", { className: "font-semibold text-slate-500", children: [props.label, ":"] }), _jsxs("span", { className: "font-mono text-slate-800", children: [props.value, props.suffix] })] }));
}
