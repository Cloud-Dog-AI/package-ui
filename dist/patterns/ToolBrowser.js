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
// @cloud-dog/ui — ToolBrowser pattern (searchable tool catalogue with schema).
import * as React from "react";
import { cn } from "../utils/cn";
import { Input } from "../components/input/Input";
import { Card, CardContent } from "../components/card/Card";
export function ToolBrowser(props) {
    const [query, setQuery] = React.useState("");
    const [expanded, setExpanded] = React.useState(null);
    const filtered = React.useMemo(() => {
        if (!query.trim())
            return props.tools;
        const q = query.toLowerCase();
        return props.tools.filter((t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    }, [props.tools, query]);
    const toggle = (name) => {
        setExpanded((prev) => (prev === name ? null : name));
    };
    return (_jsxs("div", { className: cn("space-y-3", props.className), children: [_jsx(Input, { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search tools...", "aria-label": "Search tools" }), _jsxs("div", { className: "space-y-2", children: [filtered.map((tool) => (_jsx(Card, { className: cn("cursor-pointer", props.onSelect ? "hover:border-primary/40" : ""), onClick: () => props.onSelect?.(tool), children: _jsxs(CardContent, { className: "py-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("div", { className: "text-sm font-bold truncate", children: tool.name }), _jsx("div", { className: "text-xs text-muted-foreground", children: tool.description })] }), tool.inputSchema ? (_jsx("button", { type: "button", className: "ml-2 shrink-0 text-xs text-primary underline", onClick: (e) => {
                                                e.stopPropagation();
                                                toggle(tool.name);
                                            }, "aria-expanded": expanded === tool.name, "aria-label": `Toggle schema for ${tool.name}`, children: expanded === tool.name ? "Hide" : "Schema" })) : null] }), expanded === tool.name && tool.inputSchema ? (_jsx("pre", { className: "mt-2 overflow-auto rounded bg-muted p-2 text-xs", children: JSON.stringify(tool.inputSchema, null, 2) })) : null] }) }, tool.name))), filtered.length === 0 ? (_jsx("div", { className: "text-sm text-muted-foreground", children: "No tools match your search." })) : null] })] }));
}
