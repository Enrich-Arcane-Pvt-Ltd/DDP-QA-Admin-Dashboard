import { useState, useCallback } from "react";
import { toast } from "@/app/components/ToastContainer";

import { UserProfile, UpdateEmail, UpdatePassword, UpdateProfile } from "../types/Users";

import APP_URL from "../constants/Config";

export function useProfile() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // API Call to Fetch User Profile
    const fetchUserProfile = useCallback(async (token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${APP_URL}profile`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching user profile : ", responseJson.message);
                return;
            }

            setProfile(responseJson.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error fetching user profile : ", error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // API Call to Update User Profile
    const editProfile = useCallback(async (data: UpdateProfile, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return false;
        }

        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('name', data.username);

        if (data.file instanceof File) {
            formData.append('profile_picture', data.file);
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`${APP_URL}profile/update`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            });

            const responseJson = await response.json();            
            
            if (!response.ok) {
                console.log("Response Error in updating user profile : ", responseJson.message);
                toast.error(responseJson.message)
                return false;
            }

            toast.success(responseJson.message);
            return true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error updating user profile : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Update Password
    const changePassword = useCallback(async (data: UpdatePassword, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return false;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}profile/update-password`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    old_password: data.password,
                    new_password: data.newPassword,
                    new_password_confirmation: data.confirmNewPassword,
                })
            });

            const responseJson = await response.json();
            
            if (!response.ok) {
                console.log("Response Error in updating user passwords : ", responseJson.message);
                toast.error(responseJson.message)
                return false;
            }

            toast.success(responseJson.message);
            return true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error updating user passwords : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Update Email
    const changeEmail = useCallback(async (data: UpdateEmail, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return false;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}profile/update-email`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            });

            const responseJson = await response.json();
            
            if (!response.ok) {
                console.log("Response Error in updating user email : ", responseJson.message);
                toast.error(responseJson.message)
                return false;
            }

            toast.success(responseJson.message);
            return true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error updating user email : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Delete Profile
    const deleteUserProfile = useCallback(async (token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}profile/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in deleting user profile : ", responseJson.message);
                toast.error(responseJson.message)
                return false;
            }

            toast.success(responseJson.message);
            localStorage.clear();
            return true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error deleting user profile : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    return {
        profile, setProfile, fetchUserProfile, isLoading, 
        isSubmitting, deleteUserProfile,
        changeEmail, changePassword,
        editProfile
    }
}