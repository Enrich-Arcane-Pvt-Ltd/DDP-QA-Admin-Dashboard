export interface DesignProducts {
    id: number;
    product_name: string;
    status: string;
    qa_status: string;
    qa_analyst: string;
    product_type: string;
    created_by: string;
}

export interface CreateProduct {
    design_order_id: number;
    product_name: string;
    product_type_id: number;
    status: string;
    qa_status: string;
    qa_analyst_id?: number;             
}

export interface EditProduct {
    design_order_id: number;
    product_name: string;
    product_type_id: number;
    status: string;
    qa_status: string;
    qa_analyst_id?: number;
    id: number;           
}

interface DesignProductStatus {
    value: string;
    label: string;
}

interface ProductTypes {
    value: string;
    label: string;
}

interface QAAnalyst {
    value: string;
    label: string;
}

interface QAStatus {
    value: string;
    label: string;
}

export interface DesignProductsMeta {
    designProductStatus: DesignProductStatus[];
    productTypes: ProductTypes[];
    qaAnalysts: QAAnalyst[];
    qaStatus: QAStatus[];
}

interface QAAnalysts {
    value: number;
    label: string;
}

export interface AssignQAAnalysts {
    selectedQaAnalyst?: string;
    qaAnalysts: QAAnalysts[]
}