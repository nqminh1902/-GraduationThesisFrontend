import type { EliminateReasonModel } from '@/models/EliminateReasonModel';
import BaseApi from '../base/base-api';

export default class EliminateReasonApi extends BaseApi<EliminateReasonModel> {
    constructor() {
        super('EliminateReason');
    }
}