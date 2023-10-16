import type { PostModel } from '@/models';
import BaseApi from '../base/base-api';
import { dataPosts } from '@/mocks';

export default class PostApi extends BaseApi<PostModel> {
    constructor() {
        super('Post');
    }

    get() {
        return dataPosts;
    }

    getByPostID(id: string) {
        const post = dataPosts.filter(
            (product) => product.PostID?.toString() == id
        );
        return post[0];
    }

    getByTagID(id: string) {
        const post = dataPosts.filter(
            (product) => product.TagID?.toString() == id
        );
        return post[0];
    }
}
