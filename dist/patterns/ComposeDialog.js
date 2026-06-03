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
// @cloud-dog/ui — ComposeDialog pattern (message authoring on top of EntityDialog).
import * as React from "react";
import { Button } from "../components/button/Button";
import { Input } from "../components/input/Input";
import { Label } from "../components/input/Label";
import { Select } from "../components/input/Select";
import { Textarea } from "../components/input/Textarea";
import { FileDropZone } from "./FileDropZone";
import { EntityDialog } from "./EntityDialog";
const DEFAULT_CHANNELS = [
    { value: "email", label: "Email" },
];
function normalizeChannel(channel) {
    return typeof channel === "string" ? { value: channel, label: channel } : channel;
}
function normalizeTemplate(template) {
    return typeof template === "string" ? { id: template, label: template } : template;
}
export function ComposeDialog(props) {
    const channels = React.useMemo(() => (props.channels?.length ? props.channels.map(normalizeChannel) : DEFAULT_CHANNELS), [props.channels]);
    const templates = React.useMemo(() => props.templates?.map(normalizeTemplate) ?? [], [props.templates]);
    const [to, setTo] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [channel, setChannel] = React.useState(props.defaultChannel ?? channels[0]?.value ?? "email");
    const [templateId, setTemplateId] = React.useState("");
    const [body, setBody] = React.useState("");
    const [attachments, setAttachments] = React.useState([]);
    const [sending, setSending] = React.useState(false);
    React.useEffect(() => {
        if (!props.open) {
            return;
        }
        setChannel(props.defaultChannel ?? channels[0]?.value ?? "email");
    }, [channels, props.defaultChannel, props.open]);
    const applyTemplate = (nextTemplateId) => {
        setTemplateId(nextTemplateId);
        const template = templates.find((item) => item.id === nextTemplateId);
        if (!template) {
            return;
        }
        if (template.subject) {
            setSubject(template.subject);
        }
        if (template.body) {
            setBody(template.body);
        }
        if (template.channel) {
            setChannel(template.channel);
        }
    };
    const handleSend = async () => {
        setSending(true);
        try {
            await props.onSend({
                to,
                subject,
                channel,
                templateId: templateId || undefined,
                body,
                attachments,
            });
            setTo("");
            setSubject("");
            setTemplateId("");
            setBody("");
            setAttachments([]);
            props.onOpenChange(false);
        }
        finally {
            setSending(false);
        }
    };
    return (_jsx(EntityDialog, { open: props.open, onOpenChange: props.onOpenChange, title: "Compose Message", body: _jsxs("form", { className: "space-y-4", onSubmit: (event) => {
                event.preventDefault();
                void handleSend();
            }, children: [_jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("div", { className: "space-y-1", children: [_jsx(Label, { htmlFor: "compose-channel", children: "Channel" }), _jsx(Select, { id: "compose-channel", value: channel, onChange: (event) => setChannel(event.target.value), "aria-label": "Message channel", children: channels.map((item) => (_jsx("option", { value: item.value, children: item.label }, item.value))) })] }), _jsxs("div", { className: "space-y-1", children: [_jsx(Label, { htmlFor: "compose-template", children: "Template" }), _jsxs(Select, { id: "compose-template", value: templateId, onChange: (event) => applyTemplate(event.target.value), "aria-label": "Message template", children: [_jsx("option", { value: "", children: "No template" }), templates.map((item) => (_jsx("option", { value: item.id, children: item.label }, item.id)))] })] })] }), _jsxs("div", { className: "space-y-1", children: [_jsx(Label, { htmlFor: "compose-recipient", children: "To" }), _jsx(Input, { id: "compose-recipient", value: to, onChange: (event) => setTo(event.target.value), placeholder: "user@example.com", "aria-label": "Recipient", required: true })] }), _jsxs("div", { className: "space-y-1", children: [_jsx(Label, { htmlFor: "compose-subject", children: "Subject" }), _jsx(Input, { id: "compose-subject", value: subject, onChange: (event) => setSubject(event.target.value), placeholder: "Message subject", "aria-label": "Subject", required: true })] }), _jsxs("div", { className: "space-y-1", children: [_jsx(Label, { htmlFor: "compose-body", children: "Body" }), _jsx(Textarea, { id: "compose-body", value: body, onChange: (event) => setBody(event.target.value), placeholder: "Write your message...", "aria-label": "Message body", className: "min-h-40", required: true })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "space-y-1", children: [_jsx(Label, { children: "Attachments" }), _jsx(FileDropZone, { onDrop: (files) => setAttachments((current) => [...current, ...files]), className: "p-4" })] }), attachments.length ? (_jsx("ul", { className: "space-y-2 rounded-md border bg-muted/20 p-3 text-sm", children: attachments.map((file, index) => (_jsxs("li", { className: "flex items-center justify-between gap-3", children: [_jsxs("span", { className: "min-w-0 truncate", children: [file.name, " (", Math.max(1, Math.round(file.size / 1024)), " KB)"] }), _jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => setAttachments((current) => current.filter((_, itemIndex) => itemIndex !== index)), children: "Remove" })] }, `${file.name}-${file.size}-${index}`))) })) : null] }), _jsxs("div", { className: "flex items-center justify-end gap-2 pt-2", children: [_jsx(Button, { type: "button", variant: "secondary", onClick: () => props.onOpenChange(false), disabled: sending, children: "Cancel" }), _jsx(Button, { type: "submit", loading: sending, children: "Send Message" })] })] }) }));
}
