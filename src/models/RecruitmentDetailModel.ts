import { BaseModel } from "./BaseModel";

export class RecruitmentDetailModel extends BaseModel {
    RecruitmentDetailID: number = 0
    RecruitmentID: number = 0
    CandidateID?: number
    RecruitmentRoundID?: number
    Status?: RecruitmentDetailStatusEnum
    Title?: string
    StartTime?: Date
    ChannelID?: number
    ApplyDate?: Date
    ReasonRemoved?: string
    ReasonRemovedID?: number
    RecruitmentRoundName?: number
    TransferRoundDate?: Date
    EliminatedTime?: Date
    TransferEmployeeDate?: Date
    RecruitmentPeriodID?: number
    CandidateName?: string
    ChannelName?: string
    EducationDegreeName?: string
    EducationPlaceName?: string
    EducationMajorName?: string
    WorkPlaceRecent?: string
    RecruitmentName?: string
    IsEmployee?: number
    Avatar?: string
}

export enum RecruitmentDetailStatusEnum {
    Eliminated = 0,
    Active = 1,
}