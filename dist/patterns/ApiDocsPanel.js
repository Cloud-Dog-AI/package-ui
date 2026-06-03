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
// @cloud-dog/ui — ApiDocsPanel pattern (embedded OpenAPI docs with links).
/// <reference path="../types/swagger-ui-react.d.ts" />
import * as React from "react";
import SwaggerUI from "swagger-ui-react";
import { cn } from "../utils/cn";
import { Card, CardContent, CardHeader } from "../components/card/Card";
import { DataTable } from "../components/table/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs/Tabs";
import { DocumentViewer } from "./DocumentViewer";
// Lazy-load redoc so that its transitive dependencies (mobx, styled-components)
// are only pulled in at runtime when mode="redoc" is actually used.
// This prevents build failures in apps that never use redoc mode.
// The computed module name ("re" + "doc") prevents Rollup from statically
// resolving and bundling the import — it remains a true runtime-only import.
const redocModuleName = "re" + "doc";
const LazyRedocStandalone = React.lazy(() => import(/* @vite-ignore */ redocModuleName).then((mod) => ({
    default: mod.RedocStandalone,
})));
function renderIframe(openapiUrl) {
    return (_jsx("iframe", { src: openapiUrl, title: "API documentation", className: "h-[600px] w-full border-0", sandbox: "allow-scripts allow-same-origin" }));
}
function formatParameters(parameters) {
    if (parameters == null) {
        return "None";
    }
    if (typeof parameters === "string") {
        return parameters;
    }
    try {
        return JSON.stringify(parameters, null, 2);
    }
    catch {
        return String(parameters);
    }
}
export function ApiDocsPanel(props) {
    const useLegacyIframe = props.mode === undefined &&
        props.mcpTools === undefined &&
        props.a2aSkills === undefined &&
        props.readmeContent === undefined &&
        props.readmeTitle === undefined;
    const [tab, setTab] = React.useState("api");
    const mode = props.mode ?? "swagger";
    const hasMcpTools = Boolean(props.mcpTools?.length);
    const hasA2aSkills = Boolean(props.a2aSkills?.length);
    const hasReadme = Boolean(props.readmeContent);
    const apiReference = mode === "iframe" ? (renderIframe(props.openapiUrl)) : mode === "redoc" ? (_jsx("div", { className: "min-h-[600px] overflow-auto", children: _jsx(React.Suspense, { fallback: _jsx("div", { className: "p-4 text-sm text-muted-foreground", children: "Loading API documentation..." }), children: _jsx(LazyRedocStandalone, { specUrl: props.openapiUrl }) }) })) : (_jsx("div", { className: "min-h-[600px] overflow-auto", children: _jsx(SwaggerUI, { url: props.openapiUrl }) }));
    const toolColumns = React.useMemo(() => [
        {
            id: "name",
            header: "Name",
            cell: (tool) => _jsx("span", { className: "font-medium", children: tool.name }),
            sortable: true,
            sortValue: (tool) => tool.name,
        },
        {
            id: "description",
            header: "Description",
            cell: (tool) => (_jsx("div", { className: "max-w-[34rem] whitespace-pre-wrap text-sm text-muted-foreground", children: tool.description })),
        },
        {
            id: "parameters",
            header: "Parameters",
            cell: (tool) => (_jsx("pre", { className: "max-w-[24rem] overflow-auto whitespace-pre-wrap rounded-md bg-muted/30 p-2 text-xs", children: formatParameters(tool.parameters) })),
        },
    ], []);
    const skillColumns = React.useMemo(() => [
        {
            id: "name",
            header: "Name",
            cell: (skill) => _jsx("span", { className: "font-medium", children: skill.name }),
            sortable: true,
            sortValue: (skill) => skill.name,
        },
        {
            id: "description",
            header: "Description",
            cell: (skill) => (_jsx("div", { className: "max-w-[40rem] whitespace-pre-wrap text-sm text-muted-foreground", children: skill.description })),
        },
    ], []);
    if (useLegacyIframe) {
        return (_jsxs(Card, { className: cn("overflow-hidden", props.className), children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("h2", { className: "text-sm font-semibold", children: "API Reference" }), (props.links ?? []).map((link, index) => (_jsx("a", { href: link.href, target: "_blank", rel: "noopener noreferrer", className: "text-xs text-primary underline", children: link.label }, `${link.href}-${index}`)))] }) }), _jsx(CardContent, { className: "p-0", children: renderIframe(props.openapiUrl) })] }));
    }
    return (_jsxs(Card, { className: cn("overflow-hidden", props.className), children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsx("h2", { className: "text-sm font-semibold", children: "API Reference" }), (props.links ?? []).map((link, index) => (_jsx("a", { href: link.href, target: "_blank", rel: "noopener noreferrer", className: "text-xs text-primary underline", children: link.label }, `${link.href}-${index}`)))] }) }), _jsx(CardContent, { children: _jsxs(Tabs, { value: tab, onValueChange: setTab, children: [_jsxs(TabsList, { className: "flex flex-wrap", children: [_jsx(TabsTrigger, { value: "api", children: "API Reference" }), hasMcpTools ? _jsx(TabsTrigger, { value: "mcp-tools", children: "MCP Tools" }) : null, hasA2aSkills ? _jsx(TabsTrigger, { value: "a2a-skills", children: "A2A Skills" }) : null, hasReadme ? _jsx(TabsTrigger, { value: "readme", children: "README" }) : null] }), _jsxs(TabsContent, { value: "api", children: [(props.links ?? []).length > 0 ? (_jsx("div", { className: "mb-3 flex flex-wrap items-center gap-3", children: (props.links ?? []).map((link, index) => (_jsx("a", { href: link.href, target: "_blank", rel: "noopener noreferrer", className: "text-xs text-primary underline", children: link.label }, `panel-${link.href}-${index}`))) })) : null, apiReference] }), hasMcpTools ? (_jsxs(TabsContent, { value: "mcp-tools", children: [_jsx("h3", { className: "mb-3 text-lg font-semibold", children: "MCP Tools" }), _jsx(DataTable, { columns: toolColumns, rows: props.mcpTools ?? [], getRowId: (tool) => tool.name, emptyMessage: "No MCP tools documented." })] })) : null, hasA2aSkills ? (_jsxs(TabsContent, { value: "a2a-skills", children: [_jsx("h3", { className: "mb-3 text-lg font-semibold", children: "A2A Skills" }), _jsx(DataTable, { columns: skillColumns, rows: props.a2aSkills ?? [], getRowId: (skill) => skill.name, emptyMessage: "No A2A skills documented." })] })) : null, hasReadme ? (_jsx(TabsContent, { value: "readme", children: _jsx(DocumentViewer, { content: props.readmeContent ?? "", format: "markdown", title: props.readmeTitle ?? "README" }) })) : null] }) })] }));
}
