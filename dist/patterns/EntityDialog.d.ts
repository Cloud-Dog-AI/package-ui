import * as React from "react";
import type { EntityFormProps } from "./EntityForm";
import type { RelatedItem } from "./RelatedItemsPanel";
export type EntityDialogRelatedPanel = Readonly<{
    title: string;
    items: RelatedItem[];
    emptyMessage?: string;
}>;
type EntityDialogBaseProps = Readonly<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    relatedPanels?: EntityDialogRelatedPanel[];
    extra?: React.ReactNode;
}>;
export type EntityDialogFormProps = EntityDialogBaseProps & EntityFormProps & Readonly<{
    body?: never;
}>;
export type EntityDialogBodyProps = EntityDialogBaseProps & Readonly<{
    body: React.ReactNode;
}>;
export type EntityDialogProps = EntityDialogFormProps | EntityDialogBodyProps;
export declare function EntityDialog(props: EntityDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=EntityDialog.d.ts.map