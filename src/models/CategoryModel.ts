import { BaseModel } from '.';

export class CategoryModel extends BaseModel {
    CategoryID: number
    CategoryName: string 
    Status?: number
    CreatedBy?: string | undefined;
    constructor(){
        super()
        this.CategoryID = 0
        this.CategoryName = ""
        this.Status = 1
        this.CreatedBy = "Nguyễn Quang Minh"
    } 
}