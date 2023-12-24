import type { UniversityModel } from '@/models/UniversityModel';
import BaseApi from '../base/base-api';

export default class UniversityApi extends BaseApi<UniversityModel> {
    constructor() {
        super('University');
    }
}