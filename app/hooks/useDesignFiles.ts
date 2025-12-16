import { useState, useCallback } from "react";
import { toast } from "../components/ToastContainer";
import APP_URL from "../constants/Config";

import { DesignItem, CreateDesignFile, DesignFileQAStatus, DesignFileStatus, FileTypes, DesignFiles } from "../types/DesignFiles";

export function useDesignFiles() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [designItem, setDesignItem] = useState<DesignItem | null>(null);
    const [designFileStatus, setDesignFileStatus] = useState<DesignFileStatus[]>([]);
    const [qaStatus, setQAStatus] = useState<DesignFileQAStatus[]>([]);
    const [fileTypes, setFileTypes] = useState<FileTypes[]>([]);
    const [designFiles, setDesignFiles] = useState<DesignFiles[]>([]);

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
                product_size: item.product_size?.size_name ?? "",
            };

            setDesignItem(formattedItem);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            const formData = new FormData();

            if (data.file) {
                formData.append("file", data.file);
            }

            formData.append("design_order_id", String(data.design_order_id));
            formData.append("design_products_id", String(data.design_products_id));
            formData.append("design_item_id", String(data.design_item_id));
            formData.append("file_name", data.file_name || "");
            formData.append("file_type", "ai");
            formData.append("file_path", data.file_path || "");

            formData.append("version", Math.floor(Number(data.version)).toString());

            formData.append("status", data.status);
            formData.append("qa_status", data.qa_status);

            formData.append("preserve_ai_editing", data.preserve_ai_editing ? "1" : "0");            

            const response = await fetch(`${APP_URL}design-files`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
                body: formData,
            });

            const responseJson = await response.json();

            if (!response.ok) {
                console.log("Response Error in creating design file:", responseJson);
                toast.error(responseJson.message || "Failed to upload design file.");
                return false;
            }

            toast.success(responseJson.message || "Design file uploaded successfully.");
            await fetchDesignFiles(token, data.design_order_id, data.design_products_id, data.design_item_id)
            return true;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error creating design file:", error.message);
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
            setFileTypes(responseJson.fileType);            

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error fetching design items files data : ", error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // API Call to Fetch Design Files
    const fetchDesignFiles = useCallback(async (token: string | null, orderId: number, productId: number, itemId: number) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${APP_URL}design-files?design_order_id=${orderId}&design_product_id=${productId}&design_item_id=${itemId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in fetching design files : ", responseJson.message);
                return;
            }
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const formattedFiles: DesignFiles[] = (responseJson.designFiles || []).map((file: any) => ({
                id: Number(file.id),
                file: file.file || "",
                file_name: file.file_name || "",
                file_path: file.file_path || "",
                file_type: file.file_type || "",
                file_size: Number(file.file_size) || 0,
                preserve_ai_editing: file.preserve_ai_editing === "1" || file.preserve_ai_editing === true,
                version: Number(file.version) || 1,
                status: file.status || "",
                qa_status: file.qa_status || "",
                file_url: file.file_url || "",
            }));

            setDesignFiles(formattedFiles);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error fetching design files : ", error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // API Call to Delete Design File
    const deleteDesignFile = useCallback(async (id: number, token: string | null, orderId: number, productId: number, itemId: number) => {
        if (!token) {
            console.log("Token Not Found");
            return false;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${APP_URL}design-files/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();

            if (!response.ok) {
                console.log("Response Error in deleting design files : ", responseJson.message);
                toast.error(responseJson.message);
                return false;
            }

            toast.success(responseJson.message);
            await fetchDesignFiles(token, orderId, productId, itemId);
            return true;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error deleting design files : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Change the Status of the Design File
    const activateDesignFiles = useCallback(async (id: number, token: string | null, status: string, orderId: number, productId: number, itemId: number) => {
        if (!token) {
            console.log("Token Not Found");
            return;
        }        

        setIsSubmitting(true);
        try {
            const currentStatus = status === 'active' ? 'block' : 'unblock';

            const response = await fetch(`${APP_URL}design-files/${id}/${currentStatus}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            if (!response.ok) {
                console.log("Response Error in changing status of the design file : ", responseJson.message);
                toast.error(responseJson.message);
                return false;
            }

            toast.success(responseJson.message);
            await fetchDesignFiles(token, orderId, productId, itemId);
            return true;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error in changing the status of the design file : ", error.message);
            toast.error(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    // API Call to Create Design File
    const editDesignFile = useCallback(async (id: number, token: string | null, data: CreateDesignFile) => {
        if (!token) {
            console.log("Token Not Found");
            return false;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData();

            if (data.file) {
                formData.append("file", data.file);
            }

            formData.append("_method", "PATCH");
            formData.append("design_order_id", String(data.design_order_id));
            formData.append("design_products_id", String(data.design_products_id));
            formData.append("design_item_id", String(data.design_item_id));
            formData.append("file_name", data.file_name || "");
            formData.append("file_type", data.file_type || "");
            formData.append("file_path", data.file_path || "");

            formData.append("version", Math.floor(Number(data.version)).toString());

            formData.append("status", data.status);
            formData.append("qa_status", data.qa_status);

            formData.append("preserve_ai_editing", data.preserve_ai_editing ? "1" : "0");            

            const response = await fetch(`${APP_URL}design-files/${id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
                body: formData,
            });

            const responseJson = await response.json();

            if (!response.ok) {
                console.log("Response Error in updating design file:", responseJson);
                toast.error(responseJson.message || "Failed to Edit design file.");
                return false;
            }

            toast.success(responseJson.message || "Design file updated successfully.");
            await fetchDesignFiles(token, data.design_order_id, data.design_products_id, data.design_item_id)
            return true;
            
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("Error updating design file:", error.message);
            toast.error(error.message);
            return false;

        } finally {
            setIsSubmitting(false);
        }
    }, []);

    return {
        fetchDesignItemDetails, isLoading, isSubmitting, designItem, createDesignFile,
        fetchDesignFilesMetaData, designFileStatus, qaStatus, fileTypes, fetchDesignFiles, designFiles,
        deleteDesignFile, activateDesignFiles, editDesignFile
    }
}