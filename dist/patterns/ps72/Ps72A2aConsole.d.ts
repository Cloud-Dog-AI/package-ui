import { type Ps72ExecuteResult, type Ps72HealthState } from "./metaTypes";
export type Ps72A2aEvent = Readonly<{
    id: string;
    timestamp: string;
    type: string;
    summary: string;
    payload: unknown;
}>;
export type Ps72A2aConsoleProps = Readonly<{
    endpointUrl: string;
    /** Parsed agent card from the server card endpoint (§8.1) — null => unhealthy. */
    agentCard: Record<string, unknown> | null;
    /** Card-described skills/actions to populate the request template (§3.2). */
    skills: string[];
    health: Ps72HealthState;
    hasBoundKey: boolean;
    boundLabel: string;
    docsHref: string;
    jobsHref: string;
    /** Send an A2A task; returns the final result + correlation/request metadata. */
    onSend: (action: string, payload: unknown, overrideKey: string) => Promise<Ps72ExecuteResult>;
}>;
export declare function Ps72A2aConsole(props: Ps72A2aConsoleProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Ps72A2aConsole.d.ts.map