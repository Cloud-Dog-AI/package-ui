export type SettingDef = Readonly<{
    key: string;
    label: string;
    type: "text" | "number" | "boolean" | "select";
    value: unknown;
    readOnly?: boolean;
    options?: string[];
    description?: string;
}>;
export type SettingControlProps = Readonly<{
    setting: SettingDef;
    onChange: (value: unknown) => void;
    className?: string;
}>;
export declare function SettingControl(props: SettingControlProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SettingControl.d.ts.map