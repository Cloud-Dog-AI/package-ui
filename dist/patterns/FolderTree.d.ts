export type FolderNode = Readonly<{
    name: string;
    path: string;
    children?: FolderNode[];
}>;
export type FolderTreeProps = Readonly<{
    folders: FolderNode[];
    selectedPath?: string;
    onSelect: (path: string) => void;
    className?: string;
}>;
export declare function FolderTree(props: FolderTreeProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FolderTree.d.ts.map