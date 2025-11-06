"use client";

import { useEffect, useState } from "react";

import SearchBar from "@/app/components/SearchBar";
import CreateButton from "@/app/components/CreateButton";
import Table from "@/app/components/Table";

import { PlusIcon } from "lucide-react";

import { useAccessToken } from "@/app/hooks/useAccessToken";
import { useProducts } from "@/app/hooks/useProducts";

import { ProductTypes } from "@/app/types/Products";

import CreateProductType from "@/app/forms/product/CreateProductType";
import DeleteProductType from "@/app/forms/product/DeleteProductType";
import EditProductType from "@/app/forms/product/EditProductType";
import StatusChangeProductType from "@/app/forms/product/StatusChangeProductType";

import Loader from "@/app/components/Loader";
import { usePagination } from "@/app/hooks/usePagination";

export default function ProductTypePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [statusModalVisible, setStatusModalVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState<ProductTypes | null>(null);

    const { currentPage, onPageChange } = usePagination();

    const { token } = useAccessToken();
    const { isLoading, productTypes, fetchProductTypes, isSubmitting, fetchProductTypesMeta, metaData, createProductType, deleteProductTypes, editProductType, activateProductType } = useProducts();

    useEffect(() => {
        if (token) {
            fetchProductTypes(token);
            fetchProductTypesMeta(token);
        }
    }, [fetchProductTypes, token, fetchProductTypesMeta])

    const filteredProductTypes = productTypes?.filter((type: ProductTypes) => {
        const term = searchTerm.toLowerCase();
        return (
            type.type_name?.toLowerCase().includes(term)
        );
    });

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    const openDeleteModal = (row: ProductTypes) => {
        setSelectedRow(row);
        setDeleteModalVisible(true);
    };

    const closeDeleteModal = () => setDeleteModalVisible(false);

    const closeEditModal = () => setEditModalVisible(false);

    const handleEdit = (row: ProductTypes) => {
        setSelectedRow(row);
        setEditModalVisible(true);
    };

    const openStatusModal = (row: ProductTypes) => {
        setSelectedRow(row);
        setStatusModalVisible(true);
    }

    const closeStatusModal = () => {
        setStatusModalVisible(false);
    }

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 my-2">
                <SearchBar placeholder="Search Product Type by Name ..." onChange={setSearchTerm} />
                <CreateButton icon={<PlusIcon />} label="Create Product Type" onClick={openModal} />
            </div>
    
            <Table
                columns={["type_name", "description", "status"]}
                data={filteredProductTypes}
                onEdit={handleEdit} 
                onDelete={openDeleteModal}
                onStatusChange={openStatusModal}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />

            {modalVisible && token && metaData && (
                <CreateProductType 
                    onCancel={closeModal}
                    isSubmitting={isSubmitting}
                    data={metaData}
                    onSubmit={(formData) => createProductType(formData, token)}
                />
            )}

            {deleteModalVisible && token && selectedRow && (
                <DeleteProductType
                    id={selectedRow?.id}
                    onCancel={closeDeleteModal}
                    isSubmitting={isSubmitting}
                    onConfirm={async () => {      
                        const success = await deleteProductTypes(selectedRow?.id, token);                        
                        if (success) {
                            closeDeleteModal();
                            fetchProductTypes(token);
                        }
                    }}
                />
            )}

            {editModalVisible && metaData && selectedRow && token && (
                <EditProductType
                    row={selectedRow} 
                    onCancel={closeEditModal}
                    onSubmit={(formData) => editProductType(formData, token, selectedRow.id)}
                    data={metaData}
                    isSubmitting={isSubmitting}
                />
            )}

            {statusModalVisible && selectedRow && token && (
                <StatusChangeProductType
                    row={selectedRow}
                    onCancel={closeStatusModal}
                    isSubmitting={isSubmitting}
                    onConfirm={async () => {      
                        const success = await activateProductType(selectedRow.id, token, selectedRow.status);
                        if (success) {
                            closeStatusModal();
                            fetchProductTypes(token);
                        }
                    }}
                />
            )}
        </div>
    )
}