/** Status tones matching the platform StatusCard pattern. */
export type StatusBadgeTone = "ok" | "warning" | "error" | "neutral";
export type StatusBadgeProps = Readonly<{
    /** The raw status string to display. */
    value: string;
    /** Override auto-detected tone. */
    tone?: StatusBadgeTone;
    className?: string;
}>;
/** Detect tone from a status string. Exported for sort-value and test use. */
export declare function detectTone(value: string): StatusBadgeTone;
/** Numeric sort weight: ok=0, warning=1, neutral=2, error=3. */
export declare function toneSortWeight(tone: StatusBadgeTone): number;
export declare function StatusBadge(props: StatusBadgeProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=StatusBadge.d.ts.map