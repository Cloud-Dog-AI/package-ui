import * as React from "react";
import type { ButtonProps } from "../components/button/Button";
export type QuickAction = Readonly<{
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    variant?: ButtonProps["variant"];
}>;
export type QuickActionBarProps = Readonly<{
    actions: QuickAction[];
    className?: string;
}>;
export declare function QuickActionBar(props: QuickActionBarProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=QuickActionBar.d.ts.map