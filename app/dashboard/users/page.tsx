"use client";

import { useState, useEffect } from "react";

import SearchBar from "@/app/components/SearchBar";
import CreateButton from "@/app/components/CreateButton";
import Table from "@/app/components/Table";
import Loader from "@/app/components/Loader";

import CreateUser from "@/app/forms/users/CreateUser";
import DeleteUser from "@/app/forms/users/DeleteUser";
import EditUser from "@/app/forms/users/EditUser";

import { useAccessToken } from "@/app/hooks/useAccessToken";
import { useUsers } from "@/app/hooks/useUsers";

import { PlusIcon } from "lucide-react";
import ViewUser from "@/app/forms/users/ViewUser";
import APP_URL from "@/app/constants/Config";

import { UserData } from "@/app/types/Users";
import ActivateUser from "@/app/forms/users/ActivateUser";

export default function UsersPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState<UserData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { token } = useAccessToken();
  const { users, isLoading, fetchUsers, createUser, editUser, setUsers, fetchUsersData, data, setData, isSubmitting, deleteUsers, activateUsers } = useUsers(APP_URL);

  useEffect(() => {
    if (token){
      fetchUsers(token);
      fetchUsersData(token);
    };
  }, [token, fetchUsers, fetchUsersData]);

  const filteredUsers = users?.filter((user: UserData) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const openDeleteModal = (row: UserData) => {    
    setSelectedRow(row);
    setDeleteModalVisible(true)
  };
  const closeDeleteModal = () => setDeleteModalVisible(false);

  const openStatusModal = (row: UserData) => {
    setSelectedRow(row);
    setStatusModalVisible(true);
  }

  const closeStatusModal = () => setStatusModalVisible(false);

  const handleEdit = (row: UserData) => {        
    setSelectedRow(row);
    setEditModalVisible(true);
  };

  const closeEditModal = () => setEditModalVisible(false);

  const handleView = (row: UserData) => {        
    setSelectedRow(row);    
    setViewModalVisible(true);
  };

  const closeViewModal = () => setViewModalVisible(false);

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 my-2">
        <SearchBar placeholder="Search by name or email..." onChange={setSearchTerm} />
        <CreateButton icon={<PlusIcon />} label="Create User" onClick={openModal} />
      </div>

      <Table
        columns={["name", "email", "role", "status"]}
        data={filteredUsers}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={openDeleteModal}
        onStatusChange={openStatusModal}
      />
      
      {modalVisible && data && token &&(
        <CreateUser 
          onCancel={closeModal}
          onSubmit={(formData) => createUser(formData, token)}
          data={data}
          isSubmitting={isSubmitting}
        />
      )}

      {editModalVisible && data && selectedRow && token && (
        <EditUser
            row={selectedRow} 
            onCancel={closeEditModal}
            onSubmit={(formData) => editUser(formData, token, selectedRow.id)}
            data={data}
            isSubmitting={isSubmitting}
        />
      )}

      {deleteModalVisible && selectedRow && token && (
        <DeleteUser
          row={selectedRow}
          onCancel={closeDeleteModal}
          isSubmitting={isSubmitting}
          onConfirm={async () => {      
            const success = await deleteUsers(selectedRow.id, token);
            if (success) {
              closeDeleteModal();
              fetchUsers(token);
            }
          }}
        />
      )}

      {statusModalVisible && selectedRow && token && (
        <ActivateUser
          row={selectedRow}
          onCancel={closeStatusModal}
          isSubmitting={isSubmitting}
          onConfirm={async () => {      
            const success = await activateUsers(selectedRow.id, token, selectedRow.status);
            if (success) {
              closeStatusModal();
              fetchUsers(token);
              
            }
          }}
        />
      )}

      {viewModalVisible && selectedRow && (
        <ViewUser
            row={selectedRow} 
            onCancel={closeViewModal}
        />
      )}

    </div>
  );
}
