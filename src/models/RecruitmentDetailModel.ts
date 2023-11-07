import { BaseModel } from "./BaseModel";

export class RecruitmentDetailModel extends BaseModel {
    RecruitmentDetailID: number = 0
    RecruitmentID?: number
    CandidateID?: number
    RecruitmentRoundID?: number
    Status?: number
    StartTime?: Date
    ChannelID?: number
    ChannelName?: string
    ApplyDate?: Date
    ReasonRemoved?: string
    ReasonRemovedID?: number
    RecruitmentRoundName?: number
    TransferRoundDate?: Date
    EliminatedTime?: Date
    TransferEmployeeDate?: Date
    RecruitmentPeriodID?: number
}