import { type Ps72ExecuteResult, type Ps72HealthState } from "./metaTypes";
export type Ps72McpTool = Readonly<{
    name: string;
    description?: string;
    inputSchema?: unknown;
    /** §9 RBAC: false when the user is not bound to this tool (rendered locked). */
    bound?: boolean;
}>;
export type Ps72McpConsoleProps = Readonly<{
    /** Endpoint shown under the header (informational). */
    endpointUrl: string;
    /** Full discoverable tool list (count MUST equal server list_tools — T.1.1). */
    tools: Ps72McpTool[];
    /** Top-of-page health state (§1 / §7). */
    health: Ps72HealthState;
    /** Whether the logged-in user has a bound key (§2). */
    hasBoundKey: boolean;
    /** Masked label for the bound identity, e.g. "session • cookie" or "••••1234". */
    boundLabel: string;
    /** Docs link target (§6) — routes to the Docs page (PS-74). */
    docsHref: string;
    /** Jobs page target (§4.4 / PS-76). */
    jobsHref: string;
    /** Execute a tool call; override is the admin API key (blank => bound identity). */
    onExecute: (toolName: string, args: unknown, overrideKey: string) => Promise<Ps72ExecuteResult>;
}>;
export declare function Ps72McpConsole(props: Ps72McpConsoleProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Ps72McpConsole.d.ts.map