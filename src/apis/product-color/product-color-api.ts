import type { ProductColorModel } from '@/models';
import BaseApi from '../base/base-api';

export default class ProductColorApi extends BaseApi<ProductColorModel> {
    constructor() {
        super('ProductColor');
    }
}