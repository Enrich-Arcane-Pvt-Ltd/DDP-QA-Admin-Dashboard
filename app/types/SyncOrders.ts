export interface GetExternal {
    order_number: string;
}

export interface ExternalChildOrders {
    id: number;
    order_no: string;
    player_name: string;
    player_number: string;
    product_name: string;
    size_code: string;
}

export interface Customer {
    id: number;
    name: string;
    customer_ref_no: string;
    order_no: string;
}

export interface SyncOrders {
    order_number: string;
    child_order_ids: number[];
}