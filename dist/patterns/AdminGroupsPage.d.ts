import type { DataColumn } from "../components/table/DataTable";
export type AdminGroupsPageProps<T = Record<string, unknown>> = Readonly<{
    groups: T[];
    columns?: DataColumn<T>[];
    onCreateGroup: () => void;
    onDeleteGroup: (group: T) => void;
    onEditGroup?: (group: T) => void;
    getRowId?: (group: T) => string;
    title?: string;
    className?: string;
    selectable?: boolean;
    bulkActions?: Array<{
        label: string;
        action: string;
    }>;
    onBulkAction?: (action: string, ids: string[]) => void;
}>;
export declare function AdminGroupsPage<T extends Record<string, unknown>>(props: AdminGroupsPageProps<T>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AdminGroupsPage.d.ts.map