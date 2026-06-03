import * as React from "react";
export type ToastVariant = "default" | "destructive" | "warning" | "success";
export type ToastItem = Readonly<{
    id: string;
    title: string;
    description?: string;
    variant: ToastVariant;
    timeoutMs: number;
}>;
export declare function ToastProvider(props: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useToast(): Readonly<{
    toasts: ToastItem[];
    push: (t: Omit<ToastItem, "id"> & {
        id?: string;
    }) => void;
    dismiss: (id: string) => void;
}>;
export declare function Toaster(): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=Toast.d.ts.map