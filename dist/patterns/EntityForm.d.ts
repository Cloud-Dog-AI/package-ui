import * as React from "react";
export type EntityFieldDef = Readonly<{
    name: string;
    label: string;
    type: "text" | "number" | "boolean" | "select" | "multiselect" | "textarea";
    required?: boolean;
    options?: string[];
    readOnly?: boolean;
    /** Minimum rows for textarea fields (default: 4). */
    rows?: number;
    /** Placeholder text for text/textarea fields. */
    placeholder?: string;
}>;
export type EntityFormMode = "add" | "edit" | "view";
export type EntityFormProps = Readonly<{
    fields: EntityFieldDef[];
    values: Record<string, unknown>;
    onChange: (name: string, value: unknown) => void;
    onSubmit: () => void;
    onCancel: () => void;
    mode: EntityFormMode;
    errors?: Record<string, string>;
    className?: string;
    /** Override the submit button label (default: "Save"). */
    submitLabel?: string;
    /** Prefix for field IDs to avoid conflicts when multiple forms exist on the same page. */
    idPrefix?: string;
    /** Additional form content rendered before the action buttons. */
    extra?: React.ReactNode;
}>;
export declare function EntityForm(props: EntityFormProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=EntityForm.d.ts.map