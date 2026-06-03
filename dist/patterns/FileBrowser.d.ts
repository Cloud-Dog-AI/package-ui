import type { FolderNode } from "./FolderTree";
export type FileItem = Readonly<{
    name: string;
    path: string;
    size?: string;
    modified?: string;
}>;
export type FileBrowserProps = Readonly<{
    folders: FolderNode[];
    files: FileItem[];
    currentPath: string;
    showBreadcrumb?: boolean;
    onNavigate: (path: string) => void;
    onUpload?: () => void;
    onDelete?: (path: string) => void;
    onDownload?: (path: string) => void;
    onCreateFolder?: () => void;
    className?: string;
}>;
export declare function FileBrowser(props: FileBrowserProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FileBrowser.d.ts.map