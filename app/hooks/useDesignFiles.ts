import { useState, useCallback } from "react";
import { toast } from "../components/ToastContainer";
import APP_URL from "../constants/Config";

import { DesignItem } from "../types/DesignFiles";

export function useDesignFiles() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [designItem, setDesignItem] = useState<DesignItem | null>(null);

    // API Call to Fetch Design Products Item Details
    const fetchDesignItemDetails = useCallback(async (id: number, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${APP_URL}design-items/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
                if (!response.ok) {
                console.log("Response Error in fetching design item details : ", responseJson.message);
                return;
            }

            const item = responseJson.designItem;

            const formattedItem: DesignItem = {
                id: item.id,
                item_name: item.item_name,
                player_name: item.player_name,
                player_number: item.player_number,
                notes: item.notes,
                status: item.status,
                qa_status: item.qa_status,
                created_by: item.created_by?.name ?? "Unknown",
                file_name: item.file_name || "",
                file: item.file || "",
                design_order: {
                    order_name: item.design_order?.order_name ?? "",
                    order_number: item.design_order?.order_number ?? "",
                },
                design_product: {
                    product_name: item.design_product?.product_name ?? "",
                    status: item.design_product?.status ?? "",
                    qa_status: item.design_product?.qa_status ?? "",
                },
                product_size: item.product_size?.size_name ?? "", // extract readable name
            };

            setDesignItem(formattedItem);
        } catch (error: any) {
            console.log("Error fetching design item details : ", error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);


    return {
        fetchDesignItemDetails, isLoading, isSubmitting, designItem
    }
}