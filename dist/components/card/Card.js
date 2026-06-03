import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../utils/cn";
export function Card(props) {
    return (_jsx("div", { ...props, className: cn("rounded-xl border bg-card text-card-foreground shadow-sm", props.className) }));
}
export function CardHeader(props) {
    return _jsx("div", { ...props, className: cn("p-6 pb-0", props.className) });
}
export function CardContent(props) {
    return _jsx("div", { ...props, className: cn("p-6", props.className) });
}
export function CardFooter(props) {
    return _jsx("div", { ...props, className: cn("p-6 pt-0", props.className) });
}
