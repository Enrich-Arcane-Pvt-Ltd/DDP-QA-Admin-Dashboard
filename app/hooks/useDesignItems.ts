import { useState, useCallback } from "react";
import { toast } from "../components/ToastContainer";
import APP_URL from "../constants/Config";

import { DesignProduct, CreateDesignItem, DesignItemMetaData, DesignItems } from "../types/DesignItems";

export function useDesignItems() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [designProduct, setDesignProduct] = useState<DesignProduct | null>(null);
    const [metaData, setMetaData] = useState<DesignItemMetaData>({
        productSizes: [],
        designItemStatus: [],
        qaStatus: [],
        productStyle: []
    });
    const [designItems, setDesignItems] = useState<DesignItems[]>([]);

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
                product_name: responseJson.designProduct?.product_name ?? "N/A",
                status: responseJson.designProduct?.status ?? "N/A",
                qa_status: responseJson.designProduct?.qa_status ?? "N/A",
                created_by: responseJson.designProduct?.created_by.name ?? "N/A",
                order_name: responseJson.designProduct?.design_order?.order_name ?? "N/A",
                order_number: responseJson.designProduct?.design_order?.order_number ?? "N/A",
                customer_name: responseJson.designProduct?.design_order?.customer_name ?? "N/A",
                product_type: responseJson.designProduct?.product_type?.type_name ?? "N/A",
                qa_analyst: responseJson.designProduct?.qa_analyst?.name ?? "N/A",
            }
            
            setDesignProduct(designProduct);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                console.log("Response Error in creating design item : ", responseJson);
                toast.error(responseJson.message);
                return false;
            }

            toast.success(responseJson.message);
            await fetchDesignProductsDetails(data.design_product_id, token);
            await fetchDesignItems(token, data.design_order_id, data.design_product_id);
            return true;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error creating design item : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Fetch Design Items Meta Data
    const fetchDesignItemsMetaData = useCallback(async (token: string | null, orderId: number, productId: number) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${APP_URL}design-items/meta?design_order_id=${orderId}&design_product_id=${productId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching design items meta data : ", responseJson.message);
                return;
            }

            const extractedMeta: DesignItemMetaData = {
                productSizes: responseJson.productSizes,
                designItemStatus: responseJson.designItemStatus,
                qaStatus: responseJson.qaStatus,
                productStyle: responseJson.productStyle
            };
            
            setMetaData(extractedMeta);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any            
        } catch (error: any) {
            console.log("Error fetching design items meta data : ", error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // API Call to Fetch All Design Items
    const fetchDesignItems = useCallback(async (token: string | null, orderId: number, productId: number) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${APP_URL}design-items?design_order_id=${orderId}&design_product_id=${productId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching design items : ", responseJson.message);
                return;
            }
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const mappedItems: DesignItems[] = responseJson.designItems.map((item: any) => ({
                id: item.id,
                item_name: item.item_name,
                player_name: item.player_name || '',
                player_number: item.player_number || '',
                notes: item.notes || '',
                status: item.status || '',
                qa_status: item.qa_status || '',
                created_by: item.created_by?.name || '',
                size_code: item.product_size?.size_code || '',
                file_name: item.latest_design_file?.file_name || '',
                file: item.latest_design_file?.file || '',
                productStyle: item?.product_style?.style_number || '',
            }));

            setDesignItems(mappedItems);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error fetching design items : ", error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // API Call to Fetch Design Products Details
    const deleteDesignItem = useCallback(async (id: number, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }        

        setIsLoading(true);
        try {
            const response = await fetch(`${APP_URL}design-items/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in deleting design item : ", responseJson.message);
                toast.error(responseJson.message);
                return false;
            }

            toast.success(responseJson.message);
            return true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error deleting design item : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // API Call to Create Design Item
    const editDesignItem = useCallback(async (token: string | null, data: CreateDesignItem, id: number) => {
        if (!token) {
            console.log("Token Not Found");
            return false;
        }
        
        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}design-items/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data)
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in updating design item : ", responseJson);
                toast.error(responseJson.message);
                return false;
            }

            toast.success(responseJson.message);
            await fetchDesignProductsDetails(data.design_product_id, token);
            await fetchDesignItems(token, data.design_order_id, data.design_product_id);
            return true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error updating design item : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);


    return {
        isLoading, isSubmitting, fetchDesignProductsDetails, designProduct,
        createDesignItem, fetchDesignItemsMetaData, metaData, fetchDesignItems,
        designItems, deleteDesignItem, editDesignItem
    }
}