import type { JobPositionModel } from '@/models/JobPositionModel';
import BaseApi from '../base/base-api';

export default class JobPositionApi extends BaseApi<JobPositionModel> {
    constructor() {
        super('JobPosition');
    }
}