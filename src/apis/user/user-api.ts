import type { RoleModel, UserModel } from '@/models';
import BaseApi from '../base/base-api';
import type { ServiceResponse } from '@/DTOs';
import type { AxiosResponse } from 'axios';

export default class UserApi extends BaseApi<UserModel> {
    constructor() {
        super('User');
    }

    userLogin(user: UserModel): Promise<AxiosResponse> {
        return this.baseApi.post(this.controller + `/login`, user)
    }
}