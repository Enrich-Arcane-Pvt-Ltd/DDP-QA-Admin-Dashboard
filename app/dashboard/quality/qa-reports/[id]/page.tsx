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
    const { id } = useParams();
    const orderId = Number(id);
    
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const { token } = useAccessToken();
    const { isLoading, productsData, fetchOrderProducts } = useQAReport();

    if (isLoading) {
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
                <Package size={28} className="text-accent-600" /> **Products in Order:**
            </h1>

            <div className="flex flex-col gap-3 my-2 mb-4 sm:flex-row sm:justify-between sm:items-center">
                <SearchBar
                    placeholder="Search by Product Name or QA Analyst..."
                    onChange={setSearchTerm}
                    className="relative w-full xl:w-1/3 md:w-96"
                />
            </div>

            
        </div>
    );
}