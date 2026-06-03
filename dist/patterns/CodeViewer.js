import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2026 Cloud-Dog, Viewdeck Engineering Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import * as React from "react";
import { Button } from "../components/button/Button";
import { Card, CardContent, CardHeader } from "../components/card/Card";
import { CodeEditor } from "./CodeEditor";
import { copyText } from "./codeShared";
export function CodeViewer({ code, language, title, showLineNumbers = true, maxHeight = 480, copyEnabled = true, }) {
    const [copied, setCopied] = React.useState(false);
    return (_jsxs(Card, { children: [title || copyEnabled ? (_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsx("h3", { className: "text-sm font-semibold", children: title ?? "Code" }), copyEnabled ? (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => {
                                void copyText(code).then(() => {
                                    setCopied(true);
                                    window.setTimeout(() => setCopied(false), 2000);
                                });
                            }, children: copied ? "Copied!" : "Copy" })) : null] }) })) : null, _jsx(CardContent, { children: _jsx(CodeEditor, { value: code, language: language, readOnly: true, height: maxHeight, lineNumbers: showLineNumbers }) })] }));
}
