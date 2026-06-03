import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { Card, CardContent, CardHeader } from "../components/card/Card";
function toneClass(tone) {
    if (tone === "ok")
        return "bg-primary/10 border-primary/20";
    if (tone === "warning")
        return "bg-accent/10 border-accent/20";
    if (tone === "error")
        return "bg-destructive/10 border-destructive/20";
    return "";
}
export function StatusCard(props) {
    const tone = props.tone ?? "neutral";
    return (_jsxs(Card, { className: cn("overflow-hidden", toneClass(tone), props.className), children: [_jsx(CardHeader, { className: "pb-3", children: _jsx("div", { className: "text-xs uppercase tracking-wide text-foreground/80", children: props.title }) }), _jsx(CardContent, { className: "pt-0", children: _jsxs("div", { className: "flex items-baseline gap-3", children: [_jsx("div", { className: "text-2xl font-semibold", children: props.value }), props.trend ? _jsx("div", { className: "text-xs text-foreground/70", children: props.trend }) : null] }) })] }));
}
