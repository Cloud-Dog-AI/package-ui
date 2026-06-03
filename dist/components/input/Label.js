import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../utils/cn";
export function Label(props) {
    return (_jsx("label", { ...props, className: cn("text-sm font-medium leading-none", props.className) }));
}
