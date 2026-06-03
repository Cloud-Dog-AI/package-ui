import type { SettingDef } from "./SettingControl";
export type SettingGroupDef = Readonly<{
    id: string;
    label: string;
    settings: SettingDef[];
}>;
export type SettingsPanelProps = Readonly<{
    groups: SettingGroupDef[];
    onSave: (key: string, value: unknown) => void;
    onExport?: () => void;
    onImport?: () => void;
    className?: string;
}>;
export declare function SettingsPanel(props: SettingsPanelProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SettingsPanel.d.ts.map