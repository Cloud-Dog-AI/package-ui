export type MultiSelectOption = Readonly<{
    value: string;
    label: string;
    disabled?: boolean;
    group?: string;
}>;
export type MultiSelectProps = Readonly<{
    options: MultiSelectOption[];
    values: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
    id?: string;
    disabled?: boolean;
    error?: string;
    "aria-label"?: string;
    className?: string;
    loading?: boolean;
    emptyMessage?: string;
    maxSelections?: number;
}>;
export declare function MultiSelect(props: MultiSelectProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=MultiSelect.d.ts.map