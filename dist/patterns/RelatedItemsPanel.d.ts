export type RelatedItem = Readonly<{
    id: string;
    label: string;
    href?: string;
}>;
export type RelatedItemsPanelProps = Readonly<{
    title: string;
    items: RelatedItem[];
    emptyMessage?: string;
    className?: string;
}>;
export declare function RelatedItemsPanel(props: RelatedItemsPanelProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=RelatedItemsPanel.d.ts.map