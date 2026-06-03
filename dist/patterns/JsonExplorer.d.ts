/** PS-73 v2 SW8 source attribution metadata for a single config leaf. */
export type JsonExplorerSource = Readonly<{
    /** Winning source layer. */
    source: "default" | "config" | "env" | "vault" | string;
    /** Whether the value is a secret (masked by default — PS-73 v2 SW4). */
    secret?: boolean;
    /** Server tab(s) the leaf applies to (PS-73 v2 SW9). */
    servers?: readonly string[];
}>;
/** Map of dot-path (no "root" prefix; arrays as `[i]`) -> source metadata. */
export type JsonExplorerSourceMap = Readonly<Record<string, JsonExplorerSource>>;
export type JsonExplorerProps = Readonly<{
    data: unknown;
    title?: string;
    maxDepth?: number;
    defaultExpanded?: boolean;
    onPathSelect?: (path: string) => void;
    className?: string;
    /** PS-73 v2: per-leaf source attribution. When present, badges + masking render. */
    sources?: JsonExplorerSourceMap;
    /** PS-73 v2 SW4 mask token (default: eight hyphens). */
    maskToken?: string;
    /** Controlled search term (page-level search wrapper — PS-73 v2 SW11). */
    searchTerm?: string;
    /** Set of dot-paths whose secret value is currently revealed (admin-only — SW4B). */
    revealedSecrets?: ReadonlySet<string>;
    /** Hide the widget-internal search box (when a page-level search drives it). */
    hideInternalSearch?: boolean;
}>;
/** JsonExplorer renders a searchable, expandable JSON inspection tree. */
export declare function JsonExplorer(props: JsonExplorerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=JsonExplorer.d.ts.map