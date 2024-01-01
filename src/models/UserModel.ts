import { BaseModel } from '.';

export class UserModel extends BaseModel {
    UserID: number = 0
    Avatar: string = ""
    UserName: string = ""
    Password: string = ""
    RoleName: string = ""
    RoleID: number = 0
    Email: string = ""
    FullName: string = ""
    Mobile: any = ""
    BirthDay: Date = new Date()
    Gender: number = 0
    Address: string = ""
    JobPositionID: number = 0
    JobPositionName: string = ""
    IsUser: boolean = true
    EmailOffice: string = ""
    Status: number = 1
    IsSendActive: boolean = true
}
