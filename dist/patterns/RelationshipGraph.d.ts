export type RelationshipNode = Readonly<{
    id: string;
    label: string;
    type: string;
    meta?: Record<string, unknown>;
    testId?: string;
}>;
export type RelationshipEdge = Readonly<{
    source: string;
    target: string;
    type: string;
    label?: string;
}>;
export type RelationshipGraphDirection = "LR" | "TB";
export type RelationshipGraphProps = Readonly<{
    nodes: ReadonlyArray<RelationshipNode>;
    edges: ReadonlyArray<RelationshipEdge>;
    centerNodeId?: string;
    onNodeClick?: (id: string) => void;
    direction?: RelationshipGraphDirection;
    emptyMessage?: string;
    dataTestId?: string;
    className?: string;
}>;
export declare function RelationshipGraph(props: RelationshipGraphProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=RelationshipGraph.d.ts.map