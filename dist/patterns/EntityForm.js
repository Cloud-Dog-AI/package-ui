import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { Button } from "../components/button/Button";
import { Input } from "../components/input/Input";
import { Label } from "../components/input/Label";
import { Select } from "../components/input/Select";
import { Switch } from "../components/input/Switch";
import { MultiSelect } from "../components/input/MultiSelect";
export function EntityForm(props) {
    const isView = props.mode === "view";
    return (_jsxs("form", { className: cn("space-y-4", props.className), onSubmit: (e) => {
            e.preventDefault();
            props.onSubmit();
        }, "aria-label": "Entity form", children: [props.fields.map((field) => {
                const fieldId = `${props.idPrefix ?? 'ef'}-${field.name}`;
                const error = props.errors?.[field.name];
                const disabled = isView || field.readOnly;
                return (_jsxs("div", { className: "space-y-1", children: [_jsxs(Label, { htmlFor: fieldId, children: [field.label, field.required ? _jsx("span", { "aria-hidden": "true", className: "text-destructive ml-1", children: "*" }) : null] }), field.type === "boolean" ? (_jsx("div", { className: "pt-1", children: _jsx(Switch, { id: fieldId, checked: Boolean(props.values[field.name]), onCheckedChange: (v) => props.onChange(field.name, v), disabled: disabled, "aria-label": field.label }) })) : field.type === "multiselect" ? (_jsx(MultiSelect, { id: fieldId, options: (field.options ?? []).map((o) => ({ value: o, label: o })), values: Array.isArray(props.values[field.name]) ? props.values[field.name] : String(props.values[field.name] ?? "").split(",").filter(Boolean), onChange: (vals) => props.onChange(field.name, vals), disabled: disabled, "aria-label": field.label, error: error })) : field.type === "textarea" ? (_jsx("textarea", { id: fieldId, className: cn("flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm", "ring-offset-background placeholder:text-muted-foreground", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", "disabled:cursor-not-allowed disabled:opacity-50", "font-mono", error ? "border-destructive" : ""), value: String(props.values[field.name] ?? ""), onChange: (e) => props.onChange(field.name, e.target.value), disabled: disabled, rows: field.rows ?? 4, placeholder: field.placeholder, "aria-label": field.label, "aria-invalid": !!error })) : field.type === "select" ? (_jsxs(Select, { id: fieldId, value: String(props.values[field.name] ?? ""), onChange: (e) => props.onChange(field.name, e.target.value), disabled: disabled, "aria-label": field.label, "aria-invalid": !!error, children: [_jsx("option", { value: "", children: "-- select --" }), (field.options ?? []).map((opt) => (_jsx("option", { value: opt, children: opt }, opt)))] })) : (_jsx(Input, { id: fieldId, type: field.type === "number" ? "number" : "text", value: String(props.values[field.name] ?? ""), onChange: (e) => props.onChange(field.name, field.type === "number" ? Number(e.target.value) : e.target.value), disabled: disabled, "aria-label": field.label, "aria-invalid": !!error })), error ? (_jsx("p", { className: "text-xs text-destructive", role: "alert", children: error })) : null] }, field.name));
            }), props.extra, _jsxs("div", { className: "flex items-center gap-2 pt-2", children: [!isView ? (_jsx("button", { type: "submit", className: "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", children: props.submitLabel ?? "Save" })) : null, _jsx(Button, { type: "button", variant: "secondary", onClick: props.onCancel, children: isView ? "Close" : "Cancel" })] })] }));
}
