import { useState, useCallback } from "react";
import { toast } from "../components/ToastContainer";

import { Roles, PermissionGroup, RoleStatus, CreateRole, UserRole } from "../types/Roles";
import APP_URL from "../constants/Config";

export function useRoles () {
    const [isLoading, setIsLoading] = useState(false);
    const [roles, setRoles] = useState<Roles[]>([]);
    const [permissions, setPermissions] = useState<PermissionGroup[]>([]);
    const [status, setStatus] = useState<RoleStatus[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userRole, setUserRole] = useState<UserRole | null>(null)  

    // API Call to Fetch User Roles
    const fetchUserRoles = useCallback(async (token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${APP_URL}roles`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching user roles : ", responseJson.message);
                return;
            }
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const formattedRoles = responseJson.map((role: any) => ({
                id: role.id,
                name: role.name,
                status: role.status,
            }));

            setRoles(formattedRoles);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error : any) {
            console.log('Error fetching user roles : ', error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // API Call to Fetch User Role
    const fetchUserRoleDetails = useCallback(async (id: number, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}roles/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching user role : ", responseJson.message);
                return;
            }

            setUserRole(responseJson.role);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error fetching user role : ", error.message);
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Fetch User Roles Permissions
    const fetchUserRolesPermissions = useCallback(async (token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${APP_URL}roles/meta`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching user roles permissions : ", responseJson.message);
                return;
            }
            
            setPermissions(responseJson.allPermissions);
            setStatus(responseJson.roleStatus);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error : any) {
            console.log('Error fetching user roles permissions : ', error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    // API Call to Create User Role
    const createUserRole = useCallback(async (token: string | null, data: CreateRole) => {
        if (!token) {
            console.log("Token Not Found");
            return false;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`${APP_URL}roles`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: data.name,
                    status: data.status,
                    permissions: data.permissions
                })
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in creating user roles permissions : ", responseJson.message);
                toast.error(responseJson.message);
                return false;
            }

            toast.success('User Role created successfully');
            return true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error : any) {
            console.log('Error creating user roles permissions : ', error.message);
            toast.error('Failed to create user role');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Edit User Role
    const editUserRole = useCallback(async (id: number, token: string | null, data: CreateRole) => {
        if (!token) {
            console.log("Token Not Found");
            return false;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`${APP_URL}roles/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: data.name,
                    status: data.status,
                    permissions: data.permissions
                })
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in updating user roles permissions : ", responseJson.message);
                toast.error(responseJson.message);
                return false;
            }

            toast.success('User Role updated successfully');
            return true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error : any) {
            console.log('Error updating user roles permissions : ', error.message);
            toast.error('Failed to update user role');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Delete User Role
    const deleteUserRole = useCallback(async (id: number, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}roles/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in deleting user role : ", responseJson.message);
                toast.error('Failed to delete the user role');
                return false;
            }

            toast.success('User Role deleted successfully !');
            return true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error deleting user role : ", error.message);
            toast.error('Failed to delete the user role');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    return {
        isLoading, fetchUserRoles, roles,
        fetchUserRolesPermissions, permissions, status,
        isSubmitting, createUserRole,
        deleteUserRole, fetchUserRoleDetails, userRole,
        editUserRole
    }
}