"use client";

import { ArrowLeft, Package, User, FileText, Globe, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Loader from "@/app/components/Loader";
import SearchBar from "@/app/components/SearchBar";

import { useAccessToken } from "@/app/hooks/useAccessToken";
import { useQAReport } from "@/app/hooks/useQAReports";

export default function QAReportProductsPage() {
    const { id } = useParams();
    const orderId = Number(id);
    
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const { token } = useAccessToken();
    const { isLoading, productsData, fetchOrderProducts } = useQAReport();

    const order = productsData?.order;

    useEffect(() => {
        if (token) {
            fetchOrderProducts(orderId, token);
        }
    }, [fetchOrderProducts, orderId, token]);

    if (isLoading) {
        return <Loader />;
    }

    const handleNavigate = (id: number, orderId: number) => {
        router.push(`/dashboard/quality/qa-reports/${orderId}/${id}`);
    }

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return 'bg-accent-100 text-accent-700 border-accent-300';
            case 'completed':
                return 'bg-primary-100 text-primary-700 border-primary-300';
            case 'pending':
                return 'bg-light-300 text-primary-800 border-light-400';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getQAStatusColor = (qaStatus: string) => {
        switch (qaStatus?.toLowerCase()) {
            case 'in_progress':
                return 'bg-accent-200 text-accent-800 border-accent-400';
            case 'completed':
                return 'bg-accent-100 text-accent-700 border-accent-300';
            case 'pending':
                return 'bg-light-400 text-primary-800 border-light-500';
            case 'failed':
                return 'bg-error-100 text-error-700 border-error-300';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return <CheckCircle2 className="w-4 h-4" />;
            case 'pending':
                return <Clock className="w-4 h-4" />;
            default:
                return <AlertCircle className="w-4 h-4" />;
        }
    };

    return (
        <div>
            {order && (
                <div className="bg-white rounded-2xl shadow-xl border border-light-400 overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-primary-800 via-primary-700 to-accent-600 px-8 py-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">{order.order_name}</h2>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                                        {order.order_number}
                                    </span>
                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                                        ID: {order.id}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <span className={`px-4 py-2 rounded-lg border font-medium text-sm flex items-center gap-2 ${getStatusColor(order.status ?? "")}`}>
                                    {getStatusIcon(order?.status ?? "")}
                                    {order.status?.replace('_', ' ').toUpperCase()}
                                </span>
                                <span className={`px-4 py-2 rounded-lg border font-medium text-sm ${getQAStatusColor(order.qa_status)}`}>
                                    QA: {order.qa_status?.replace('_', ' ').toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-accent-100 to-accent-200 border border-accent-300">
                                <div className="p-3 bg-accent-600 rounded-lg">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-primary-700 mb-1">Customer Name</p>
                                    <p className="text-lg font-semibold text-primary-800">{order.customer_name}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 border border-primary-300">
                                <div className="p-3 bg-primary-700 rounded-lg">
                                    <Globe className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-primary-700 mb-1">Order Source</p>
                                    <p className="text-lg font-semibold text-primary-800 capitalize">{order?.order_source}</p>
                                </div>
                            </div>

                            <div className="md:col-span-2 flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-light-200 to-light-300 border border-light-400">
                                <div className="p-3 bg-light-700 rounded-lg">
                                    <FileText className="w-5 h-5 text-primary-800" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-primary-700 mb-1">Description</p>
                                    <p className="text-base text-primary-800 leading-relaxed">{order.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-xl border border-light-400 p-8">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-3xl font-bold text-primary-800">Product List</h3>
                        <SearchBar
                            placeholder="Search by Product Name or QA Analyst..."
                            onChange={setSearchTerm}
                            className="relative w-full xl:w-1/3 md:w-96"
                        />
                    </div>

                    {productsData?.products && (
                        <div
                            onClick={() => handleNavigate(orderId, Number(productsData?.products?.id))}
                            className="bg-gradient-to-br from-light-100 cursor-pointer to-light-200 rounded-xl border border-light-400 overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-accent-600 rounded-lg">
                                            <Package className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-primary-800">{productsData.products.product_name}</h4>
                                            <p className="text-sm text-primary-700">ID: {productsData.products.id}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className={`px-3 py-1.5 rounded-lg border font-medium text-xs flex items-center gap-1.5 ${getStatusColor(productsData.products.status ?? "")}`}>
                                            {getStatusIcon(productsData.products.status ?? "")}
                                            {productsData.products.status?.replace('_', ' ').toUpperCase()}
                                        </span>
                                        <span className={`px-3 py-1.5 rounded-lg border font-medium text-xs ${getQAStatusColor(productsData.products.qa_status)}`}>
                                            QA: {productsData.products.qa_status?.replace('_', ' ').toUpperCase()}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-4 border-t border-light-400">
                                    <User className="w-4 h-4 text-primary-700" />
                                    <span className="text-sm text-primary-700">QA Analyst:</span>
                                    <span className="text-sm font-semibold text-primary-800">{productsData.products.qa_analyst?.name}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}