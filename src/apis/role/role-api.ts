import type { RoleModel } from '@/models';
import BaseApi from '../base/base-api';
import type { ServiceResponse } from '@/DTOs';
import type { AxiosResponse } from 'axios';

export default class RoleApi extends BaseApi<RoleModel> {
    constructor() {
        super('Role');
    }

    saveRole(role: RoleModel): Promise<AxiosResponse<ServiceResponse>> {
        return this.baseApi.post(this.controller + `/save`, role);
    }
}