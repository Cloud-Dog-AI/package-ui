import * as React from "react";
export type RbacBinding = Readonly<{
    id: string;
    userId: string;
    groupId?: string;
    role: string;
    resource?: string;
}>;
export type RbacUser = Readonly<{
    id: string;
    name: string;
}>;
export type RoleDef = Readonly<{
    name: string;
    description?: string;
    permissions?: string[];
}>;
export type AdminRbacPageProps = Readonly<{
    bindings: RbacBinding[];
    users?: RbacUser[];
    groups?: Array<Readonly<{
        id: string;
        name: string;
    }>>;
    roles?: string[];
    resources?: string[];
    roleDefinitions?: RoleDef[];
    onBind: (userId: string, role: string, resource?: string) => void;
    onUnbind: (bindingId: string) => void;
    title?: string;
    className?: string;
    selectable?: boolean;
    bulkActions?: Array<{
        label: string;
        action: string;
    }>;
    onBulkAction?: (action: string, ids: string[]) => void;
    renderUserCell?: (userId: string) => React.ReactNode;
    renderGroupCell?: (groupId: string | undefined) => React.ReactNode;
    renderResourceCell?: (resource: string | undefined) => React.ReactNode;
}>;
export declare function AdminRbacPage(props: AdminRbacPageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AdminRbacPage.d.ts.map