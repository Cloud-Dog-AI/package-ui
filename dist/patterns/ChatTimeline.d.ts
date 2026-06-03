import * as React from "react";
import type { ChatRole } from "./ChatMessage";
export type TimelineMessage = Readonly<{
    id: string;
    role: ChatRole;
    content: string;
    timestamp?: string;
    footer?: React.ReactNode;
}>;
export type ChatTimelineProps = Readonly<{
    messages: TimelineMessage[];
    autoScroll?: boolean;
    className?: string;
}>;
export declare function ChatTimeline(props: ChatTimelineProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ChatTimeline.d.ts.map