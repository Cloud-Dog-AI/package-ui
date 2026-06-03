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
// @cloud-dog/ui — CrudPage pattern (table + toolbar + detail drawer).
import * as React from "react";
import { cn } from "../utils/cn";
import { Button } from "../components/button/Button";
import { Input } from "../components/input/Input";
import { Checkbox } from "../components/input/Checkbox";
import { Sheet } from "../components/dialog/Sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../components/table/Table";
export function CrudPage(props) {
    const [query, setQuery] = React.useState("");
    const [selected, setSelected] = React.useState(new Set());
    const [detailId, setDetailId] = React.useState(null);
    const selectAllRef = React.useRef(null);
    const rows = React.useMemo(() => {
        if (!query.trim())
            return props.rows;
        const q = query.toLowerCase();
        return props.rows.filter((row) => {
            const text = props.columns
                .map((c) => {
                const rendered = c.cell(row);
                return typeof rendered === "string" ? rendered : "";
            })
                .join(" ")
                .toLowerCase();
            return text.includes(q);
        });
    }, [props.rows, props.columns, query]);
    const allIds = React.useMemo(() => rows.map((r) => props.getRowId(r)), [rows, props]);
    const selectedIds = React.useMemo(() => Array.from(selected), [selected]);
    const hasAny = selected.size > 0;
    const isAll = allIds.length > 0 && selected.size === allIds.length;
    const isIndeterminate = hasAny && !isAll;
    const toggleAll = (checked) => {
        setSelected(() => (checked ? new Set(allIds) : new Set()));
    };
    const toggleOne = (id, checked) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (checked)
                next.add(id);
            else
                next.delete(id);
            return next;
        });
    };
    const openDetail = (id) => {
        if (!props.renderDetail)
            return;
        setDetailId(id);
    };
    const detailRow = React.useMemo(() => {
        if (!detailId)
            return null;
        return props.rows.find((r) => props.getRowId(r) === detailId) ?? null;
    }, [detailId, props.rows, props]);
    React.useEffect(() => {
        if (!selectAllRef.current)
            return;
        // HTMLInputElement.indeterminate is a runtime-only flag.
        selectAllRef.current.indeterminate = isIndeterminate;
    }, [isIndeterminate]);
    return (_jsxs("div", { className: cn("space-y-4", props.className), children: [_jsxs("header", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("h1", { className: "text-xl font-semibold truncate", children: props.title }), _jsxs("div", { className: "text-sm text-muted-foreground", children: [rows.length, " items"] })] }), _jsxs("div", { className: "ml-auto flex items-center gap-2", children: [_jsx(Input, { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search", "aria-label": "Search", className: "w-64" }), (props.bulkActions ?? []).map((a) => (_jsx(Button, { variant: "secondary", size: "sm", onClick: () => a.onRun(selectedIds), disabled: selectedIds.length === 0, children: a.label }, a.label)))] })] }), _jsx("div", { className: "rounded-md border bg-background", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-10", children: _jsx(Checkbox, { ref: selectAllRef, "aria-label": "Select all", checked: isAll, onChange: (e) => toggleAll(e.currentTarget.checked) }) }), props.columns.map((c) => (_jsx(TableHead, { children: c.header }, c.id)))] }) }), _jsx(TableBody, { children: rows.map((row) => {
                                const id = props.getRowId(row);
                                return (_jsxs(TableRow, { className: cn(props.renderDetail ? "cursor-pointer" : ""), onClick: () => openDetail(id), children: [_jsx(TableCell, { onClick: (e) => e.stopPropagation(), children: _jsx(Checkbox, { "aria-label": `Select ${id}`, checked: selected.has(id), onChange: (e) => toggleOne(id, e.currentTarget.checked) }) }), props.columns.map((c) => (_jsx(TableCell, { children: c.cell(row) }, c.id)))] }, id));
                            }) })] }) }), props.renderDetail ? (_jsx(Sheet, { open: !!detailId, onOpenChange: (o) => setDetailId(o ? detailId : null), side: "right", children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "text-sm font-semibold", children: "Detail" }), _jsx(Button, { variant: "ghost", size: "sm", className: "ml-auto", onClick: () => setDetailId(null), children: "Close" })] }), detailRow ? (props.renderDetail(detailRow)) : (_jsx("div", { className: "text-sm", children: "Not found." }))] }) })) : null] }));
}
