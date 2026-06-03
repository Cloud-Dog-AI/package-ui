import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../utils/cn";
export function Table(props) {
    return (_jsx("div", { className: "w-full overflow-auto", children: _jsx("table", { ...props, className: cn("w-full text-sm", props.className) }) }));
}
export function TableHeader(props) {
    return _jsx("thead", { ...props, className: cn("border-b", props.className) });
}
export function TableBody(props) {
    return _jsx("tbody", { ...props, className: cn("", props.className) });
}
export function TableRow(props) {
    return _jsx("tr", { ...props, className: cn("border-b hover:bg-muted/40", props.className) });
}
export function TableHead(props) {
    return _jsx("th", { ...props, className: cn("text-left font-semibold px-3 py-2", props.className) });
}
export function TableCell(props) {
    return _jsx("td", { ...props, className: cn("px-3 py-2", props.className) });
}
