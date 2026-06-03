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
// @cloud-dog/ui — JsonExplorer pattern (searchable JSON tree inspector).
//
// PS-81 v2 / PS-73 v2: when an optional `sources` map is supplied, every leaf
// node carries a source-attribution badge (default/config/env/vault), secrets
// are masked, and a per-node source-history pop-over is available. The
// PS-73 v2 conformance contract (data-testid hooks) is emitted unconditionally
// and is backward-compatible — callers that do not pass `sources` keep the
// original display-only behaviour with the new test hooks added.
import * as React from "react";
import { Badge } from "../components/layout/Badge";
import { Button } from "../components/button/Button";
import { Input } from "../components/input/Input";
import { cn } from "../utils/cn";
/** PS-73 v2 SW4 default mask token (eight hyphens). */
const DEFAULT_MASK_TOKEN = "--------";
/** Resolves the display kind for a JSON node. */
function getNodeKind(value) {
    if (value === null) {
        return "null";
    }
    if (Array.isArray(value)) {
        return "array";
    }
    if (typeof value === "object") {
        return "object";
    }
    if (typeof value === "string") {
        return "string";
    }
    if (typeof value === "number") {
        return "number";
    }
    if (typeof value === "boolean") {
        return "boolean";
    }
    return "undefined";
}
/** Returns whether a node is expandable in the JSON tree. */
function isExpandable(value) {
    return Array.isArray(value) || (typeof value === "object" && value !== null);
}
/** Builds a dot-and-index JSON path string for child nodes. */
function buildChildPath(parentPath, childLabel, useIndex) {
    return useIndex ? `${parentPath}[${childLabel}]` : `${parentPath}.${childLabel}`;
}
/** Converts the internal "root"-prefixed path to the public dot-key-path. */
function toKeyPath(path) {
    if (path === "root") {
        return "";
    }
    return path.startsWith("root.") ? path.slice("root.".length) : path;
}
/** Produces a short preview for collapsed JSON values. */
function formatPreview(value) {
    const kind = getNodeKind(value);
    if (kind === "array") {
        return `[${value.length}]`;
    }
    if (kind === "object") {
        return `{${Object.keys(value).length}}`;
    }
    if (kind === "string") {
        return JSON.stringify(value);
    }
    if (kind === "null") {
        return "null";
    }
    if (kind === "undefined") {
        return "undefined";
    }
    return String(value);
}
/** Collects all expandable paths so the tree can be fully expanded. */
function collectExpandablePaths(value, path, depth, maxDepth) {
    if (!isExpandable(value) || depth >= maxDepth) {
        return [];
    }
    const children = Array.isArray(value)
        ? value.map((item, index) => [String(index), item])
        : Object.entries(value);
    const nested = children.flatMap(([childKey, childValue]) => collectExpandablePaths(childValue, buildChildPath(path, childKey, Array.isArray(value)), depth + 1, maxDepth));
    return [path, ...nested];
}
/** Whether a node's OWN label/path/value matches the search term (for highlight). */
function selfMatches(value, label, path, searchTerm) {
    if (!searchTerm) {
        return false;
    }
    if (isExpandable(value)) {
        return `${label} ${path}`.toLowerCase().includes(searchTerm);
    }
    return `${label} ${path} ${formatPreview(value)}`.toLowerCase().includes(searchTerm);
}
/** Searches the JSON tree and keeps a node visible when it or any descendant matches. */
function matchesSearch(value, label, path, searchTerm, depth, maxDepth) {
    if (!searchTerm) {
        return true;
    }
    const haystack = `${label} ${path} ${formatPreview(value)}`.toLowerCase();
    if (haystack.includes(searchTerm)) {
        return true;
    }
    if (!isExpandable(value) || depth >= maxDepth) {
        return false;
    }
    if (Array.isArray(value)) {
        return value.some((item, index) => matchesSearch(item, `[${index}]`, buildChildPath(path, String(index), true), searchTerm, depth + 1, maxDepth));
    }
    return Object.entries(value).some(([key, item]) => matchesSearch(item, key, buildChildPath(path, key, false), searchTerm, depth + 1, maxDepth));
}
/** Copies text using the browser clipboard when available, with a legacy fallback. */
async function copyText(text) {
    try {
        if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    }
    catch {
        // Fall through to the legacy fallback.
    }
    try {
        if (typeof document === "undefined") {
            return false;
        }
        const el = document.createElement("textarea");
        el.value = text;
        el.style.position = "fixed";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(el);
        return ok;
    }
    catch {
        return false;
    }
}
/** Renders the PS-73 v2 SW8 source-attribution badge + source-history pop-over. */
function SourceBadge(props) {
    const [open, setOpen] = React.useState(false);
    const variant = props.meta.source === "vault"
        ? "destructive"
        : props.meta.source === "config"
            ? "default"
            : "secondary";
    const servers = props.meta.servers && props.meta.servers.length > 0 ? props.meta.servers.join(", ") : "shared";
    return (_jsxs("span", { className: "relative inline-flex", children: [_jsx("button", { type: "button", "data-testid": "ps81-source-badge", "data-source": props.meta.source, title: `Source history — effective: ${props.meta.source}; servers: ${servers}`, "aria-label": `Source ${props.meta.source} for ${props.keyPath}`, onClick: () => setOpen((v) => !v), className: "rounded focus:outline-none focus:ring-2 focus:ring-ring", children: _jsx(Badge, { variant: variant, children: props.meta.source }) }), open ? (_jsxs("span", { "data-testid": "ps81-source-history", role: "dialog", className: "absolute left-0 top-full z-20 mt-1 w-64 rounded-md border bg-background p-2 text-xs shadow-md", children: [_jsx("span", { className: "block font-semibold", children: "Source history" }), _jsxs("span", { className: "block", children: ["Effective source: ", _jsx("strong", { children: props.meta.source })] }), _jsxs("span", { className: "block", children: ["Server scope: ", servers] }), _jsx("span", { className: "block text-muted-foreground", children: "Precedence: os.environ > env-files > config.yaml > defaults.yaml (PS-80 CM1)" })] })) : null] }));
}
/** Renders a single searchable JSON tree node. */
function JsonExplorerNode(props) {
    if (!matchesSearch(props.value, props.label, props.path, props.searchTerm, props.depth, props.maxDepth)) {
        return null;
    }
    const kind = getNodeKind(props.value);
    const expandable = isExpandable(props.value);
    const atDepthLimit = props.depth >= props.maxDepth;
    const expanded = props.searchTerm ? true : props.expandedPaths.has(props.path);
    const keyPath = toKeyPath(props.path);
    const meta = props.sources ? props.sources[keyPath] : undefined;
    const isSecret = Boolean(meta?.secret);
    const revealed = props.revealedSecrets.has(keyPath);
    const highlighted = selfMatches(props.value, props.label, props.path, props.searchTerm);
    const childEntries = Array.isArray(props.value)
        ? props.value.map((item, index) => [String(index), item])
        : expandable
            ? Object.entries(props.value)
            : [];
    const displayLeaf = isSecret && !revealed ? props.maskToken : formatPreview(props.value);
    return (_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { "data-testid": expandable ? "ps81-branch" : "ps81-node", "data-key-path": keyPath, "data-highlighted": highlighted ? "true" : undefined, className: cn("flex min-w-0 items-start gap-2 rounded-sm px-2 py-1 hover:bg-muted/30", highlighted ? "bg-yellow-100 ring-1 ring-yellow-400" : ""), style: { paddingLeft: `${props.depth * 16 + 8}px` }, children: [expandable && !atDepthLimit ? (_jsx("button", { type: "button", className: "mt-0.5 w-5 shrink-0 rounded text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring", "aria-label": expanded ? `Collapse ${props.path}` : `Expand ${props.path}`, onClick: () => props.onToggle(props.path), children: expanded ? "▾" : "▸" })) : (_jsx("span", { className: "mt-0.5 w-5 shrink-0 text-center text-muted-foreground", children: "\u2022" })), _jsxs("div", { className: "min-w-0 flex-1 space-y-1", children: [_jsxs("div", { className: "flex min-w-0 flex-wrap items-center gap-2", children: [_jsx("span", { className: "font-mono text-sm text-foreground", children: props.label }), _jsx(Badge, { variant: "secondary", className: "capitalize", children: kind }), meta ? _jsx(SourceBadge, { keyPath: keyPath, meta: meta }) : null, _jsx("button", { type: "button", className: "min-w-0 truncate rounded-sm font-mono text-xs text-muted-foreground underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-ring", onClick: () => props.onPathActivate(props.path), title: props.path, children: props.path }), expandable ? (_jsx("button", { type: "button", "data-testid": "ps81-copy-subtree", "data-key-path": keyPath, className: "rounded-sm text-xs text-muted-foreground hover:underline focus:outline-none focus:ring-2 focus:ring-ring", onClick: () => props.onCopySubtree(keyPath, props.value), "aria-label": `Copy subtree ${keyPath || "root"}`, children: "copy subtree" })) : (_jsx("button", { type: "button", "data-testid": "ps81-copy-leaf", "data-key-path": keyPath, className: "rounded-sm text-xs text-muted-foreground hover:underline focus:outline-none focus:ring-2 focus:ring-ring", onClick: () => props.onCopyLeaf(keyPath, isSecret ? "[redacted]" : props.value), "aria-label": `Copy ${keyPath}`, children: "copy" }))] }), !expandable ? (_jsx("div", { "data-testid": "ps81-value", "data-key-path": keyPath, "data-secret": isSecret ? "true" : undefined, className: cn("font-mono text-sm", kind === "string" && !isSecret ? "text-emerald-700" : ""), children: _jsx("span", { className: cn(kind === "number" && !isSecret ? "text-sky-700" : ""), children: displayLeaf }) })) : (_jsx("div", { className: "font-mono text-xs text-muted-foreground", children: atDepthLimit ? "Max depth reached" : formatPreview(props.value) }))] })] }), expandable && !atDepthLimit && expanded ? (_jsx("div", { className: "space-y-1", children: childEntries.map(([childKey, childValue]) => (_jsx(JsonExplorerNode, { label: Array.isArray(props.value) ? `[${childKey}]` : childKey, value: childValue, path: buildChildPath(props.path, childKey, Array.isArray(props.value)), depth: props.depth + 1, maxDepth: props.maxDepth, searchTerm: props.searchTerm, expandedPaths: props.expandedPaths, sources: props.sources, maskToken: props.maskToken, revealedSecrets: props.revealedSecrets, onToggle: props.onToggle, onPathActivate: props.onPathActivate, onCopyLeaf: props.onCopyLeaf, onCopySubtree: props.onCopySubtree }, buildChildPath(props.path, childKey, Array.isArray(props.value))))) })) : null] }));
}
/** Redacts secret leaves inside a subtree before copy/export (PS-73 v2 SW4A). */
function redactSubtree(value, path, sources) {
    if (Array.isArray(value)) {
        return value.map((item, index) => redactSubtree(item, `${path}[${index}]`, sources));
    }
    if (value && typeof value === "object") {
        const out = {};
        for (const [key, child] of Object.entries(value)) {
            out[key] = redactSubtree(child, path ? `${path}.${key}` : key, sources);
        }
        return out;
    }
    if (sources?.[path]?.secret) {
        return "[redacted]";
    }
    return value;
}
/** JsonExplorer renders a searchable, expandable JSON inspection tree. */
export function JsonExplorer(props) {
    const maxDepth = props.maxDepth ?? 8;
    const maskToken = props.maskToken ?? DEFAULT_MASK_TOKEN;
    const [internalSearch, setInternalSearch] = React.useState("");
    const [copiedPath, setCopiedPath] = React.useState("");
    const emptyRevealed = React.useMemo(() => new Set(), []);
    const revealedSecrets = props.revealedSecrets ?? emptyRevealed;
    const [expandedPaths, setExpandedPaths] = React.useState(() => {
        return new Set(props.defaultExpanded ? collectExpandablePaths(props.data, "root", 0, maxDepth) : ["root"]);
    });
    React.useEffect(() => {
        setExpandedPaths(new Set(props.defaultExpanded ? collectExpandablePaths(props.data, "root", 0, maxDepth) : ["root"]));
    }, [maxDepth, props.data, props.defaultExpanded]);
    const searchTerm = (props.searchTerm !== undefined ? props.searchTerm : internalSearch).trim().toLowerCase();
    const onToggle = React.useCallback((path) => {
        setExpandedPaths((current) => {
            const next = new Set(current);
            if (next.has(path)) {
                next.delete(path);
            }
            else {
                next.add(path);
            }
            return next;
        });
    }, []);
    const onExpandAll = React.useCallback(() => {
        setExpandedPaths(new Set(collectExpandablePaths(props.data, "root", 0, maxDepth)));
    }, [maxDepth, props.data]);
    const onCollapseAll = React.useCallback(() => {
        setExpandedPaths(new Set());
    }, []);
    const flashCopy = React.useCallback((label, ok) => {
        setCopiedPath(ok ? label : `${label}:failed`);
        if (typeof window !== "undefined") {
            window.setTimeout(() => setCopiedPath(""), 1200);
        }
    }, []);
    const onPathActivate = React.useCallback(async (path) => {
        props.onPathSelect?.(toKeyPath(path));
        const ok = await copyText(toKeyPath(path) || "root");
        flashCopy(toKeyPath(path) || "root", ok);
    }, [flashCopy, props]);
    const onCopyLeaf = React.useCallback(async (keyPath, value) => {
        const ok = await copyText(`${keyPath} = ${typeof value === "string" ? value : JSON.stringify(value)}`);
        flashCopy(keyPath, ok);
    }, [flashCopy]);
    const onCopySubtree = React.useCallback(async (keyPath, value) => {
        const redacted = redactSubtree(value, keyPath, props.sources);
        const ok = await copyText(JSON.stringify(redacted, null, 2));
        flashCopy(`${keyPath || "root"} (subtree)`, ok);
    }, [flashCopy, props.sources]);
    return (_jsxs("section", { "data-testid": "ps81-json-explorer", className: cn("space-y-4 rounded-md border bg-background p-4", props.className), "aria-label": "JSON explorer", children: [_jsxs("div", { className: "flex flex-col gap-3 lg:flex-row lg:items-center", children: [_jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("h3", { className: "text-base font-semibold", children: props.title ?? "JSON Explorer" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Browse structured JSON, filter visible paths, and copy exact property breadcrumbs." })] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(Button, { "data-testid": "ps81-expand-all", variant: "secondary", size: "sm", onClick: onExpandAll, children: "Expand all" }), _jsx(Button, { "data-testid": "ps81-collapse-all", variant: "secondary", size: "sm", onClick: onCollapseAll, children: "Collapse all" })] })] }), props.hideInternalSearch ? null : (_jsxs("div", { className: "flex flex-col gap-3 lg:flex-row", children: [_jsx(Input, { "data-testid": "ps81-search", value: internalSearch, onChange: (event) => setInternalSearch(event.target.value), placeholder: "Filter tree by key, path, or value", "aria-label": "Filter JSON tree", className: "flex-1" }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [_jsxs(Badge, { variant: "secondary", children: ["max depth ", maxDepth] }), copiedPath ? (_jsx(Badge, { variant: copiedPath.endsWith(":failed") ? "destructive" : "default", children: copiedPath.endsWith(":failed") ? "Copy failed" : "Copied" })) : null] })] })), _jsx("div", { className: "max-h-[36rem] overflow-auto rounded-md border bg-muted/10 py-2", children: _jsx(JsonExplorerNode, { label: "root", value: props.data, path: "root", depth: 0, maxDepth: maxDepth, searchTerm: searchTerm, expandedPaths: expandedPaths, sources: props.sources, maskToken: maskToken, revealedSecrets: revealedSecrets, onToggle: onToggle, onPathActivate: onPathActivate, onCopyLeaf: onCopyLeaf, onCopySubtree: onCopySubtree }) })] }));
}
