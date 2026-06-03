import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../utils/cn";
export function Alert(props) {
    const v = props.variant ?? "default";
    const cls = v === "destructive"
        ? "border-destructive/30 bg-destructive/10 text-foreground"
        : v === "warning"
            ? "border-accent/30 bg-accent/10 text-foreground"
            : v === "success"
                ? "border-primary/30 bg-primary/10 text-foreground"
                : "border-border bg-card text-foreground";
    return (_jsx("div", { ...props, role: "alert", className: cn("rounded-md border p-4 text-sm", cls, props.className) }));
}
