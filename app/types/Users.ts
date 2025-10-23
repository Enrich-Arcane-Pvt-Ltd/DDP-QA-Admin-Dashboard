interface HasRole {
    id?: number;
    name: string;
    slug?: string;
    status?: string;
}

export interface Role {
    value: string;
    label: string;
    created_at_human?: string;
    updated_at_human?: string;
}

export interface UserStatus {
    value: string;
    label: string;
}

export interface UserData {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
}

export interface Users {
    id?: number;
    name: string;
    email: string;
    has_role?: HasRole;
    status: string;
}

export interface UserMeta {
    roles: Role[];
    userStatus: UserStatus[];
}

export interface UserInput {
    id?: number;
    name: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    role: string;
    status: string;
}