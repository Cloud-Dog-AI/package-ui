import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
// @cloud-dog/ui — Dropdown menu component.
import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import { useKeyboardNav } from "../../hooks/useKeyboardNav";
export function DropdownMenu(props) {
    const triggerRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const [pos, setPos] = React.useState({
        top: 0,
        left: 0,
        width: 0,
    });
    const [active, setActive] = React.useState(0);
    React.useEffect(() => {
        const el = triggerRef.current;
        if (!open || !el)
            return;
        const rect = el.getBoundingClientRect();
        setPos({ top: rect.bottom + 8, left: rect.right, width: rect.width });
        setActive(0);
    }, [open]);
    const nav = useKeyboardNav({
        onEscape: () => setOpen(false),
        onArrowDown: () => setActive((i) => Math.min(props.items.length - 1, i + 1)),
        onArrowUp: () => setActive((i) => Math.max(0, i - 1)),
        onEnter: () => {
            const it = props.items[active];
            if (!it || it.disabled)
                return;
            it.onSelect();
            setOpen(false);
        },
    });
    const trigger = React.cloneElement(props.trigger, {
        ref: (node) => {
            triggerRef.current = node;
            const r = props.trigger.ref;
            if (typeof r === "function")
                r(node);
        },
        onClick: (e) => {
            props.trigger.props?.onClick?.(e);
            setOpen((v) => !v);
        },
    });
    return (_jsxs(_Fragment, { children: [trigger, open
                ? createPortal(_jsx("div", { className: "fixed inset-0 z-50", onMouseDown: () => setOpen(false), children: _jsxs("div", { className: cn("absolute w-56 rounded-md border bg-background shadow-md overflow-hidden"), style: { top: pos.top, left: pos.left - 224 }, onMouseDown: (e) => e.stopPropagation(), role: "menu", tabIndex: -1, onKeyDown: nav, children: [props.header ? _jsx("div", { className: "border-b", children: props.header }) : null, _jsx("div", { className: "py-1", children: props.items.map((it, idx) => (_jsx("button", { type: "button", role: "menuitem", disabled: it.disabled, className: cn("w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground disabled:opacity-50", idx === active ? "bg-accent text-accent-foreground" : ""), onMouseEnter: () => setActive(idx), onClick: () => {
                                        if (it.disabled)
                                            return;
                                        it.onSelect();
                                        setOpen(false);
                                    }, children: it.label }, it.id))) })] }) }), document.body)
                : null] }));
}
