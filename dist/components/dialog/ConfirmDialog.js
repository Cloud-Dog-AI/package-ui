import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2026 Cloud-Dog, Viewdeck Engineering Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// @cloud-dog/ui — PFW-3 ConfirmDialog for destructive actions.
import * as React from "react";
import { Dialog } from "./Dialog";
import { Button } from "../button/Button";
export function ConfirmDialog(props) {
    const { open, onOpenChange, title, description, targetName, irreversible = true, confirmLabel = "Delete", confirmVariant = "destructive", loading = false, error = null, onConfirm, } = props;
    const confirmRef = React.useRef(null);
    const cancelRef = React.useRef(null);
    // Focus cancel button on open (safer default for destructive actions)
    React.useEffect(() => {
        if (open) {
            requestAnimationFrame(() => cancelRef.current?.focus());
        }
    }, [open]);
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, label: title, children: _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-lg font-semibold", children: title }), _jsx("p", { className: "text-sm text-muted-foreground", children: description }), targetName && (_jsx("p", { className: "text-sm font-medium", "data-testid": "confirm-target-name", children: targetName })), irreversible && (_jsx("p", { className: "text-sm text-destructive font-medium", "data-testid": "confirm-irreversible-warning", children: "This action cannot be undone." })), error && (_jsx("p", { role: "alert", className: "text-sm text-destructive", "data-testid": "confirm-error", children: error })), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(Button, { ref: cancelRef, variant: "secondary", size: "sm", disabled: loading, onClick: () => onOpenChange(false), children: "Cancel" }), _jsx(Button, { ref: confirmRef, variant: confirmVariant, size: "sm", disabled: loading, onClick: onConfirm, "aria-busy": loading, children: loading ? "Processing…" : confirmLabel })] })] }) }));
}
