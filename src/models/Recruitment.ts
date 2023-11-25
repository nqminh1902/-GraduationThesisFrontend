import { BaseModel, RecruitmentPeriodModel, RecruitmentRoundModel } from ".";
import { recruitmentRounds } from "../mocks"

export class RecruitmentModel extends BaseModel {
    RecruitmentID: number = 0
    Title: string = ''
    JobPositionID: number = 0
    JobPositionName: string = ''
    Quantity: number = 0
    WorkType: number = 0
    RegistrationExpiryDate: Date = new Date()
    MinSalary: number = 0
    SalaryContent: string = ''
    MaxSalary: number = 0
    CurrencyCodeID: number = 0
    Description: string = ''
    ContactID?: number
    ContactName?: string
    ContactPosition?: string
    ContactEmail?: string
    ContactMobile?: number
    Requirement: string = ''
    Benefit: string = ''
    Summary: string = ''
    ReportPeriod: Date = new Date()
    PlanType: number = 0
    ActualQuantity: number = 0
    ExpectedTime: Date = new Date()
    RankID: number = 0
    RankName: string = ''
    CarrerID: number = 0
    CarrerName: string = ''
    WorkLocationID: number = 0
    WorkLocationName: string = ''
    Status: number = 1
    RecruitmentRounds: RecruitmentRoundModel[] = recruitmentRounds
    RecruitmentPeriods: RecruitmentPeriodModel[] = []
}