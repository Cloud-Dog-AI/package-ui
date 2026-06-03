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
// @cloud-dog/ui — PFW-1 FieldHelp form-field wrapper with label, help, and validation.
import * as React from "react";
import { cn } from "../../utils/cn";
export function FieldHelp(props) {
    const { label, htmlFor, help, error, required, className, children } = props;
    const descriptionId = `${htmlFor}-description`;
    const errorId = `${htmlFor}-error`;
    return (_jsxs("div", { className: cn("space-y-1.5", className), children: [_jsxs("label", { htmlFor: htmlFor, className: "text-sm font-medium leading-none", children: [label, required && (_jsx("span", { className: "text-destructive ml-0.5", "aria-hidden": "true", children: "*" }))] }), React.Children.map(children, (child) => {
                if (!React.isValidElement(child))
                    return child;
                const extraProps = {};
                if (error) {
                    extraProps["aria-invalid"] = "true";
                    extraProps["aria-errormessage"] = errorId;
                }
                if (help && !error) {
                    extraProps["aria-describedby"] = descriptionId;
                }
                return React.cloneElement(child, extraProps);
            }), error ? (_jsx("p", { id: errorId, role: "alert", className: "text-sm text-destructive", "data-testid": "field-error", children: error })) : help ? (_jsx("p", { id: descriptionId, className: "text-sm text-muted-foreground", "data-testid": "field-help", children: help })) : null] }));
}
