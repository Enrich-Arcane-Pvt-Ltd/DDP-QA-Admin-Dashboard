import { useState, useCallback } from "react";
import { toast } from "../components/ToastContainer";
import APP_URL from "../constants/Config";

import { DesignItem, CreateDesignFile, DesignFileQAStatus, DesignFileStatus } from "../types/DesignFiles";

export function useDesignFiles() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [designItem, setDesignItem] = useState<DesignItem | null>(null);
    const [designFile, setDesignFile] = useState<DesignItem | null>(null);
    const [designFileStatus, setDesignFileStatus] = useState<DesignFileStatus[]>([]);
    const [qaStatus, setQAStatus] = useState<DesignFileQAStatus[]>([]);

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

    // API Call to Create Design File
    const createDesignFile = useCallback(async (token: string | null, data: CreateDesignFile) => {
        if (!token) {
            console.log("Token Not Found");
            return false;
        }
        
        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}design-files`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data)
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in creating design file : ", responseJson);
                toast.error(responseJson.message);
                return false;
            }

            toast.success(responseJson.message);
            
            return true;
        } catch (error: any) {
            console.log("Error creating design file : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Fetch Design Files Meta Data
    const fetchDesignFilesMetaData = useCallback(async (token: string | null, orderId: number, productId: number, itemId: number) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${APP_URL}design-files/meta?design_order_id=${orderId}&design_product_id=${productId}&design_item_id=${itemId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching design files meta data : ", responseJson.message);
                return;
            }

            setDesignFileStatus(responseJson.designFileStatus);
            setQAStatus(responseJson.qaStatus);
        } catch (error: any) {
            console.log("Error fetching design items files data : ", error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        fetchDesignItemDetails, isLoading, isSubmitting, designItem, createDesignFile,
        fetchDesignFilesMetaData, designFileStatus, qaStatus
    }
}