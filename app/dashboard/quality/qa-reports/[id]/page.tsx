// src/app/dashboard/qa-report/[orderId]/products/page.tsx

"use client";

import { ArrowLeft, Package } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import Loader from "@/app/components/Loader";
import SearchBar from "@/app/components/SearchBar";
import Table from "@/app/components/Table";

import { useAccessToken } from "@/app/hooks/useAccessToken";
import { useQAReport } from "@/app/hooks/useQAReports";
import { DesignProduct } from "@/app/types/QAReports";

export default function QAReportProductsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const params = useParams();
    const orderId = Number(params.orderId);

    const { token } = useAccessToken();
    const { isLoading, productsData, fetchOrderProducts } = useQAReport();

    const { order, products } = productsData;

    useEffect(() => {
        if (!isNaN(orderId) && token) {
            fetchOrderProducts(orderId, token);
        }
    }, [fetchOrderProducts, token, orderId]);

    const formattedProducts = useMemo(() => {
        return products.map(p => ({
            ...p,
            qa_analyst_name: p.qaAnalyst?.name || 'N/A',
        }));
    }, [products]);

    const columns = useMemo(() => ([
        "product_name",
        "qa_analyst_name",
        "qa_status",
        "created_at_human"
    ]), []);

    const filteredProducts = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return formattedProducts.filter((product) => {
            return (
                product.product_name.toLowerCase().includes(term) ||
                product.qa_analyst_name.toLowerCase().includes(term) ||
                product.qa_status.toLowerCase().includes(term)
            );
        });
    }, [formattedProducts, searchTerm]);

    const handleViewProduct = (row: DesignProduct) => {
        router.push(`/dashboard/qa-report/${orderId}/products/${row.id}/items`);
    };

    if (isLoading || !order) {
        return <Loader />;
    }

    return (
        <div>
            <button
                onClick={() => router.push('/dashboard/qa-report')}
                className="flex items-center gap-2 mb-4 text-sm font-medium transition duration-150 text-primary-600 hover:text-primary-800"
            >
                <ArrowLeft size={16} /> Back to Orders
            </button>

            <h1 className="flex items-center gap-3 mb-4 text-3xl font-bold text-primary-800">
                <Package size={28} className="text-accent-600" /> **Products in Order:** {order.order_number}
            </h1>

            <div className="flex flex-col gap-3 my-2 mb-4 sm:flex-row sm:justify-between sm:items-center">
                <SearchBar
                    placeholder="Search by Product Name or QA Analyst..."
                    onChange={setSearchTerm}
                    className="relative w-full xl:w-1/3 md:w-96"
                />
            </div>

            <Table
                columns={columns}
                data={filteredProducts}
                onView={handleViewProduct}
                onDelete={() => { }}
                onEdit={() => { }}
                onStatusChange={() => { }}
            />
        </div>
    );
}