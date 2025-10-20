"use client";

import { useState } from "react";

import SearchBar from "@/app/components/SearchBar";
import CreateButton from "@/app/components/CreateButton";
import Table from "@/app/components/Table";
import CreateUser from "@/app/forms/users/CreateUser";
import DeleteUser from "@/app/forms/users/DeleteUser";
import EditUser from "@/app/forms/users/EditUser";

import { toast } from "@/app/components/ToastContainer";

import { PlusIcon } from "lucide-react";
import ViewUser from "@/app/forms/users/ViewUser";

interface UserData {
  name: string,
  email: string,
  role: string,
  contact: string,
  status: string
}

export default function UsersPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);

  const [selectedRow, setSelectedRow] = useState<UserData | null>(null);

  const openModal = () => setModalVisible(true);
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

  const handleView = (row: UserData) => {        
    setSelectedRow(row);
    setViewModalVisible(true);
  };

  const closeViewModal = () => setViewModalVisible(false);

  const handleCreateUser = async (data: UserData) => {
    if (!data.name) {
      toast.error("Name is required");
      return;
    }

    if (!data.email) {
      toast.error("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!data.contact) {
      toast.error("Contact is required");
      return;
    }

    if (!data.role) {
      toast.error("Role is required");
      return;
    }

    try {
      toast.success('User created successfully');
      closeModal();
    } catch (error) {
      toast.error('Failed to create user');
      closeModal();
    }
  };

  const handleEditUser = async () => {
    try {
      toast.success('User updated successfully');
      closeEditModal();
    } catch (error) {
      toast.error('Failed to edit user');
      closeEditModal();
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 my-2">
        <SearchBar placeholder="Search users..." />
        <CreateButton icon={<PlusIcon />} label="Create User" onClick={openModal} />
      </div>

      <Table
        columns={["name", "email", "role", "contact", "status"]}
        data={[
          { name: "John Doe", email: "john@example.com", role: "Admin", contact: "+94 1234567", status: "Active" },
          { name: "Jane Smith", email: "jane@example.com", role: "User", contact: "+94 1234567", status: "Inactive" },
          
        ]}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={openDeleteModal}
      />
      
      {modalVisible && (
        <CreateUser 
          onCancel={closeModal}
          onSubmit={handleCreateUser}
        />
      )}

      {deleteModalVisible && selectedRow && (
        <DeleteUser 
          row={selectedRow}
          onCancel={closeDeleteModal}
          onConfirm={openDeleteModal}
        />
      )}

      {editModalVisible && selectedRow && (
        <EditUser
            row={selectedRow} 
            onCancel={closeEditModal}
            onSubmit={handleEditUser}
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
