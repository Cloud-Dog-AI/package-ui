export type StatusTone = "ok" | "warning" | "error" | "neutral";
export type StatusCardProps = Readonly<{
    title: string;
    value: string;
    tone?: StatusTone;
    trend?: string;
    className?: string;
}>;
export declare function StatusCard(props: StatusCardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=StatusCard.d.ts.map