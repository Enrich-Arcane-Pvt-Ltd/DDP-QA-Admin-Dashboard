import { useState, useCallback } from "react";
import { toast } from "../components/ToastContainer";
import APP_URL from "../constants/Config";

import { GetExternal, Customer, ExternalChildOrders, SyncOrders } from "../types/SyncOrders";

export function useSyncOrders() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [externalChildOrders, setExternalChildOrders] = useState<ExternalChildOrders []>([]);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [id, setId] = useState<number | null>(null);

    // API Call to Retrieve External Orders
    const fetchExternal = useCallback(async (token: string | null, data: GetExternal) => {
        if (!token) {
            console.log("Token Not Found");
            return false;
        }
        
        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}order-sync/get-from-external`, {
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
                console.log("Response Error in fetching external orders : ", responseJson);
                toast.error(responseJson.message);
                return false;
            }

            const formattedCustomer = {
                id: responseJson?.data?.order?.customer?.id,
                name: responseJson?.data?.order?.customer?.name,
                customer_ref_no: responseJson?.data?.order?.customer_ref_no,
                order_no: responseJson?.data?.order?.order_no,
            }

            setCustomer(formattedCustomer);
            setExternalChildOrders(responseJson?.data?.child_orders);
            
            toast.success(responseJson.message);
            return true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error fetching external orders : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Sync External Orders
    const syncOrders = useCallback(async (token: string | null, data: SyncOrders) => {
        if (!token) {
            console.log("Token Not Found");
            return null;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}order-sync/sync-from-external`, {
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
                toast.error(responseJson.message);
                return null;
            }

            const newId = responseJson?.designOrder?.id;
            setId(newId);
            toast.success(responseJson.message);

            return newId;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message);
            return null;
        } finally {
            setIsSubmitting(false);
        }
    }, []);


    return {
        fetchExternal, isLoading, isSubmitting,
        customer, externalChildOrders, syncOrders, id
    }
}