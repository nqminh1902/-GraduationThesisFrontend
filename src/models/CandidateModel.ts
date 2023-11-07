import { BaseModel } from "./BaseModel";

export class CandidateModel extends BaseModel {
    CandidateID: number = 0
    CandidateName: string = ""
    Avatar: string = ""
    ChannelID?: number
    ChannelName?: string
    Gender: number = 0
    Active: number = 1
    Mobile?: any
    ApplyDate: Date = new Date()
    Birthday?: Date
    Email: string = ""
    Address: string = ""
    CandidateStatusID?: number
    CandidateStatusName?: string
    AttachmentCV?: string
    AttachmentName?: string
    EducationDegreeID: number = 0
    EducationDegreeName: string = ""
    EducationPlaceID: number = 0
    EducationPlaceName: string = ""
    EducationMajorID: number = 0
    EducationMajorName: string = ""
    WorkPlaceRecent: string = ""
    RecruitmentRoundID: number = 0
    RecruitmentRoundName: string = ""
    ReasonRemoveID: number = 0
    ReasonRemoveName: string = ""
    JobPositionID: number = 0
    JobPositionName: string = ""
    RecruitmentID: number = 0
    RecruitmentName: string = ""
    IsEmployee: number = 0
    Facebook: string = ""
    Zalo: string = ""
    WorkExperients: WorkExperientModel[] = []
}

export class WorkExperientModel extends BaseModel {
    WorkExperientID: number = 0
    CandidateID: number = 0
    CompanyName: string = ""
    FromDate?: Date
    ToDate?: Date
    JobDescription?: string
    JobPosition?: string
}