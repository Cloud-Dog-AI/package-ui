export type MetricTrend = "up" | "down" | "flat";
export type MetricCardProps = Readonly<{
    label: string;
    value: string | number;
    unit?: string;
    trend?: MetricTrend;
    tone?: "default" | "success" | "warning" | "danger";
    className?: string;
}>;
export declare function MetricCard(props: MetricCardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=MetricCard.d.ts.map