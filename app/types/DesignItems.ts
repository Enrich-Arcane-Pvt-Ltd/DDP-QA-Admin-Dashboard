export interface DesignProduct {
    id: number;
    product_name: string;
    status: string;
    qa_status: string;
    created_by: string;
    order_name: string;
    order_number: string;
    customer_name: string;
    product_type: string;
    qa_analyst: string;
}

export interface CreateDesignItem {
    design_order_id: number;
    design_product_id: number;
    item_name: string;
    product_size_id?: number;
    player_name?: string;
    player_number?: string;
    notes?: string;
    status: string;
    qa_status: string;
}

interface ProductSizes {
    value: string;
    label: string;
}

interface DesignItemStatus {
    value: string;
    label: string;
}

interface QAStatus {
    value: string;
    label: string;
}

export interface DesignItemMetaData {
    productSizes: ProductSizes[];
    designItemStatus: DesignItemStatus[];
    qaStatus: QAStatus[];
}

export interface DesignItems {
    id: number;
    item_name: string;
    player_name?: string;
    player_number?: string;
    notes?: string;
    status?: string;
    created_by?: string;
    qa_status?: string;
    size_code?: string;
    file_name?: string;
    file?: string;
}