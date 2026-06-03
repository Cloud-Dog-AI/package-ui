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
/** Relative duration formatter per PS-72 v2 §5.3 (e.g. "243 ms", "1.2 s"). */
export function formatDuration(durationMs) {
    if (!Number.isFinite(durationMs) || durationMs < 0)
        return "0 ms";
    if (durationMs < 1000)
        return `${Math.round(durationMs)} ms`;
    return `${(durationMs / 1000).toFixed(1)} s`;
}
/** Map a PS-72 lifecycle state to a StatusBadge tone. */
export function lifecycleTone(state) {
    switch (state) {
        case "succeeded":
            return "ok";
        case "failed":
        case "timed-out":
        case "dead-lettered":
            return "error";
        case "running":
        case "queued":
        case "dispatched":
        case "blocked":
        case "waiting":
        case "retrying":
            return "warning";
        default:
            return "neutral";
    }
}
