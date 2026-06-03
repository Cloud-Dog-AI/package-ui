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
// @cloud-dog/ui — AdminRbacPage: Standard RBAC binding management (UI-R18).
import * as React from "react";
import { cn } from "../utils/cn";
import { Badge } from "../components/layout/Badge";
import { Button } from "../components/button/Button";
import { DataTable } from "../components/table/DataTable";
export function AdminRbacPage(props) {
    const [userId, setUserId] = React.useState("");
    const [role, setRole] = React.useState("");
    const [resource, setResource] = React.useState("");
    const columns = [
        {
            id: "userId",
            header: "User",
            sortable: true,
            sortValue: (r) => r.userId,
            cell: (r) => (props.renderUserCell ? props.renderUserCell(r.userId) : r.userId),
        },
        {
            id: "groupId",
            header: "Group",
            sortable: true,
            sortValue: (r) => r.groupId ?? "",
            cell: (r) => (props.renderGroupCell ? props.renderGroupCell(r.groupId) : r.groupId ?? "-"),
        },
        {
            id: "role",
            header: "Role",
            sortable: true,
            sortValue: (r) => r.role,
            cell: (r) => _jsx(Badge, { variant: "default", children: r.role }),
        },
        {
            id: "resource",
            header: "Resource",
            sortable: true,
            sortValue: (r) => r.resource ?? "*",
            cell: (r) => props.renderResourceCell ? props.renderResourceCell(r.resource) : r.resource ?? "*",
        },
    ];
    const actionColumn = {
        id: "__actions",
        header: "Actions",
        cell: (row) => (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => props.onUnbind(row.id), children: "Remove" })),
    };
    const handleBind = () => {
        if (!userId || !role)
            return;
        props.onBind(userId, role, resource || undefined);
        setUserId("");
        setRole("");
        setResource("");
    };
    return (_jsxs("div", { className: cn("space-y-4", props.className), children: [_jsxs("header", { className: "space-y-1", children: [_jsx("h2", { className: "text-lg font-semibold", children: props.title ?? "Role Assignments" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Direct user \u2192 role assignments (separate from group-derived roles)." })] }), _jsxs("div", { className: "rounded-md border bg-background p-4 space-y-3", children: [_jsx("h3", { className: "text-sm font-medium", children: "Add binding" }), _jsxs("div", { className: "flex flex-wrap items-end gap-2", children: [_jsxs("label", { htmlFor: "rbac-user", className: "space-y-1 text-sm", children: [_jsx("span", { children: "User" }), _jsxs("select", { id: "rbac-user", name: "user", "aria-label": "User", className: "block w-40 rounded border px-2 py-1 text-sm", value: userId, onChange: (e) => setUserId(e.target.value), children: [_jsx("option", { value: "", children: "Select user" }), (props.users ?? []).map((u) => (_jsx("option", { value: u.id, children: u.name }, u.id)))] })] }), _jsxs("label", { htmlFor: "rbac-role", className: "space-y-1 text-sm", children: [_jsx("span", { children: "Role" }), _jsxs("select", { id: "rbac-role", name: "role", "aria-label": "Role", className: "block w-40 rounded border px-2 py-1 text-sm", value: role, onChange: (e) => setRole(e.target.value), children: [_jsx("option", { value: "", children: "Select role" }), (props.roles ?? []).map((r) => (_jsx("option", { value: r, children: r }, r)))] })] }), _jsxs("label", { htmlFor: "rbac-group", className: "space-y-1 text-sm", children: [_jsx("span", { children: "Group" }), (props.groups ?? []).length > 0 ? (_jsxs("select", { id: "rbac-group", name: "group", "aria-label": "Group", className: "block w-40 rounded border px-2 py-1 text-sm", value: resource, onChange: (e) => setResource(e.target.value), children: [_jsx("option", { value: "", children: "No group" }), (props.groups ?? []).map((g) => (_jsx("option", { value: g.name, children: g.name }, g.id)))] })) : (_jsx("input", { id: "rbac-group", name: "group", "aria-label": "Group", className: "block w-40 rounded border px-2 py-1 text-sm", value: resource, onChange: (e) => setResource(e.target.value), placeholder: "Group name" }))] }), _jsx(Button, { size: "sm", onClick: handleBind, children: "Bind" })] })] }), _jsx("div", { className: "rounded-md border bg-background", children: _jsx(DataTable, { columns: [...columns, actionColumn], rows: props.bindings, emptyMessage: "No role bindings.", selectable: props.selectable, bulkActions: props.bulkActions, onBulkAction: props.onBulkAction }) }), props.roleDefinitions?.length ? (_jsxs("div", { className: "rounded-md border bg-background p-4", children: [_jsx("h2", { className: "mb-2 text-sm font-medium", children: "Role Definitions" }), _jsx("div", { className: "space-y-2", children: props.roleDefinitions.map((rd) => (_jsxs("div", { className: "flex items-start gap-2 text-sm", children: [_jsx(Badge, { variant: "default", children: rd.name }), _jsx("span", { className: "text-muted-foreground", children: rd.description ?? "" }), rd.permissions?.length ? (_jsxs("span", { className: "text-xs text-muted-foreground", children: ["(", rd.permissions.join(", "), ")"] })) : null] }, rd.name))) })] })) : null] }));
}
