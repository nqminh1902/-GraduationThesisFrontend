export interface HeaderListType {
    id: number;
    title: string;
    valueExpr?: string
    displayExpr?: string
    children: ChildHeaderType[];
}

export interface ChildHeaderType {
    id: number;
    title: string;
}
