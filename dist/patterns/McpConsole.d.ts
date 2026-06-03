export type McpToolDef = Readonly<{
    name: string;
    description?: string;
    inputSchema?: unknown;
}>;
export type McpConsoleProps = Readonly<{
    endpointUrl: string;
    tools: McpToolDef[];
    onExecute: (toolName: string, args: unknown) => Promise<unknown>;
    className?: string;
}>;
export declare function McpConsole(props: McpConsoleProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=McpConsole.d.ts.map