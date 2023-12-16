import type { RecruitmentModel } from '@/models';
import BaseApi from '../base/base-api';
import type { AxiosResponse } from 'axios';
import type { ServiceResponse } from '@/DTOs';

export default class RecruitmentApi extends BaseApi<RecruitmentModel> {
    constructor() {
        super('Recruitment');
    }

    getRecruitmentBroad(recruitmentID: number): Promise<AxiosResponse<ServiceResponse>> {
        return this.baseApi.get(this.controller + `/recruitment-broad/${recruitmentID}`);
    }

    updateRecruitmentStatus(recruitmentID: number, status: number): Promise<AxiosResponse<ServiceResponse>> {
        return this.baseApi.post(this.controller + `/update-status/${recruitmentID}`, status);
    }
}