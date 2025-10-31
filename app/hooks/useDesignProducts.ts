import { useState, useCallback } from "react";
import { toast } from "../components/ToastContainer";
import APP_URL from "../constants/Config";

import { DesignProductsMeta, CreateProduct, DesignProducts, EditProduct, AssignQAAnalysts } from "../types/DesignProducts";

export function useDesignProducts() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [designProductsMeta, setDesignProductsMeta] = useState<DesignProductsMeta | null>(null);
    const [designProducts, setDesignProducts] = useState<DesignProducts[]>([]);
    const [analysts, setAnalysts] = useState<AssignQAAnalysts | null>(null);
    const [isProductsLoading, setIsProductsLoading] = useState(false);

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
        setIsProductsLoading(true);
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
            setIsProductsLoading(false);
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
            await fetchDesignProducts(data.design_order_id, token);
            return true; 
        } catch (error: any) {
            console.log("Error creating design product : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Edit a Design Product
    const editDesignProduct = useCallback(async (id: number, data: EditProduct, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return false;
        }

        const formattedData = {
            design_order_id: data.design_order_id,
            product_name: data.product_name,
            product_type_id: data.product_type_id,
            status: data.status,
            qa_status: data.qa_status,
            qa_analyst_id: data.qa_analyst_id,
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}design-products/${data.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formattedData)
            });

            const responseJson = await response.json();
            
            if (!response.ok) {
                console.log("Response Error in updating design product : ", responseJson.message);
                toast.error(responseJson.message)
                return false;
            }

            toast.success('Design Product Updated Successfully');
            await fetchDesignProducts(data.design_order_id, token);
            return true; 
        } catch (error: any) {
            console.log("Error updating design product : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Delete a Design Product
    const deleteDesignProduct = useCallback(async (id: number, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }        

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}design-products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in deleting design product : ", responseJson.message);
                toast.error('Failed to delete the design product');
                return false;
            }

            toast.success('Design Product deleted successfully !');
            return true;
        } catch (error: any) {
            console.log("Error deleting design product : ", error.message);
            toast.error('Failed to delete the design product');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Fetch a Design Product QA Analysts
    const fetchDesignQAAnalysts = useCallback(async (id: number, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }        

        setIsLoading(true);
        try {
            const response = await fetch(`${APP_URL}design-products/${id}/qa-analysts`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching design product qa analysts : ", responseJson.message);
                return ;
            }            
            setAnalysts(responseJson);
        } catch (error: any) {
            console.log("Error deleting design product qa analysts : ", error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // API Call to Assign a QA to Design Product QA Analysts
    const assignDesignQAAnalysts = useCallback(async (id: number, token: string | null, qid: number, orderId: number) => {
        if (!token) {
            console.log("Token Not Found");
            return false;
        }        

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}design-products/${id}/update-qa-analyst`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    qa_analyst_id: qid  
                })
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in assigning design QA : ", responseJson.message);
                toast.error(responseJson.message);
                return false;
            }
            
            toast.success(responseJson.message);
            fetchDesignProducts(orderId, token);
            return true;
        } catch (error: any) {
            console.log("Error assigning design QA : ", error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    return {
        isSubmitting, isLoading, fetchDesignProductsMeta, designProductsMeta,
        createDesignProduct, fetchDesignProducts, designProducts,
        deleteDesignProduct, editDesignProduct,
        fetchDesignQAAnalysts, analysts, assignDesignQAAnalysts, isProductsLoading
    }
}