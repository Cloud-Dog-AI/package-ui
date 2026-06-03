export type ComposeChannelOption = Readonly<{
    value: string;
    label: string;
}>;
export type ComposeTemplate = Readonly<{
    id: string;
    label: string;
    subject?: string;
    body?: string;
    channel?: string;
}>;
export type ComposedMessage = Readonly<{
    to: string;
    subject: string;
    channel: string;
    templateId?: string;
    body: string;
    attachments: File[];
}>;
export type ComposeDialogProps = Readonly<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSend: (message: ComposedMessage) => void | Promise<void>;
    channels?: Array<string | ComposeChannelOption>;
    templates?: Array<string | ComposeTemplate>;
    defaultChannel?: string;
}>;
export declare function ComposeDialog(props: ComposeDialogProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ComposeDialog.d.ts.map