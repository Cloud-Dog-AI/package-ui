import type { DataColumn } from "../components/table/DataTable";
export type AdminApiKeysPageProps<T = Record<string, unknown>> = Readonly<{
    apiKeys: T[];
    columns?: DataColumn<T>[];
    onCreateKey: () => void;
    onRevokeKey: (key: T) => void;
    getRowId?: (key: T) => string;
    title?: string;
    className?: string;
    selectable?: boolean;
    bulkActions?: Array<{
        label: string;
        action: string;
    }>;
    onBulkAction?: (action: string, ids: string[]) => void;
    roleOptions?: string[];
    capabilityOptions?: string[];
}>;
export declare function AdminApiKeysPage<T extends Record<string, unknown>>(props: AdminApiKeysPageProps<T>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AdminApiKeysPage.d.ts.map