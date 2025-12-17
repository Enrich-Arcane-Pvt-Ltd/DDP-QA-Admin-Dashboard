"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAccessToken } from "@/app/hooks/useAccessToken";
import { useQAReport } from "@/app/hooks/useQAReports";

export default function QAReportProductItemsPage() {
    const { id } = useParams();
    const params = useParams();
    const orderId = Number(id);
    const productId = Number(params.nestedId);
    
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const { token } = useAccessToken();
    const { isLoading, fetchOrderProductItems, itemsData } = useQAReport();

    useEffect(() => {
        if (token) {
            fetchOrderProductItems(orderId, productId, token);
        }
    }, [fetchOrderProductItems, orderId, productId, token]);
    
    return (
        <div>
            <h1>Item Details Page</h1>
        </div>
    )
}