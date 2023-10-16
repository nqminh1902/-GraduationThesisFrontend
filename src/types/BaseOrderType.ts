export interface BaseOrderType {
    title: string;
    color: string;
    quantity: number;
    oldPrice?: number;
    newPrice: number;
    isHot?: boolean;
    src: string;
    alt?: string;
    hasService: boolean;
    total: number;
    status: string;
}

export interface OrdersType {
    dataSource: BaseOrderType[];
}
