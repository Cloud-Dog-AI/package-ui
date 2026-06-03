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
// @cloud-dog/ui — JsonBlock pattern (collapsible JSON viewer).
import * as React from "react";
import { cn } from "../utils/cn";
import { Button } from "../components/button/Button";
function stableStringify(value) {
    try {
        return JSON.stringify(value, null, 2);
    }
    catch {
        return String(value);
    }
}
async function copyText(text) {
    try {
        if (navigator?.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    }
    catch {
        // Fall through.
    }
    try {
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
export function JsonBlock(props) {
    const [collapsed, setCollapsed] = React.useState(props.defaultCollapsed ?? true);
    const [copied, setCopied] = React.useState("idle");
    const text = React.useMemo(() => stableStringify(props.value), [props.value]);
    const onCopy = async () => {
        const ok = await copyText(text);
        setCopied(ok ? "ok" : "fail");
        window.setTimeout(() => setCopied("idle"), 1200);
    };
    return (_jsxs("section", { className: cn("rounded-md border bg-background", props.className), children: [_jsxs("div", { className: "flex items-center gap-2 px-3 py-2 border-b", children: [_jsx("button", { type: "button", className: cn("text-sm font-semibold text-left flex-1", "focus:outline-none focus:ring-2 focus:ring-ring rounded-sm"), "aria-expanded": !collapsed, onClick: () => setCollapsed((c) => !c), children: props.title ?? "JSON" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: onCopy, "aria-label": props.copyAriaLabel ?? "Copy JSON", children: copied === "ok" ? "Copied" : copied === "fail" ? "Copy failed" : "Copy" })] }), !collapsed ? (_jsx("pre", { className: cn("p-3 text-xs overflow-auto font-mono", "bg-muted/20"), children: text })) : null] }));
}
