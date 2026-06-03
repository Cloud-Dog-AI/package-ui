export type LogEntry = Readonly<{
    id: string;
    timestamp: string;
    level: string;
    message: string;
    source?: string;
}>;
export type LogStreamProps = Readonly<{
    entries: LogEntry[];
    autoFollow?: boolean;
    levelFilter?: string;
    searchFilter?: string;
    className?: string;
}>;
export declare function LogStream(props: LogStreamProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=LogStream.d.ts.map