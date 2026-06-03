import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DiffEditor } from "@monaco-editor/react";
import { Card, CardContent, CardHeader } from "../components/card/Card";
import { toMonacoLanguage, useCloudDogMonacoTheme } from "./codeShared";
export function DiffViewer({ original, modified, language = "text", mode, title, height = 480, }) {
    const theme = useCloudDogMonacoTheme();
    return (_jsxs(Card, { children: [title ? (_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsx("h3", { className: "text-sm font-semibold", children: title }), _jsx("span", { className: "text-xs text-muted-foreground", children: mode === "side-by-side" ? "Side by side" : "Unified" })] }) })) : null, _jsx(CardContent, { children: _jsx("div", { className: "overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm", children: _jsx(DiffEditor, { height: height, language: toMonacoLanguage(language), original: original, modified: modified, theme: theme, options: {
                            automaticLayout: true,
                            fontSize: 13,
                            minimap: { enabled: false },
                            readOnly: true,
                            renderSideBySide: mode === "side-by-side",
                            scrollBeyondLastLine: false,
                            wordWrap: "on",
                        } }) }) })] }));
}
