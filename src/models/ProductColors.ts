
import { BaseModel } from ".";

export class ProductColorModel extends BaseModel {
    ProductColorID: number
    ProductColorName: string
    ProductID: number
    ProductColorImage: string

    constructor() {
        super();
        this.ProductID = 0;
        this.ProductColorID = 0;
        this.ProductColorName = "";
        this.ProductColorImage=""
    }
}