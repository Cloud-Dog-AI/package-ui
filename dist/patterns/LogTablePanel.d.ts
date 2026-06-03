export type AuditLogEntry = {
    id: string;
    timestamp?: string | null;
    event_type?: string | null;
    action?: string | null;
    outcome?: string | null;
    severity?: string | null;
    level?: string | null;
    message?: string | null;
    trace_id?: string | null;
    request_id?: string | null;
    service?: string | null;
    service_instance?: string | null;
    environment?: string | null;
    surface: string;
    surface_label?: string | null;
    source_path?: string | null;
    logger?: string | null;
    actor?: {
        type?: string | null;
        id?: string | null;
        ip?: string | null;
        roles?: string[] | null;
        user_agent?: string | null;
    } | null;
    target?: {
        type?: string | null;
        id?: string | null;
        name?: string | null;
        path?: string | null;
    } | null;
    details?: Record<string, unknown> | null;
    raw?: unknown;
};
export type LogSurface = {
    id: string;
    label: string;
};
export type LogsResponse = {
    entries: AuditLogEntry[];
    available_surfaces?: LogSurface[];
    surface_label?: string | null;
    source_path?: string | null;
    count: number;
};
export type LogApiAdapter = {
    getLogs(params: {
        limit: number;
        surface: string;
        query?: string;
    }): Promise<LogsResponse>;
};
export type LogTablePanelProps = Readonly<{
    api: LogApiAdapter;
    tableId: string;
    title: string;
    description: string;
    initialSurface?: string;
    limit?: number;
    embedded?: boolean;
    defaultVisibleColumns?: string[];
    refreshInterval?: number;
    followTailDefault?: boolean;
}>;
export declare function LogTablePanel(props: LogTablePanelProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=LogTablePanel.d.ts.map