import { BaseModel, PermissionModel } from ".";

export class RoleModel extends BaseModel {
    RoleID: number = 0
    RoleName: string = ""
    RoleDescription: string = ""
    IsAdmin: boolean = false
    Permissions: PermissionModel[] = []
}