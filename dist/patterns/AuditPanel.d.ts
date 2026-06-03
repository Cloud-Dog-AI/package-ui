import type { LogEntry } from "./LogStream";
export type AuditPanelProps = Readonly<{
    logTypes: string[];
    activeType: string;
    onTypeChange: (type: string) => void;
    logs: LogEntry[];
    onFilter?: (level: string, search: string) => void;
    onRefresh?: () => void;
    autoFollow?: boolean;
    onAutoFollowChange?: (follow: boolean) => void;
    className?: string;
}>;
export declare function AuditPanel(props: AuditPanelProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AuditPanel.d.ts.map