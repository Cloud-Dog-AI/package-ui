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
// @cloud-dog/ui — FileBrowser pattern (two-panel file browser).
import * as React from "react";
import { cn } from "../utils/cn";
import { Button } from "../components/button/Button";
import { FolderTree } from "./FolderTree";
export function FileBrowser(props) {
    const segments = props.currentPath.split("/").filter(Boolean);
    return (_jsxs("div", { className: cn("flex rounded-md border bg-background", props.className), children: [_jsx("div", { className: "w-56 shrink-0 border-r p-2", children: _jsx(FolderTree, { folders: props.folders, selectedPath: props.currentPath, onSelect: props.onNavigate }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [props.showBreadcrumb !== false ? (_jsxs("div", { className: "flex items-center gap-1 border-b px-3 py-2 text-sm", children: [_jsx("button", { type: "button", className: "text-primary hover:underline", onClick: () => props.onNavigate("/"), children: "root" }), segments.map((seg, i) => {
                                const path = "/" + segments.slice(0, i + 1).join("/");
                                return (_jsxs(React.Fragment, { children: [_jsx("span", { className: "text-muted-foreground", children: "/" }), _jsx("button", { type: "button", className: "text-primary hover:underline", onClick: () => props.onNavigate(path), children: seg })] }, path));
                            })] })) : null, _jsxs("div", { className: "flex items-center gap-2 border-b px-3 py-2", children: [props.onUpload ? (_jsx(Button, { variant: "secondary", size: "sm", onClick: props.onUpload, children: "Upload" })) : null, props.onCreateFolder ? (_jsx(Button, { variant: "secondary", size: "sm", onClick: props.onCreateFolder, children: "New folder" })) : null] }), _jsx("ul", { className: "divide-y", "aria-label": "Files", children: props.files.length === 0 ? (_jsx("li", { className: "px-3 py-4 text-sm text-muted-foreground", children: "No files." })) : (props.files.map((file) => (_jsxs("li", { className: "flex items-center gap-3 px-3 py-2 text-sm", children: [_jsx("span", { className: "flex-1 truncate", children: file.name }), file.size ? _jsx("span", { className: "text-xs text-muted-foreground", children: file.size }) : null, props.onDownload ? (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => props.onDownload(file.path), children: "Download" })) : null, props.onDelete ? (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => props.onDelete(file.path), children: "Delete" })) : null] }, file.path)))) })] })] }));
}
