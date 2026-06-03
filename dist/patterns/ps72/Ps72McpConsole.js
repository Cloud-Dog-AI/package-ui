import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
// @cloud-dog/ui — PS-72 v2 MCP Console (shared, promoted under W28A-773).
//
// Implements the PS-72 v2 §1-§9 canonical layout + data-testid contract. All
// shared elements (request editor, API-key field, submit, result/meta, status
// badge, docs link) carry the canonical `mcp-console-*` testids per PS-72 §1.
// Promoted from the W28A-774 sql-agent wrapper. NO assertion is weakened (PC17).
import * as React from "react";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { Textarea } from "../../components/input/Textarea";
import { Ps72ApiKeyField, Ps72HealthBadge, Ps72ResultMeta } from "./Ps72Parts";
function templateValueForProperty(value) {
    if ("default" in value)
        return value.default;
    if (Array.isArray(value.enum) && value.enum.length > 0)
        return value.enum[0];
    const type = typeof value.type === "string" ? value.type : "string";
    switch (type) {
        case "number":
        case "integer":
            return 0;
        case "boolean":
            return false;
        case "array":
            return [];
        case "object":
            return {};
        default:
            return "";
    }
}
function buildArgsTemplate(tool) {
    const schema = tool.inputSchema && typeof tool.inputSchema === "object" ? tool.inputSchema : {};
    const properties = schema.properties && typeof schema.properties === "object" ? schema.properties : {};
    return Object.fromEntries(Object.entries(properties).map(([key, value]) => [key, templateValueForProperty(value)]));
}
/** Pull a Job ID out of a result body per common PS-75 shapes. */
function extractJobId(body) {
    if (!body || typeof body !== "object")
        return null;
    const record = body;
    const result = record.result && typeof record.result === "object" ? record.result : record;
    const candidate = result.job_id ?? result.jobId ?? result.job ?? record.job_id;
    if (typeof candidate === "string" && candidate.trim())
        return candidate.trim();
    return null;
}
export function Ps72McpConsole(props) {
    const [selectedTool, setSelectedTool] = React.useState(props.tools.find((t) => t.bound !== false)?.name ?? props.tools[0]?.name ?? "");
    const [search, setSearch] = React.useState("");
    const [requestText, setRequestText] = React.useState("{}");
    const [overrideKey, setOverrideKey] = React.useState("");
    const [running, setRunning] = React.useState(false);
    const [result, setResult] = React.useState(null);
    const [meta, setMeta] = React.useState(null);
    const [denied, setDenied] = React.useState(false);
    const [jobId, setJobId] = React.useState(null);
    const filteredTools = React.useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q)
            return props.tools;
        return props.tools.filter((tool) => {
            const desc = typeof tool.description === "string" ? tool.description : "";
            return tool.name.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
        });
    }, [props.tools, search]);
    const activeTool = props.tools.find((t) => t.name === selectedTool);
    const activeLocked = activeTool?.bound === false;
    // Tools may load asynchronously; auto-select the first bound tool once they
    // arrive if nothing valid is selected yet (so Submit is enabled — T.1.4/§4).
    React.useEffect(() => {
        if (selectedTool && props.tools.some((t) => t.name === selectedTool))
            return;
        const next = props.tools.find((t) => t.bound !== false)?.name ?? props.tools[0]?.name ?? "";
        if (next) {
            setSelectedTool(next);
            const tool = props.tools.find((t) => t.name === next);
            if (tool)
                setRequestText(JSON.stringify(buildArgsTemplate(tool), null, 2));
        }
    }, [props.tools, selectedTool]);
    const selectTool = (tool) => {
        if (requestText.trim() && requestText.trim() !== "{}" && tool.name !== selectedTool) {
            // §3.5 no silent data loss — confirm before discarding an edited request.
            const ok = typeof window === "undefined" ? true : window.confirm("Discard the current request and switch tools?");
            if (!ok)
                return;
        }
        setSelectedTool(tool.name);
        setRequestText(JSON.stringify(buildArgsTemplate(tool), null, 2));
        setResult(null);
        setMeta(null);
        setDenied(false);
        setJobId(null);
    };
    const submit = async () => {
        if (!selectedTool || activeLocked)
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
        try {
            const exec = await props.onExecute(selectedTool, parsed, overrideKey);
            const durationMs = performance.now() - startedAt;
            const detectedJob = exec.jobId ?? extractJobId(exec.body);
            const status = exec.denied ? "failed" : detectedJob ? "queued" : "succeeded";
            const clientGenerated = !exec.correlationId || !exec.requestId;
            setResult(exec.body);
            setDenied(exec.denied);
            setJobId(detectedJob);
            setMeta({
                correlationId: exec.correlationId && exec.correlationId.trim() ? exec.correlationId : `client-${crypto.randomUUID()}`,
                requestId: exec.requestId && exec.requestId.trim() ? exec.requestId : `client-${crypto.randomUUID()}`,
                durationMs,
                status,
                clientGenerated,
            });
        }
        catch (error) {
            const durationMs = performance.now() - startedAt;
            setResult({ error: error instanceof Error ? error.message : String(error) });
            setDenied(true);
            setJobId(null);
            setMeta({
                correlationId: `client-${crypto.randomUUID()}`,
                requestId: `client-${crypto.randomUUID()}`,
                durationMs,
                status: "failed",
                clientGenerated: true,
            });
        }
        finally {
            setRunning(false);
        }
    };
    return (_jsxs("div", { "data-testid": "mcp-console-page", className: "flex flex-col gap-3", children: [_jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("h2", { className: "text-lg font-semibold", children: "MCP Console" }), _jsx(Ps72HealthBadge, { state: props.health, testId: "mcp-console-status-badge" })] }), _jsx("a", { "data-testid": "mcp-console-docs-link", href: props.docsHref, className: "text-sm font-medium text-sky-700 hover:underline", children: "Docs" })] }), _jsxs("div", { className: "flex rounded-md border bg-background", children: [_jsxs("div", { className: "w-60 shrink-0 border-r p-3", children: [_jsx(Input, { "data-testid": "mcp-console-tool-search", value: search, onChange: (event) => setSearch(event.target.value), placeholder: "Search tools...", "aria-label": "Search tools" }), _jsxs("div", { className: "mt-1 text-xs text-slate-500", children: [props.tools.length, " tools (", _jsx("span", { "data-testid": "mcp-console-tool-count", children: props.tools.length }), ")"] }), _jsxs("ul", { "data-testid": "mcp-console-tool-list", className: "mt-2 max-h-80 space-y-1 overflow-y-auto", "aria-label": "Available tools", children: [filteredTools.map((tool) => {
                                        const locked = tool.bound === false;
                                        return (_jsx("li", { children: _jsxs("button", { type: "button", "data-testid": `mcp-console-tool-${tool.name}`, "data-locked": locked ? "true" : "false", disabled: locked, title: locked ? "You are not bound to this tool. Ask an administrator." : tool.description, className: `w-full rounded-md px-2 py-1 text-left text-sm hover:bg-muted/50 ${tool.name === selectedTool ? "bg-primary/10 font-medium" : ""} ${locked ? "cursor-not-allowed text-slate-400" : ""}`, onClick: () => selectTool(tool), children: [locked ? "Locked: " : "", tool.name] }) }, tool.name));
                                    }), filteredTools.length === 0 ? _jsx("li", { className: "text-sm text-muted-foreground", children: "No tools match your search." }) : null] })] }), _jsxs("div", { className: "min-w-0 flex-1 space-y-3 p-4", children: [_jsx("div", { className: "text-xs text-muted-foreground", children: props.endpointUrl }), _jsx("label", { "data-testid": "mcp-console-request-label", className: "block text-xs font-semibold uppercase tracking-wide text-slate-600", htmlFor: "mcp-console-request-editor", children: "Request" }), _jsx(Textarea, { id: "mcp-console-request-editor", "data-testid": "mcp-console-request-editor", value: requestText, onChange: (event) => setRequestText(event.target.value), className: "font-mono text-xs", "aria-label": "Request", rows: 6, readOnly: activeLocked }), _jsx(Ps72ApiKeyField, { testIdPrefix: "mcp-console", boundLabel: props.boundLabel, hasBoundKey: props.hasBoundKey, overrideValue: overrideKey, onOverrideChange: setOverrideKey }), overrideKey.trim() ? _jsx("p", { className: "text-xs text-amber-700", children: "Submitting as admin override." }) : null, _jsx(Button, { "data-testid": "mcp-console-submit", onClick: submit, disabled: running || !selectedTool || activeLocked, children: running ? "Submitting…" : "Submit" }), _jsx(Ps72ResultMeta, { testIdPrefix: "mcp-console", result: result, meta: meta, denied: denied, jobId: jobId, jobsHref: props.jobsHref })] })] })] }));
}
