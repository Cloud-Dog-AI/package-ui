export type A2aConsoleProps = Readonly<{
    endpointUrl: string;
    onSend: (topic: string, payload: unknown) => Promise<unknown>;
    topics?: readonly string[];
    className?: string;
}>;
export declare function A2aConsole(props: A2aConsoleProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=A2aConsole.d.ts.map