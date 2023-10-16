<template>
    <div
        class="base-gallery"
        :style="{ width: galleryConfig.width, height: galleryConfig.height }"
    >
        <div class="base-gallery-wrapper">
            <div class="base-gallery-indicators">
                <div
                    v-for="(indicator, index) of galleryIndexes"
                    class="base-gallery-indicator cpointer"
                    :class="{ active: isCurrentGallery(index) }"
                    :key="index"
                    @click="handleChangeTab(index)"
                ></div>
            </div>
            <div class="base-gallery-controls">
                <div
                    class="control-left"
                    :class="{ disabled: handleActiveDisabled('left') }"
                    @click="handleChangeTab(currentIndex - 1)"
                >
                    <Icon icon="ep:arrow-left" />
                </div>
                <div
                    class="control-right"
                    :class="{
                        disabled: handleActiveDisabled('right'),
                    }"
                    @click="handleChangeTab(currentIndex + 1)"
                >
                    <Icon icon="ep:arrow-right" />
                </div>
            </div>
            <div class="base-gallery-content">
                <div class="gallery-content-left">
                    <div class="gallery-state unselect">
                        {{ currentGallery.state }}
                    </div>
                    <div class="gallery-title unselect">
                        {{ currentGallery.title }}
                    </div>
                    <div class="gallery-description unselect">
                        {{ currentGallery.description }}
                    </div>
                    <base-button
                        ref="baseButtonRef"
                        :config="galleryConfig.buttonConfig"
                        @click="handleClickButton"
                    />
                </div>
                <div class="gallery-content-right">
                    <div class="content-right-wrapper unselect">
                        <img
                            :src="currentGallery.src"
                            :alt="currentGallery.alt"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { BaseGalleryType, BaseGalleryTypeConfig } from '@/types';
import BaseButton from '../base-button/BaseButton.vue';
import { mergeObjects } from '@/utils';
import { useI18n } from 'vue3-i18n';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';

// #region common
const props = defineProps<{
    config: BaseGalleryType;
}>();

const { t, getLocale } = useI18n();

const defaultConfig: BaseGalleryType = {
    width: '100%',
    height: '300px',
    buttonConfig: {
        text: t('base.button.shopNow'),
    },
    dataSource: [
        {
            id: 0,
            src: '',
            state: t('app.unknown'),
            title: t('app.unknown'),
            description: t('app.unknown'),
        },
    ],
};

const galleryConfig: any = mergeObjects(defaultConfig, props.config);

const baseButtonRef = ref();

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            baseButtonRef.value
                ?.getInstance()
                .option('text', t('base.button.shopNow'));
        }
    }
);
// #endregion

// #region handle events
const router = useRouter();

const handleClickButton = () => {
    router.push({ name: 'shop' });
};
// #endregion

// #region move among pages
let currentIndex: number = 0;
const currentGallery = ref<BaseGalleryTypeConfig>({
    ...galleryConfig.dataSource[currentIndex],
});
const galleryIndexes = galleryConfig.dataSource.map(
    (item: BaseGalleryTypeConfig, index: number) => index + 1
);

const isCurrentGallery = (index: number) => {
    return currentIndex === index;
};

const handleActiveDisabled = (which: string) => {
    if (which == 'left' && currentIndex === 0) return true;
    else if (
        which == 'right' &&
        currentIndex === galleryConfig.dataSource.length - 1
    )
        return true;
    return false;
};

const handleChangeTab = (index: number) => {
    currentIndex = index;
    currentGallery.value = galleryConfig.dataSource[currentIndex];
};
// #endregion
</script>

<style lang="scss">
.base-gallery {
    $height-indicator: 36px;
    background-color: var(--app-color-background);
    .base-gallery-wrapper {
        position: relative;
        overflow: hidden;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        .base-gallery-controls,
        .base-gallery-indicators {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: calc(100% - $height-indicator);
            .base-gallery-indicator {
                width: 14px;
                height: 14px;
                animation: fadeIn 0.4s ease-out;
                border-radius: 50%;
                transform: translateX(-50%);
                background-color: transparent;
                border: 1px solid var(--app-color-border-indicator);
                & + .base-gallery-indicator {
                    margin-left: 8px;
                }
                &.active {
                    background-color: var(--app-color-primary);
                    border-color: var(--app-color-primary);
                    animation: fadeIn 0.4s ease-out;
                }
            }
        }
        .base-gallery-indicators {
            display: flex;
            align-items: center;
            justify-content: center;
            top: unset;
            bottom: 0;
            height: $height-indicator;
        }
        &:hover {
            .base-gallery-controls {
                .control-right {
                    right: 10px;
                }
                .control-left {
                    left: 10px;
                }
            }
        }
        .base-gallery-controls {
            .control-left,
            .control-right {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                transition: 0.4s;
                background-color: var(--app-color-white);
                svg {
                    font-size: 20px;
                }
                &:hover {
                    cursor: pointer;
                    color: var(--app-color-white);
                    background-color: var(--app-color-primary);
                    transition: 0.4s;
                }
                &.disabled {
                    display: none;
                    animation: fadeIn 0.4s ease-out;
                }
            }
            .control-left {
                left: -50px;
            }
            .control-right {
                right: -50px;
            }
        }
        .base-gallery-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: calc(100% - $height-indicator);
            .gallery-content-left,
            .gallery-content-right {
                width: 50%;
                height: 100%;
            }
            .gallery-content-left {
                display: flex;
                justify-content: center;
                flex-direction: column;
                padding: 30px 30px 30px 80px;
                .gallery-state {
                    font-size: 24px;
                    font-weight: 500;
                }
                .gallery-title {
                    font-size: 72px;
                    font-weight: 600;
                    margin-top: 12px;
                    margin-bottom: 30px;
                    line-height: 72px;
                    color: var(--app-color-text-product);
                }
                .gallery-description {
                    font-size: 16px;
                    text-align: justify;
                    margin-bottom: 40px;
                    padding-right: 100px;
                }
                .dx-button {
                    height: 50px !important;
                    width: 150px !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                }
            }
            .gallery-content-right {
                padding: 30px 80px 30px 30px;
                .content-right-wrapper {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img {
                        width: 488px;
                        height: auto;
                        object-fit: cover;
                    }
                }
            }
        }
    }
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
}
</style>
