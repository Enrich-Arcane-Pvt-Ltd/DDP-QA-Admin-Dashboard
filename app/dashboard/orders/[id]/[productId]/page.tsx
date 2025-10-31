"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useDesignItems } from '@/app/hooks/useDesignItems';
import { useAccessToken } from '@/app/hooks/useAccessToken';
import { PlusIcon } from 'lucide-react';
import Loader from '@/app/components/Loader';
import CreateButton from '@/app/components/CreateButton';
import ProductDetailsSection from '@/app/components/ProductDetailsSection';

export default function ViewDesignProductsPage() {
    const params = useParams();
    const orderId = Number(params.id);
    const productId = Number(params.productId);
    const router = useRouter();

    const { token } = useAccessToken();
    const { isLoading, isSubmitting, fetchDesignProductsDetails, designProduct, createDesignItem } = useDesignItems();

    useEffect(() => {
        if (token) {
            fetchDesignProductsDetails(productId, token);
        }
    }, [fetchDesignProductsDetails, token, productId]);

    if (!designProduct || isLoading) {
        return <Loader />;
    }

    return (
        <div className='py-6'>
            <ProductDetailsSection designProduct={designProduct} />
            
            <div className='flex justify-end'>
                <CreateButton label='Create Design Item' icon={<PlusIcon />} />
            </div>
        </div>
    );
}