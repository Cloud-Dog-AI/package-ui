import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../utils/cn";
import { useReducedMotion } from "../../hooks/useReducedMotion";
export function Spinner(props) {
    const reduced = useReducedMotion();
    return (_jsx("span", { className: cn("inline-block rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground", reduced ? "" : "animate-spin", props.className ?? "h-4 w-4"), "aria-hidden": "true" }));
}
