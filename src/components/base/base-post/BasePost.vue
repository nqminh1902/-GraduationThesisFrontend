<template>
    <div
        class="base-post unselect"
        :style="{ width: WIDTH, height: HEIGHT }"
        v-once
    >
        <div class="post-image-wrap cpointer" @click="moveToDetailPost">
            <img
                :src="basePostConfig.PostImage"
                :alt="basePostConfig.ImageAlt"
            />
        </div>
        <div class="post-content-wrap">
            <div
                class="post-title cpointer"
                :title="basePostConfig.PostName"
                @click="moveToDetailPost"
            >
                {{ basePostConfig.PostName }}
            </div>
            <div class="post-information">
                <div class="post-author">
                    {{ t('base.post.by') }}
                    <span
                        class="post-author-name cpointer"
                        @click="moveToListOfAuthor"
                        >{{ basePostConfig.Author }}</span
                    >
                </div>
                <div class="post-date cpointer" @click="moveToListByDate">
                    {{ basePostConfig.Date }}
                </div>
            </div>
            <div class="post-description">{{ basePostConfig.Description }}</div>
            <div class="m-t-20">
                <base-button ref="baseButtonRef" :config="buttonConfig" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defaultBasePostConfig } from '@/constants/components/base';
import { mergeObjects } from '@/utils';
import { BaseButton } from '@/components/base';
import type { DxButton } from 'devextreme-vue';
import { ButtonType } from '@/enums';
import { useI18n } from 'vue3-i18n';
import type { PostModel } from '@/models';
import { useRouter } from 'vue-router';

// #region common
const { t, getLocale } = useI18n();

const props = defineProps<{
    config: PostModel;
}>();

const basePostConfig: any = mergeObjects(
    defaultBasePostConfig || {},
    props.config
);

const WIDTH = '370px';
const HEIGHT = 'auto';
// #endregion

// #region config
const buttonConfig: DxButton = {
    text: basePostConfig.ButtonContent,
    type: ButtonType.normal,
    onClick: () => {
        moveToDetailPost();
    },
};

const baseButtonRef = ref();

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            baseButtonRef.value
                ?.getInstance()
                .option('text', t('base.button.readMore'));
        }
    }
);
// #endregion

// #region get data
const router = useRouter();

const moveToDetailPost = () => {
    router.push({ name: 'post', params: { id: props.config.PostID } });
};

/**
 * TODO: lọc theo tác giả
 */
const moveToListOfAuthor = () => {
    console.log('List post of author');
};

/**
 * TODO: lọc theo ngày đăng
 */
const moveToListByDate = () => {
    console.log('List post by date');
};
// #endregion
</script>

<style lang="scss" scoped>
.base-post {
    max-height: 500px;
    margin-top: 20px;
    display: inline-block;
    .post-image-wrap {
        height: 200px;
        width: 100%;
        img {
            object-fit: cover;
            height: 100%;
            width: 100%;
        }
    }
    .post-content-wrap {
        height: 60%;
        width: 100%;
        padding: 22px 20px 32px;
        background-color: var(--app-color-bg-post);
        .post-title {
            font-size: 22px;
            font-weight: 600;
            margin-bottom: 10px;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .post-information {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-weight: 600;
            margin-bottom: 15px;
            font-size: 13px;
            .post-date,
            .post-author-name {
                &:hover {
                    color: var(--app-color-primary);
                }
            }
        }
        .post-description {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-size: 16px;
        }
    }
}
</style>
