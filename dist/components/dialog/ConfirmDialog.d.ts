export interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    /** Name of the target being acted on (displayed prominently). */
    targetName?: string;
    /** Show an irreversible warning. Defaults to true. */
    irreversible?: boolean;
    /** Label for the confirm button. Defaults to "Delete". */
    confirmLabel?: string;
    /** Variant for the confirm button. Defaults to "destructive". */
    confirmVariant?: "destructive" | "default" | "secondary";
    /** Whether the action is in progress. Shows loading state. */
    loading?: boolean;
    /** Error message from a failed action. */
    error?: string | null;
    /** Called when the user confirms the action. */
    onConfirm: () => void;
}
export declare function ConfirmDialog(props: ConfirmDialogProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ConfirmDialog.d.ts.map