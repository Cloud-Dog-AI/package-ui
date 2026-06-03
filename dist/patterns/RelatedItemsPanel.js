import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { Card, CardHeader, CardContent } from "../components/card/Card";
import { Badge } from "../components/layout/Badge";
export function RelatedItemsPanel(props) {
    return (_jsxs(Card, { className: cn("overflow-hidden", props.className), children: [_jsx(CardHeader, { className: "pb-3", children: _jsx("div", { className: "text-sm font-semibold", children: props.title }) }), _jsx(CardContent, { className: "pt-0", children: props.items.length === 0 ? (_jsx("p", { className: "text-sm text-muted-foreground", children: props.emptyMessage ?? "No related items." })) : (_jsx("ul", { className: "space-y-1", "aria-label": props.title, children: props.items.map((item) => (_jsx("li", { children: item.href ? (_jsx("a", { href: item.href, className: "text-sm text-primary underline-offset-4 hover:underline", children: item.label })) : (_jsx(Badge, { variant: "secondary", children: item.label })) }, item.id))) })) })] }));
}
