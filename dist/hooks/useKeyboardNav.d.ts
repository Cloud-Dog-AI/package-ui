import * as React from "react";
export type KeyboardNavOptions = Readonly<{
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
    onEnter?: () => void;
}>;
export declare function useKeyboardNav(options: KeyboardNavOptions): (e: React.KeyboardEvent) => void;
//# sourceMappingURL=useKeyboardNav.d.ts.map