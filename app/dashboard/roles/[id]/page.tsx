"use client";

import CustomInput from '@/app/components/CustomInput';
import CustomSelect from '@/app/components/CustomSelect';
import { toast } from '@/app/components/ToastContainer';
import { useAccessToken } from '@/app/hooks/useAccessToken';
import { useRoles } from '@/app/hooks/useRoles';
import { CheckCircle2, Lock, Shield, User } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from '@/app/components/Loader';

export default function EditRolePage() {
    const { id } = useParams();
    const roleId = Number(id);
    const router = useRouter();

    const { token } = useAccessToken();
    const { fetchUserRolesPermissions, status, permissions, isSubmitting, createUserRole, isLoading, fetchUserRoleDetails, userRole, editUserRole } = useRoles();

    const [roleName, setRoleName] = useState(userRole?.name ?? "");
    const [roleStatus, setRoleStatus] = useState(userRole?.status ?? "");
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

    useEffect(() => {
        if (token) {
            fetchUserRolesPermissions(token);
        }

        if (!isNaN(roleId) && token) {
            fetchUserRoleDetails(roleId, token);
        }
    }, [fetchUserRolesPermissions, token, fetchUserRoleDetails, roleId]);

    useEffect(() => {
        if (userRole) {
            setRoleName(userRole.name ?? "");
            setRoleStatus(userRole.status ?? "");
            setSelectedPermissions(userRole.permissions?.map(p => p.id!) || []);
        }
    }, [userRole]);

    const handleClick = async () => {
        if (!roleName) {
            toast.error('Role Name is required');
            return;
        }

        const data = {
            name: roleName,
            status: roleStatus,
            permissions: selectedPermissions
        }

        const success = await editUserRole(roleId, token, data);
        if (success) {
            setRoleName('');
            setRoleStatus('');
            setSelectedPermissions([]);

            setTimeout(() => {
                router.push('/dashboard/roles');
            }, 2000);
        }
    }

    const togglePermission = (id: number) => {
        setSelectedPermissions(prev =>
            prev.includes(id)
                ? prev.filter(pid => pid !== id)
                : [...prev, id]
        );
    };

    const selectAllInCategory = (categoryPermissions: any[]) => {
        const categoryIds = categoryPermissions.map(p => p.id!);
        const allSelected = categoryIds.every(id => selectedPermissions.includes(id));
        
        if (allSelected) {
            setSelectedPermissions(prev => prev.filter(id => !categoryIds.includes(id)));
        } else {
            setSelectedPermissions(prev => [...new Set([...prev, ...categoryIds])]);
        }
    };

    if (isLoading || isSubmitting) {
        return (
            <Loader />
        )
    }

    return (
        <div>
            <div className="my-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-800">
                    Edit User Role
                </h1>
                <p className="text-primary-600 text-sm mt-2 sm:text-base">
                    Define role details and assign permissions to control access
                </p>
            </div>

            <div className="bg-light-100 backdrop-blur-sm rounded-2xl shadow-xl border border-primary-200/50 overflow-hidden">
                <div className="p-6 sm:p-8 space-y-8">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 pb-3 border-b-2 border-accent-600/20">
                            <div className="w-1 h-6 bg-gradient-to-b from-accent-600 to-primary-700 rounded-full"></div>
                            <h2 className="text-xl font-bold text-primary-800">Basic Information</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                                    <User size={16} className="text-accent-600" />
                                    Role Name
                                    <span className="text-error-600">*</span>
                                </label>
                                <CustomInput 
                                    type='text'
                                    placeholder="Enter the Role Name"
                                    icon={<User />}
                                    value={roleName}
                                    onChange={(e) => setRoleName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-primary-800">
                                    <Shield size={16} className="text-accent-600" />
                                    Status
                                    <span className="text-error-600">*</span>
                                </label>
                                <CustomSelect
                                    value={roleStatus}
                                    onChange={(e) => setRoleStatus(e.target.value)}
                                    options={status}
                                    icon={<Shield />}
                                    placeholder="Select Status"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between pb-3 border-b-2 border-accent-600/20">
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-accent-600 to-primary-700 rounded-full"></div>
                                <h2 className="text-xl font-bold text-primary-800">Permissions</h2> <span className="text-error-600">*</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-primary-600">
                                <CheckCircle2 size={16} className="text-accent-600" />
                                <span className="font-medium">
                                    {selectedPermissions.length} selected
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {permissions?.map((group) => {
                                const categoryPermissionIds = group.permissions?.map(p => p.id!) || [];
                                const allSelected = categoryPermissionIds.length > 0 && 
                                    categoryPermissionIds.every(id => selectedPermissions.includes(id));
                                const someSelected = categoryPermissionIds.some(id => selectedPermissions.includes(id));

                                return (
                                    <div 
                                        key={group.category} 
                                        className="group bg-gradient-to-br from-white to-light-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-primary-200/50 overflow-hidden"
                                    >
                                        <div className="bg-gradient-to-r from-primary-700 to-accent-600 p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Lock className="text-white" size={20} />
                                                <h3 className="font-bold text-white text-lg">
                                                    {group.category}
                                                </h3>
                                            </div>
                                            <button
                                                onClick={() => selectAllInCategory(group.permissions || [])}
                                                className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded-lg transition-colors duration-200 backdrop-blur-sm"
                                            >
                                                {allSelected ? 'Deselect All' : 'Select All'}
                                            </button>
                                        </div>

                                        <div className="p-5">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                                {group.permissions?.map((perm) => {
                                                    const isChecked = selectedPermissions.includes(perm.id!);
                                                    return (
                                                        <label 
                                                            key={perm.id} 
                                                            className={`
                                                                flex items-center gap-2.5 p-3 rounded-lg text-sm cursor-pointer
                                                                transition-all duration-200 border-2
                                                                ${isChecked 
                                                                    ? 'bg-gradient-to-br from-accent-100 to-primary-100 border-accent-600 shadow-sm' 
                                                                    : 'bg-white border-primary-200 hover:border-accent-400 hover:bg-light-100'
                                                                }
                                                            `}
                                                        >
                                                            <div className="relative">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isChecked}
                                                                    onChange={() => togglePermission(perm.id!)}
                                                                    className="peer appearance-none w-5 h-5 border-2 border-primary-300 rounded checked:bg-accent-600 checked:border-accent-600 cursor-pointer transition-all"
                                                                />
                                                                <CheckCircle2 
                                                                    className="absolute top-0 left-0 w-5 h-5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" 
                                                                    size={20}
                                                                />
                                                            </div>
                                                            <span className={`font-medium ${isChecked ? 'text-primary-800' : 'text-primary-700'}`}>
                                                                {perm.name}
                                                            </span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-primary-200">
                        <button onClick={handleClick} className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-600 to-primary-700 hover:from-accent-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
                            {isSubmitting ? 'Updating User Role...' : 'Update User Role'}
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
