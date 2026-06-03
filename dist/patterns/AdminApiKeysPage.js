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
// @cloud-dog/ui — AdminApiKeysPage pattern (standard API key admin template).
import * as React from "react";
import { cn } from "../utils/cn";
import { Button } from "../components/button/Button";
import { DataTable } from "../components/table/DataTable";
import { Badge } from "../components/layout/Badge";
import { ConfirmDialog } from "../components/dialog/ConfirmDialog";
const defaultColumns = [
    { id: "name", header: "Name", sortable: true, sortValue: (r) => String(r.name ?? r.label ?? ""), cell: (r) => String(r.name ?? r.label ?? "") },
    { id: "prefix", header: "Key Prefix", sortable: true, sortValue: (r) => String(r.prefix ?? r.id ?? ""), cell: (r) => String(r.prefix ?? r.id ?? "") },
    { id: "owner", header: "Owner", sortable: true, sortValue: (r) => String(r.owner ?? r.user_id ?? ""), cell: (r) => String(r.owner ?? r.user_id ?? "") },
    { id: "scopes", header: "Scopes", sortable: true, sortValue: (r) => String(Array.isArray(r.scopes) ? r.scopes.join(",") : r.scopes ?? ""), cell: (r) => { const items = Array.isArray(r.scopes) ? r.scopes : String(r.scopes ?? "").split(",").map(s => s.trim()).filter(Boolean); return items.length ? _jsx("span", { className: "flex flex-wrap gap-1", children: items.map((s, i) => _jsx(Badge, { variant: "secondary", children: String(s) }, i)) }) : ""; } },
    { id: "status", header: "Status", sortable: true, sortValue: (r) => String(r.status ?? "active"), cell: (r) => String(r.status ?? "active") },
    { id: "createdAt", header: "Created", sortable: true, sortValue: (r) => String(r.createdAt ?? r.created_at ?? ""), cell: (r) => String(r.createdAt ?? r.created_at ?? "") },
];
export function AdminApiKeysPage(props) {
    const columns = (props.columns ?? defaultColumns);
    const [confirmRevoke, setConfirmRevoke] = React.useState(null);
    const actionColumn = {
        id: "__actions",
        header: "Actions",
        cell: (row) => (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => setConfirmRevoke(row), children: "Revoke" })),
    };
    return (_jsxs("div", { className: cn("space-y-4", props.className), children: [_jsxs("header", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-xl font-semibold", children: props.title ?? "API Keys" }), _jsx(Button, { size: "sm", onClick: props.onCreateKey, children: "Create Key" })] }), _jsx("div", { className: "rounded-md border bg-background", children: _jsx(DataTable, { columns: [...columns, actionColumn], rows: props.apiKeys, emptyMessage: "No API keys found.", getRowId: props.getRowId, selectable: props.selectable, bulkActions: props.bulkActions, onBulkAction: props.onBulkAction }) }), _jsx(ConfirmDialog, { open: !!confirmRevoke, onOpenChange: (o) => { if (!o)
                    setConfirmRevoke(null); }, title: "Revoke API Key", description: "Are you sure you want to revoke this API key?", targetName: confirmRevoke ? String(confirmRevoke.name ?? confirmRevoke.id ?? "") : undefined, confirmLabel: "Revoke", onConfirm: () => {
                    if (confirmRevoke)
                        props.onRevokeKey(confirmRevoke);
                    setConfirmRevoke(null);
                } })] }));
}
