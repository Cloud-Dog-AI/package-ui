import type { DataColumn } from "./DataTable";
/** Options for creating a standard status column. */
export type StatusColumnOptions<T> = Readonly<{
    /** Column id. Defaults to "status". */
    id?: string;
    /** Column header. Defaults to "Status". */
    header?: string;
    /** Extract the status string from a row. */
    getValue: (row: T) => string;
}>;
/**
 * Create a standard status column for DataTable.
 *
 * KEY-5 convention:
 * - Sortable by tone weight (ok < warning < neutral < error), then alphabetical.
 * - Uses StatusBadge for consistent colour, icon, and accessible text.
 * - Column id defaults to "status" so apps place it consistently.
 */
export declare function statusColumn<T>(options: StatusColumnOptions<T>): DataColumn<T>;
//# sourceMappingURL=statusColumn.d.ts.map