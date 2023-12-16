import { BaseModel } from ".";

export class RecruitmentBroadModel extends BaseModel {
    RecruitmentBroadID: number = 0
    FullName: string = ""
    Email?: string
    Avatar?: string
    RecruitmentID?: number
    Role?: string
    RoleID?: number
    IsSendMail: boolean = true
    UserID?: number
}