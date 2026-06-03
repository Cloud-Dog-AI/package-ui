export type ComboboxOption = Readonly<{
    value: string;
    label: string;
    disabled?: boolean;
}>;
export type ComboboxProps = Readonly<{
    options: ComboboxOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    allowCustom?: boolean;
    disabled?: boolean;
    error?: string;
    "aria-label"?: string;
    className?: string;
    loading?: boolean;
    emptyMessage?: string;
}>;
export declare function Combobox(props: ComboboxProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Combobox.d.ts.map