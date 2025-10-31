"use client";

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAccessToken } from '@/app/hooks/useAccessToken';
import { useDesignFiles } from '@/app/hooks/useDesignFiles';
import {
    Package,
    User,
    Hash,
    FileText,
    CheckCircle2,
    XCircle,
    Clock,
    ShoppingBag,
    Ruler
} from 'lucide-react';

import Loader from '@/app/components/Loader';

export default function ViewDesignItemPage() {
    const params = useParams();
    const orderId = Number(params.id);
    const productId = Number(params.productId);
    const designId = Number(params.designId);
    const router = useRouter();

    const { token } = useAccessToken();
    const { isLoading, isSubmitting, fetchDesignItemDetails, designItem } = useDesignFiles();
    
    useEffect(() => {
        if (token) {
            fetchDesignItemDetails(designId, token)
        }
    }, [fetchDesignItemDetails, designId, token]);

    if (isLoading || !designItem) {
        return <Loader />
    }

    const getStatusColor = (status : string) => {
        switch(status?.toLowerCase()) {
            case 'active': return 'bg-accent-600 text-white';
            case 'completed': return 'bg-primary-600 text-white';
            case 'pending': return 'bg-light-700 text-primary-800';
            default: return 'bg-light-500 text-primary-800';
        }
    };

    const getQAStatusColor = (qaStatus : string) => {
        switch(qaStatus?.toLowerCase()) {
            case 'in_progress': return 'text-accent-600 bg-accent-100';
            case 'completed': return 'text-accent-600 bg-accent-100';
            case 'rejected': return 'text-error-600 bg-error-100';
            case 'pending': return 'text-light-900 bg-light-300';
            default: return 'text-light-900 bg-light-300';
        }
    };

    const getQAIcon = (qaStatus : string) => {
        switch(qaStatus?.toLowerCase()) {
            case 'approved': 
            case 'completed': 
                return <CheckCircle2 className="w-5 h-5" />;
            case 'rejected': 
                return <XCircle className="w-5 h-5" />;
            default: 
                return <Clock className="w-5 h-5" />;
        }
    };

    return(
        <div>
            <div className="mb-6">
                <h1 className="text-4xl font-bold text-primary-800 mb-2">
                    {designItem.item_name}
                </h1>
                <p className="text-primary-600 text-lg">Design Item Details</p>
            </div>

                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-light-300">
                            <div className="bg-gradient-to-r from-accent-600 to-accent-700 p-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <ShoppingBag className="w-7 h-7" />
                                    Design Order
                                </h2>
                            </div>
                            <div className="p-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <p className="text-sm text-primary-600 font-medium uppercase tracking-wide">Order Name</p>
                                        <p className="text-xl font-bold text-primary-800">{designItem.design_order.order_name}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-primary-600 font-medium uppercase tracking-wide">Order Number</p>
                                        <p className="text-xl font-mono font-bold text-accent-600">{designItem.design_order.order_number}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-light-300">
                            <div className="bg-gradient-to-r from-primary-700 to-primary-800 p-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <Package className="w-7 h-7" />
                                    Product Details
                                </h2>
                            </div>
                            <div className="p-8">
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <p className="text-sm text-primary-600 font-medium uppercase tracking-wide">Product Name</p>
                                            <p className="text-xl font-bold text-primary-800">{designItem.design_product.product_name}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm text-primary-600 font-medium uppercase tracking-wide">Size</p>
                                            <div className="flex items-center gap-2">
                                                <Ruler className="w-5 h-5 text-accent-600" />
                                                <p className="text-xl font-bold text-primary-800">{designItem.product_size}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <p className="text-sm text-primary-600 font-medium uppercase tracking-wide">Product Status</p>
                                            <span className={`inline-flex items-center capitalize gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${getStatusColor(designItem.design_product.status)}`}>
                                                {designItem.design_product.status}
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm text-primary-600 font-medium uppercase tracking-wide">Product QA</p>
                                            <span className={`inline-flex items-center capitalize gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${getQAStatusColor(designItem.design_product.qa_status)}`}>
                                                {getQAIcon(designItem.design_product.qa_status)}
                                                {designItem.design_product.qa_status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {designItem.notes && (
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-light-300">
                                <div className="bg-gradient-to-r from-light-700 to-light-600 p-6">
                                    <h2 className="text-2xl font-bold text-primary-800 flex items-center gap-3">
                                        <FileText className="w-7 h-7" />
                                        Notes
                                    </h2>
                                </div>
                                <div className="p-8">
                                    <p className="text-primary-700 leading-relaxed text-lg">{designItem.notes}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-light-300">
                            <div className="bg-gradient-to-r from-primary-800 to-accent-600 p-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <User className="w-7 h-7" />
                                    Player Information
                                </h2>
                            </div>
                            <div className="p-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <p className="text-sm text-primary-600 font-medium uppercase tracking-wide">Player Name</p>
                                        <p className="text-2xl font-bold text-primary-800">{designItem.player_name}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-primary-600 font-medium uppercase tracking-wide">Player Number</p>
                                        <div className="flex items-center gap-2">
                                            <Hash className="w-6 h-6 text-accent-600" />
                                            <p className="text-2xl font-bold text-primary-800">{designItem.player_number}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-light-300">
                            <div className="bg-primary-800 p-6">
                                <h2 className="text-xl font-bold text-white">Status Overview</h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <p className="text-sm text-primary-600 font-medium uppercase tracking-wide">Item Status</p>
                                    <span className={`inline-flex items-center capitalize gap-2 px-4 py-2 rounded-lg text-sm font-semibold w-full justify-center ${getStatusColor(designItem.status)}`}>
                                        {designItem.status}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-primary-600 font-medium uppercase tracking-wide">QA Status</p>
                                    <span className={`inline-flex items-center capitalize gap-2 px-4 py-2 rounded-lg text-sm font-semibold w-full justify-center ${getQAStatusColor(designItem.qa_status)}`}>
                                        {getQAIcon(designItem.qa_status)}
                                        {designItem.qa_status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-light-300">
                            <div className="bg-accent-600 p-6">
                                <h2 className="text-xl font-bold text-white">Additional Info</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-start gap-3 p-4 bg-light-100 rounded-lg">
                                    <User className="w-5 h-5 text-accent-600 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-xs text-primary-600 font-medium uppercase tracking-wide mb-1">Created By</p>
                                        <p className="text-primary-800 font-semibold">{designItem.created_by}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 bg-light-100 rounded-lg">
                                    <Hash className="w-5 h-5 text-accent-600 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-xs text-primary-600 font-medium uppercase tracking-wide mb-1">Item ID</p>
                                        <p className="text-primary-800 font-mono font-semibold">{designItem.id}</p>
                                    </div>
                                </div>
                                {designItem.file_name && (
                                    <div className="flex items-start gap-3 p-4 bg-light-100 rounded-lg">
                                        <FileText className="w-5 h-5 text-accent-600 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-xs text-primary-600 font-medium uppercase tracking-wide mb-1">File</p>
                                            <p className="text-primary-800 font-semibold truncate">{designItem.file_name}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}