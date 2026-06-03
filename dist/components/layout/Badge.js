import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../utils/cn";
export function Badge(props) {
    const variant = props.variant ?? "default";
    return (_jsx("span", { "data-slot": "badge", ...props, className: cn("badge inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border", variant === "default" ? "bg-primary text-primary-foreground border-primary/20" : "", variant === "secondary" ? "bg-secondary text-secondary-foreground border-secondary/20" : "", variant === "destructive" ? "bg-red-700 text-white border-red-700/20" : "", props.className) }));
}
