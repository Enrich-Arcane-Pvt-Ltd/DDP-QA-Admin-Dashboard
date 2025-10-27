import { useState, useCallback } from "react";
import { toast } from "../components/ToastContainer";

import { Roles, PermissionGroup, RoleStatus, CreateRole } from "../types/Roles";
import APP_URL from "../constants/Config";

export function useRoles () {
    const [isLoading, setIsLoading] = useState(false);
    const [roles, setRoles] = useState<Roles[]>([]);
    const [permissions, setPermissions] = useState<PermissionGroup[]>([]);
    const [status, setStatus] = useState<RoleStatus[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            

            const formattedRoles = responseJson.map((role: any) => ({
                id: role.id,
                name: role.name,
                status: role.status,
            }));

            setRoles(formattedRoles);
        } catch (error : any) {
            console.log('Error fetching user roles : ', error.message);
        } finally {
            setIsLoading(false);
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
        } catch (error : any) {
            console.log('Error fetching user roles permissions : ', error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);
    
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
        } catch (error : any) {
            console.log('Error creating user roles permissions : ', error.message);
            toast.error('Failed to create user role');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, [])

    return {
        isLoading, fetchUserRoles, roles,
        fetchUserRolesPermissions, permissions, status,
        isSubmitting, createUserRole
    }
}