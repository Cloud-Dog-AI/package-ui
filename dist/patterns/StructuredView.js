import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
function isRecord(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function renderValue(value, path) {
    if (value == null || value === "") {
        return _jsx("span", { className: "text-sm text-muted-foreground", children: "N/A" });
    }
    if (typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean" ||
        typeof value === "bigint") {
        return _jsx("span", { className: "break-all font-mono text-xs", children: String(value) });
    }
    if (Array.isArray(value)) {
        if (value.length === 0) {
            return _jsx("span", { className: "text-sm text-muted-foreground", children: "None" });
        }
        return (_jsx("div", { className: "space-y-2", children: value.map((item, index) => (_jsxs("div", { className: "rounded-md border bg-muted/10 p-3", children: [_jsxs("div", { className: "mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground", children: ["Item ", index + 1] }), renderValue(item, `${path}[${index}]`)] }, `${path}[${index}]`))) }));
    }
    if (isRecord(value)) {
        const entries = Object.entries(value).sort(([left], [right]) => left.localeCompare(right));
        if (entries.length === 0) {
            return _jsx("span", { className: "text-sm text-muted-foreground", children: "None" });
        }
        return (_jsx("dl", { className: "overflow-hidden rounded-md border bg-muted/10", children: entries.map(([key, nested]) => (_jsxs("div", { className: "grid gap-2 border-b px-3 py-2 last:border-b-0 md:grid-cols-[minmax(0,13rem)_1fr]", children: [_jsx("dt", { className: "break-words text-xs font-medium uppercase tracking-wide text-muted-foreground", children: key }), _jsx("dd", { className: "min-w-0", children: renderValue(nested, `${path}.${key}`) })] }, `${path}.${key}`))) }));
    }
    return _jsx("span", { className: "break-all font-mono text-xs", children: String(value) });
}
export function StructuredView(props) {
    return (_jsxs("section", { className: cn("space-y-3 rounded-md border bg-background p-4", props.className), children: [props.title ? _jsx("h3", { className: "text-sm font-semibold", children: props.title }) : null, renderValue(props.value, props.title ?? "root")] }));
}
