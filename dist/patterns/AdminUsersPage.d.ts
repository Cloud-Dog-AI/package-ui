import type { DataColumn } from "../components/table/DataTable";
export type AdminUsersPageProps<T = Record<string, unknown>> = Readonly<{
    users: T[];
    columns?: DataColumn<T>[];
    onCreateUser: () => void;
    onDeleteUser: (user: T) => void;
    onEditUser?: (user: T) => void;
    onToggleStatus?: (user: T) => void;
    onResetPassword?: (user: T) => void;
    getRowId?: (user: T) => string;
    title?: string;
    className?: string;
    selectable?: boolean;
    bulkActions?: Array<{
        label: string;
        action: string;
    }>;
    onBulkAction?: (action: string, ids: string[]) => void;
}>;
export declare function AdminUsersPage<T extends Record<string, unknown>>(props: AdminUsersPageProps<T>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AdminUsersPage.d.ts.map