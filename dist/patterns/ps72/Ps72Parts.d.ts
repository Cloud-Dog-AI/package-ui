import { type Ps72HealthState, type Ps72Meta } from "./metaTypes";
/** PS-72 v2 §1 top-of-page status badge (healthy/degraded/unhealthy/unknown only). */
export declare function Ps72HealthBadge(props: {
    state: Ps72HealthState;
    testId: string;
}): import("react/jsx-runtime").JSX.Element;
/**
 * PS-72 v2 §2 API-key field. Defaults to the logged-in user's bound identity.
 * The admin override is masked (type=password) and the value is only sent on the
 * API call, never logged client-side (§2.4).
 */
export declare function Ps72ApiKeyField(props: {
    testIdPrefix: string;
    boundLabel: string;
    hasBoundKey: boolean;
    overrideValue: string;
    onOverrideChange: (value: string) => void;
}): import("react/jsx-runtime").JSX.Element;
/**
 * PS-72 v2 §5 result widget + meta panel. The meta panel is a horizontal row of
 * labelled chips directly below the result widget. correlation_id / request_id
 * are NEVER N/A (client-generated fallback is flagged per §5.1).
 */
export declare function Ps72ResultMeta(props: {
    testIdPrefix: string;
    result: unknown | null;
    meta: Ps72Meta | null;
    denied: boolean;
    jobId?: string | null;
    jobsHref?: string;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Ps72Parts.d.ts.map