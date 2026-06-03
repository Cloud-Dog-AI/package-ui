import * as React from "react";
export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
}
export declare function Switch({ checked, onCheckedChange, className, ...props }: SwitchProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Switch.d.ts.map