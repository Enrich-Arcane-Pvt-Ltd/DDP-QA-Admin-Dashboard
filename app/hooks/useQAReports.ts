import { useCallback, useState } from "react";
import { toast } from "../components/ToastContainer";
import APP_URL from "../constants/Config";
import { DesignItem, DesignOrder, DesignProduct, QAReportItemsResponse, QAReportOrdersResponse, QAReportProductsResponse } from "../types/QAReports";

export function useQAReport() {
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState<DesignOrder[]>([]);

    const [productsData, setProductsData] = useState<{
        order: DesignOrder | null,
        products: DesignProduct | null
    }>({ order: null, products: null });

    const [itemsData, setItemsData] = useState<{
        order: DesignOrder | null,
        product: DesignProduct | null,
        items: DesignItem[]
    }>({ order: null, product: null, items: [] });

    const fetchQAReportOrders = useCallback(async (token: string | null) => {
        if (!token) return;

        setIsLoading(true);
        try {
            const response = await fetch(`${APP_URL}qa-report/orders`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson: QAReportOrdersResponse = await response.json();
            if (!response.ok) {
                console.error("Error fetching QA Orders:", responseJson);
                return;
            }
            setOrders(responseJson.designOrders || []);            
        } catch (error: any) {
            console.error('Error fetching QA Orders:', error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchOrderProducts = useCallback(async (orderId: number, token: string | null) => {
        if (!token || !orderId) return;

        setIsLoading(true);
        try {
            const response = await fetch(`${APP_URL}qa-report/order-products?design_order_id=${orderId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson: QAReportProductsResponse = await response.json();
            if (!response.ok) {
                console.error("Error fetching Order Products:", responseJson);
                return;
            }            
            
            setProductsData({
                order: responseJson.designOrder,
                products: responseJson.designProducts as DesignProduct
            });
        } catch (error: any) {
            console.error('Error fetching Order Products:', error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchOrderProductItems = useCallback(async (orderId: number, productId: number, token: string | null) => {
        if (!token || !orderId || !productId) return;

        setIsLoading(true);
        try {
            const response = await fetch(`${APP_URL}qa-report/order-product-items?design_order_id=${orderId}&design_product_id=${productId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson: QAReportItemsResponse = await response.json();
            if (!response.ok) {
                console.log("Error fetching Order Product Items:", responseJson);
                return;
            }
            
            setItemsData({
                order: responseJson.designOrder,
                product: responseJson.designProduct,
                items: responseJson.designItems || []
            });
        } catch (error: any) {
            console.log('Error fetching Order Product Items:', error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        orders,
        productsData,
        itemsData,
        fetchQAReportOrders,
        fetchOrderProducts,
        fetchOrderProductItems,
    };
}