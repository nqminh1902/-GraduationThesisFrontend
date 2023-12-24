import BaseApi from '../base/base-api';
import type { WorkLocationModel } from '@/models/WorkLocationModel';

export default class WorkLocationApi extends BaseApi<WorkLocationModel> {
    constructor() {
        super('WorkLocation');
    }
}