import BaseApi from '../base/base-api';
import type { CartModel } from '@/models/CartModel';

export default class CartApi extends BaseApi<CartModel> {
    constructor() {
        super('Cart');
    }

    getEarthRealmVietNam() {
        return this.baseApi.get(
            'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
        );
    }
}
