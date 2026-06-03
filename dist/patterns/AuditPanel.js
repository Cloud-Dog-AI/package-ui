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
// @cloud-dog/ui — AuditPanel pattern (audit/monitoring dashboard).
import * as React from "react";
import { cn } from "../utils/cn";
import { Button } from "../components/button/Button";
import { Input } from "../components/input/Input";
import { Select } from "../components/input/Select";
import { Switch } from "../components/input/Switch";
import { Label } from "../components/input/Label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/tabs/Tabs";
import { LogStream } from "./LogStream";
export function AuditPanel(props) {
    const [levelFilter, setLevelFilter] = React.useState("");
    const [searchFilter, setSearchFilter] = React.useState("");
    const autoFollow = props.autoFollow ?? true;
    const handleFilterChange = (level, search) => {
        setLevelFilter(level);
        setSearchFilter(search);
        props.onFilter?.(level, search);
    };
    return (_jsx("section", { className: cn("space-y-4 rounded-md border bg-background p-4", props.className), "aria-label": "Audit panel", children: _jsxs(Tabs, { value: props.activeType, onValueChange: props.onTypeChange, children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(TabsList, { children: props.logTypes.map((t) => (_jsx(TabsTrigger, { value: t, children: t }, t))) }), _jsxs("div", { className: "ml-auto flex items-center gap-2", children: [props.onRefresh ? (_jsx(Button, { variant: "ghost", size: "sm", onClick: props.onRefresh, children: "Refresh" })) : null, props.onAutoFollowChange ? (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Label, { className: "text-xs", children: "Follow" }), _jsx(Switch, { checked: autoFollow, onCheckedChange: props.onAutoFollowChange, "aria-label": "Auto-follow logs" })] })) : null] })] }), _jsxs("div", { className: "flex items-center gap-2 pt-2", children: [_jsxs(Select, { value: levelFilter, onChange: (e) => handleFilterChange(e.target.value, searchFilter), className: "w-32", "aria-label": "Filter by level", children: [_jsx("option", { value: "", children: "All levels" }), _jsx("option", { value: "error", children: "Error" }), _jsx("option", { value: "warn", children: "Warn" }), _jsx("option", { value: "info", children: "Info" }), _jsx("option", { value: "debug", children: "Debug" })] }), _jsx(Input, { value: searchFilter, onChange: (e) => handleFilterChange(levelFilter, e.target.value), placeholder: "Search logs", "aria-label": "Search logs", className: "flex-1" })] }), props.logTypes.map((t) => (_jsx(TabsContent, { value: t, children: _jsx(LogStream, { entries: props.logs, autoFollow: autoFollow, levelFilter: levelFilter, searchFilter: searchFilter }) }, t)))] }) }));
}
