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
// @cloud-dog/ui — SearchPanel pattern (search surface with declarative filters).
import * as React from "react";
import { cn } from "../utils/cn";
import { Button } from "../components/button/Button";
import { Spinner } from "../components/feedback/Spinner";
import { Input } from "../components/input/Input";
import { Select } from "../components/input/Select";
/**
 * Builds a stable initial filter-value map from the declarative filter list.
 */
function buildInitialFilters(filters) {
    const values = {};
    for (const filter of filters) {
        if (filter.type === "date-range") {
            values[filter.name] = {
                from: filter.defaultValue?.from ?? "",
                to: filter.defaultValue?.to ?? "",
            };
            continue;
        }
        values[filter.name] = filter.defaultValue ?? "";
    }
    return values;
}
/**
 * SearchPanel renders a shared query input, declarative filters, and results region.
 */
export function SearchPanel(props) {
    const queryLabel = props.queryLabel ?? "Search";
    const queryAriaLabel = props.queryAriaLabel ?? (props.queryLabel ? props.queryLabel : "Search query");
    const [query, setQuery] = React.useState("");
    const [filterValues, setFilterValues] = React.useState(() => buildInitialFilters(props.filters));
    React.useEffect(() => {
        setFilterValues(buildInitialFilters(props.filters));
    }, [props.filters]);
    const triggerSearch = React.useCallback(() => {
        props.onSearch(query, filterValues);
    }, [filterValues, props, query]);
    const clearSearch = React.useCallback(() => {
        const cleared = buildInitialFilters(props.filters);
        setQuery("");
        setFilterValues(cleared);
        props.onSearch("", cleared);
    }, [props]);
    const onKeyDown = React.useCallback((event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            triggerSearch();
        }
        if (event.key === "Escape") {
            event.preventDefault();
            clearSearch();
        }
    }, [clearSearch, triggerSearch]);
    const setStringFilter = React.useCallback((name, value) => {
        setFilterValues((current) => ({ ...current, [name]: value }));
    }, []);
    const setDateRangeFilter = React.useCallback((name, key, value) => {
        setFilterValues((current) => {
            const existing = current[name];
            const next = typeof existing === "object" && existing !== null ? existing : { from: "", to: "" };
            return {
                ...current,
                [name]: {
                    ...next,
                    [key]: value,
                },
            };
        });
    }, []);
    return (_jsxs("section", { className: cn("space-y-4 rounded-md border bg-background p-4", props.className), "aria-label": "Search panel", onKeyDown: onKeyDown, children: [_jsxs("div", { className: "flex flex-col gap-3 lg:flex-row lg:items-end", children: [_jsxs("div", { className: "min-w-0 flex-1 space-y-1", children: [_jsx("label", { className: "text-sm font-medium", htmlFor: props.queryInputId ?? "cloud-dog-search-panel-query", children: queryLabel }), _jsx(Input, { id: props.queryInputId ?? "cloud-dog-search-panel-query", value: query, onChange: (event) => setQuery(event.target.value), placeholder: props.placeholder ?? "Search", "aria-label": queryAriaLabel })] }), props.filters.length ? (_jsx("div", { className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3", children: props.filters.map((filter) => {
                            const value = filterValues[filter.name];
                            if (filter.type === "select") {
                                return (_jsxs("div", { className: "space-y-1", children: [_jsx("label", { className: "text-sm font-medium", htmlFor: `search-filter-${filter.name}`, children: filter.label }), _jsxs(Select, { id: `search-filter-${filter.name}`, value: typeof value === "string" ? value : "", onChange: (event) => setStringFilter(filter.name, event.target.value), "aria-label": filter.label, children: [_jsx("option", { value: "", children: filter.placeholder ?? `All ${filter.label.toLowerCase()}` }), filter.options.map((option) => (_jsx("option", { value: option.value, children: option.label }, `${filter.name}-${option.value}`)))] })] }, filter.name));
                            }
                            if (filter.type === "date-range") {
                                const range = typeof value === "object" && value !== null ? value : { from: "", to: "" };
                                return (_jsxs("fieldset", { className: "space-y-1", children: [_jsx("legend", { className: "text-sm font-medium", children: filter.label }), _jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [_jsx(Input, { type: "date", value: range.from, onChange: (event) => setDateRangeFilter(filter.name, "from", event.target.value), "aria-label": `${filter.label} from` }), _jsx(Input, { type: "date", value: range.to, onChange: (event) => setDateRangeFilter(filter.name, "to", event.target.value), "aria-label": `${filter.label} to` })] })] }, filter.name));
                            }
                            return (_jsxs("div", { className: "space-y-1", children: [_jsx("label", { className: "text-sm font-medium", htmlFor: `search-filter-${filter.name}`, children: filter.label }), _jsx(Input, { id: `search-filter-${filter.name}`, value: typeof value === "string" ? value : "", onChange: (event) => setStringFilter(filter.name, event.target.value), placeholder: filter.placeholder ?? filter.label, "aria-label": filter.label })] }, filter.name));
                        }) })) : null, _jsxs("div", { className: "flex gap-2 lg:shrink-0", children: [_jsx(Button, { onClick: triggerSearch, loading: props.loading, children: "Search" }), _jsx(Button, { variant: "secondary", onClick: clearSearch, children: "Clear" })] })] }), _jsxs("div", { className: "relative min-h-32 rounded-md border bg-muted/10", children: [props.loading ? (_jsx("div", { className: "absolute inset-0 z-10 flex items-center justify-center rounded-md bg-background/75 backdrop-blur-[1px]", children: _jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [_jsx(Spinner, { className: "h-5 w-5" }), _jsx("span", { children: "Searching" })] }) })) : null, _jsx("div", { className: "min-h-32 p-4", children: props.results })] })] }));
}
