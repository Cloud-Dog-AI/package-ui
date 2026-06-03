import * as React from "react";
/** Column definition for DataTable. */
export type DataColumn<T> = Readonly<{
    id: string;
    header: string;
    cell: (row: T) => React.ReactNode;
    sortable?: boolean;
    sortValue?: (row: T) => string | number;
}>;
/** Bulk action descriptor. */
export type BulkAction = Readonly<{
    label: string;
    action: string;
}>;
/** Props for DataTable. All new features are optional and backward-compatible. */
export type DataTableProps<T> = Readonly<{
    columns: DataColumn<T>[];
    rows: T[];
    emptyMessage?: string;
    ariaLabel?: string;
    totalRows?: number;
    getRowId?: (row: T) => string;
    /** Accessible label for each row (used as aria-label to control the row's accessible name). */
    getRowName?: (row: T) => string;
    page?: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
    pageSizeOptions?: number[];
    selectable?: boolean;
    bulkActions?: BulkAction[];
    onBulkAction?: (action: string, selectedIds: string[]) => void;
    getSelectionLabel?: (row: T) => string;
    selectionColumnPosition?: "start" | "end";
    columnPickerEnabled?: boolean;
    tableId?: string;
    className?: string;
}>;
export declare function DataTable<T>(props: DataTableProps<T>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=DataTable.d.ts.map