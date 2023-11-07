import BaseApi from '../base/base-api';
import type { CandidateModel } from '@/models/CandidateModel';

export default class CandidateApi extends BaseApi<CandidateModel> {
    constructor() {
        super('Candidate');
    }
}