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
// @cloud-dog/ui — PS-40 NIST AU-3 compliant log DataTable panel (shared pattern).
// Covers: UI-R11, UI-R25. Consolidated from chat-client, expert-agent, notification-agent.
import * as React from 'react';
import { Button } from '../components/button/Button';
import { Card, CardContent, CardHeader } from '../components/card/Card';
import { DataTable } from '../components/table/DataTable';
import { Input } from '../components/input/Input';
import { Select } from '../components/input/Select';
import { StructuredView } from './StructuredView';
import { RelativeTime } from './RelativeTime';
// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------
const DEFAULT_LOG_SURFACES = [
    { id: 'audit', label: 'Audit' },
    { id: 'api', label: 'API' },
    { id: 'web', label: 'Web' },
    { id: 'mcp', label: 'MCP' },
    { id: 'a2a', label: 'A2A' },
];
const DEFAULT_VISIBLE_COLUMNS = [
    'timestamp', 'who', 'action', 'target', 'outcome', 'severity',
    'traceId', 'service', 'message', 'inspect',
];
// ---------------------------------------------------------------------------
// Formatters
// ---------------------------------------------------------------------------
function formatLocalTimestamp(value) {
    if (!value)
        return 'N/A';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime()))
        return value;
    return parsed.toLocaleString();
}
function formatActor(value) {
    return `${value?.type ?? 'unknown'}:${value?.id ?? 'N/A'}`;
}
function formatTarget(value) {
    return `${value?.type ?? 'unknown'}:${value?.id ?? 'N/A'}`;
}
function formatService(row) {
    return `${row.service ?? 'N/A'} / ${row.service_instance ?? 'N/A'}`;
}
function detailsSummary(value) {
    if (!value)
        return 'N/A';
    const parts = Object.entries(value)
        .slice(0, 3)
        .map(([key, item]) => `${key}=${typeof item === 'string' ? item : JSON.stringify(item)}`);
    return parts.length ? parts.join(' | ') : 'N/A';
}
function searchText(row) {
    return [
        row.surface_label, row.message, row.logger, row.event_type,
        row.action, row.outcome, row.severity, row.trace_id,
        row.request_id, row.service, row.service_instance, row.environment,
        row.actor?.type, row.actor?.id, row.actor?.ip,
        row.actor?.roles?.join(' '), row.actor?.user_agent,
        row.target?.type, row.target?.id, row.target?.name,
        row.source_path, row.timestamp,
        row.details ? JSON.stringify(row.details) : '',
    ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
}
// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function LogTablePanel(props) {
    const { api, tableId, title, description, initialSurface = 'audit', limit = 100, embedded = false, defaultVisibleColumns = DEFAULT_VISIBLE_COLUMNS, refreshInterval = 30_000, followTailDefault = true, } = props;
    const [surface, setSurface] = React.useState(initialSurface);
    const [payload, setPayload] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [status, setStatus] = React.useState(null);
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(limit <= 10 ? limit : 25);
    const [query, setQuery] = React.useState('');
    const deferredQuery = React.useDeferredValue(query);
    const [followTail, setFollowTail] = React.useState(followTailDefault);
    const [lastRefreshAt, setLastRefreshAt] = React.useState(null);
    const [selectedEntry, setSelectedEntry] = React.useState(null);
    const [hiddenIds, setHiddenIds] = React.useState(new Set());
    const [tableReady, setTableReady] = React.useState(typeof window === 'undefined');
    React.useEffect(() => {
        if (typeof window === 'undefined') {
            setTableReady(true);
            return;
        }
        const storageKey = `dt.cols.${tableId}`;
        try {
            if (!window.localStorage.getItem(storageKey)) {
                window.localStorage.setItem(storageKey, JSON.stringify(defaultVisibleColumns));
            }
        }
        catch {
            // Ignore localStorage failures.
        }
        setTableReady(true);
    }, [defaultVisibleColumns, tableId]);
    const refresh = React.useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const next = await api.getLogs({
                surface,
                limit,
                query: deferredQuery.trim() || undefined,
            });
            setPayload(next);
            setHiddenIds(new Set());
            setStatus(`Loaded ${next.count} ${next.surface_label ?? surface.toUpperCase()} entries from ${next.source_path ?? 'configured source'}.`);
            setLastRefreshAt(new Date().toISOString());
        }
        catch (loadError) {
            setError(loadError instanceof Error ? loadError.message : 'Failed to load logs.');
        }
        finally {
            setLoading(false);
        }
    }, [api, deferredQuery, limit, surface]);
    React.useEffect(() => {
        void refresh();
    }, [refresh]);
    React.useEffect(() => {
        if (!followTail || refreshInterval <= 0)
            return;
        const timer = window.setInterval(() => { void refresh(); }, refreshInterval);
        return () => window.clearInterval(timer);
    }, [followTail, refresh, refreshInterval]);
    React.useEffect(() => {
        setPage(1);
        setSelectedEntry(null);
    }, [surface, deferredQuery]);
    const availableSurfaces = payload?.available_surfaces?.length
        ? payload.available_surfaces
        : DEFAULT_LOG_SURFACES;
    const rows = React.useMemo(() => {
        const needle = deferredQuery.trim().toLowerCase();
        return (payload?.entries ?? []).filter((row) => {
            if (hiddenIds.has(row.id))
                return false;
            if (!needle)
                return true;
            return searchText(row).includes(needle);
        });
    }, [deferredQuery, hiddenIds, payload?.entries]);
    const handleBulkAction = React.useCallback((_action, selectedIds) => {
        if (_action !== 'delete' || !selectedIds.length)
            return;
        const selectedSet = new Set(selectedIds);
        setHiddenIds((previous) => {
            const next = new Set(previous);
            for (const id of selectedSet)
                next.add(id);
            return next;
        });
        setSelectedEntry((current) => (current && selectedSet.has(current.id) ? null : current));
        setStatus(`Removed ${selectedIds.length} selected rows from the current view. Refresh to reload from disk.`);
    }, []);
    const columns = React.useMemo(() => [
        { id: 'who', header: 'Who', sortable: true, sortValue: (row) => `${row.actor?.type ?? ''}:${row.actor?.id ?? ''}`, cell: (row) => _jsx("span", { className: "font-mono text-xs", children: formatActor(row.actor) }) },
        { id: 'from', header: 'From', sortable: true, sortValue: (row) => row.actor?.ip ?? '', cell: (row) => _jsx("span", { className: "font-mono text-xs", children: row.actor?.ip ?? 'N/A' }) },
        { id: 'eventType', header: 'Event Type', sortable: true, sortValue: (row) => row.event_type ?? '', cell: (row) => row.event_type ?? 'N/A' },
        { id: 'action', header: 'Action', sortable: true, sortValue: (row) => row.action ?? '', cell: (row) => row.action ?? 'N/A' },
        { id: 'target', header: 'Target', sortable: true, sortValue: (row) => `${row.target?.type ?? ''}:${row.target?.id ?? ''}`, cell: (row) => _jsx("span", { className: "font-mono text-xs", children: formatTarget(row.target) }) },
        { id: 'outcome', header: 'Outcome', sortable: true, sortValue: (row) => row.outcome ?? '', cell: (row) => row.outcome ?? 'N/A' },
        { id: 'severity', header: 'Severity', sortable: true, sortValue: (row) => row.severity ?? row.level ?? '', cell: (row) => row.severity ?? row.level ?? 'N/A' },
        { id: 'timestamp', header: 'Timestamp', sortable: true, sortValue: (row) => row.timestamp ?? '', cell: (row) => _jsx(RelativeTime, { timestamp: row.timestamp ?? '', className: "font-mono text-xs" }) },
        { id: 'traceId', header: 'Trace ID', sortable: true, sortValue: (row) => row.trace_id ?? '', cell: (row) => _jsx("span", { className: "font-mono text-xs break-all", children: row.trace_id ?? 'N/A' }) },
        { id: 'requestId', header: 'Request ID', sortable: true, sortValue: (row) => row.request_id ?? '', cell: (row) => _jsx("span", { className: "font-mono text-xs break-all", children: row.request_id ?? 'N/A' }) },
        { id: 'service', header: 'Service', sortable: true, sortValue: (row) => `${row.service ?? ''}:${row.service_instance ?? ''}`, cell: (row) => _jsx("span", { className: "font-mono text-xs", children: formatService(row) }) },
        { id: 'actorRoles', header: 'Actor Roles', sortable: true, sortValue: (row) => row.actor?.roles?.join(',') ?? '', cell: (row) => row.actor?.roles?.length ? row.actor.roles.join(', ') : 'N/A' },
        { id: 'userAgent', header: 'User Agent', sortable: true, sortValue: (row) => row.actor?.user_agent ?? '', cell: (row) => _jsx("span", { className: "font-mono text-xs break-all", children: row.actor?.user_agent ?? 'N/A' }) },
        { id: 'targetName', header: 'Target Name', sortable: true, sortValue: (row) => row.target?.name ?? '', cell: (row) => row.target?.name ?? 'N/A' },
        { id: 'details', header: 'Details', sortable: true, sortValue: (row) => detailsSummary(row.details), cell: (row) => _jsx("span", { className: "font-mono text-xs break-all", children: detailsSummary(row.details) }) },
        { id: 'message', header: 'Message', sortable: true, sortValue: (row) => row.message ?? '', cell: (row) => _jsx("span", { className: "font-mono text-xs break-all", children: row.message ?? 'N/A' }) },
        { id: 'source', header: 'Source', sortable: true, sortValue: (row) => row.surface_label ?? row.surface, cell: (row) => row.surface_label ?? row.surface.toUpperCase() },
        { id: 'environment', header: 'Environment', sortable: true, sortValue: (row) => row.environment ?? '', cell: (row) => row.environment ?? 'N/A' },
        { id: 'inspect', header: 'Inspect', cell: (row) => _jsx(Button, { type: "button", size: "sm", variant: "secondary", onClick: () => setSelectedEntry(row), children: "View" }) },
    ], []);
    const refreshSeconds = Math.round(refreshInterval / 1000);
    const body = (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex flex-wrap items-end gap-3", children: [_jsxs("label", { className: "space-y-1 text-sm", children: [_jsx("span", { children: "Log source" }), _jsx(Select, { className: "h-10 rounded-md border border-input bg-background px-3 text-sm", "aria-label": "Log source", value: surface, onChange: (event) => setSurface(event.target.value), children: availableSurfaces.map((item) => (_jsx("option", { value: item.id, children: item.label }, item.id))) })] }), _jsxs("label", { className: "min-w-[16rem] flex-1 space-y-1 text-sm", children: [_jsx("span", { children: "Search" }), _jsx(Input, { "aria-label": "Search logs", value: query, onChange: (event) => setQuery(event.target.value), placeholder: "Filter by actor, action, target, trace ID, request ID, or message" })] }), _jsx(Button, { type: "button", variant: "secondary", onClick: () => void refresh(), children: "Refresh" }), _jsx(Button, { type: "button", variant: followTail ? 'secondary' : 'default', onClick: () => setFollowTail((c) => !c), children: followTail ? 'Pause tail' : 'Follow tail' })] }), _jsxs("div", { className: "space-y-1 text-sm text-muted-foreground", children: [_jsxs("p", { children: ["Current source: ", payload?.surface_label ?? availableSurfaces.find((item) => item.id === surface)?.label ?? surface.toUpperCase()] }), _jsxs("p", { children: ["Path: ", payload?.source_path ?? 'Configured at runtime'] }), _jsxs("p", { children: ["Tail mode: ", followTail ? `Following with ${refreshSeconds}s refresh` : 'Paused', lastRefreshAt ? ` \u00b7 last refresh ${formatLocalTimestamp(lastRefreshAt)}` : ''] })] }), loading ? _jsx("p", { className: "text-sm text-muted-foreground", children: "Loading live log entries..." }) : null, error ? _jsx("p", { role: "alert", className: "text-sm text-destructive", children: error }) : null, status ? _jsx("p", { role: "status", className: "text-sm text-foreground/80", children: status }) : null, tableReady ? (_jsx(DataTable, { tableId: tableId, columns: columns, rows: rows, getRowId: (row) => row.id, emptyMessage: error ? 'Log feed unavailable.' : 'No log entries match the current filter.', page: page, onPageChange: setPage, pageSize: pageSize, onPageSizeChange: setPageSize, selectable: true, bulkActions: [{ label: 'Delete selected', action: 'delete' }], onBulkAction: handleBulkAction, columnPickerEnabled: true })) : null, selectedEntry ? (_jsx(StructuredView, { title: "Log entry detail", value: selectedEntry.raw ?? selectedEntry })) : null] }));
    if (embedded) {
        return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("h2", { className: "text-lg font-semibold", children: title }), _jsx("p", { className: "text-sm text-muted-foreground", children: description })] }), body] }));
    }
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "space-y-1", children: [_jsx("h2", { className: "text-lg font-semibold", children: title }), _jsx("p", { className: "text-sm text-muted-foreground", children: description })] }), _jsx(CardContent, { children: body })] }));
}
