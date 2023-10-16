import { BaseModel } from ".";

export class ProductImageModel extends BaseModel {
    ProductImageID: number
    ImageUrl: string
    ImageID: string
    ProductID?: number
    ImageThumbnail: string
    PathName: string

    constructor() {
        super();
        this.ProductID = 0;
        this.ProductImageID = 0;
        this.ImageID = "";
        this.ImageUrl = "";
        this.ImageThumbnail = ""
        this.PathName = ""
    }
}