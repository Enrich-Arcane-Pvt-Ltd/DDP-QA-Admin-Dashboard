import { useState, useCallback } from "react";
import { toast } from "@/app/components/ToastContainer";

import { UserData, UserInput, UserMeta } from "../types/Users";

export function useUsers(APP_URL: string) {
    const [users, setUsers] = useState<UserData[]>([]);
    const [data, setData] = useState<UserMeta | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // API Call to Fetch All Users
    const fetchUsers = useCallback(async (token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${APP_URL}users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching users : ", responseJson.message);
                return;
            }            

            const filteredUsers = responseJson.filter(
                (user: any) => user.role_id !== "1"
            );            

            const formattedUsers = filteredUsers.map((user: any) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.has_role?.name || "N/A",
                status: user.status,
                profile_picture_url: user?.profile_picture_url
            }));

            setUsers(formattedUsers);
            
        } catch (error: any) {
            console.log("Error fetching users : ", error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // API Call to Fetch Users' Meta Data
    const fetchUsersData = useCallback(async (token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${APP_URL}users/meta`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching users data : ", responseJson.message);
                return;
            }

            setData(responseJson);            
        } catch (error: any) {
            console.log("Error fetching users data : ", error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // API Call to Create Users
    const createUser = async (data: UserInput, token: string | null) => {
        const formData = new FormData();

        formData.append('name', data.name ?? '');
        formData.append('email', data.email ?? '');
        formData.append('password', data.password ?? '');
        formData.append('password_confirmation', data.confirmPassword ?? '');
        formData.append('role_id', String(data.role ?? ''));
        formData.append('status', data.status ?? '');

        if (data.file instanceof File) {
            formData.append('profile_picture', data.file);
        }

        setIsSubmitting(true);    

        try {
            const response = await fetch(APP_URL + 'users', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });

            const responseJson = await response.json();

            if (!response.ok) {
                toast.error(responseJson.message);
                return false;
            }

            toast.success("User created successfully");
            await fetchUsers(token);
            return true;

        } catch (error) {
            toast.error("Failed to create user");
            return false;

        } finally {
            setIsSubmitting(false);
        }
    };

    // API Call to Edit Users
    const editUser = async (data: UserInput, token: string | null, id: number) => {                
        const formData = new FormData();
        
        formData.append('_method', 'PATCH');
        formData.append('name', data.name);
        formData.append('role_id', String(data.role));
        formData.append('status', data.status);

        if (data.file instanceof File) {
            formData.append('profile_picture', data.file);
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(APP_URL + `users/${id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });

            const responseJson = await response.json();            

            if (!response.ok) {
                console.log('Response Error in updating user : ', responseJson.message);
                toast.error(responseJson.message);
                return false;
            }            

            toast.success("User updated successfully");
            await fetchUsers(token);
            return true;
        } catch (error) {
            toast.error("Failed to update user");
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    // API Call to Delete Users
    const deleteUsers = useCallback(async (id: number, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}users/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in deleting users : ", responseJson.message);
                toast.error('Failed to delete the user');
                return false;
            }

            toast.success('User deleted successfully !');
            return true;
        } catch (error: any) {
            console.log("Error deleting user : ", error.message);
            toast.error('Failed to delete the user');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Activate/Deactivate Users
    const activateUsers = useCallback(async (id: number, token: string | null, status: string) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }        

        setIsSubmitting(true);
        try {
            const currentStatus = status === 'active' ? 'block' : 'unblock';

            const response = await fetch(`${APP_URL}users/${id}/${currentStatus}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in activating users : ", responseJson.message);
                toast.error(responseJson.message);
                return false;
            }

            toast.success(responseJson.message);
            return true;
        } catch (error: any) {
            console.log("Error activating user : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    return {
        users,
        isLoading,
        fetchUsers,
        createUser,
        editUser,
        setUsers,
        fetchUsersData,
        data,
        setData,
        isSubmitting,
        deleteUsers,
        activateUsers,
    };
}
