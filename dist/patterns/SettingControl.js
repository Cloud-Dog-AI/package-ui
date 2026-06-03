import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { Input } from "../components/input/Input";
import { Label } from "../components/input/Label";
import { Select } from "../components/input/Select";
import { Switch } from "../components/input/Switch";
export function SettingControl(props) {
    const { setting, onChange } = props;
    const fieldId = `sc-${setting.key}`;
    return (_jsxs("div", { className: cn("flex items-start gap-4 py-3", props.className), children: [_jsxs("div", { className: "flex-1 min-w-0 space-y-0.5", children: [_jsxs(Label, { htmlFor: fieldId, className: "flex items-center gap-1", children: [setting.readOnly ? (_jsx("span", { className: "text-muted-foreground", "aria-label": "Read-only", title: "Read-only", children: "\uD83D\uDD12" })) : null, setting.label] }), setting.description ? (_jsx("p", { className: "text-xs text-muted-foreground", children: setting.description })) : null] }), _jsx("div", { className: "w-56 shrink-0", children: setting.type === "boolean" ? (_jsx(Switch, { id: fieldId, checked: Boolean(setting.value), onCheckedChange: onChange, disabled: setting.readOnly })) : setting.type === "select" ? (_jsx(Select, { id: fieldId, value: String(setting.value ?? ""), onChange: (e) => onChange(e.target.value), disabled: setting.readOnly, children: (setting.options ?? []).map((opt) => (_jsx("option", { value: opt, children: opt }, opt))) })) : (_jsx(Input, { id: fieldId, type: setting.type === "number" ? "number" : "text", value: String(setting.value ?? ""), onChange: (e) => onChange(setting.type === "number" ? Number(e.target.value) : e.target.value), disabled: setting.readOnly })) })] }));
}
