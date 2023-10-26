import { BaseModel } from ".";

export class RecruitmentPeriodModel extends BaseModel {
    RecruitmentPeriodID: number
    RecruitmentID: number
    PeriodName: string
    StartDate: Date
    EndDate?: Date
    Quantity: number
    ReportPeriod: Date
    constructor() {
        super();
        this.RecruitmentPeriodID = 0;
        this.PeriodName = "";
        this.RecruitmentID = 0;
        this.StartDate = new Date,
            this.EndDate = undefined,
            this.Quantity = 1,
            this.ReportPeriod = new Date
    }
}