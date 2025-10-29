"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Package,
    User,
    Mail,
    FileText, 
    Hash, 
    Plus,
    Box,
    CheckCircle2,
    Clock,
    XCircle,
    Loader2,
    TrendingUp,
    Eye
} from 'lucide-react';

import { useAccessToken } from '@/app/hooks/useAccessToken';
import { useDesignOrders } from '@/app/hooks/useDesignOrders';
import { useDesignProducts } from '@/app/hooks/useDesignProducts';

import Loader from '@/app/components/Loader';
import CreateButton from '@/app/components/CreateButton';
import DesignProductsSection from "@/app/components/DesignProductsSection";

import CreateDesignProduct from '@/app/forms/designProducts/CreateDesignProduct';

export default function ViewDesignOrderPage() {
    const { id } = useParams();
    const orderId = Number(id);
    const router = useRouter();

    const [modalVisible, setModalVisible] = useState(false);
    
    const { token } = useAccessToken();
    const { isLoading, fetchDesignOrder, designOrder } = useDesignOrders();
    const { isSubmitting, fetchDesignProductsMeta, designProductsMeta, createDesignProduct, fetchDesignProducts, designProducts } = useDesignProducts();

    useEffect(() => {
        if (token) {
            fetchDesignOrder(orderId, token);
        }

        if (token && orderId) {
            fetchDesignProductsMeta(orderId, token);
            fetchDesignProducts(orderId, token);
        }
    }, [fetchDesignOrder, orderId, token]);

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    const getStatusColor = (status: string) => {        
        const statusLower = status?.toLowerCase();

        switch (statusLower) {
            case 'active':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'inactive':
                return 'bg-yellow-100 text-yellow-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getQAStatusColor = (qaStatus: string) => {
        const statusLower = qaStatus?.toLowerCase();
        if (statusLower.includes('completed')) {
            return 'bg-emerald-100 text-emerald-800 border-emerald-200';
        }
        if (statusLower.includes('rejected')) {
            return 'bg-error-100 text-error-800 border-error-200';
        }
        if (statusLower.includes('pending')) {
            return 'bg-accent-100 text-accent-800 border-accent-200';
        }
        return 'bg-light-200 text-light-900 border-light-300';
    };

    const getQAStatusIcon = (qaStatus: string) => {
        const statusLower = qaStatus?.toLowerCase();
        if (statusLower.includes('completed')) {
            return <CheckCircle2 className="w-5 h-5" />;
        }
        if (statusLower.includes('rejected')) {
            return <XCircle className="w-5 h-5" />;
        }
        if (statusLower.includes('progress')) {
            return <Loader2 className="w-5 h-5 animate-spin" />;
        }
        if (statusLower.includes('pending')) {
            return <Clock className="w-5 h-5" />;
        }
        return <Clock className="w-5 h-5" />;
    };

    // if (isLoading) {
    //     return (
    //         <Loader />
    //     );
    // }

    return (
        <div>
            <div className="my-4">
                <h1 className="text-4xl font-bold text-primary-800 mb-2">Order Details</h1>
                <p className="text-primary-600">View and manage your design order information</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-light-300">
                <div className="bg-gradient-to-r from-primary-800 to-accent-700 p-8 text-white">
                    <div className="flex items-start justify-between flex-wrap gap-4">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">{designOrder?.order_name}</h2>
                            <div className="flex items-center gap-2 text-light-200">
                                <Hash className="w-4 h-4" />
                                <span className="text-sm font-mono">{designOrder?.order_number}</span>
                            </div>
                        </div>
                        <Package className="w-16 h-16 text-light-300 opacity-80" />
                    </div>
                </div>

                <div className="px-8 py-6 bg-gradient-to-r from-light-100 to-white border-b border-light-200">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-primary-700">Status:</span>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold border capitalize ${getStatusColor(designOrder?.status ?? "")}`}>
                                {designOrder?.status}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-primary-700">QA Status:</span>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold border capitalize ${getQAStatusColor(designOrder?.qa_status ?? "")}`}>
                                {designOrder?.qa_status}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-primary-800 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-accent-600" />
                                Customer Information
                            </h3>
                            
                            <div className="bg-light-100 rounded-xl p-5 hover:shadow-md transition-shadow duration-200">
                                <label className="text-sm font-medium text-primary-600 mb-1 block">Customer Name</label>
                                <p className="text-lg font-semibold text-primary-800">{designOrder?.customer_name}</p>
                            </div>

                            {designOrder?.name && (
                                <div className="bg-light-100 rounded-xl p-5 hover:shadow-md transition-shadow duration-200">
                                    <label className="text-sm font-medium text-primary-600 mb-1 block">Contact Name</label>
                                    <p className="text-lg font-semibold text-primary-800">{designOrder.name}</p>
                                </div>
                            )}

                            {designOrder?.email && (
                                <div className="bg-light-100 rounded-xl p-5 hover:shadow-md transition-shadow duration-200">
                                    <label className="text-sm font-medium text-primary-600 mb-1 flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        Email Address
                                    </label>
                                    <a 
                                        href={`mailto:${designOrder.email}`}
                                        className="text-lg font-semibold text-accent-600 hover:text-accent-700 transition-colors duration-200"
                                    >
                                        {designOrder.email}
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-primary-800 mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-accent-600" />
                                Order Details
                            </h3>

                            <div className="bg-accent-50 rounded-xl p-5 hover:shadow-md transition-shadow duration-200">
                                <label className="text-sm font-medium text-primary-600 mb-1 block">Order ID</label>
                                <p className="text-lg font-semibold text-primary-800 font-mono">#{designOrder?.id}</p>
                            </div>

                            <div className="bg-accent-50 rounded-xl p-5 hover:shadow-md transition-shadow duration-200">
                                <label className="text-sm font-medium text-primary-600 mb-1 block">Order Number</label>
                                <p className="text-lg font-semibold text-primary-800 font-mono">{designOrder?.order_number}</p>
                            </div>
                        </div>
                    </div>

                    {designOrder?.description && (
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-primary-800 mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-accent-600" />
                                Description
                            </h3>
                            <div className="bg-gradient-to-br from-light-100 to-accent-50 rounded-xl p-6 border border-light-300">
                                <p className="text-primary-700 leading-relaxed whitespace-pre-wrap">
                                    {designOrder.description}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className='flex justify-end py-6'>
                <CreateButton icon={<Plus />} label='Create Design Product' onClick={openModal} />
            </div>

            {modalVisible && designProductsMeta && (
                <CreateDesignProduct
                    isSubmitting={isSubmitting}
                    id={orderId}
                    data={designProductsMeta}
                    onCancel={closeModal}
                    onSubmit={(formData) => createDesignProduct(formData, token)}
                />
            )}

            {designProducts && designProducts.length > 0 && (
                <DesignProductsSection
                    designProducts={designProducts}
                    getStatusColor={getStatusColor}
                    getQAStatusColor={getQAStatusColor}
                    getQAStatusIcon={getQAStatusIcon}
                    onViewDetails={(p) => console.log("View details:", p)}
                />
            )}

            {/* Empty State */}
            {designProducts && designProducts.length === 0 && (
                <div className="mt-8 bg-gradient-to-br from-light-100 to-accent-50 rounded-2xl border-2 border-dashed border-light-300 p-12 text-center">
                    <div className="max-w-md mx-auto">
                        <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Box className="w-10 h-10 text-accent-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-primary-800 mb-3">No Products Yet</h3>
                        <p className="text-primary-600 mb-6">
                            Get started by creating your first design product for this order.
                        </p>
                        <button
                            onClick={openModal}
                            className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold rounded-xl shadow-md hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Create Design Product</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}