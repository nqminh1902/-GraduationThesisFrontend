import type { RecruitmentModel } from '@/models';
import BaseApi from '../base/base-api';

export default class RecruitmentApi extends BaseApi<RecruitmentModel> {
    constructor() {
        super('Recruitment');
    }
}