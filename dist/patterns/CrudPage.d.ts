import * as React from "react";
export type CrudColumn<T> = Readonly<{
    id: string;
    header: string;
    cell: (row: T) => React.ReactNode;
}>;
export type CrudBulkAction = Readonly<{
    label: string;
    onRun: (selectedIds: string[]) => void;
}>;
export type CrudPageProps<T> = Readonly<{
    title: string;
    rows: T[];
    columns: CrudColumn<T>[];
    getRowId: (row: T) => string;
    bulkActions?: CrudBulkAction[];
    renderDetail?: (row: T) => React.ReactNode;
    className?: string;
}>;
export declare function CrudPage<T>(props: CrudPageProps<T>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=CrudPage.d.ts.map