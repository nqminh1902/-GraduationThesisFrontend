import type { ProductModel } from '@/models';
import BaseApi from '../base/base-api';
import { dataProducts } from '@/mocks';

export default class ProductApi extends BaseApi<ProductModel> {
    constructor() {
        super('Product');
    }

    get() {
        return dataProducts;
    }

    getByCollectionID(id: string) {
        const products = dataProducts.filter(
            (product) => product.CollectionID?.toString() == id
        );
        return products;
    }

    getRelatedProduct() {
        return dataProducts;
    }
}
