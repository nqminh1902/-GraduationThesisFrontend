import { BaseModel } from '.';

export class CartModel extends BaseModel {
    CartID: number;
    CartCode: string;
    CartDetail: number;
    TotalPrice: number;
    Quantity: number;
    State: number;

    constructor() {
        super();
        this.CartID = 0;
        this.CartCode = '';
        this.CartDetail = 0;
        this.TotalPrice = 0;
        this.Quantity = 0;
        this.State = 0;
    }
}
