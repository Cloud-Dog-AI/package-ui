import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
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
// @cloud-dog/ui — Popover component.
import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import { useFocusTrap } from "../../hooks/useFocusTrap";
export function Popover(props) {
    const triggerRef = React.useRef(null);
    const panelRef = React.useRef(null);
    useFocusTrap(panelRef, props.open);
    const [pos, setPos] = React.useState({
        top: 0,
        left: 0,
        width: 0,
    });
    React.useEffect(() => {
        const el = triggerRef.current;
        if (!props.open || !el)
            return;
        const rect = el.getBoundingClientRect();
        setPos({ top: rect.bottom + 8, left: rect.left, width: rect.width });
    }, [props.open]);
    const trigger = React.cloneElement(props.trigger, {
        ref: (node) => {
            triggerRef.current = node;
            const r = props.trigger.ref;
            if (typeof r === "function")
                r(node);
        },
        onClick: (e) => {
            props.trigger.props?.onClick?.(e);
            props.onOpenChange(!props.open);
        },
    });
    return (_jsxs(_Fragment, { children: [trigger, props.open
                ? createPortal(_jsx("div", { className: "fixed inset-0 z-50", onMouseDown: () => props.onOpenChange(false), children: _jsx("div", { ref: panelRef, role: "dialog", "aria-modal": "false", className: cn("absolute rounded-md border bg-background shadow-md p-3"), style: { top: pos.top, left: pos.left, minWidth: pos.width }, onMouseDown: (e) => e.stopPropagation(), children: props.children }) }), document.body)
                : null] }));
}
