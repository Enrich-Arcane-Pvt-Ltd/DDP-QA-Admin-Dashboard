"use client";

import { useState, useCallback, useEffect } from "react";

import SearchBar from "@/app/components/SearchBar";
import CreateButton from "@/app/components/CreateButton";
import Table from "@/app/components/Table";
import Loader from "@/app/components/Loader";

import CreateUser from "@/app/forms/users/CreateUser";
import DeleteUser from "@/app/forms/users/DeleteUser";
import EditUser from "@/app/forms/users/EditUser";

import { useAccessToken } from "@/app/hooks/useAccessToken";

import { toast } from "@/app/components/ToastContainer";

import { PlusIcon } from "lucide-react";
import ViewUser from "@/app/forms/users/ViewUser";
import APP_URL from "@/app/constants/Config";

interface UserData {
  id?: number,
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
  const [isLoading, setIsLoading] = useState(false);

  const [selectedRow, setSelectedRow] = useState<UserData | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);

  const token = useAccessToken();

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

  const fetchUsers = useCallback(async (token: string | null) => {
    setIsLoading(true);
    if (!token) {
      console.log('Token Not Found');
      return;
    }

    try {
      const response = await fetch(APP_URL + 'users', {
        method: 'GET',
        headers: {
          'Content-Type' :'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const responseJson = await response.json();

      if (!response.ok) {
        console.log('Response Error in fetching users : ', responseJson.message);
        return;
      }

      const filteredUsers = responseJson.filter(
        (user: any) => user.role_id !== "1"
      );

      console.log('filteredUsers : ', filteredUsers);
      

      setUsers(filteredUsers);
    } catch (error: any) {
      console.log('Error fetching users : ', error.message);      
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUsers(token);
    } else {
      console.log('Token Not Found');
    }
  }, [token, fetchUsers]);

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 my-2">
        <SearchBar placeholder="Search users..." />
        <CreateButton icon={<PlusIcon />} label="Create User" onClick={openModal} />
      </div>

      <Table
        columns={["name", "email", "role", "contact", "status"]}
        data={users}
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
