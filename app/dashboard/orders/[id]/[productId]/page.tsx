"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useDesignItems } from '@/app/hooks/useDesignItems';
import { useAccessToken } from '@/app/hooks/useAccessToken';
import { PlusIcon } from 'lucide-react';
import Loader from '@/app/components/Loader';
import CreateButton from '@/app/components/CreateButton';
import ProductDetailsSection from '@/app/components/ProductDetailsSection';
import CreateDesignItem from '@/app/forms/items/CreateDesignItems';
import DesignItemsCards from '@/app/components/DesignItemsCards';
import DeleteDesignItem from '@/app/forms/items/DeleteDesignItem';
import EditDesignItem from '@/app/forms/items/EditDesignItems';
import { DesignItems } from '@/app/types/DesignItems';

export default function ViewDesignProductsPage() {
    const params = useParams();
    const orderId = Number(params.id);
    const productId = Number(params.productId);
    const router = useRouter();

    const { token } = useAccessToken();
    const { isLoading, isSubmitting, fetchDesignProductsDetails, designProduct, createDesignItem, fetchDesignItemsMetaData, metaData, fetchDesignItems, designItems, deleteDesignItem, editDesignItem } = useDesignItems();

    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedId, setSelectedId] = useState<number>();
    const [selectedRow, setSelectedRow] = useState<DesignItems | null>(null);

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    const openDeleteModal = (id: number) => {
        setSelectedId(id);
        setDeleteModalVisible(true);
    }

    const openEditModal = (row: DesignItems) => {
        setSelectedRow(row);
        setEditModalVisible(true);
    }

    const closeEditModal = () => {
        setSelectedRow(null);
        setEditModalVisible(false);
    }

    const closeDeleteModal = () => {
        setSelectedId(undefined);
        setDeleteModalVisible(false);
    }

    useEffect(() => {
        if (token) {
            fetchDesignProductsDetails(productId, token);
            fetchDesignItemsMetaData(token, orderId, productId);
            fetchDesignItems(token, orderId, productId);
        }
    }, [fetchDesignProductsDetails, token, productId, fetchDesignItemsMetaData, orderId, fetchDesignItems]);

    if (!designProduct || isLoading) {
        return <Loader />;
    }

    return (
        <div className='py-6'>
            <ProductDetailsSection designProduct={designProduct} />
            
            <div className='flex justify-end'>
                <CreateButton label='Create Design Item' icon={<PlusIcon />} onClick={openModal} />
            </div>

            <DesignItemsCards 
                designItems={designItems}
                onView={(p) =>
                    router.push(`/dashboard/orders/${orderId}/${productId}/${p.id}`)
                }
                onEdit={(item) => openEditModal(item)}
                onDelete={(id) => openDeleteModal(id)}
            />

            {modalVisible && metaData && (
                <CreateDesignItem 
                    onCancel={closeModal}
                    metaData={metaData}
                    isSubmitting={isSubmitting}
                    orderId={orderId}
                    productId={productId}
                    onSubmit={(formData) => createDesignItem(token, formData)}
                />
            )}

            {deleteModalVisible && selectedId && token && (
                <DeleteDesignItem
                    onCancel={closeDeleteModal}
                    isSubmitting={isSubmitting}
                    onConfirm={async () => {      
                        const success = await deleteDesignItem(selectedId, token);
                        if (success) {
                            closeDeleteModal();
                            fetchDesignItems(token, orderId, productId);
                        }
                    }}
                    id={selectedId}
                />
            )}

            {editModalVisible && selectedRow && token && metaData && (
                <EditDesignItem 
                    onCancel={closeEditModal}
                    orderId={orderId}
                    productId={productId}
                    metaData={metaData}
                    isSubmitting={isSubmitting}
                    onSubmit={(formData) => editDesignItem(token, formData, selectedRow.id)}
                    row={selectedRow}
                />
            )}
        </div>
    );
}