import { BaseModel } from ".";

export class JobPositionModel extends BaseModel {
    JobPositionID: number = 0
    JobPositionCode: string = ""
    JobPositionName: string = ""
    Status: number = 1
}