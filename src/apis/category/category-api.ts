import type { CategoryModel } from '@/models';
import BaseApi from '../base/base-api';

export default class CategoryApi extends BaseApi<CategoryModel> {
    constructor() {
        super('Category');
    }
}