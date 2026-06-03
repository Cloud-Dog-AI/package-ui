/** Preview payload — either an image URL or a text snippet. */
export type FileArtifactPreview = Readonly<{
    kind: "image";
    src: string;
    alt: string;
}> | Readonly<{
    kind: "text";
    content: string;
}>;
/** A single action button rendered in the card footer. */
export type FileArtifactAction = Readonly<{
    label: string;
    onClick: () => void;
    variant?: "default" | "primary" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    loading?: boolean;
}>;
export type FileArtifactCardProps = Readonly<{
    /** Full path of the artifact (displayed as secondary text). */
    path: string;
    /** Human-readable title (typically the file name). */
    title: string;
    /** Semantic kind badge. */
    kind?: "attachment" | "upload" | "download" | "reference";
    /** File size in bytes — rendered as human-readable. */
    byteSize?: number;
    /** Short status label (e.g. "Pending", "Uploaded"). */
    statusLabel?: string;
    /** Longer description text. */
    description?: string;
    /** Optional inline preview (image or text). */
    preview?: FileArtifactPreview | null;
    /** Action buttons rendered in the card footer. */
    actions?: FileArtifactAction[];
    className?: string;
}>;
export declare function FileArtifactCard(props: FileArtifactCardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FileArtifactCard.d.ts.map