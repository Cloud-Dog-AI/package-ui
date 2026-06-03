export type JobStatus = "queued" | "running" | "completed" | "failed" | "cancelled";
export type JobItem = Readonly<{
    id: string;
    name: string;
    status: JobStatus;
    progress?: number;
    startedAt?: string;
    duration?: string;
}>;
export type JobsPageProps = Readonly<{
    jobs: JobItem[];
    onCancel?: (jobId: string) => void;
    onViewDetail?: (jobId: string) => void;
    className?: string;
}>;
export declare function JobsPage(props: JobsPageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=JobsPage.d.ts.map