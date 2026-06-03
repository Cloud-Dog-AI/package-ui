import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { Card, CardContent } from "../components/card/Card";
const dotColor = {
    ok: "bg-green-500",
    warning: "bg-amber-500",
    error: "bg-red-500",
    unknown: "bg-gray-400",
};
export function HealthWidget(props) {
    return (_jsx(Card, { className: cn("overflow-hidden", props.className), children: _jsxs(CardContent, { className: "flex items-center gap-3 py-3", children: [_jsx("span", { className: cn("inline-block h-3 w-3 shrink-0 rounded-full", dotColor[props.status]), role: "img", "aria-label": `Status: ${props.status}` }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("div", { className: "text-sm font-semibold truncate", children: props.name }), props.detail ? (_jsx("div", { className: "text-xs text-muted-foreground truncate", children: props.detail })) : null] }), props.url ? (_jsx("a", { href: props.url, target: "_blank", rel: "noopener noreferrer", className: "text-xs text-primary underline shrink-0", children: "Open" })) : null] }) }));
}
