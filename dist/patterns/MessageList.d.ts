export type MessageBulkAction = "mark-read" | "delete" | "archive";
export type MessageItem = Readonly<{
    id: string;
    subject: string;
    sender: string;
    preview: string;
    timestamp: string | number | Date;
    status: string;
    unread: boolean;
    attachmentCount?: number;
}>;
export type MessageListProps = Readonly<{
    messages: MessageItem[];
    selectedId?: string;
    onSelect: (id: string) => void;
    onBulkAction?: (action: MessageBulkAction, ids: string[]) => void;
    loading?: boolean;
    className?: string;
}>;
export declare function MessageList(props: MessageListProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=MessageList.d.ts.map