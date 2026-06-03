import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { Button } from "../components/button/Button";
export function QuickActionBar(props) {
    return (_jsx("div", { className: cn("flex items-center gap-2 flex-wrap", props.className), role: "toolbar", "aria-label": "Quick actions", children: props.actions.map((action) => (_jsxs(Button, { variant: action.variant ?? "secondary", size: "sm", onClick: action.onClick, children: [action.icon ? _jsx("span", { className: "mr-1.5", children: action.icon }) : null, action.label] }, action.label))) }));
}
