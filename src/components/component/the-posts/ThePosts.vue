<template>
    <div class="the-posts">
        <base-post
            v-for="(post, index) in dataSource"
            :key="index"
            :config="post"
        />
    </div>
</template>

<script setup lang="ts">
import { BasePost } from '@/components/base';
import type { PostModel } from '@/models';
import type { ThePostsType } from '@/types';

// #region common
let dataSource: PostModel[] = [];

const props = defineProps<{
    config: ThePostsType;
}>();

if (props.config.limit) {
    dataSource = props.config.dataSource.filter((item, index) => {
        if (props.config.limit && index < props.config.limit) {
            return item;
        }
    });
}
// #endregion
</script>

<style lang="scss" scoped>
.the-posts {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
}
</style>
