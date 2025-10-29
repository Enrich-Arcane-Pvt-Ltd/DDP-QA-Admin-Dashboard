import { useState, useCallback } from "react";
import { toast } from "../components/ToastContainer";
import APP_URL from "../constants/Config";

import { DesignProductsMeta, CreateProduct, DesignProducts } from "../types/DesignProducts";

export function useDesignProducts() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [designProductsMeta, setDesignProductsMeta] = useState<DesignProductsMeta | null>(null);
    const [designProducts, setDesignProducts] = useState<DesignProducts[]>([]);

    // API Call to Fetch Design Products Meta Data
    const fetchDesignProductsMeta = useCallback(async (id: number, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }        

        setIsLoading(true);
        try {
            const response = await fetch(`${APP_URL}design-products/meta?design_order_id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching design products meta : ", responseJson.message);
                return;
            }

            setDesignProductsMeta({
                designProductStatus: responseJson.designProductStatus ?? [],
                productTypes: responseJson.productTypes ?? [],
                qaAnalysts: responseJson.qaAnalysts ?? [],
                qaStatus: responseJson.qaStatus ?? [],
            });            
        } catch (error: any) {
            console.log("Error fetching design products meta : ", error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // API Call to Fetch Design Products
    const fetchDesignProducts = useCallback(async (id: number, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }        

        setIsLoading(true);
        try {
            const response = await fetch(`${APP_URL}design-products?design_order_id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching design products meta : ", responseJson.message);
                return;
            }
            
            const formattedProducts = responseJson.designProducts.map((product: any) => ({
                id: product.id,
                product_name: product.product_name,
                status: product.status,
                qa_status: product.qa_status,
                qa_analyst: product.qa_analyst.name,
                product_type: product.product_type.type_name,
                created_by: product.created_by.name
            })).sort((a:any, b:any) => a.id - b.id);;
            
            setDesignProducts(formattedProducts);
        } catch (error: any) {
            console.log("Error fetching design products meta : ", error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // API Call to Create a Design Product
    const createDesignProduct = useCallback(async (data: CreateProduct, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return false;
        }        

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}design-products`, {
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
                console.log("Response Error in creating design product : ", responseJson.message);
                toast.error(responseJson.message)
                return false;
            }

            toast.success('Design Product Created Successfully');
            return true; 
        } catch (error: any) {
            console.log("Error creating design product : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    return {
        isSubmitting, isLoading, fetchDesignProductsMeta, designProductsMeta,
        createDesignProduct, fetchDesignProducts, designProducts
    }
}