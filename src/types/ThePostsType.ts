import type { PostModel } from '@/models';

export interface ThePostsType {
    dataSource: PostModel[];
    limit?: number;
}
