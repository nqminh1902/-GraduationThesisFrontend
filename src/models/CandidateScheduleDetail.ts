import type { Gender } from "@/enums";
import { BaseModel } from ".";

export class CandidateScheduleDetailModel extends BaseModel {
    CandidateScheduleDetailID: number = 0
    CandidateID?: number
    CandidateScheduleID?: number
    CandidateName?: string
    StartTime: Date = new Date()
    EndTime: Date = new Date()
    Address?: string
    AddressID?: number
    Duration: number = 30
    Room?: string
    Note?: string
    IsNotifyCandidate?: boolean
    IsNotifyCouncil?: boolean
    ScheduleType?: number
    ScheduleName?: string
    Gender?: Gender
    RecruitmentID?: number
    RecruitmentTitle?: string
    EvaluationDate?: Date
}