export interface ProductTypes {
    id: number;
    type_name: string;
    description?: string;
    status: string;
}

export interface ProductType {
    type_name: string;
    description?: string;
    status: string;
}

export interface ProductTypeStatus {
    label: string;
    value: string;
}

export interface ProductMetaData {
    status: ProductTypeStatus[]
}

export interface ProductSizes {
    id: number;
    size_name: string;
    size_code: string;
    status: string;
}

export interface ProductSize {
    size_name: string;
    size_code: string;
    status: string;
}
