export interface DesignOrder {
    id: number;
    uuid: string;
    order_name: string;
    order_number: string;
    customer_name: string;
    description?: string;
    status?: string;
    qa_status: string;
    created_by?: string;
}

export interface QAAnalyst {
    id: number;
    name: string;
    email: string;
}

export interface DesignProduct {
    id: number;
    design_order_id: number;
    product_name: string;
    product_type_id: number;
    status: string;
    qa_status: string;
    qa_analyst_id: number;
    created_by: number;
    qaAnalyst: QAAnalyst[];
}

export interface ProductSize {
    id: number;
    size_name: string;
    size_code: string;
    status: string;
}

export interface LatestDesignFile {
    id: number;
    file_name: string;
    version: string;
}

export interface CreatedBy {
    id: number;
    uuid: string;
    role_id: number;
    name: string;
    email: string;
    status: string;
}

export interface DesignItem {
    id: number;
    design_order_id: number;
    design_product_id: number;
    item_name: string;
    product_size_id: number;
    player_name: string | null;
    player_number: string | null;
    notes: string;
    status: string;
    qa_status: string;
    created_by: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    latest_design_file: LatestDesignFile[] | null;
    created_at_human: string;
    updated_at_human: string;
    product_size: ProductSize;
    createdBy: CreatedBy;
}

export interface QAReportOrdersResponse {
    designOrders: DesignOrder[];
}

export interface QAReportProductsResponse {
    designOrder: DesignOrder;
    designProducts: DesignProduct[];
}

export interface QAReportItemsResponse {
    designOrder: DesignOrder;
    designProduct: DesignProduct;
    designItems: DesignItem[];
}