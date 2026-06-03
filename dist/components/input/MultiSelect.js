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
// @cloud-dog/ui — MultiSelect: multi-value selection with tags and search.
import * as React from "react";
import { cn } from "../../utils/cn";
export function MultiSelect(props) {
    const { options, values, onChange, placeholder = "Select items...", disabled = false, error, loading = false, emptyMessage = "No options available.", className, maxSelections, } = props;
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const containerRef = React.useRef(null);
    const inputRef = React.useRef(null);
    const filtered = React.useMemo(() => {
        const q = query.trim().toLowerCase();
        const base = q ? options.filter((o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)) : options;
        return base;
    }, [options, query]);
    const selectedOptions = options.filter((o) => values.includes(o.value));
    React.useEffect(() => {
        if (!open)
            return;
        function handleClickOutside(e) {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);
    function toggle(optValue) {
        if (values.includes(optValue)) {
            onChange(values.filter((v) => v !== optValue));
        }
        else {
            if (maxSelections && values.length >= maxSelections)
                return;
            onChange([...values, optValue]);
        }
        setQuery("");
        setOpen(false);
    }
    function removeTag(optValue) {
        onChange(values.filter((v) => v !== optValue));
    }
    function handleKeyDown(e) {
        if (e.key === "Backspace" && !query && values.length > 0) {
            onChange(values.slice(0, -1));
        }
        else if (e.key === "Escape") {
            setOpen(false);
        }
    }
    return (_jsxs("div", { ref: containerRef, className: cn("relative", className), children: [_jsxs("div", { className: cn("flex min-h-10 w-full flex-wrap items-center gap-1 rounded-md border bg-background px-2 py-1.5", error ? "border-destructive" : "border-input", disabled && "cursor-not-allowed opacity-50"), onClick: () => {
                    if (!disabled) {
                        setOpen(true);
                        inputRef.current?.focus();
                    }
                }, children: [selectedOptions.map((opt) => (_jsxs("span", { className: "inline-flex items-center gap-1 rounded-sm bg-primary/10 px-2 py-0.5 text-xs font-medium", children: [opt.label, !disabled && (_jsx("button", { type: "button", "aria-label": `Remove ${opt.label}`, className: "ml-0.5 text-muted-foreground hover:text-foreground", onClick: (e) => {
                                    e.stopPropagation();
                                    removeTag(opt.value);
                                }, children: "x" }))] }, opt.value))), _jsx("input", { ref: inputRef, id: props.id, type: "text", role: "combobox", "aria-expanded": open, "aria-label": props["aria-label"], "aria-invalid": !!error, disabled: disabled, placeholder: values.length === 0 ? placeholder : "", value: query, onChange: (e) => {
                            setQuery(e.target.value);
                            setOpen(true);
                        }, onFocus: () => setOpen(true), onKeyDown: handleKeyDown, className: "flex-1 min-w-[60px] bg-transparent text-sm outline-none placeholder:text-muted-foreground" })] }), open && (_jsx("ul", { role: "listbox", "aria-multiselectable": "true", className: "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-input bg-popover p-1 shadow-md", children: loading ? (_jsx("li", { className: "px-3 py-2 text-sm text-muted-foreground", children: "Loading..." })) : filtered.length === 0 ? (_jsx("li", { className: "px-3 py-2 text-sm text-muted-foreground", children: emptyMessage })) : (filtered.map((opt) => {
                    const selected = values.includes(opt.value);
                    const atMax = !selected && maxSelections != null && values.length >= maxSelections;
                    return (_jsxs("li", { role: "option", "aria-selected": selected, "aria-disabled": opt.disabled || atMax, className: cn("flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm", selected && "bg-primary/10 font-medium", (opt.disabled || atMax) && "cursor-not-allowed opacity-50"), onMouseDown: (e) => {
                            e.preventDefault();
                            if (!opt.disabled && !atMax)
                                toggle(opt.value);
                        }, children: [_jsx("span", { className: cn("flex h-4 w-4 items-center justify-center rounded-sm border", selected ? "bg-primary border-primary text-primary-foreground" : "border-input"), children: selected ? "\u2713" : null }), opt.label] }, opt.value));
                })) })), error ? _jsx("p", { className: "mt-1 text-xs text-destructive", children: error }) : null] }));
}
