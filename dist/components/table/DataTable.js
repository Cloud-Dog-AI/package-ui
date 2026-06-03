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
// @cloud-dog/ui — DataTable: full-featured table with sorting, pagination,
// multi-select, bulk actions, and column picker.
import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./Table";
import { Button } from "../button/Button";
import { Checkbox } from "../input/Checkbox";
import { Input } from "../input/Input";
import { cn } from "../../utils/cn";
const PAGE_SIZES = [10, 25, 50, 100];
function _defaultSortValue(column, row) {
    const value = row[column.id];
    if (typeof value === "number" || typeof value === "string") {
        return value;
    }
    const rendered = column.cell(row);
    if (typeof rendered === "number" || typeof rendered === "string") {
        return rendered;
    }
    return "";
}
function _compareSortValues(a, b) {
    if (typeof a === "number" && typeof b === "number") {
        return a - b;
    }
    return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
}
function _readVisibleCols(tableId, all) {
    try {
        const raw = localStorage.getItem(`dt.cols.${tableId}`);
        if (raw)
            return new Set(JSON.parse(raw));
    }
    catch { /* ignore */ }
    return new Set(all);
}
function _writeVisibleCols(tableId, ids) {
    try {
        localStorage.setItem(`dt.cols.${tableId}`, JSON.stringify([...ids]));
    }
    catch { /* ignore */ }
}
/** PFW-2 Column picker with backdrop, outside-click, and Escape dismissal. */
function ColumnPicker({ open, onOpenChange, columns, visibleCols, onToggle, }) {
    const menuRef = React.useRef(null);
    const triggerRef = React.useRef(null);
    React.useEffect(() => {
        if (!open)
            return;
        const onKey = (e) => {
            if (e.key === "Escape") {
                onOpenChange(false);
                triggerRef.current?.focus();
            }
        };
        const onClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target) &&
                triggerRef.current && !triggerRef.current.contains(e.target)) {
                onOpenChange(false);
            }
        };
        document.addEventListener("keydown", onKey);
        document.addEventListener("mousedown", onClick);
        return () => {
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("mousedown", onClick);
        };
    }, [open, onOpenChange]);
    return (_jsxs("div", { className: "relative", children: [_jsx(Button, { ref: triggerRef, variant: "secondary", size: "sm", onClick: () => onOpenChange(!open), "aria-expanded": open, "aria-haspopup": "true", children: "Columns" }), open && (_jsxs("div", { ref: menuRef, className: "absolute right-0 top-full z-50 mt-1 min-w-[10rem] rounded-md border border-border bg-popover p-2 text-popover-foreground shadow-md", role: "menu", "aria-label": "Visible columns", children: [_jsx("p", { className: "px-2 py-1 text-xs font-medium text-muted-foreground", children: "Visible columns" }), columns.map((c) => (_jsxs("label", { className: "flex items-center gap-2 rounded px-2 py-1 text-sm text-foreground cursor-pointer hover:bg-muted hover:text-foreground", children: [_jsx(Checkbox, { checked: visibleCols.has(c.id), onChange: () => onToggle(c.id), "aria-label": `Show ${c.header}` }), c.header] }, c.id)))] }))] }));
}
export function DataTable(props) {
    const { columns, rows, emptyMessage = "No results.", ariaLabel, totalRows, getRowId, getRowName, page: controlledPage, pageSize: controlledPageSize, onPageChange, onPageSizeChange, pageSizeOptions = PAGE_SIZES, selectable = false, bulkActions = [], onBulkAction, getSelectionLabel, selectionColumnPosition = "start", columnPickerEnabled = false, tableId = "default", className, } = props;
    // --- Sort state ---
    const [sort, setSort] = React.useState(null);
    const toggleSort = (colId) => {
        setSort((s) => {
            if (!s || s.id !== colId)
                return { id: colId, dir: "asc" };
            if (s.dir === "asc")
                return { id: colId, dir: "desc" };
            return null; // third click clears
        });
    };
    const sorted = React.useMemo(() => {
        if (!sort)
            return rows;
        const col = columns.find((c) => c.id === sort.id);
        if (!col?.sortable)
            return rows;
        const r = [...rows];
        r.sort((a, b) => {
            const av = col.sortValue ? col.sortValue(a) : _defaultSortValue(col, a);
            const bv = col.sortValue ? col.sortValue(b) : _defaultSortValue(col, b);
            const comparison = _compareSortValues(av, bv);
            return sort.dir === "asc" ? comparison : -comparison;
        });
        return r;
    }, [rows, columns, sort]);
    // --- Pagination ---
    const pageSize = controlledPageSize ?? (rows.length || 1);
    const effectiveTotalRows = Math.max(totalRows ?? rows.length, rows.length);
    const totalPages = Math.max(1, Math.ceil(effectiveTotalRows / pageSize));
    const page = Math.min(Math.max(controlledPage ?? 1, 1), totalPages);
    const startIdx = (page - 1) * pageSize;
    const paged = onPageChange ? sorted.slice(startIdx, startIdx + pageSize) : sorted;
    const displayTotalRows = effectiveTotalRows;
    const displayStart = effectiveTotalRows ? startIdx + 1 : 0;
    const displayEnd = effectiveTotalRows ? Math.min(startIdx + paged.length, effectiveTotalRows) : 0;
    const [jumpInput, setJumpInput] = React.useState(String(page));
    React.useEffect(() => { setJumpInput(String(page)); }, [page]);
    const handleJump = (value = jumpInput) => {
        const n = parseInt(value, 10);
        if (n >= 1 && onPageChange)
            onPageChange(n);
    };
    // --- Column picker ---
    const allColIds = React.useMemo(() => columns.map((c) => c.id), [columns]);
    const [visibleCols, setVisibleCols] = React.useState(() => columnPickerEnabled ? _readVisibleCols(tableId, allColIds) : new Set(allColIds));
    const [pickerOpen, setPickerOpen] = React.useState(false);
    React.useEffect(() => {
        setVisibleCols((prev) => {
            if (!columnPickerEnabled) {
                return new Set(allColIds);
            }
            const saved = _readVisibleCols(tableId, allColIds);
            const savedIds = [...saved].filter((id) => allColIds.includes(id));
            if (savedIds.length > 0) {
                const next = new Set(savedIds);
                if (next.size !== saved.size) {
                    _writeVisibleCols(tableId, next);
                }
                return next;
            }
            const next = new Set([...prev].filter((id) => allColIds.includes(id)));
            for (const id of allColIds) {
                next.add(id);
            }
            return next;
        });
    }, [allColIds, columnPickerEnabled, tableId]);
    const toggleCol = (id) => {
        setVisibleCols((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                if (next.size > 1)
                    next.delete(id);
            }
            else
                next.add(id);
            if (columnPickerEnabled)
                _writeVisibleCols(tableId, next);
            return next;
        });
    };
    const visibleColumns = columns.filter((c) => visibleCols.has(c.id));
    // --- Multi-select ---
    const [selected, setSelected] = React.useState(new Set());
    const getId = (row, idx) => getRowId?.(row) ?? String(idx);
    const pageIds = paged.map((r, i) => getId(r, startIdx + i));
    const allSelected = pageIds.length > 0 && pageIds.every((id) => selected.has(id));
    const someSelected = selected.size > 0;
    const toggleAll = (checked) => {
        setSelected((prev) => {
            const next = new Set(prev);
            for (const id of pageIds) {
                if (checked)
                    next.add(id);
                else
                    next.delete(id);
            }
            return next;
        });
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
    // --- Render ---
    const isEmpty = !rows.length;
    const renderSelectionHeader = () => (_jsx(TableHead, { className: "w-10", children: _jsx(Checkbox, { checked: allSelected, "aria-label": "Select all rows on current page", onChange: (e) => toggleAll(e.currentTarget.checked) }) }));
    const renderSelectionCell = (row, id) => (_jsx(TableCell, { children: _jsx(Checkbox, { checked: selected.has(id), "aria-label": getSelectionLabel?.(row) ?? `Select ${id}`, onChange: (e) => toggleOne(id, e.currentTarget.checked) }) }));
    return (_jsxs("div", { className: cn("space-y-2", className), children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [selectable && someSelected && (_jsxs("div", { className: "flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-1 text-sm", children: [_jsxs("span", { children: [selected.size, " selected"] }), bulkActions.map((ba) => (_jsx(Button, { variant: "secondary", size: "sm", onClick: () => onBulkAction?.(ba.action, [...selected]), children: ba.label }, ba.action)))] })), _jsx("div", { className: "ml-auto flex items-center gap-2", children: columnPickerEnabled && (_jsx(ColumnPicker, { open: pickerOpen, onOpenChange: setPickerOpen, columns: columns, visibleCols: visibleCols, onToggle: toggleCol })) })] }), _jsxs(Table, { "aria-label": ariaLabel, children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [selectable && selectionColumnPosition === "start" ? renderSelectionHeader() : null, visibleColumns.map((c) => (_jsx(TableHead, { children: c.sortable ? (_jsxs("button", { type: "button", className: "inline-flex items-center gap-1 text-sm font-medium hover:text-foreground", onClick: () => toggleSort(c.id), children: [c.header, sort?.id === c.id ? (_jsx("span", { "aria-label": sort.dir === "asc" ? "Sorted ascending" : "Sorted descending", children: sort.dir === "asc" ? "▲" : "▼" })) : null] })) : (c.header) }, c.id))), selectable && selectionColumnPosition === "end" ? renderSelectionHeader() : null] }) }), _jsxs(TableBody, { children: [isEmpty && emptyMessage ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: visibleColumns.length + (selectable ? 1 : 0), className: "text-center text-sm text-muted-foreground py-6", children: emptyMessage }) })) : null, !isEmpty ? paged.map((row, idx) => {
                                const id = getId(row, startIdx + idx);
                                return (_jsxs(TableRow, { "aria-label": getRowName ? getRowName(row) : undefined, children: [selectable && selectionColumnPosition === "start" ? renderSelectionCell(row, id) : null, visibleColumns.map((c) => (_jsx(TableCell, { children: c.cell(row) }, c.id))), selectable && selectionColumnPosition === "end" ? renderSelectionCell(row, id) : null] }, id));
                            }) : null] })] }), onPageChange && (_jsxs("div", { className: "flex flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between", children: [_jsxs("span", { className: "whitespace-nowrap", children: ["Showing ", displayStart, "\u2013", displayEnd, " of ", displayTotalRows] }), _jsxs("div", { className: "ml-auto flex flex-nowrap items-center gap-3", children: [onPageSizeChange && (_jsx("select", { className: "h-9 rounded-md border bg-background px-3 py-1 text-sm whitespace-nowrap", value: pageSize, "aria-label": "Items per page", onChange: (e) => { onPageSizeChange(Number(e.target.value)); onPageChange(1); }, children: pageSizeOptions.map((s) => _jsxs("option", { value: s, children: [s, " per page"] }, s)) })), _jsx(Button, { variant: "secondary", size: "sm", disabled: page <= 1, onClick: () => onPageChange(page - 1), children: "Previous" }), _jsxs("div", { className: "flex flex-nowrap items-center gap-2 whitespace-nowrap", children: [_jsx("span", { children: "Page" }), _jsx(Input, { className: "h-9 w-16 text-center", value: jumpInput, "aria-label": "Page number", onChange: (e) => setJumpInput(e.target.value), onKeyDown: (e) => { if (e.key === "Enter")
                                            handleJump(e.currentTarget.value); }, onBlur: (e) => handleJump(e.currentTarget.value) }), _jsxs("span", { className: "whitespace-nowrap", children: ["of ", totalPages] })] }), _jsx(Button, { variant: "secondary", size: "sm", disabled: page >= totalPages, onClick: () => onPageChange(page + 1), children: "Next" })] })] }))] }));
}
