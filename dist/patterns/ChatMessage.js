import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { RelativeTime } from "./RelativeTime";
function renderContent(content) {
    // Intentionally safe: render text with basic code-fence handling only.
    const parts = [];
    const lines = content.split("\n");
    let inCode = false;
    let buf = [];
    const flush = (asCode) => {
        const text = buf.join("\n");
        buf = [];
        if (!text)
            return;
        parts.push(asCode ? (_jsx("pre", { className: "bg-muted/20 border rounded-md p-3 overflow-auto text-xs font-mono", children: text }, parts.length)) : (_jsx("p", { className: "whitespace-pre-wrap text-sm leading-6", children: text }, parts.length)));
    };
    for (const line of lines) {
        if (line.trim().startsWith("```")) {
            flush(inCode);
            inCode = !inCode;
            continue;
        }
        buf.push(line);
    }
    flush(inCode);
    return _jsx("div", { className: "space-y-2", children: parts });
}
export function ChatMessage(props) {
    const isUser = props.role === "user";
    const bubble = props.role === "assistant"
        ? "bg-card"
        : props.role === "system"
            ? "bg-muted/30"
            : props.role === "tool"
                ? "bg-accent/20"
                : "bg-primary text-primary-foreground";
    const align = isUser ? "justify-end" : "justify-start";
    return (_jsx("div", { className: cn("flex", align, props.className), children: _jsxs("article", { className: cn("max-w-[42rem] w-fit rounded-xl border px-4 py-3 shadow-sm", bubble), "aria-label": `Message from ${props.role}`, children: [_jsxs("div", { className: "flex items-baseline gap-2 mb-2", children: [_jsx("span", { className: cn("text-xs font-semibold uppercase tracking-wide", isUser ? "text-primary-foreground" : "opacity-80"), children: props.role }), props.timestamp ? (_jsx(RelativeTime, { timestamp: props.timestamp, className: cn("text-xs", isUser ? "text-primary-foreground" : "text-muted-foreground") })) : null] }), renderContent(props.content), props.footer ? _jsx("div", { className: "mt-2", children: props.footer }) : null] }) }));
}
