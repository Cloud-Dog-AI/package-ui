import type { SettingDef } from "./SettingControl";
export type SettingGroupProps = Readonly<{
    label: string;
    settings: SettingDef[];
    onChange: (key: string, value: unknown) => void;
    defaultExpanded?: boolean;
    className?: string;
}>;
export declare function SettingGroup(props: SettingGroupProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SettingGroup.d.ts.map