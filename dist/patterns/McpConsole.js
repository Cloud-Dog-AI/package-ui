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
// @cloud-dog/ui — McpConsole pattern (MCP test console).
import * as React from "react";
import { cn } from "../utils/cn";
import { Button } from "../components/button/Button";
import { Input } from "../components/input/Input";
import { Select } from "../components/input/Select";
import { Textarea } from "../components/input/Textarea";
import { JsonBlock } from "./JsonBlock";
import { RelativeTime } from "./RelativeTime";
function templateValueForProperty(value) {
    if ("default" in value) {
        return value.default;
    }
    if (Array.isArray(value.enum) && value.enum.length > 0) {
        return value.enum[0];
    }
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
    const schema = tool.inputSchema && typeof tool.inputSchema === "object"
        ? tool.inputSchema
        : {};
    const properties = schema.properties && typeof schema.properties === "object"
        ? schema.properties
        : {};
    const template = Object.fromEntries(Object.entries(properties).map(([key, value]) => [key, templateValueForProperty(value)]));
    if (tool.name === "query_database"
        && (typeof template.question !== "string" || template.question.trim() === "")) {
        template.question = "Which database tables are available?";
    }
    return template;
}
export function McpConsole(props) {
    const [selectedTool, setSelectedTool] = React.useState(props.tools[0]?.name ?? "");
    const [query, setQuery] = React.useState("");
    const [argsText, setArgsText] = React.useState("{}");
    const [running, setRunning] = React.useState(false);
    const [history, setHistory] = React.useState([]);
    const filteredTools = React.useMemo(() => {
        const nextQuery = query.trim().toLowerCase();
        if (!nextQuery) {
            return props.tools;
        }
        return props.tools.filter((tool) => {
            const description = typeof tool.description === "string" ? tool.description : "";
            return (tool.name.toLowerCase().includes(nextQuery)
                || description.toLowerCase().includes(nextQuery));
        });
    }, [props.tools, query]);
    const activeTool = props.tools.find((t) => t.name === selectedTool);
    React.useEffect(() => {
        if (filteredTools.some((tool) => tool.name === selectedTool)) {
            return;
        }
        setSelectedTool(filteredTools[0]?.name ?? "");
    }, [filteredTools, selectedTool]);
    React.useEffect(() => {
        if (!activeTool)
            return;
        setArgsText(JSON.stringify(buildArgsTemplate(activeTool), null, 2));
    }, [activeTool?.name]);
    const execute = async () => {
        if (!selectedTool)
            return;
        let parsed;
        try {
            parsed = JSON.parse(argsText);
        }
        catch {
            return;
        }
        setRunning(true);
        try {
            setArgsText("{}");
            const result = await props.onExecute(selectedTool, parsed);
            setHistory((h) => [
                { id: crypto.randomUUID(), tool: selectedTool, args: parsed, result, timestamp: new Date().toISOString() },
                ...h,
            ]);
        }
        finally {
            setRunning(false);
        }
    };
    return (_jsxs("div", { className: cn("flex rounded-md border bg-background", props.className), children: [_jsxs("div", { className: "w-56 shrink-0 border-r p-3 space-y-2", children: [_jsx("h2", { className: "text-sm font-semibold", children: "Tool Browser" }), _jsx(Input, { value: query, onChange: (event) => setQuery(event.target.value), placeholder: "Search tools...", "aria-label": "Search tools" }), _jsx("ul", { className: "space-y-1", "aria-label": "Available tools", children: filteredTools.map((t) => (_jsx("li", { children: _jsx("button", { type: "button", className: cn("w-full text-left text-sm rounded-md px-2 py-1 hover:bg-muted/50", t.name === selectedTool ? "bg-primary/10 font-medium" : ""), onClick: () => setSelectedTool(t.name), children: t.name }) }, t.name))) }), filteredTools.length === 0 ? (_jsx("p", { className: "text-sm text-muted-foreground", children: "No tools match your search." })) : null] }), _jsxs("div", { className: "flex-1 min-w-0 p-4 space-y-4", children: [_jsx("h2", { className: "text-sm font-semibold", children: "Tool execution" }), _jsx("div", { className: "text-xs text-muted-foreground", children: props.endpointUrl }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Tool Name" }), _jsx(Select, { value: selectedTool, onChange: (e) => setSelectedTool(e.target.value), "aria-label": "Select tool", children: props.tools.map((t) => (_jsx("option", { value: t.name, children: t.name }, t.name))) }), activeTool?.description ? (_jsx("p", { className: "text-xs text-muted-foreground", children: activeTool.description })) : null] }), _jsx("label", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Parameters (JSON)" }), _jsx(Textarea, { value: argsText, onChange: (e) => setArgsText(e.target.value), placeholder: '{"key": "value"}', className: "font-mono text-xs", "aria-label": "Arguments JSON", rows: 5 }), _jsx(Button, { onClick: execute, disabled: running || !selectedTool, children: running ? "Running..." : "Execute" }), history.length > 0 ? (_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "text-sm font-semibold", children: "History" }), history.map((entry, index) => (_jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "text-sm font-semibold", children: "Response" }), _jsxs("div", { className: "flex items-baseline gap-2 text-xs", children: [_jsxs("span", { className: "font-semibold", children: [entry.tool, " @"] }), _jsx(RelativeTime, { timestamp: entry.timestamp, className: "text-muted-foreground" }), _jsx("button", { type: "button", className: "text-xs text-primary hover:underline", onClick: () => {
                                                    const blob = new Blob([JSON.stringify(entry.result, null, 2)], { type: "application/json" });
                                                    const url = URL.createObjectURL(blob);
                                                    const a = document.createElement("a");
                                                    a.href = url;
                                                    a.download = `${entry.tool}-${entry.timestamp.replace(/[:.]/g, "-")}.json`;
                                                    a.click();
                                                    URL.revokeObjectURL(url);
                                                }, children: "Download" })] }), _jsx(JsonBlock, { title: entry.tool, value: entry.result, defaultCollapsed: index > 0 })] }, entry.id)))] })) : null] })] }));
}
