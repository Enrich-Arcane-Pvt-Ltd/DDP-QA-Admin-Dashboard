import { useState, useCallback } from "react";
import { toast } from "../components/ToastContainer";
import APP_URL from "../constants/Config";

import { ProductTypes, ProductType, ProductTypeStatus, ProductSizes, ProductSize } from "../types/Products";

export function useProducts() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [productTypes, setProductTypes] = useState<ProductTypes[]>([]);
    const [metaData, setMetaData] = useState<ProductTypeStatus[]>([]);
    const [productSizes, setProductSizes] = useState<ProductSizes[]>([]);

    // API Call to Fetch Product Types
    const fetchProductTypes = useCallback(async (token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${APP_URL}product-types`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching product types : ", responseJson.message);
                return;
            }
            

            const formattedProductTypes = responseJson.productTypes.map((type: any) => ({
                id: type.id,
                type_name: type.type_name,
                description: type.description,
                status: type.status,
            }));

            setProductTypes(formattedProductTypes);
        } catch (error : any) {
            console.log('Error fetching product types : ', error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // API Call to Fetch Product Type Meta Data
    const fetchProductTypesMeta = useCallback(async (token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${APP_URL}product-types/meta`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching products meta data : ", responseJson.message);
                return;
            }
            setMetaData(responseJson.productTypeStatus);
        } catch (error: any) {
            console.log("Error fetching products meta data : ", error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // API Call to Create a Product Type
    const createProductType = useCallback(async (data: ProductType, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return false;
        }        

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}product-types`, {
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
                console.log("Response Error in creating product type : ", responseJson.message);
                toast.error(responseJson.message)
                return false;
            }

            toast.success(responseJson.message);
            await fetchProductTypes(token);
            return true; 
        } catch (error: any) {
            console.log("Error creating product type : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Delete a Product Type
    const deleteProductTypes = useCallback(async (id: number, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }        

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}product-types/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in deleting product type : ", responseJson.message);
                toast.error('Failed to delete the product type');
                return false;
            }

            toast.success('Product Type deleted successfully !');
            return true;
        } catch (error: any) {
            console.log("Error deleting product type : ", error.message);
            toast.error('Failed to delete the product type');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Edit Product Type
    const editProductType = useCallback(async (data: ProductType, token: string | null, id: number,) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }        

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}product-types/${id}`, {
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
                console.log("Response Error in updating product type : ", responseJson.message);
                toast.error(responseJson.message);
                return false;
            }

            toast.success('Product Type updated successfully !');
            await fetchProductTypes(token);
            return true;
        } catch (error: any) {
            console.log("Error updating product type : ", error.message);
            toast.error('Failed to update the product type');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Change the Status of the Product Type
    const activateProductType = useCallback(async (id: number, token: string | null, status: string) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }        

        setIsSubmitting(true);
        try {
            const currentStatus = status === 'active' ? 'block' : 'unblock';

            const response = await fetch(`${APP_URL}product-types/${id}/${currentStatus}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in changing status of the product type : ", responseJson.message);
                toast.error(responseJson.message);
                return false;
            }

            toast.success(responseJson.message);
            return true;
        } catch (error: any) {
            console.log("Error in changing the status of the product type : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Fetch Product Sizes
    const fetchProductSizes = useCallback(async (token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${APP_URL}product-sizes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching product sizes : ", responseJson.message);
                return;
            }
            

            const formattedProductSizes = responseJson.productSizes.map((size: any) => ({
                id: size.id,
                size_name: size.size_name,
                size_code: size.size_code,
                status: size.status,
            }));            

            setProductSizes(formattedProductSizes);
        } catch (error : any) {
            console.log('Error fetching product sizes : ', error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // API Call to Create a Product Size
    const createProductSize = useCallback(async (data: ProductSize, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return false;
        }        

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}product-sizes`, {
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
                console.log("Response Error in creating product size : ", responseJson.message);
                toast.error(responseJson.message)
                return false;
            }

            toast.success(responseJson.message);
            await fetchProductSizes(token);
            return true; 
        } catch (error: any) {
            console.log("Error creating product size : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Change the Status of the Product Size
    const activateProductSize = useCallback(async (id: number, token: string | null, status: string) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }        

        setIsSubmitting(true);
        try {
            const currentStatus = status === 'active' ? 'block' : 'unblock';

            const response = await fetch(`${APP_URL}product-sizes/${id}/${currentStatus}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in changing status of the product size : ", responseJson.message);
                toast.error(responseJson.message);
                return false;
            }

            toast.success(responseJson.message);
            return true;
        } catch (error: any) {
            console.log("Error in changing the status of the product size : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Delete a Product Type
    const deleteProductSizes = useCallback(async (id: number, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }        

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}product-sizes/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in deleting product size : ", responseJson.message);
                toast.error('Failed to delete the product size');
                return false;
            }

            toast.success('Product Size deleted successfully!');
            return true;
        } catch (error: any) {
            console.log("Error deleting product size : ", error.message);
            toast.error('Failed to delete the product size');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Edit Product Type
    const editProductSize = useCallback(async (data: ProductSize, token: string | null, id: number,) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }        

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}product-sizes/${id}`, {
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
                console.log("Response Error in updating product size : ", responseJson.message);
                toast.error(responseJson.message);
                return false;
            }

            toast.success('Product Size updated successfully !');
            await fetchProductSizes(token);
            return true;
        } catch (error: any) {
            console.log("Error updating product size : ", error.message);
            toast.error('Failed to update the product size');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);
    
    return {
        productTypes, isLoading, fetchProductTypes,
        isSubmitting, fetchProductTypesMeta, metaData,
        createProductType, deleteProductTypes, editProductType,
        activateProductType,
        productSizes, fetchProductSizes, createProductSize,
        activateProductSize, deleteProductSizes, editProductSize
    }
}