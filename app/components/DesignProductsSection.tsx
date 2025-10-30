"use client";

import React from "react";
import { Box, TrendingUp, Package, User, Eye, SquarePen, Trash, UserRoundPlus } from "lucide-react";

import { DesignProducts } from "../types/DesignProducts";

interface DesignProductsSectionProps {
    designProducts: DesignProducts[];
    getStatusColor: (status: string) => string;
    getQAStatusColor: (qaStatus: string) => string;
    getQAStatusIcon: (qaStatus: string) => React.ReactNode;
    onViewDetails?: (product: DesignProducts) => void;
    onAssign?: (id: number) => void;
    onDelete?: (product: DesignProducts) => void;
    onEdit?: (product: DesignProducts) => void;
}

export default function DesignProductsSection({
    designProducts,
    getStatusColor,
    getQAStatusColor,
    getQAStatusIcon,
    onViewDetails,
    onDelete,
    onEdit,
    onAssign
}: DesignProductsSectionProps) {
    const completedCount = designProducts.filter(
        (p) => p.qa_status?.toLowerCase() === "completed"
    ).length;

    return (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-primary-800 flex items-center gap-3">
                        <Box className="w-8 h-8 text-accent-600" />
                        Design Products
                    </h2>
                    <p className="text-primary-600 mt-1">
                        {designProducts.length}{" "}
                        {designProducts.length === 1 ? "product" : "products"} in this order
                    </p>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full">
                    <TrendingUp className="w-5 h-5 text-accent-600" />
                    <span className="text-sm font-semibold text-primary-800">
                        {completedCount} Completed
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {designProducts.map((product) => (
                    <div
                        key={product.id}
                        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-light-300 hover:border-accent-400 transform hover:-translate-y-1"
                    >
                        <div className="bg-gradient-to-br from-primary-700 via-primary-800 to-accent-700 p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12" />

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-3">
                                <div className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                                    <Package className="w-6 h-6 text-white" />
                                </div>
                                <span className="px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                                    #{product.id}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white line-clamp-2 min-h-[3.5rem]">
                                {product.product_name}
                            </h3>
                            <p className="text-light-200 text-sm font-medium">
                                {product.product_type}
                            </p>
                        </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="flex flex-wrap gap-2">
                                <div
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold border flex-1 min-w-0 ${getStatusColor(
                                        product.status
                                    )}`}
                                >
                                <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                                    <span className="capitalize truncate">{product.status}</span>
                                </div>
                            </div>

                        <div
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold border ${getQAStatusColor(
                                product.qa_status
                            )}`}
                        >
                                {getQAStatusIcon(product.qa_status)}
                            <span className="capitalize">QA: {product.qa_status}</span>
                        </div>

                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-3 p-3 bg-light-100 rounded-lg hover:bg-light-200 transition-colors duration-200">
                                <div className="p-2 bg-accent-100 rounded-lg">
                                    <User className="w-4 h-4 text-accent-700" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-primary-600 mb-0.5">
                                        QA Analyst
                                    </p>
                                    <p className="text-sm font-semibold text-primary-800 truncate">
                                        {product.qa_analyst}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-light-100 rounded-lg hover:bg-light-200 transition-colors duration-200">
                                <div className="p-2 bg-primary-100 rounded-lg">
                                    <User className="w-4 h-4 text-primary-700" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-primary-600 mb-0.5">
                                        Created By
                                    </p>
                                    <p className="text-sm font-semibold text-primary-800 truncate">
                                        {product.created_by}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-4">
                            <button
                                onClick={() => onViewDetails?.(product)}
                                className="mt-4 mx-1 px-4 py-3 bg-gradient-to-r from-light-600 to-light-700 hover:from-light-700 hover:to-light-800 text-white font-semibold rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                            >
                                <Eye className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                            </button>

                            <button
                                onClick={() => onEdit?.(product)}
                                className="mt-4 mx-1 px-4 py-3 bg-gradient-to-r from-accent-600 to-accent-800 hover:from-accent-700 hover:to-accent-700 text-white font-semibold rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                            >
                                <SquarePen className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                            </button>
                            <button
                                onClick={() => onDelete?.(product)}
                                className="mt-4 mx-1 px-4 py-3 bg-gradient-to-r from-error-600 to-error-800 hover:from-error-700 hover:to-error-700 text-white font-semibold rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                            >
                                <Trash className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                            </button>

                            <button
                                onClick={() => onAssign?.(product.id)}
                                className="mt-4 mx-1 px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-700 text-white font-semibold rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                            >
                                <UserRoundPlus className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                            </button>
                        </div>
                        
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
