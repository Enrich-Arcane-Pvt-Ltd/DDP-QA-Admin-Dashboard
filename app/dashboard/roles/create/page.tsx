"use client";

import CustomInput from "@/app/components/CustomInput";
import CustomSelect from "@/app/components/CustomSelect";
import { toast } from "@/app/components/ToastContainer";
import { useAccessToken } from "@/app/hooks/useAccessToken";
import { useRoles } from "@/app/hooks/useRoles";
import { CheckCircle2, Lock, Shield, User } from "lucide-react";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Loader from "@/app/components/Loader";

export default function CreateRolePage() {
    const { token } = useAccessToken();
    const { fetchUserRolesPermissions, status, permissions, isSubmitting, createUserRole, isLoading } = useRoles();

    const router = useRouter();

    const [roleName, setRoleName] = useState('');
    const [roleStatus, setRoleStatus] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

    useEffect(() => {
        if (token) {
            fetchUserRolesPermissions(token);
        }
    }, [fetchUserRolesPermissions, token]);

    const togglePermission = (id: number) => {
        setSelectedPermissions(prev =>
            prev.includes(id)
                ? prev.filter(pid => pid !== id)
                : [...prev, id]
        );
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selectAllInCategory = (categoryPermissions: any[]) => {
        const categoryIds = categoryPermissions.map(p => p.id!);
        const allSelected = categoryIds.every(id => selectedPermissions.includes(id));

        if (allSelected) {
            setSelectedPermissions(prev => prev.filter(id => !categoryIds.includes(id)));
        } else {
            setSelectedPermissions(prev => [...new Set([...prev, ...categoryIds])]);
        }
    };

    const handleClick = async () => {
        if (!roleName) {
            toast.error('Role Name is required');
            return;
        }

        if (!roleStatus) {
            toast.error('Role Status is required');
            return;
        }

        const data = {
            name: roleName,
            status: roleStatus,
            permissions: selectedPermissions
        }

        const success = await createUserRole(token, data);
        if (success) {
            setRoleName('');
            setRoleStatus('');
            setSelectedPermissions([]);

            setTimeout(() => {
                router.push('/dashboard/roles');
            }, 2000);
        }
    }

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <div>
            <div className="my-4">
                <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl text-primary-800">
                    Create New Role
                </h1>
                <p className="mt-2 text-sm text-primary-600 sm:text-base">
                    Define role details and assign permissions to control access
                </p>
            </div>

            <div className="overflow-hidden border shadow-xl bg-light-100 backdrop-blur-sm rounded-2xl border-primary-200/50">
                <div className="p-6 space-y-8 sm:p-8">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 pb-3 border-b-2 border-accent-600/20">
                            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-accent-600 to-primary-700"></div>
                            <h2 className="text-xl font-bold text-primary-800">Basic Information</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
                                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-accent-600 to-primary-700"></div>
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
                                        className="overflow-hidden transition-all duration-300 border shadow-md group bg-gradient-to-br from-white to-light-100 rounded-xl hover:shadow-lg border-primary-200/50"
                                    >
                                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-700 to-accent-600">
                                            <div className="flex items-center gap-3">
                                                <Lock className="text-white" size={20} />
                                                <h3 className="text-lg font-bold text-white">
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
                                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                                                                    className="w-5 h-5 transition-all border-2 rounded appearance-none cursor-pointer peer border-primary-300 checked:bg-accent-600 checked:border-accent-600"
                                                                />
                                                                <CheckCircle2
                                                                    className="absolute top-0 left-0 w-5 h-5 text-white transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100"
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

                    <div className="flex flex-col gap-4 pt-6 border-t sm:flex-row border-primary-200">
                        <button onClick={handleClick} className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-600 to-primary-700 hover:from-accent-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
                            {isSubmitting ? 'Creating Role...' : 'Create Role'}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}