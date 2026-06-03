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
// @cloud-dog/ui — SettingGroup pattern (collapsible settings section).
import * as React from "react";
import { cn } from "../utils/cn";
import { Card, CardHeader, CardContent } from "../components/card/Card";
import { Separator } from "../components/layout/Separator";
import { SettingControl } from "./SettingControl";
export function SettingGroup(props) {
    const [expanded, setExpanded] = React.useState(props.defaultExpanded ?? true);
    return (_jsxs(Card, { className: cn("overflow-hidden", props.className), children: [_jsx(CardHeader, { className: "pb-0", children: _jsxs("button", { type: "button", className: cn("flex w-full items-center gap-2 text-sm font-semibold text-left", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"), "aria-expanded": expanded, onClick: () => setExpanded((v) => !v), children: [_jsx("span", { className: "flex-1", children: `${props.label} details` }), _jsx("span", { className: "text-xs text-muted-foreground", children: expanded ? "Collapse" : "Expand" })] }) }), expanded ? (_jsx(CardContent, { className: "pt-2", children: props.settings.map((setting, i) => (_jsxs(React.Fragment, { children: [i > 0 ? _jsx(Separator, {}) : null, _jsx(SettingControl, { setting: setting, onChange: (value) => props.onChange(setting.key, value) })] }, setting.key))) })) : null] }));
}
