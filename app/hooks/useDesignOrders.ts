import { useCallback, useState } from "react";
import { toast } from "../components/ToastContainer";
import APP_URL from "../constants/Config";

import { DesignOrder, DesignOrders, DesignOrdersMetaData, SingleOrder } from "../types/Orders";

export function useDesignOrders() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [updateSubmitting, setUpdateSubmitting] = useState(false);
    const [designOrders, setDesignOrders] = useState<DesignOrders[]>([]);
    const [designMetaData, setDesignMetaData] = useState<DesignOrdersMetaData | null>(null);
    const [designOrder, setDesignOrder] = useState<SingleOrder | null>(null);

    // API Call to Fetch Design Orders
    const fetchDesignOrders = useCallback(async (token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${APP_URL}design-orders`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching design orders : ", responseJson.message);
                return;
            }

            const formattedDesignOrders = responseJson.designOrders.map((order: any) => ({
                id: order.id,
                order_name: order.order_name,
                order_number: order.order_number,
                customer_name: order.customer_name,
                description: order?.description,
                status: order.status,
                qa_status: order.qa_status,
                created_by: order.created_by?.name,
            }));

            setDesignOrders(formattedDesignOrders);
        } catch (error: any) {
            console.log('Error fetching design orders : ', error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // API Call to Fetch Design Orders Meta Data
    const fetchDesignOrdersMetaData = useCallback(async (token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${APP_URL}design-orders/meta`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching design orders meta data : ", responseJson.message);
                return;
            }

            setDesignMetaData(responseJson);
        } catch (error: any) {
            console.log('Error fetching design orders meta data : ', error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // API Call to Create a Design Order
    const createDesignOrder = useCallback(async (data: DesignOrder, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return false;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}design-orders`, {
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
                console.log("Response Error in creating design order : ", responseJson.message);
                toast.error(responseJson.message)
                return false;
            }

            toast.success(responseJson.message);
            await fetchDesignOrders(token);
            return true;
        } catch (error: any) {
            console.log("Error creating design order : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Delete a Design Order
    const deleteDesignOrders = useCallback(async (id: number, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}design-orders/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in deleting design order : ", responseJson.message);
                toast.error('Failed to delete the design order');
                return false;
            }

            toast.success('Design Order deleted successfully !');
            return true;
        } catch (error: any) {
            console.log("Error deleting design order : ", error.message);
            toast.error('Failed to delete the design order');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Edit Design Order
    const editDesignOrder = useCallback(async (data: DesignOrders, token: string | null, id: number,) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsSubmitting(true);
        setUpdateSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}design-orders/${id}`, {
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
                console.log("Response Error in updating design order : ", responseJson.message);
                toast.error(responseJson.message);
                return false;
            }

            toast.success('Design Order updated successfully !');
            await fetchDesignOrders(token);
            return true;
        } catch (error: any) {
            console.log("Error updating design order : ", error.message);
            toast.error('Failed to update the design order');
            return false;
        } finally {
            setIsSubmitting(false);
            setUpdateSubmitting(false);
        }
    }, []);

    // API Call to Fetch a Design Order
    const fetchDesignOrder = useCallback(async (id: number, token: string | null) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${APP_URL}design-orders/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching design order : ", responseJson.message);
                return;
            }

            setDesignOrder(responseJson.designOrder)
        } catch (error: any) {
            console.log("Error fetch9ng design order : ", error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        fetchDesignOrders, isLoading, designOrders,
        designMetaData, fetchDesignOrdersMetaData,
        isSubmitting, createDesignOrder,
        deleteDesignOrders, editDesignOrder, fetchDesignOrder, designOrder, updateSubmitting
    }
}