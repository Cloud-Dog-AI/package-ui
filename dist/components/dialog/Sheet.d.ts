import * as React from "react";
export interface SheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
}
export declare function Sheet(props: SheetProps): React.ReactPortal | null;
//# sourceMappingURL=Sheet.d.ts.map