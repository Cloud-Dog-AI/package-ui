import * as React from "react";
export type DropdownItem = Readonly<{
    id: string;
    label: string;
    onSelect: () => void;
    disabled?: boolean;
}>;
export declare function DropdownMenu(props: {
    trigger: React.ReactElement;
    header?: React.ReactNode;
    items: DropdownItem[];
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=DropdownMenu.d.ts.map