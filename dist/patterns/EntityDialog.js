import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog } from "../components/dialog/Dialog";
import { EntityForm } from "./EntityForm";
import { RelatedItemsPanel } from "./RelatedItemsPanel";
function isBodyDialog(props) {
    return "body" in props;
}
export function EntityDialog(props) {
    const body = isBodyDialog(props) ? (props.body) : (_jsx(EntityForm, { fields: props.fields, values: props.values, onChange: props.onChange, onSubmit: props.onSubmit, onCancel: props.onCancel, mode: props.mode, errors: props.errors, className: props.className, submitLabel: props.submitLabel, idPrefix: props.idPrefix, extra: props.extra }));
    return (_jsx(Dialog, { open: props.open, onOpenChange: props.onOpenChange, label: props.title, children: _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-lg font-semibold", children: props.title }), body, isBodyDialog(props) ? props.extra : null, props.relatedPanels?.length ? (_jsx("div", { className: "grid gap-3 md:grid-cols-2", children: props.relatedPanels.map((panel) => (_jsx(RelatedItemsPanel, { title: panel.title, items: panel.items, emptyMessage: panel.emptyMessage }, panel.title))) })) : null] }) }));
}
