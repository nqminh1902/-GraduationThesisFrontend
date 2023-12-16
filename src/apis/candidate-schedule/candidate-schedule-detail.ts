import type { CandidateScheduleDetailModel } from '@/models';
import BaseApi from '../base/base-api';
import type { AxiosResponse } from 'axios';
import type { PagingRequest, ServiceResponse } from '@/DTOs';

export default class CandidateScheduleDetailApi extends BaseApi<CandidateScheduleDetailModel> {
    constructor() {
        super('CandidateScheduleDetail');
    }

    getScheduleDetailByRecruitment(pagingRequest: PagingRequest): Promise<AxiosResponse<ServiceResponse>> {
        return this.baseApi.post(this.controller + `/get-by-recruitment`, pagingRequest);
    }
}