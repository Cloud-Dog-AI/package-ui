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
// @cloud-dog/ui — MessageList pattern (message/inbox list with bulk actions).
import * as React from "react";
import { Badge } from "../components/layout/Badge";
import { Checkbox } from "../components/input/Checkbox";
import { Button } from "../components/button/Button";
import { RelativeTime } from "./RelativeTime";
import { cn } from "../utils/cn";
const BULK_ACTIONS = [
    { action: "mark-read", label: "Mark read" },
    { action: "archive", label: "Archive" },
    { action: "delete", label: "Delete" },
];
function badgeVariantForStatus(status) {
    const normalized = status.trim().toLowerCase();
    if (["failed", "bounced", "deleted", "error"].includes(normalized)) {
        return "destructive";
    }
    if (["draft", "queued", "archived", "pending"].includes(normalized)) {
        return "secondary";
    }
    return "default";
}
export function MessageList(props) {
    const [selectedIds, setSelectedIds] = React.useState(new Set());
    React.useEffect(() => {
        setSelectedIds((current) => {
            const validIds = new Set(props.messages.map((message) => message.id));
            const next = new Set([...current].filter((id) => validIds.has(id)));
            return next.size === current.size ? current : next;
        });
    }, [props.messages]);
    const allSelected = props.messages.length > 0 && props.messages.every((message) => selectedIds.has(message.id));
    const toggleSelection = (id, checked) => {
        setSelectedIds((current) => {
            const next = new Set(current);
            if (checked) {
                next.add(id);
            }
            else {
                next.delete(id);
            }
            return next;
        });
    };
    const toggleAll = (checked) => {
        setSelectedIds(checked ? new Set(props.messages.map((message) => message.id)) : new Set());
    };
    const runBulkAction = (action) => {
        if (!props.onBulkAction || selectedIds.size === 0) {
            return;
        }
        props.onBulkAction(action, [...selectedIds]);
    };
    return (_jsxs("section", { className: cn("rounded-xl border bg-card text-card-foreground shadow-sm", props.className), children: [_jsxs("header", { className: "flex flex-wrap items-center gap-2 border-b px-4 py-3", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-sm font-semibold", children: "Messages" }), _jsx("p", { className: "text-xs text-muted-foreground", children: props.loading ? "Loading messages..." : `${props.messages.length} total` })] }), props.onBulkAction ? (_jsxs("div", { className: "ml-auto flex flex-wrap items-center gap-2", children: [_jsxs("label", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [_jsx(Checkbox, { checked: allSelected, onChange: (event) => toggleAll(event.currentTarget.checked), "aria-label": "Select all messages" }), "Select all"] }), BULK_ACTIONS.map((item) => (_jsx(Button, { type: "button", variant: item.action === "delete" ? "destructive" : "secondary", size: "sm", disabled: selectedIds.size === 0, onClick: () => runBulkAction(item.action), children: item.label }, item.action)))] })) : null] }), _jsx("div", { className: "divide-y", children: props.loading ? (_jsx("div", { className: "px-4 py-8 text-sm text-muted-foreground", children: "Loading message list..." })) : props.messages.length === 0 ? (_jsx("div", { className: "px-4 py-8 text-sm text-muted-foreground", children: "No messages available." })) : (props.messages.map((message) => {
                    const active = props.selectedId === message.id;
                    const bulkSelected = selectedIds.has(message.id);
                    return (_jsxs("article", { role: "button", tabIndex: 0, "aria-pressed": active, className: cn("flex gap-3 px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", active ? "bg-primary/5" : "hover:bg-muted/40"), onClick: () => props.onSelect(message.id), onKeyDown: (event) => {
                            if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                props.onSelect(message.id);
                            }
                        }, children: [props.onBulkAction ? (_jsx("div", { className: "pt-1", children: _jsx(Checkbox, { checked: bulkSelected, "aria-label": `Select message ${message.subject}`, onClick: (event) => event.stopPropagation(), onChange: (event) => toggleSelection(message.id, event.currentTarget.checked) }) })) : null, _jsx("div", { className: cn("mt-1 h-2.5 w-2.5 flex-none rounded-full", message.unread ? "bg-primary" : "bg-transparent"), "aria-hidden": "true" }), _jsxs("div", { className: "min-w-0 flex-1 space-y-1", children: [_jsxs("div", { className: "flex flex-wrap items-start justify-between gap-2", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: cn("truncate text-sm", message.unread ? "font-semibold text-foreground" : "font-medium text-foreground"), children: message.sender }), _jsx("p", { className: "truncate text-sm text-foreground", children: message.subject })] }), _jsx(RelativeTime, { timestamp: message.timestamp, className: "text-xs text-muted-foreground" })] }), _jsx("p", { className: "line-clamp-2 text-sm text-muted-foreground", children: message.preview }), _jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx(Badge, { variant: badgeVariantForStatus(message.status), children: message.status }), message.attachmentCount ? (_jsxs(Badge, { variant: "secondary", children: [message.attachmentCount, " attachment", message.attachmentCount === 1 ? "" : "s"] })) : null, message.unread ? _jsx("span", { className: "text-xs font-medium text-primary", children: "Unread" }) : null] })] })] }, message.id));
                })) })] }));
}
