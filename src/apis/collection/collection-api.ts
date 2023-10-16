import type { CollectionModel } from '@/models';
import BaseApi from '../base/base-api';

export default class CollectionApi extends BaseApi<CollectionModel> {
    constructor() {
        super('Collection');
    }
}