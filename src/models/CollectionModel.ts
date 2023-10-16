import { BaseModel } from '.';

export class CollectionModel extends BaseModel {
    CollectionID: number
    CollectionName: string 
    Status?: number
    CreatedBy?: string | undefined;
    constructor(){
        super()
        this.CollectionID = 0
        this.CollectionName = ""
        this.Status = 1
        this.CreatedBy = "Nguyễn Quang Minh"
    } 
}