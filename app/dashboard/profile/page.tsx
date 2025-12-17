"use client";

import { CircleUserRound, Mail, Shield, Sparkles, UserPen, Activity, Lock, UserRoundX } from "lucide-react";
import CreateButton from "@/app/components/CreateButton";
import InfoCard from "@/app/components/InfoCard";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAccessToken } from "@/app/hooks/useAccessToken";
import { useProfile } from "@/app/hooks/useProfile";

import DeleteProfile from "@/app/forms/profile/DeleteProfileModal";
import ChangeEmailModal from "@/app/forms/profile/ChangeEmailModal";
import ChangePasswordModal from "@/app/forms/profile/ChangePasswordModal";
import EditProfileModal from "@/app/forms/profile/EditProfileModal";

import Loader from "@/app/components/Loader";

export default function ProfilePage() {
    const {token} = useAccessToken();
    const router = useRouter();

    const [emailModalVisible, setEmailModalVisible] = useState(false);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);

    const { profile, setProfile, fetchUserProfile, isLoading, isSubmitting, deleteUserProfile, changeEmail, changePassword, editProfile } = useProfile();
    
    const openEmailModal = () => setEmailModalVisible(true);
    const closeEmailModal = () => setEmailModalVisible(false);

    const openPasswordModal = () => setPasswordModalVisible(true);
    const closePasswordModal = () => setPasswordModalVisible(false);

    const openDeleteModal = () => setDeleteModalVisible(true);
    const closeDeleteModal = () => setDeleteModalVisible(false);

    const openEditModal = () => {
        profile;
        setEditModalVisible(true);
    }
    const closeEditModal = () => setEditModalVisible(false);

    useEffect(() => {
        if (token) {
            fetchUserProfile(token);
        }
    }, [token, fetchUserProfile]);

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <div>
            <div className="w-full my-4 flex flex-col xl:flex-row gap-6 relative overflow-hidden">
                <div className="xl:w-1/3 w-full bg-light-100 p-8 rounded-2xl flex flex-col justify-center items-center text-primary-600 relative shadow-lg z-10">
                    <div className="absolute top-4 right-4">
                        <Sparkles size={24} className="text-primary-400 animate-pulse" />
                    </div>
                    
                    <div className="relative mb-6 group flex justify-center items-center">
                        <div className="absolute inset-0 bg-primary-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

                        <div className="relative w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center overflow-hidden">
                            {profile?.profile_picture_url?.trim() ? (
                                <img
                                    src={profile.profile_picture_url}
                                    alt={profile.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <CircleUserRound size={48} className="text-primary-600" strokeWidth={1.5} />
                            )}
                        </div>
                    </div>

                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-primary-700 mb-1">{profile?.name || 'N/A'}</h2>
                        <div className="flex items-center justify-center gap-2 text-primary-500">
                            <Shield size={16} />
                            <span className="text-sm font-medium">{profile?.has_role?.name || 'N/A'}</span>
                        </div>
                    </div>
                    
                    <CreateButton icon={<UserPen size={20} />} label="Update Profile" onClick={openEditModal} />
                </div>
                
                <div className="xl:w-2/3 w-full bg-light-100 p-6 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 shadow-lg z-10">
                    <InfoCard 
                        icon={CircleUserRound} 
                        label="Full Name" 
                        value={profile?.name || 'N/A'}
                        gradient="from-primary-700 to-primary-500"
                    />
                    <InfoCard 
                        icon={Mail} 
                        label="Email Address" 
                        value={profile?.email || 'N/A'}
                        gradient="from-primary-700 to-primary-500"
                    />
                    <InfoCard 
                        icon={Shield} 
                        label="Role" 
                        value={profile?.has_role?.name || 'N/A'}
                        gradient="from-primary-700 to-primary-500"
                    />
                    <InfoCard 
                        icon={Activity} 
                        label="Status" 
                        value={profile?.status || 'N/A'}
                        gradient="from-primary-700 to-primary-500"
                    />
                </div>
            </div>

            <div className="w-full mt-8 bg-light-100 p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-primary-700 mb-6">Account Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <CreateButton label="Change Email" icon={<Mail size={20} />} onClick={openEmailModal} />
                    <CreateButton label="Change Password" icon={<Lock size={20} />} gradient="from-light-500 to-light-800" onClick={openPasswordModal} />
                    <CreateButton label="Delete Profile" icon={<UserRoundX size={20} />} gradient="from-error-500 to-error-800" onClick={openDeleteModal} />
                </div>
            </div>

            {deleteModalVisible && (
                <DeleteProfile 
                    isSubmitting={isSubmitting}
                    onCancel={closeDeleteModal}
                    onConfirm={async () => {      
                        const success = await deleteUserProfile(token);
                        if (success) {
                            closeDeleteModal();
                            setTimeout(() => {
                                router.replace('/')
                            }, 3000);
                        }
                    }}
                />
            )}

            {emailModalVisible && token && (
                <ChangeEmailModal 
                    isSubmitting={isSubmitting}
                    onCancel={closeEmailModal}
                    onSubmit={(formData) => changeEmail(formData, token)}
                />
            )}

            {passwordModalVisible && token && (
                <ChangePasswordModal 
                    isSubmitting={isSubmitting}
                    onCancel={closePasswordModal}
                    onSubmit={(formData) => changePassword(formData, token)}
                />
            )}

            {editModalVisible && token && profile && (
                <EditProfileModal 
                    isSubmitting={isSubmitting}
                    onCancel={closeEditModal}
                    onSubmit={async (formData) => {
                        const success = await editProfile(formData, token);
                        if (success) {
                            await fetchUserProfile(token);
                        }
                        return success;
                    }}
                    name={profile.name}
                    image={profile?.profile_picture_url}
                />
            )}
        </div>
    )
}