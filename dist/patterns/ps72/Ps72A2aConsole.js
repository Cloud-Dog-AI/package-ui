import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Copyright 2026 Cloud-Dog, Viewdeck Engineering Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// @cloud-dog/ui — PS-72 v2 A2A Console (shared, promoted under W28A-773).
//
// PS-72 v2 §1-§9 + §8 A2A specifics (agent card + events stream). Per the PS-72
// §1 data-testid table the SHARED elements (request editor, API-key field,
// submit, result/meta, status badge, docs link) carry the canonical
// `mcp-console-*` testids even on the A2A page; only the page root and the A2A
// additions use `a2a-console-*`. NO assertion is weakened (PC17).
import * as React from "react";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { Textarea } from "../../components/input/Textarea";
import { Ps72ApiKeyField, Ps72HealthBadge, Ps72ResultMeta } from "./Ps72Parts";
function a2aTemplateForAction(action) {
    if (action === "send_notification" || action === "notify/natural") {
        return {
            command: "Send notification to gary@cloud-dog.net that the local PS-72 notification-agent A2A test completed.",
            channels: ["loopback_test"],
        };
    }
    if (action === "list_channels") {
        return { command: "List available notification channels." };
    }
    if (action === "get_status") {
        return { command: "Get notification delivery status." };
    }
    if (action === "file-management") {
        return { tool: "list_dir", arguments: { path: "/", recursive: false } };
    }
    if (action === "file-search") {
        return { query: "" };
    }
    if (action === "file-transfer") {
        return { action: "list", directory: "/" };
    }
    if (action === "gdrive-sync") {
        return { tool: "list_dir", arguments: { path: "/" } };
    }
    return {};
}
export function Ps72A2aConsole(props) {
    const [action, setAction] = React.useState(props.skills[0] ?? "");
    const [requestText, setRequestText] = React.useState(() => JSON.stringify(a2aTemplateForAction(props.skills[0] ?? ""), null, 2));
    const [overrideKey, setOverrideKey] = React.useState("");
    const [running, setRunning] = React.useState(false);
    const [result, setResult] = React.useState(null);
    const [meta, setMeta] = React.useState(null);
    const [denied, setDenied] = React.useState(false);
    const [events, setEvents] = React.useState([]);
    React.useEffect(() => {
        if (action && props.skills.includes(action))
            return;
        const next = props.skills[0] ?? "";
        setAction(next);
        setRequestText(JSON.stringify(a2aTemplateForAction(next), null, 2));
    }, [action, props.skills]);
    const pushEvent = (type, summary, payload) => {
        setEvents((prev) => [
            { id: crypto.randomUUID(), timestamp: new Date().toISOString(), type, summary, payload },
            ...prev,
        ]);
    };
    const selectAction = (next) => {
        setAction(next);
        setRequestText(JSON.stringify(a2aTemplateForAction(next), null, 2));
        setResult(null);
        setMeta(null);
        setDenied(false);
    };
    const submit = async () => {
        if (!action.trim())
            return;
        let parsed;
        try {
            parsed = JSON.parse(requestText);
        }
        catch {
            setDenied(true);
            setResult({ error: "Request is not valid JSON." });
            setMeta(null);
            return;
        }
        setRunning(true);
        const startedAt = performance.now();
        pushEvent("request", `Submitted "${action}"`, parsed);
        try {
            const exec = await props.onSend(action, parsed, overrideKey);
            const durationMs = performance.now() - startedAt;
            const status = exec.denied ? "failed" : "succeeded";
            const clientGenerated = !exec.correlationId || !exec.requestId;
            setResult(exec.body);
            setDenied(exec.denied);
            setMeta({
                correlationId: exec.correlationId && exec.correlationId.trim() ? exec.correlationId : `client-${crypto.randomUUID()}`,
                requestId: exec.requestId && exec.requestId.trim() ? exec.requestId : `client-${crypto.randomUUID()}`,
                durationMs,
                status,
                clientGenerated,
            });
            pushEvent(exec.denied ? "error" : "result", exec.denied ? "Task denied" : "Task completed", exec.body);
        }
        catch (error) {
            const durationMs = performance.now() - startedAt;
            const message = error instanceof Error ? error.message : String(error);
            setResult({ error: message });
            setDenied(true);
            setMeta({
                correlationId: `client-${crypto.randomUUID()}`,
                requestId: `client-${crypto.randomUUID()}`,
                durationMs,
                status: "failed",
                clientGenerated: true,
            });
            pushEvent("error", "Task failed", { error: message });
        }
        finally {
            setRunning(false);
        }
    };
    const cardName = props.agentCard
        ? String(props.agentCard.name ?? props.agentCard.title ?? "Agent")
        : "Agent card unavailable";
    const cardVersion = props.agentCard ? String(props.agentCard.version ?? "") : "";
    return (_jsxs("div", { "data-testid": "a2a-console-page", className: "flex flex-col gap-3", children: [_jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("h2", { className: "text-lg font-semibold", children: "A2A Console" }), _jsx(Ps72HealthBadge, { state: props.health, testId: "mcp-console-status-badge" })] }), _jsx("a", { "data-testid": "mcp-console-docs-link", href: props.docsHref, className: "text-sm font-medium text-sky-700 hover:underline", children: "Docs" })] }), _jsxs("div", { className: "flex rounded-md border bg-background", children: [_jsxs("div", { className: "w-72 shrink-0 border-r p-3", children: [_jsxs("div", { "data-testid": "a2a-console-agent-card", className: "rounded-md border border-slate-200 bg-slate-50 p-3", children: [_jsx("div", { className: "text-sm font-semibold text-slate-900", children: cardName }), cardVersion ? _jsxs("div", { className: "text-xs text-slate-500", children: ["v", cardVersion] }) : null, props.agentCard ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "mt-2 text-xs text-slate-500", children: [props.skills.length, " skills (", _jsx("span", { "data-testid": "mcp-console-tool-count", children: props.skills.length }), ")"] }), _jsxs("ul", { "data-testid": "mcp-console-tool-list", className: "mt-2 max-h-36 space-y-1 overflow-y-auto text-xs text-slate-600", "aria-label": "Available A2A skills", children: [props.skills.map((skill) => (_jsx("li", { children: _jsx("button", { type: "button", "data-testid": `a2a-console-skill-${skill}`, className: `w-full rounded-md px-2 py-1 text-left font-mono hover:bg-white ${skill === action ? "bg-white font-semibold" : ""}`, onClick: () => selectAction(skill), children: skill }) }, skill))), props.skills.length === 0 ? _jsx("li", { className: "text-slate-400", children: "No skills advertised." }) : null] })] })) : (_jsx("p", { className: "mt-2 text-xs text-rose-700", children: "Agent card could not be resolved from the bridge." }))] }), _jsx("div", { className: "mt-3 text-xs font-semibold uppercase tracking-wide text-slate-600", children: "Events" }), _jsxs("ul", { "data-testid": "a2a-console-events-stream", className: "mt-1 max-h-72 space-y-1 overflow-y-auto", children: [events.map((event) => (_jsxs("li", { className: "rounded border border-slate-200 bg-white p-2 text-xs", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "font-semibold text-slate-700", children: event.type }), _jsx("span", { className: "text-slate-400", children: new Date(event.timestamp).toLocaleTimeString() })] }), _jsx("div", { className: "text-slate-600", children: event.summary })] }, event.id))), events.length === 0 ? _jsx("li", { className: "text-xs text-slate-400", children: "No events yet." }) : null] })] }), _jsxs("div", { className: "min-w-0 flex-1 space-y-3 p-4", children: [_jsx("div", { className: "text-xs text-muted-foreground", children: props.endpointUrl }), _jsx("label", { className: "block text-xs font-semibold uppercase tracking-wide text-slate-600", htmlFor: "a2a-console-action", children: "Action / skill" }), props.skills.length > 0 ? (_jsx("select", { id: "a2a-console-action", "data-testid": "a2a-console-action", className: "w-full rounded-md border px-2 py-1 text-sm", value: action, onChange: (event) => selectAction(event.target.value), "aria-label": "Action", children: props.skills.map((skill) => (_jsx("option", { value: skill, children: skill }, skill))) })) : (_jsx(Input, { id: "a2a-console-action", "data-testid": "a2a-console-action", value: action, onChange: (event) => setAction(event.target.value), placeholder: 'e.g. "root", "health", or a skill name from the agent card', "aria-label": "Action" })), _jsx("label", { "data-testid": "mcp-console-request-label", className: "block text-xs font-semibold uppercase tracking-wide text-slate-600", htmlFor: "mcp-console-request-editor", children: "Request" }), _jsx(Textarea, { id: "mcp-console-request-editor", "data-testid": "mcp-console-request-editor", value: requestText, onChange: (event) => setRequestText(event.target.value), className: "font-mono text-xs", "aria-label": "Request", rows: 6 }), _jsx(Ps72ApiKeyField, { testIdPrefix: "mcp-console", boundLabel: props.boundLabel, hasBoundKey: props.hasBoundKey, overrideValue: overrideKey, onOverrideChange: setOverrideKey }), overrideKey.trim() ? _jsx("p", { className: "text-xs text-amber-700", children: "Submitting as admin override." }) : null, _jsx(Button, { "data-testid": "mcp-console-submit", onClick: submit, disabled: running || !action.trim(), children: running ? "Submitting…" : "Submit" }), _jsx(Ps72ResultMeta, { testIdPrefix: "mcp-console", result: result, meta: meta, denied: denied, jobsHref: props.jobsHref })] })] })] }));
}
