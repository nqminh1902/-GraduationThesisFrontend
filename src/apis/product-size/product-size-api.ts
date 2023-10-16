import type { ProductSizeModel } from '@/models';
import BaseApi from '../base/base-api';

export default class ProductSizeApi extends BaseApi<ProductSizeModel> {
    constructor() {
        super('ProductSize');
    }
}