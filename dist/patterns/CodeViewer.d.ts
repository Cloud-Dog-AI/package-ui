import { type CodeLanguage } from "./codeShared";
export interface CodeViewerProps {
    code: string;
    language: CodeLanguage;
    title?: string;
    showLineNumbers?: boolean;
    maxHeight?: string | number;
    copyEnabled?: boolean;
}
export declare function CodeViewer({ code, language, title, showLineNumbers, maxHeight, copyEnabled, }: CodeViewerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=CodeViewer.d.ts.map