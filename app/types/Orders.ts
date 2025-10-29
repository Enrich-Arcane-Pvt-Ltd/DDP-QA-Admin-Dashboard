export interface DesignOrders {
    id: number;
    order_name: string;
    order_number: string;
    customer_name: string;
    status: string;
    qa_status: string;
    name: string;
    description?: string;
}

interface DesignOrderStatus {
    value: string;
    label: string;
}

interface QAStatus {
    value: string;
    label: string;
}

export interface DesignOrdersMetaData {
    designOrderStatus: DesignOrderStatus[];
    qaStatus: QAStatus[];
}

export interface DesignOrder {
    order_name: string;
    order_number: string;
    customer_name?: string;
    description?: string;
    status: string;
    qa_status: string;
}

export interface SingleOrder {
    id: number;
    order_name: string;
    order_number: string;
    customer_name: string;
    description?: string;
    status: string;
    qa_status: string;
    name?: string;
    email?: string;
}