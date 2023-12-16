import { BaseModel, CandidateScheduleDetailModel, RecruitmentBroadModel } from ".";

export class CandidateScheduleModel extends BaseModel {
    CandidateScheduleID: number = 0
    RecruitmentID?: number = 0
    RecruitmentTitle?: string = ""
    ScheduleName?: string = ""
    ScheduleType?: number
    RecruitmentRoundID?: number
    EvaluationDate: Date = new Date()
    StartTime: Date = new Date()
    Duration: number = 30
    Room?: string
    Address?: string
    AddressID?: number
    Note?: string
    JobPositionName?: string
    IsNotifyCandidate?: boolean
    IsNotifyCouncil?: boolean

    CandidateScheduleDetails: CandidateScheduleDetailModel[] = []
    RecruitmentBroads: RecruitmentBroadModel[] = []
}