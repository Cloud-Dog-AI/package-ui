import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../utils/cn";
export function Switch({ checked, onCheckedChange, className, ...props }) {
    return (_jsx("button", { type: "button", role: "switch", "aria-checked": checked, className: cn("inline-flex h-6 w-11 items-center rounded-full border border-input bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", checked ? "bg-primary" : "bg-muted", className), onClick: () => onCheckedChange(!checked), ...props, children: _jsx("span", { className: cn("h-5 w-5 rounded-full bg-background shadow-sm transition-transform", checked ? "translate-x-5" : "translate-x-0") }) }));
}
