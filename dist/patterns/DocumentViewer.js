import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2026 Cloud-Dog, Viewdeck Engineering Limited
// Licensed under the Apache License, Version 2.0
/**
 * DocumentViewer — PS-74 DW2 compliant document viewer.
 *
 * Auto-detects format (JSON/Markdown/Text), renders inline with
 * scroll, download, and copy-to-clipboard support.
 */
import * as React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card, CardContent, CardHeader } from "../components/card";
import { Button } from "../components/button/Button";
import { JsonBlock } from "./JsonBlock";
/** Detect format from content heuristics. */
function detectFormat(content) {
    const trimmed = content.trim();
    // JSON: starts with { or [ and parses
    if ((trimmed.startsWith("{") || trimmed.startsWith("[")) && trimmed.length > 1) {
        try {
            JSON.parse(trimmed);
            return "json";
        }
        catch {
            // not valid JSON
        }
    }
    // Markdown indicators
    if (/^#{1,6}\s/m.test(trimmed) ||
        /^```/m.test(trimmed) ||
        /\*\*[^*]+\*\*/m.test(trimmed) ||
        /^\s*[-*]\s/m.test(trimmed) ||
        /\[.+\]\(.+\)/m.test(trimmed)) {
        return "markdown";
    }
    return "text";
}
function downloadFile(filename, content) {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
    }
    catch {
        // Fallback for insecure contexts
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
    }
}
export function DocumentViewer({ content, format = "auto", title, downloadFilename, maxHeight = "600px", defaultCollapsed = false, }) {
    const resolved = format === "auto" ? detectFormat(content) : format;
    const [copied, setCopied] = React.useState(false);
    const handleCopy = React.useCallback(() => {
        void copyToClipboard(content).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [content]);
    return (_jsxs(Card, { children: [title ? (_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-lg font-semibold", children: title }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: handleCopy, children: copied ? "Copied!" : "Copy" }), downloadFilename ? (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => downloadFile(downloadFilename, content), children: "Download" })) : null] })] }) })) : null, _jsx(CardContent, { children: _jsx("div", { className: "overflow-y-auto rounded border bg-muted/30 p-4", style: { maxHeight }, children: resolved === "json" ? (_jsx(JsonBlock, { title: "", value: JSON.parse(content), defaultCollapsed: defaultCollapsed })) : resolved === "markdown" ? (_jsx("div", { className: "prose prose-sm max-w-none dark:prose-invert", children: _jsx(Markdown, { remarkPlugins: [remarkGfm], children: content }) })) : (_jsx("pre", { className: "whitespace-pre-wrap break-words font-mono text-sm", children: content })) }) })] }));
}
