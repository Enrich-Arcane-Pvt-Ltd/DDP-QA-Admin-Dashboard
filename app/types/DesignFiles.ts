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