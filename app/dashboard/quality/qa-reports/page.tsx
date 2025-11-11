// src/app/dashboard/qa-report/page.tsx

"use client";

import { useEffect, useMemo, useState } from "react";

import Loader from "@/app/components/Loader";
import SearchBar from "@/app/components/SearchBar";
import Table from "@/app/components/Table";

import { useAccessToken } from "@/app/hooks/useAccessToken";

import { useQAReport } from "@/app/hooks/useQAReports";
import { DesignOrder } from "@/app/types/QAReports";
import { ListChecks } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QAReportOrdersPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const { token } = useAccessToken();
    const { isLoading, orders, fetchQAReportOrders } = useQAReport();
    const router = useRouter();

    useEffect(() => {
        if (token) {
            fetchQAReportOrders(token);
        }
    }, [fetchQAReportOrders, token]);

    const filteredOrders = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return orders.filter((order: DesignOrder) => {
            return (
                order.order_number.toLowerCase().includes(term) ||
                order.order_name.toLowerCase().includes(term) ||
                order.customer_name.toLowerCase().includes(term) ||
                order.qa_status.toLowerCase().includes(term)
            );
        });
    }, [orders, searchTerm]);

    const handleViewOrder = (row: DesignOrder) => {
        router.push(`/dashboard/qa-reports/${row.id}`);
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <h1 className="flex items-center gap-3 mb-4 text-3xl font-bold text-primary-800">
                <ListChecks size={28} className="text-accent-600" /> QA Report: Orders
            </h1>

            <div className="flex flex-col gap-3 my-2 mb-4 sm:flex-row sm:justify-between sm:items-center">
                <SearchBar
                    placeholder="Search by Order Number, Name, or Customer..."
                    onChange={setSearchTerm}
                    className="relative w-full xl:w-1/3 md:w-96"
                />
            </div>

            <Table
                columns={["order_number", "order_name", "customer_name", "qa_status", "created_at_human"]}
                data={filteredOrders}
                onView={handleViewOrder}
                onDelete={() => { }}
                onEdit={() => { }}
                onStatusChange={() => { }}
            />
        </div>
    );
}