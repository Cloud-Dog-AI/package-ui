import { type CodeLanguage } from "./codeShared";
export interface DiffViewerProps {
    original: string;
    modified: string;
    language?: CodeLanguage;
    mode: "side-by-side" | "unified";
    title?: string;
    height?: string | number;
}
export declare function DiffViewer({ original, modified, language, mode, title, height, }: DiffViewerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=DiffViewer.d.ts.map