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
// @cloud-dog/ui — AdminUsersPage pattern (standard user admin template).
import * as React from "react";
import { cn } from "../utils/cn";
import { Button } from "../components/button/Button";
import { DataTable } from "../components/table/DataTable";
import { Dialog } from "../components/dialog/Dialog";
const defaultColumns = [
    { id: "name", header: "Name", sortable: true, sortValue: (r) => String(r.name ?? r.username ?? r.display_name ?? ""), cell: (r) => String(r.name ?? r.username ?? r.display_name ?? "") },
    { id: "email", header: "Email", sortable: true, sortValue: (r) => String(r.email ?? ""), cell: (r) => String(r.email ?? "") },
    { id: "role", header: "Role", sortable: true, sortValue: (r) => String(r.role ?? ""), cell: (r) => String(r.role ?? "") },
    { id: "status", header: "Status", sortable: true, sortValue: (r) => String(r.status ?? (r.is_active ? "active" : "disabled")), cell: (r) => String(r.status ?? (r.is_active ? "active" : "disabled")) },
    { id: "createdAt", header: "Created", sortable: true, sortValue: (r) => String(r.created_at ?? r.createdAt ?? ""), cell: (r) => String(r.created_at ?? r.createdAt ?? "") },
];
export function AdminUsersPage(props) {
    const columns = (props.columns ?? defaultColumns);
    const [confirmDelete, setConfirmDelete] = React.useState(null);
    const actionColumn = {
        id: "__actions",
        header: "Actions",
        cell: (row) => (_jsxs("div", { className: "flex items-center gap-1", children: [props.onEditUser ? (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => props.onEditUser(row), children: "Edit" })) : null, props.onToggleStatus ? (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => props.onToggleStatus(row), children: "Toggle" })) : null, props.onResetPassword ? (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => props.onResetPassword(row), children: "Reset Password" })) : null, _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setConfirmDelete(row), children: "Delete" })] })),
    };
    return (_jsxs("div", { className: cn("space-y-4", props.className), children: [_jsxs("header", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-xl font-semibold", children: props.title ?? "Users" }), _jsx(Button, { size: "sm", onClick: props.onCreateUser, children: "Create User" })] }), _jsx("div", { className: "rounded-md border bg-background", children: _jsx(DataTable, { columns: [...columns, actionColumn], rows: props.users, emptyMessage: "No users found.", getRowId: props.getRowId, selectable: props.selectable, bulkActions: props.bulkActions, onBulkAction: props.onBulkAction }) }), _jsx(Dialog, { open: !!confirmDelete, onOpenChange: (o) => { if (!o)
                    setConfirmDelete(null); }, label: "Confirm delete", children: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-sm", children: "Are you sure you want to delete this user?" }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(Button, { variant: "secondary", size: "sm", onClick: () => setConfirmDelete(null), children: "Cancel" }), _jsx(Button, { variant: "destructive", size: "sm", onClick: () => {
                                        if (confirmDelete)
                                            props.onDeleteUser(confirmDelete);
                                        setConfirmDelete(null);
                                    }, children: "Delete" })] })] }) })] }));
}
