import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../utils/cn";
export function Progress(props) {
    const clamped = Math.max(0, Math.min(100, props.value));
    return (_jsx("div", { className: cn("h-2 w-full rounded-full bg-muted overflow-hidden", props.className), role: "progressbar", "aria-valuenow": clamped, "aria-valuemin": 0, "aria-valuemax": 100, children: _jsx("div", { className: "h-full bg-primary", style: { width: `${clamped}%` } }) }));
}
