import type { ProductStatusEnum } from "@/enums";
import { BaseModel, ProductImageModel } from ".";
import type { ProductSizeModel } from "./ProductSizes";
import type { ProductColorModel } from "./ProductColors";
import type { ProductVariantModel } from "./ProductVariants";

export class ProductModel extends BaseModel {
    ProductID: number;
    ProductCode: string;
    ProductName: string;
    ProductPrice: number;
    Description: string;
    CollectionID: number;
    CollectionName: string;
    CategoryID: number;
    CategoryName: string;
    Sale: number;
    DiscountPercent: number;
    TotalQuantity: number;
    Material?: string;
    QuickDescription?: string;
    Images: string;
    ProductColors: ProductColorModel[];
    ProductSizes: ProductSizeModel[];
    ProductImages: ProductImageModel[];
    ProductVariants: ProductVariantModel[];
    Status: ProductStatusEnum;

    constructor() {
        super();
        this.ProductID = 0;
        this.ProductCode = "";
        this.ProductName = "";
        this.ProductPrice = 0;
        this.Description = "";
        this.Sale = 0;
        this.DiscountPercent = 0;
        this.TotalQuantity = 0;
        this.CollectionID = 0;
        this.CollectionName = "";
        this.CategoryID = 0;
        this.CategoryName = "";
        this.Images = ""
        this.Material = "";
        this.Status = 1;
        this.ProductSizes = []
        this.ProductColors = []
        this.ProductImages = []
        this.ProductVariants = []
    }
}
