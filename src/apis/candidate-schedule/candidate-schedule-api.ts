import type { CandidateScheduleModel } from '@/models';
import BaseApi from '../base/base-api';

export default class CandidateScheduleApi extends BaseApi<CandidateScheduleModel> {
    constructor() {
        super('CandidateSchedule');
    }
}