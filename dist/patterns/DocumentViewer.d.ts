type Format = "auto" | "markdown" | "json" | "text";
export interface DocumentViewerProps {
    /** Raw content string to render. */
    content: string;
    /** Explicit format override; defaults to 'auto'. */
    format?: Format;
    /** Optional title above the viewer. */
    title?: string;
    /** If set, shows a download button. */
    downloadFilename?: string;
    /** Max height of the scrollable container. */
    maxHeight?: string;
    /** Start collapsed (for JSON mode). */
    defaultCollapsed?: boolean;
}
export declare function DocumentViewer({ content, format, title, downloadFilename, maxHeight, defaultCollapsed, }: DocumentViewerProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=DocumentViewer.d.ts.map