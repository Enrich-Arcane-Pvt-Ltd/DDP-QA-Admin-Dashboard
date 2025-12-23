interface DesignOrder {
    order_name: string;
    order_number: string;
}

interface DesignProduct {
    product_name: string;
    status: string;
    qa_status: string;
}

export interface DesignItem {
    id: number;
    item_name: string;
    player_name?: string;
    player_number?: string;
    notes?: string;
    status: string;
    created_by: string;
    qa_status: string;
    file_name?: string;
    file?: string;
    design_order: DesignOrder;
    design_product: DesignProduct;
    product_size: string;
}

export interface DesignFileStatus {
    value: string;
    label: string;
}

export interface DesignFileQAStatus {
    value: string;
    label: string;
}

export interface FileTypes {
    value: string;
    label: string;
}

export interface CreateDesignFile {
    design_order_id: number;
    design_product_id: number;
    design_item_id: number;
    file: File | null;
    file_name: string;
    file_path?: string;
    file_type: string;
    preserve_ai_editing: boolean;
    version: string;
    status: string;
    qa_status: string;
    json_spec_file?: File | null;
}

export interface DesignFiles {
    id: number,
    file: string;
    file_name: string;
    file_path: string;
    file_type: string;
    file_size: number;
    preserve_ai_editing: boolean;
    version: number;
    status: string;
    qa_status: string;
    file_url: string;
    file_thumbnail_url?: string;
    model_file_url?: string;
}

export interface Error {
    message: string;
}