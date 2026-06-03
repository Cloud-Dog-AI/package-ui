import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { Button } from "../components/button/Button";
/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */
const UNITS = ["B", "KB", "MB", "GB", "TB"];
function formatBytes(bytes) {
    if (bytes === 0)
        return "0 B";
    const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), UNITS.length - 1);
    const value = bytes / 1024 ** exponent;
    return `${value < 10 && exponent > 0 ? value.toFixed(1) : Math.round(value)} ${UNITS[exponent]}`;
}
const KIND_STYLES = {
    attachment: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    upload: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    download: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    reference: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
};
/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export function FileArtifactCard(props) {
    const { path, title, kind, byteSize, statusLabel, description, preview, actions, className, } = props;
    return (_jsxs("section", { className: cn("rounded-md border bg-background text-sm", className), children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2 px-3 py-2 border-b", children: [_jsx("span", { className: "font-semibold truncate flex-1 min-w-0", title: path, children: title }), kind ? (_jsx("span", { className: cn("rounded-full px-2 py-0.5 text-xs font-medium", KIND_STYLES[kind] ?? KIND_STYLES.reference), children: kind })) : null, statusLabel ? (_jsx("span", { className: "rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground", children: statusLabel })) : null, byteSize != null ? (_jsx("span", { className: "text-xs text-muted-foreground", children: formatBytes(byteSize) })) : null] }), (description || path !== title) ? (_jsxs("div", { className: "px-3 py-2 space-y-1", children: [path !== title ? (_jsx("p", { className: "text-xs text-muted-foreground truncate", title: path, children: path })) : null, description ? (_jsx("p", { className: "text-xs text-muted-foreground", children: description })) : null] })) : null, preview?.kind === "image" ? (_jsx("div", { className: "px-3 pb-2", children: _jsx("img", { src: preview.src, alt: preview.alt, className: "max-h-48 rounded border object-contain" }) })) : null, preview?.kind === "text" ? (_jsx("pre", { className: "mx-3 mb-2 max-h-48 overflow-auto rounded bg-muted/20 p-2 text-xs font-mono", children: preview.content })) : null, actions && actions.length > 0 ? (_jsx("div", { className: "flex flex-wrap gap-2 px-3 py-2 border-t", children: actions.map((action) => (_jsx(Button, { variant: action.variant ?? "secondary", size: "sm", loading: action.loading, disabled: action.loading, onClick: action.onClick, children: action.label }, action.label))) })) : null] }));
}
