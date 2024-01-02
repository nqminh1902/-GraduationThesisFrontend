import type { PermissionModel } from '@/models';
import BaseApi from '../base/base-api';
import type { ServiceResponse } from '@/DTOs';
import type { AxiosResponse } from 'axios';

export default class PermissionApi extends BaseApi<PermissionModel> {
    constructor() {
        super('Permission');
    }

    getByRoleID(id: number): Promise<AxiosResponse<ServiceResponse>> {
        return this.baseApi.get(this.controller + `/getByRoleID/${id}`);
    }
}