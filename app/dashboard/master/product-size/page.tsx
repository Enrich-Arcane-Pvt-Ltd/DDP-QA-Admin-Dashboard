"use client";

import { useEffect, useState } from "react";

import SearchBar from "@/app/components/SearchBar";
import CreateButton from "@/app/components/CreateButton";
import Table from "@/app/components/Table";

import { PlusIcon } from "lucide-react";

import { useAccessToken } from "@/app/hooks/useAccessToken";
import { useProducts } from "@/app/hooks/useProducts";

import { ProductSizes } from "@/app/types/Products";

import CreateProductSize from "@/app/forms/product/CreateProductSize";
import StatusChangeProductSize from "@/app/forms/product/StatusChangeProductSize";
import DeleteProductSize from "@/app/forms/product/DeleteProductSize";
import EditProductSize from "@/app/forms/product/EditProductSize";
import Loader from "@/app/components/Loader";

export default function ProductSizePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [statusModalVisible, setStatusModalVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState<ProductSizes | null>(null);

    const { token } = useAccessToken();
    const { isLoading, productSizes, fetchProductSizes, isSubmitting, fetchProductTypesMeta, metaData, createProductSize, deleteProductSizes, editProductSize, activateProductSize, } = useProducts();

    useEffect(() => {
        if (token) {
            fetchProductSizes(token);
            fetchProductTypesMeta(token);
        }
    }, [fetchProductSizes, token, fetchProductTypesMeta])

    const filteredProductSizes = productSizes?.filter((type: ProductSizes) => {
        const term = searchTerm.toLowerCase();
        return (
            type.size_name?.toLowerCase().includes(term)
        );
    });

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    const openDeleteModal = (row: ProductSizes) => {
        setSelectedRow(row);
        setDeleteModalVisible(true);
    };

    const closeDeleteModal = () => setDeleteModalVisible(false);

    const closeEditModal = () => setEditModalVisible(false);

    const handleEdit = (row: ProductSizes) => {
        setSelectedRow(row);
        setEditModalVisible(true);
    };

    const openStatusModal = (row: ProductSizes) => {
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
                <SearchBar placeholder="Search Product Size by Name ..." onChange={setSearchTerm} />
                <CreateButton icon={<PlusIcon />} label="Create Product Size" onClick={openModal} />
            </div>
    
            <Table
                columns={["size_name", "size_code", "status"]}
                data={filteredProductSizes}
                onEdit={handleEdit} 
                onDelete={openDeleteModal}
                onStatusChange={openStatusModal}
            />

            {modalVisible && token && metaData && (
                <CreateProductSize 
                    onCancel={closeModal}
                    isSubmitting={isSubmitting}
                    data={metaData}
                    onSubmit={(formData) => createProductSize(formData, token)}
                />
            )}

            {deleteModalVisible && token && selectedRow && (
                <DeleteProductSize
                    id={selectedRow?.id}
                    onCancel={closeDeleteModal}
                    isSubmitting={isSubmitting}
                    onConfirm={async () => {      
                        const success = await deleteProductSizes(selectedRow?.id, token);                        
                        if (success) {
                            closeDeleteModal();
                            fetchProductSizes(token);
                        }
                    }}
                />
            )}

            {editModalVisible && metaData && selectedRow && token && (
                <EditProductSize
                    row={selectedRow} 
                    onCancel={closeEditModal}
                    onSubmit={(formData) => editProductSize(formData, token, selectedRow.id)}
                    data={metaData}
                    isSubmitting={isSubmitting}
                />
            )}

            {statusModalVisible && selectedRow && token && (
                <StatusChangeProductSize
                    row={selectedRow}
                    onCancel={closeStatusModal}
                    isSubmitting={isSubmitting}
                    onConfirm={async () => {      
                        const success = await activateProductSize(selectedRow.id, token, selectedRow.status);
                        if (success) {
                            closeStatusModal();
                            fetchProductSizes(token);
                        }
                    }}
                />
            )}
        </div>
    )
}