import type { RecruitmentRoundModel } from '@/models';
import BaseApi from '../base/base-api';

export default class RecruitmentRoundApi extends BaseApi<RecruitmentRoundModel> {
    constructor() {
        super('RecruitmentRound');
    }
}