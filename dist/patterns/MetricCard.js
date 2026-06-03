import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { Card, CardContent } from "../components/card/Card";
const trendArrow = {
    up: "\u2191",
    down: "\u2193",
    flat: "\u2192",
};
export function MetricCard(props) {
    return (_jsx(Card, { className: cn("overflow-hidden", props.className), children: _jsxs(CardContent, { className: "py-3", children: [_jsx("div", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: props.label }), _jsxs("div", { className: "mt-1 flex items-baseline gap-1", children: [_jsx("span", { className: "text-2xl font-semibold", children: props.value }), props.unit ? _jsx("span", { className: "text-sm text-muted-foreground", children: props.unit }) : null, props.trend ? (_jsx("span", { className: "ml-2 text-sm", "aria-label": `Trend: ${props.trend}`, children: trendArrow[props.trend] })) : null] })] }) }));
}
