import { useState, useCallback } from "react";
import { toast } from "../components/ToastContainer";
import APP_URL from "../constants/Config";

import { DesignProduct, CreateDesignItem } from "../types/DesignItems";

export function useDesignItems() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [designProduct, setDesignProduct] = useState<DesignProduct | null>(null);

    // API Call to Fetch Design Products Details
    const fetchDesignProductsDetails = useCallback(async (id: number, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }        

        setIsLoading(true);
        try {
            const response = await fetch(`${APP_URL}design-products/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching design products details : ", responseJson.message);
                return;
            }

            const designProduct = {
                id: responseJson.designProduct.id,
                product_name: responseJson.designProduct.product_name ?? "N/A",
                status: responseJson.designProduct.status ?? "N/A",
                qa_status: responseJson.designProduct.qa_status ?? "N/A",
                created_by: responseJson.designProduct.created_by.name ?? "N/A",
                order_name: responseJson.designProduct.design_order.order_name ?? "N/A",
                order_number: responseJson.designProduct.design_order.order_number ?? "N/A",
                customer_name: responseJson.designProduct.design_order.customer_name ?? "N/A",
                product_type: responseJson.designProduct.product_type.type_name ?? "N/A",
                qa_analyst: responseJson.designProduct.qa_analyst.name ?? "N/A",
            }
            
            setDesignProduct(designProduct)
        } catch (error: any) {
            console.log("Error fetching design products details : ", error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // API Call to Create Design Item
    const createDesignItem = useCallback(async (token: string | null, data: CreateDesignItem) => {
        if (!token) {
            console.log("Token Not Found");
            return false;
        }        

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}design-items`, {
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
                console.log("Response Error in creating design item : ", responseJson.message);
                toast.error(responseJson.message);
                return false;
            }

            toast.success(responseJson.message);
            return true;
        } catch (error: any) {
            console.log("Error creating design item : ", error.message);
            toast.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    return {
        isLoading, isSubmitting, fetchDesignProductsDetails, designProduct,
        createDesignItem
    }
}