import { BaseModel } from ".";

export class RecruitmentRoundModel extends BaseModel {
    RecruitmentRoundID: number = 0
    RecruitmentRoundName: string = ""
    RecruitmentRoundColor?: string = "<div class='w-[12px] h-[12px]' style='background-color: blue;'></div>"
    RecruitmentID: number = 0
    SordOrder: number = 0
    IsSystem: boolean = false
}