export type HealthStatus = "ok" | "warning" | "error" | "unknown";
export type HealthWidgetProps = Readonly<{
    name: string;
    status: HealthStatus;
    detail?: string;
    url?: string;
    className?: string;
}>;
export declare function HealthWidget(props: HealthWidgetProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=HealthWidget.d.ts.map