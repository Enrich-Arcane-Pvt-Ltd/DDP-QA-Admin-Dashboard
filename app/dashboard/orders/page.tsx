"use client";

import { useState, useEffect } from "react";

import SearchBar from "@/app/components/SearchBar";
import CreateButton from "@/app/components/CreateButton";
import Table from "@/app/components/Table";

import { PlusIcon } from "lucide-react";

import { useDesignOrders } from "@/app/hooks/useDesignOrders";
import { useAccessToken } from "@/app/hooks/useAccessToken";

import CreateDesignOrder from "@/app/forms/orders/CreateDesignOrder";
import DeleteDesignOrder from "@/app/forms/orders/DeleteDesignOrder";
import EditDesignOrder from "@/app/forms/orders/EditDesignOrder";

import { useRouter } from "next/navigation";

import Loader from "@/app/components/Loader";

import { DesignOrders } from "@/app/types/Orders";
import { usePagination } from "@/app/hooks/usePagination";

export default function OrdersPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState<DesignOrders | null>(null);

  const { currentPage, onPageChange } = usePagination();

  const { token } = useAccessToken();
  const { isLoading, designOrders, fetchDesignOrders, fetchDesignOrdersMetaData, designMetaData, isSubmitting, createDesignOrder, deleteDesignOrders, editDesignOrder } = useDesignOrders();

  const router = useRouter();

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const openDeleteModal = (row: DesignOrders) => {    
    setSelectedRow(row);
    setDeleteModalVisible(true)
  };

  const closeDeleteModal = () => setDeleteModalVisible(false);

  const handleEdit = (row: DesignOrders) => {        
    setSelectedRow(row);
    setEditModalVisible(true);
  };

  const closeEditModal = () => setEditModalVisible(false);

  useEffect(() => {
    if (token) {
      fetchDesignOrders(token);      
      fetchDesignOrdersMetaData(token);
    }
  }, [fetchDesignOrders, token, fetchDesignOrdersMetaData]);

  const filteredDesignOrders = designOrders?.filter((order: DesignOrders) => {
    const term = searchTerm.toLowerCase();
    return (
      order.order_number.toLowerCase().includes(term) ||
      order.order_name.toLowerCase().includes(term) ||
      order.customer_name.toLowerCase().includes(term)
    );
  });

  const handleView = (row: DesignOrders) => {
    router.push(`/dashboard/orders/${row.id}`);
  };

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 my-2">
        <SearchBar placeholder="Search by order name, number or customer..."  onChange={setSearchTerm} className="relative w-full xl:w-1/3 md:w-96"/>
        <CreateButton icon={<PlusIcon />} label="Create Design Order" onClick={openModal} />
      </div>

      <Table
        columns={["order_name", "order_number", "customer_name", "created_by", "status", "qa_status"]}
        data={filteredDesignOrders}
        onDelete={openDeleteModal}
        onEdit={handleEdit}
        onView={handleView}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      {modalVisible && designMetaData && (
        <CreateDesignOrder 
          isSubmitting={isSubmitting}
          data={designMetaData}
          onCancel={closeModal}
          onSubmit={(formData) => createDesignOrder(formData, token)}
        />
      )}

      {deleteModalVisible && selectedRow && token && (
        <DeleteDesignOrder
          row={selectedRow}
          onCancel={closeDeleteModal}
          isSubmitting={isSubmitting}
          onConfirm={async () => {      
            const success = await deleteDesignOrders(selectedRow.id, token);
            if (success) {
              closeDeleteModal();
              fetchDesignOrders(token);
            }
          }}
        />
      )}

      {editModalVisible && designMetaData && selectedRow && token && (
        <EditDesignOrder
            row={selectedRow} 
            onCancel={closeEditModal}
            onSubmit={(formData) => editDesignOrder(formData, token, selectedRow.id)}
            data={designMetaData}
            isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}