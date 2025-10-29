"use client";

import { useEffect, useState } from "react";

import SearchBar from "@/app/components/SearchBar";
import CreateButton from "@/app/components/CreateButton";
import Table from "@/app/components/Table";
import DeleteRole from "@/app/forms/roles/DeleteRole";

import { PlusIcon } from "lucide-react";

import { Roles } from "@/app/types/Roles";

import { useRoles } from "@/app/hooks/useRoles";
import { useAccessToken } from "@/app/hooks/useAccessToken";

import { useRouter } from "next/navigation";

import Loader from "@/app/components/Loader";

export default function UserRolesPage() {
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState<Roles | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const router = useRouter();

    const { token } = useAccessToken();
    const { isLoading, fetchUserRoles, roles, fetchUserRolesPermissions, deleteUserRole, isSubmitting  } = useRoles();

    const openModal = () => {
        router.push('/dashboard/roles/create')
    }

    const openDeleteModal = (row: Roles) => {
        setSelectedRow(row);
        setDeleteModalVisible(true)
    };

    const closeDeleteModal = () => setDeleteModalVisible(false);

    const handleEdit = (row: Roles) => {
        router.push(`/dashboard/roles/${row.id}`);
    };


    const filteredUserRoles = roles?.filter((role: Roles) => {
        const term = searchTerm.toLowerCase();
        return (
            role.name.toLowerCase().includes(term)
        );
    });

    useEffect(() => {
        if (token) {
            fetchUserRoles(token);
            fetchUserRolesPermissions(token);
        }
    }, [token, fetchUserRoles, fetchUserRolesPermissions]);

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 my-2">
                <SearchBar placeholder="Search User Role ..." onChange={setSearchTerm} />
                <CreateButton icon={<PlusIcon />} label="Create User Role" onClick={openModal} />
            </div>
    
            <Table
                columns={["name", "status"]}
                data={filteredUserRoles}
                onEdit={handleEdit} 
                onDelete={openDeleteModal}
            />

            {deleteModalVisible && selectedRow && token && (
                <DeleteRole 
                    row={selectedRow}
                    isSubmitting={isSubmitting}
                    onConfirm={async () => {      
                        const success = await deleteUserRole(selectedRow.id, token);
                        if (success) {
                            fetchUserRoles(token);
                            closeDeleteModal()
                        }
                    }}
                    onCancel={closeDeleteModal}
                />
            )}
        </div>
    )
}

