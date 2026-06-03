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
// @cloud-dog/ui — A2aConsole pattern (A2A WebSocket test console).
import * as React from "react";
import { cn } from "../utils/cn";
import { Button } from "../components/button/Button";
import { Input } from "../components/input/Input";
import { Select } from "../components/input/Select";
import { Textarea } from "../components/input/Textarea";
import { JsonBlock } from "./JsonBlock";
export function A2aConsole(props) {
    const [topic, setTopic] = React.useState("");
    const [payloadText, setPayloadText] = React.useState("{}");
    const [sending, setSending] = React.useState(false);
    const [history, setHistory] = React.useState([]);
    const send = async () => {
        if (!topic.trim())
            return;
        let parsed;
        try {
            parsed = JSON.parse(payloadText);
        }
        catch {
            return;
        }
        setSending(true);
        try {
            const result = await props.onSend(topic, parsed);
            setHistory((h) => [
                { id: crypto.randomUUID(), topic, payload: parsed, result, timestamp: new Date().toISOString() },
                ...h,
            ]);
        }
        finally {
            setSending(false);
        }
    };
    return (_jsxs("div", { className: cn("space-y-4 rounded-md border bg-background p-4", props.className), children: [_jsx("div", { className: "text-xs text-muted-foreground", children: props.endpointUrl }), _jsx("label", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Topic" }), props.topics && props.topics.length > 0 ? (_jsxs(Select, { value: topic, onChange: (e) => setTopic(e.target.value), "aria-label": "Topic", children: [_jsx("option", { value: "", children: "Select a topic\u2026" }), props.topics.map((t) => _jsx("option", { value: t, children: t }, t))] })) : (_jsx(Input, { value: topic, onChange: (e) => setTopic(e.target.value), placeholder: 'e.g. "root", "health", or a skill name from the agent card', "aria-label": "Topic" })), _jsx("label", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Parameters (JSON)" }), _jsx(Textarea, { value: payloadText, onChange: (e) => setPayloadText(e.target.value), placeholder: '{"key": "value"}', className: "font-mono text-xs", "aria-label": "Payload JSON", rows: 5 }), _jsx(Button, { onClick: send, disabled: sending || !topic.trim(), children: sending ? "Sending..." : "Send" }), history.length > 0 ? (_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "text-sm font-semibold", children: "Response History" }), history.map((entry) => (_jsx(JsonBlock, { title: `Result: ${entry.topic} @ ${entry.timestamp}`, value: entry.result }, entry.id)))] })) : null] }));
}
