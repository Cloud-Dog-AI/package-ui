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
// @cloud-dog/ui — FolderTree pattern (expandable folder hierarchy).
import * as React from "react";
import { cn } from "../utils/cn";
function FolderItem(props) {
    const [expanded, setExpanded] = React.useState(false);
    const hasChildren = (props.node.children ?? []).length > 0;
    const isSelected = props.selectedPath === props.node.path;
    return (_jsxs("li", { role: "treeitem", "aria-expanded": hasChildren ? expanded : undefined, children: [_jsxs("button", { type: "button", className: cn("flex w-full items-center gap-1 rounded-md px-2 py-1 text-sm text-left", "hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", isSelected ? "bg-primary/10 font-medium" : ""), style: { paddingLeft: `${props.depth * 12 + 8}px` }, onClick: () => {
                    props.onSelect(props.node.path);
                    if (hasChildren)
                        setExpanded((v) => !v);
                }, children: [_jsx("span", { className: "shrink-0 text-xs", "aria-hidden": true, children: hasChildren ? (expanded ? "v" : ">") : " " }), _jsx("span", { className: "truncate", children: props.node.name })] }), expanded && hasChildren ? (_jsx("ul", { role: "group", children: (props.node.children ?? []).map((child) => (_jsx(FolderItem, { node: child, selectedPath: props.selectedPath, onSelect: props.onSelect, depth: props.depth + 1 }, child.path))) })) : null] }));
}
export function FolderTree(props) {
    return (_jsx("nav", { className: cn("overflow-auto", props.className), "aria-label": "Folder tree", children: _jsx("ul", { role: "tree", children: props.folders.map((node) => (_jsx(FolderItem, { node: node, selectedPath: props.selectedPath, onSelect: props.onSelect, depth: 0 }, node.path))) }) }));
}
