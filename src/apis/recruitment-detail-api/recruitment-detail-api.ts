import type { RecruitmentDetailModel, RecruitmentRoundModel } from '@/models';
import BaseApi from '../base/base-api';
import type { AxiosResponse } from 'axios';
import type { ServiceResponse } from '@/DTOs';

export default class RecruitmentDetailApi extends BaseApi<RecruitmentDetailModel> {
    constructor() {
        super('RecruitmentDetail');
    }

    getTotalCandidateByRound(recruitmentID: number = 0, status: number = 1, period?: number): Promise<AxiosResponse<ServiceResponse>> {
        return this.baseApi.get(this.controller + `/getTotalByRound?recruitmentID=${recruitmentID}&status=${status}&period=${period}`);
    }

    changeRoundCandidate(recruitmentRound: RecruitmentRoundModel, ids: number[]): Promise<AxiosResponse<ServiceResponse>> {
        return this.baseApi.post(this.controller + `/changeRound`, { recruitmentRound, ids });
    }

    changeEliminateCandidate(ids: number[], eliminateID: number, recruitmentID: number, isSendMail: boolean = false): Promise<AxiosResponse<ServiceResponse>> {
        return this.baseApi.post(this.controller + `/eliminate/${eliminateID}/${recruitmentID}/${isSendMail}`, ids);
    }

    getEliminateReason(): Promise<AxiosResponse<ServiceResponse>> {
        return this.baseApi.get(this.controller + `/get-eliminate`);
    }

    transferToEmployee(ids: number[], eliminateID: number, recruitmentID: number): Promise<AxiosResponse<ServiceResponse>> {
        return this.baseApi.post(this.controller + `/employee/${eliminateID}/${recruitmentID}`, ids);
    }

    getByCandidateID(id: string) {
        return this.baseApi.get(this.controller + `/get-by-canidate-id/${id}`);
    }

    revokeEmployee(ids: number[], recruitmentID: number): Promise<AxiosResponse<ServiceResponse>> {
        return this.baseApi.post(this.controller + `/revoke-employee/${recruitmentID}`, ids);
    }

    continueRecruit(ids: number[], recruitmentID: number): Promise<AxiosResponse<ServiceResponse>> {
        return this.baseApi.post(this.controller + `/continue-recruit/${recruitmentID}`, ids);
    }

    RemoveFromRecruitment(ids: number[], recruitmentID: number): Promise<AxiosResponse<ServiceResponse>> {
        return this.baseApi.post(this.controller + `/remove-from-recruit/${recruitmentID}`, ids);
    }

    changeRecruitment(ids: number[], recruitmentID: number, choose: number, recruitmentRound: number, period: number = 0): Promise<AxiosResponse<ServiceResponse>> {
        return this.baseApi.post(this.controller + `/change-recruitment/${recruitmentID}/${choose}/${recruitmentRound}/${period}`, ids);
    }
}