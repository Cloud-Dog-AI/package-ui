import type { StatusTone } from "./StatusCard";
export type MetricItem = Readonly<{
    label: string;
    value: string;
    unit?: string;
    tone?: StatusTone;
}>;
export type ResourceMetricsProps = Readonly<{
    metrics: MetricItem[];
    fetchUrl?: string;
    intervalMs?: number;
    getAccessToken?: () => string | null;
    className?: string;
}>;
export declare function ResourceMetrics(props: ResourceMetricsProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ResourceMetrics.d.ts.map