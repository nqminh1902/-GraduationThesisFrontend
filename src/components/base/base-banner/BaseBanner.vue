<template>
    <div
        class="base-banner unselect"
        :style="{
            width: finalBannerConfig.width,
            height: finalBannerConfig.height,
        }"
        @click="handleClickBanner"
    >
        <img :src="finalBannerConfig.src" alt="" />
        <div class="banner-content" :style="getStyles()">
            <div class="banner-title">{{ finalBannerConfig.title }}</div>
            <div class="banner-description">
                {{ finalBannerConfig.description }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { BaseBannerType } from '@/types';
import { mergeObjects } from '@/utils';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue3-i18n';

// #region common
const { t } = useI18n();

const props = defineProps<{
    config: BaseBannerType;
}>();

const defaultConfig: BaseBannerType = {
    width: '570px',
    height: '290px',
    title: props.config.isOnlyPicture ? '' : 'app.unknown',
    description: props.config.isOnlyPicture ? '' : t('app.unknown'),
    position: 'left',
};

const finalBannerConfig: BaseBannerType = mergeObjects(
    defaultConfig || {},
    props.config
);

const getStyles = () => {
    if (finalBannerConfig.position === 'left') {
        return {
            left: '30px',
        };
    }
    if (finalBannerConfig.position === 'right') {
        return {
            right: '30px',
        };
    }
};
// #endregion

// #region handle events
const router = useRouter();

const handleClickBanner = () => {
    router.push({ name: 'shop' });
};
// #endregion
</script>

<style lang="scss" scoped>
.base-banner {
    position: relative;
    padding: 40px;
    cursor: pointer;
    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .banner-content {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        .banner-title {
            font-size: 30px;
            line-height: 39px;
            font-weight: 600;
            margin-bottom: 16px;
            text-shadow: 2px 2px var(--app-color-white);
        }
        .banner-description {
            font-size: 16px;
            text-shadow: 1px 1px var(--app-color-white);
        }
    }
}
</style>
