import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../utils/cn";
export function Avatar(props) {
    return (_jsx("span", { className: cn("inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted overflow-hidden", props.className), children: props.src ? (_jsx("img", { src: props.src, alt: props.alt, className: "h-full w-full object-cover" })) : (_jsx("span", { className: "text-xs font-semibold text-muted-foreground", "aria-hidden": "true", children: props.fallback })) }));
}
