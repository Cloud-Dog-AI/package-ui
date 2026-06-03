export type CodeLanguage = "json" | "yaml" | "sql" | "python" | "markdown" | "text";
export declare function useCloudDogMonacoTheme(): "cloud-dog-monaco-dark" | "cloud-dog-monaco-light";
export declare function toMonacoLanguage(language: CodeLanguage): string;
export declare function maskText(value: string, maskPatterns?: RegExp[]): string;
export declare function copyText(text: string): Promise<void>;
//# sourceMappingURL=codeShared.d.ts.map