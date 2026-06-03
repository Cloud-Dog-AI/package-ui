import { type CodeLanguage } from "./codeShared";
export interface CodeEditorProps {
    value: string;
    onChange?: (value: string) => void;
    language: CodeLanguage;
    ariaLabel?: string;
    readOnly?: boolean;
    height?: string | number;
    minimap?: boolean;
    lineNumbers?: boolean;
    maskPatterns?: RegExp[];
    className?: string;
}
export declare function CodeEditor({ value, onChange, language, ariaLabel, readOnly, height, minimap, lineNumbers, maskPatterns, className, }: CodeEditorProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=CodeEditor.d.ts.map