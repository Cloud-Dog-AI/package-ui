import * as React from "react";
export type SearchFilterOption = Readonly<{
    label: string;
    value: string;
}>;
export type SearchFilterDef = Readonly<{
    name: string;
    label: string;
    type: "text";
    placeholder?: string;
    defaultValue?: string;
} | {
    name: string;
    label: string;
    type: "select";
    options: readonly SearchFilterOption[];
    placeholder?: string;
    defaultValue?: string;
} | {
    name: string;
    label: string;
    type: "date-range";
    defaultValue?: Readonly<{
        from?: string;
        to?: string;
    }>;
}>;
export type SearchFilterValue = string | Readonly<{
    from: string;
    to: string;
}>;
export type SearchFilterValues = Readonly<Record<string, SearchFilterValue>>;
export type SearchPanelProps = Readonly<{
    onSearch: (query: string, filters: SearchFilterValues) => void;
    filters: readonly SearchFilterDef[];
    results: React.ReactNode;
    placeholder?: string;
    queryInputId?: string;
    queryLabel?: string;
    queryAriaLabel?: string;
    loading?: boolean;
    className?: string;
}>;
/**
 * SearchPanel renders a shared query input, declarative filters, and results region.
 */
export declare function SearchPanel(props: SearchPanelProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SearchPanel.d.ts.map