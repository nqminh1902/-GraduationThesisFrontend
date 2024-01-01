import type { AxiosResponse } from 'axios';
import type { ServiceResponse } from '@/DTOs';
import BaseApiConfig from '../base/base-api-config';

export default class ExportApi {
    protected baseApi;

    controller = '';

    constructor() {
        this.baseApi = BaseApiConfig;
        this.controller = "Export";
    }

    exportCandidate(candidateIDs: number[]): Promise<AxiosResponse<ServiceResponse>> {
        return this.baseApi.post(this.controller + `/export-candidate`, candidateIDs);
    }
}