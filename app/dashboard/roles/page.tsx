"use client";

import { useEffect, useState } from "react";

import SearchBar from "@/app/components/SearchBar";
import CreateButton from "@/app/components/CreateButton";
import Table from "@/app/components/Table";
import CreateRole from "@/app/forms/roles/CreateRole";
import EditRole from "@/app/forms/roles/EditRole";
import DeleteRole from "@/app/forms/roles/DeleteRole";

import { toast } from "@/app/components/ToastContainer";

import { PlusIcon } from "lucide-react";

import { Roles } from "@/app/types/Roles";

import { useRoles } from "@/app/hooks/useRoles";
import { useAccessToken } from "@/app/hooks/useAccessToken";

import { useRouter } from "next/navigation";

interface UserData {
    role: string,
    status: string
}

export default function UserRolesPage() {
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const [selectedRow, setSelectedRow] = useState<UserData | null>(null);

    const router = useRouter();

    const { token } = useAccessToken();
    const { isLoading, fetchUserRoles, roles, fetchUserRolesPermissions  } = useRoles();

    const openModal = () => {
        router.push('/dashboard/roles/create')
    }
    const closeModal = () => setModalVisible(false);

    const openDeleteModal = (row: UserData) => {
        setSelectedRow(row);
        setDeleteModalVisible(true)
    };
    const closeDeleteModal = () => setDeleteModalVisible(false);

    const handleEdit = (row: UserData) => {        
        setSelectedRow(row);
        setEditModalVisible(true);
    };

    const closeEditModal = () => setEditModalVisible(false);

    const handleCreateRole = async (data: UserData) => {
        if (!data.role) {
            toast.error('Role is required');
            return;
        }

        try {
            toast.success('Role created successfully');
            closeModal();
        } catch (error) {
            toast.error('Failed to create role');
            closeModal();
        }
    };

    const handleEditRole = async () => {
        try {
            toast.success('Role updated successfully');
            closeEditModal();
        } catch (error) {
            toast.error('Failed to edit role');
            closeEditModal();
        }
    }
    
    useEffect(() => {
        if (token) {
            fetchUserRoles(token);
            fetchUserRolesPermissions(token);
        }
    }, [token, fetchUserRoles, fetchUserRolesPermissions]);

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 my-2">
                <SearchBar placeholder="Search User Role ..." />
                <CreateButton icon={<PlusIcon />} label="Create User Role" onClick={openModal} />
            </div>
    
            <Table
                columns={["name", "status"]}
                data={roles}
                onEdit={handleEdit} 
                onDelete={openDeleteModal}
            />

            {modalVisible && (
                <CreateRole
                    onSubmit={handleCreateRole}
                    onCancel={closeModal}
                />
            )}

            {editModalVisible && selectedRow && (
                <EditRole 
                    row={selectedRow} 
                    onCancel={closeEditModal}
                    onSubmit={handleEditRole}
                />
            )}

            {deleteModalVisible && selectedRow && (
                <DeleteRole 
                    row={selectedRow}
                    onCancel={closeDeleteModal}
                    onConfirm={openDeleteModal}
                />
            )}
        </div>
    )
}