import type { AxiosResponse } from 'axios';
import type { ServiceResponse } from '@/DTOs';
import BaseApiConfig from '../base/base-api-config';

export default class ReportApi {
    protected baseApi;

    controller = '';

    constructor() {
        this.baseApi = BaseApiConfig;
        this.controller = "Report";
    }

    getDataReportByRecruitment(recruitmentID: number = 0, period?: number): Promise<AxiosResponse<ServiceResponse>> {
        return this.baseApi.post(this.controller + `/getDataReportByRecruitment/${recruitmentID}/${period}`);
    }

    getCandidateByTime(recruitmentID: number = 0, param: any): Promise<AxiosResponse<ServiceResponse>> {
        return this.baseApi.post(this.controller + `/getCandidateByTime/${recruitmentID}`, param);
    }
}