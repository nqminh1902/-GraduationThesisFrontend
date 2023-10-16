
import { BaseModel } from ".";

export class ProductSizeModel extends BaseModel {
    ProductSizeID: number
    ProductSizeName: string
    ProductID: number

    constructor() {
        super();
        this.ProductID = 0;
        this.ProductSizeID = 0;
        this.ProductSizeName = "";
    }
}
