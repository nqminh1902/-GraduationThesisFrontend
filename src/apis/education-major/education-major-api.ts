import BaseApi from '../base/base-api';
import type { EducationMajorModel } from '@/models/EducationMajorModel';

export default class EducationMajorApi extends BaseApi<EducationMajorModel> {
    constructor() {
        super('EducationMajor');
    }
}