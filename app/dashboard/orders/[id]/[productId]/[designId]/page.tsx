"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAccessToken } from '@/app/hooks/useAccessToken';
import { useDesignFiles } from '@/app/hooks/useDesignFiles';
import { PlusIcon } from 'lucide-react';
import Loader from '@/app/components/Loader';
import CreateButton from '@/app/components/CreateButton';
import DesignItemDetails from "@/app/components/DesignItemDetails";
import CreateDesignFile from '@/app/forms/files/CreateDesignFile';
import DesignFiles from "@/app/components/DesignFiles";

export default function ViewDesignItemPage() {
    const params = useParams();
    const orderId = Number(params.id);
    const productId = Number(params.productId);
    const designId = Number(params.designId);
    const router = useRouter();

    const [modalVisible, setModalVisible] = useState(false);

    const { token } = useAccessToken();
    const { isLoading, isSubmitting, fetchDesignItemDetails, activateDesignFiles, fetchDesignFiles,  designItem, fetchDesignFilesMetaData, designFileStatus, qaStatus, fileTypes, createDesignFile, designFiles, deleteDesignFile, editDesignFile } = useDesignFiles();

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    
    useEffect(() => {
        if (token) {
            fetchDesignItemDetails(designId, token);
            fetchDesignFilesMetaData(token, orderId, productId, designId);
            fetchDesignFiles(token, orderId, productId, designId);
        }
    }, [fetchDesignItemDetails, designId, token, fetchDesignFilesMetaData, orderId, productId, fetchDesignFiles]);

    if (isLoading || !designItem) {
        return <Loader />
    }

    return(
        <div>
            <div className="mb-6 flex justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-primary-800 mb-2">
                        {designItem.item_name}
                    </h1>
                    <p className="text-primary-600 text-lg">Design Item Details</p>
                </div>
                <div>
                    <CreateButton label='Create Design File' icon={<PlusIcon />} onClick={openModal} />
                </div>
            </div>

            <DesignItemDetails designItem={designItem} />

            <DesignFiles
                designFiles={designFiles}
                isSubmitting={isSubmitting}
                onDelete={(id) => deleteDesignFile(id, token, orderId, productId, designId)}
                onStatus={(id, status) => activateDesignFiles(id, token, status, orderId, productId, designId)}
                onEdit={(id, formData) => editDesignFile(id, token, formData)}
                designFileStatus={designFileStatus}
                qaStatus={qaStatus}
                designId={designId}
                orderId={orderId}
                productId={productId}
                fileTypes={fileTypes}
            />

            {modalVisible && (
                <CreateDesignFile 
                    isSubmitting={isSubmitting}
                    designFileStatus={designFileStatus}
                    qaStatus={qaStatus}
                    orderId={orderId}
                    productId={productId}
                    designId={designId}
                    onCancel={closeModal}
                    fileTypes={fileTypes}
                    onSubmit={(formData) => createDesignFile(token, formData)}
                />
            )}
        </div>
    )
}