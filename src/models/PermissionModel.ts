import { BaseModel } from ".";

export class PermissionModel extends BaseModel {
    PermissionID: number = 0
    PermissionName: string = ""
    SubsystemCode: string = ""
    SubsystemName: string = ""
    SordOrder: number = 0
    ListPermission?: PermissionModel[] = []
    Value?: boolean = false
    Column?: number
}