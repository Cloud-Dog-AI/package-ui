import * as React from "react";
export interface FieldHelpProps {
    /** Visible label text. */
    label: string;
    /** HTML id for the input element (links label via htmlFor). */
    htmlFor: string;
    /** Inline help text shown below the label. */
    help?: string;
    /** Validation error message. Replaces help text when present. */
    error?: string;
    /** Whether the field is required. Appends visual indicator. */
    required?: boolean;
    /** Extra className for the wrapper. */
    className?: string;
    children: React.ReactNode;
}
export declare function FieldHelp(props: FieldHelpProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FieldHelp.d.ts.map