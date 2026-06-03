import * as React from "react";
export type ChatRole = "user" | "assistant" | "system" | "tool";
export type ChatMessageProps = Readonly<{
    role: ChatRole;
    content: string;
    timestamp?: string;
    footer?: React.ReactNode;
    className?: string;
}>;
export declare function ChatMessage(props: ChatMessageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ChatMessage.d.ts.map