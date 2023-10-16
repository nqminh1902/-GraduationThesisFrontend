import { BaseModel } from ".";

export class ProductVariantModel extends BaseModel {
    ProductVariantID: number
    ProductSizeID: number
    ProductSizeName: string
    ProductColorID: number
    ProductColorName: string
    ProductID: number
    Quantity: number

    constructor() {
        super();
        this.ProductID = 0;
        this.ProductVariantID = 0;
        this.ProductSizeName = "";
        this.ProductColorName = "";
        this.ProductSizeID = 0;
        this.ProductColorID = 0;
        this.Quantity = 0
    }
}