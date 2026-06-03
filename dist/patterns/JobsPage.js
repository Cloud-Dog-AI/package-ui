import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { Button } from "../components/button/Button";
import { Badge } from "../components/layout/Badge";
import { DataTable } from "../components/table/DataTable";
const statusVariant = {
    queued: "secondary",
    running: "default",
    completed: "secondary",
    failed: "destructive",
    cancelled: "secondary",
};
export function JobsPage(props) {
    const columns = [
        { id: "name", header: "Job", cell: (r) => r.name, sortable: true, sortValue: (r) => r.name },
        {
            id: "status",
            header: "Status",
            cell: (r) => _jsx(Badge, { variant: statusVariant[r.status], children: r.status }),
        },
        {
            id: "progress",
            header: "Progress",
            cell: (r) => r.progress != null ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-1.5 w-20 rounded-full bg-muted", children: _jsx("div", { className: "h-full rounded-full bg-primary", style: { width: `${r.progress}%` } }) }), _jsxs("span", { className: "text-xs text-muted-foreground", children: [r.progress, "%"] })] })) : (_jsx("span", { className: "text-xs text-muted-foreground", children: "--" })),
        },
        { id: "startedAt", header: "Started", cell: (r) => r.startedAt ?? "--" },
        { id: "duration", header: "Duration", cell: (r) => r.duration ?? "--" },
        {
            id: "__actions",
            header: "Actions",
            cell: (r) => (_jsxs("div", { className: "flex items-center gap-1", children: [props.onViewDetail ? (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => props.onViewDetail(r.id), children: "Detail" })) : null, props.onCancel && r.status === "running" ? (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => props.onCancel(r.id), children: "Cancel" })) : null] })),
        },
    ];
    return (_jsxs("div", { className: cn("space-y-4", props.className), children: [_jsxs("header", { children: [_jsx("h1", { className: "text-xl font-semibold", children: "Jobs" }), _jsxs("div", { className: "text-sm text-muted-foreground", children: [props.jobs.length, " jobs"] })] }), _jsx("div", { className: "rounded-md border bg-background", children: _jsx(DataTable, { columns: columns, rows: props.jobs, emptyMessage: "No jobs found." }) })] }));
}
