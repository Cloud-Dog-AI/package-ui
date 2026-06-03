export type ApiDocLink = Readonly<{
    label: string;
    href: string;
}>;
export type ApiDocsMode = "swagger" | "redoc" | "iframe";
export type McpToolDoc = Readonly<{
    name: string;
    description: string;
    parameters?: unknown;
}>;
export type A2aSkillDoc = Readonly<{
    name: string;
    description: string;
}>;
export type ApiDocsPanelProps = Readonly<{
    openapiUrl: string;
    links?: ApiDocLink[];
    className?: string;
    mode?: ApiDocsMode;
    mcpTools?: McpToolDoc[];
    a2aSkills?: A2aSkillDoc[];
    readmeContent?: string;
    readmeTitle?: string;
}>;
export declare function ApiDocsPanel(props: ApiDocsPanelProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ApiDocsPanel.d.ts.map