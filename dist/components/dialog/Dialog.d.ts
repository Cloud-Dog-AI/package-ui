import * as React from "react";
export interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /**
     * Accessible name for the dialog. If omitted, a generic label is applied to
     * avoid an unnamed dialog (axe: aria-dialog-name).
     */
    label?: string;
    children: React.ReactNode;
}
export declare function Dialog(props: DialogProps): React.ReactPortal | null;
//# sourceMappingURL=Dialog.d.ts.map