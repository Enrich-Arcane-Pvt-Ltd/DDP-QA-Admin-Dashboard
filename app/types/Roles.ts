export interface Roles {
    id: number;
    name: string,
    status: string
}

export interface CreateRole {
    name: string,
    status: string,
    permissions: number[]
}

export interface Permission {
    id?: number;
    name?: string;
}

export interface PermissionGroup {
    category?: string;
    permissions?: Permission[];
}

export interface RoleStatus {
    label: string;
    value: string;
}