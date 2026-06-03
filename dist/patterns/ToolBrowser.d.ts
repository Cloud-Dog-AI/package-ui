export type ToolDef = Readonly<{
    name: string;
    description: string;
    inputSchema?: Record<string, unknown>;
}>;
export type ToolBrowserProps = Readonly<{
    tools: ToolDef[];
    onSelect?: (tool: ToolDef) => void;
    className?: string;
}>;
export declare function ToolBrowser(props: ToolBrowserProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ToolBrowser.d.ts.map