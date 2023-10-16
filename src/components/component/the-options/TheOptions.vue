<template>
    <div class="the-options">
        <swiper
            :slides-per-view="5"
            :space-between="50"
            @slideChange="onSlideChange"
        >
            <swiper-slide
                v-for="(option, index) in props.config.dataSource"
                :key="index"
            >
                <div
                    class="base-option"
                    :style="{
                        width: getBaseOptionConfig(option).width,
                        height: getBaseOptionConfig(option).height,
                    }"
                    @click="handleClickOption(getBaseOptionConfig(option).link)"
                >
                    <div class="base-option-content">
                        <div class="option-circel"></div>
                        <div class="img">
                            <Icon :icon="getBaseOptionConfig(option).icon" />
                        </div>
                        <h3 class="title unselect">
                            {{
                                getBaseOptionConfig(option).text ||
                                t('app.noData')
                            }}
                        </h3>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { defaultBaseOptionConfig } from '@/constants/components/base';
import type { BaseOptionType, TheOptionsType } from '@/types';
import { mergeObjects } from '@/utils';
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue3-i18n';
import { useRouter } from 'vue-router';

// #region common
const { t } = useI18n();
const router = useRouter();

const props = defineProps<{
    config: TheOptionsType;
}>();

const getBaseOptionConfig = (optionConfig: BaseOptionType): any =>
    mergeObjects(defaultBaseOptionConfig, optionConfig);
// #endregion

// #region handle events
const onSlideChange = () => {
    console.log('slide change');
};

const handleClickOption = (link: string) => {
    console.log(link);
    router.push({ path: link });
};
// #endregion
</script>

<style lang="scss" scoped>
.the-options {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .base-option {
        position: relative;
        display: inline-block;
        border: 1px solid var(--app-color-black);
        border-radius: 50%;
        cursor: pointer;
        + .base-option {
            margin-left: 30px;
        }
        &:hover {
            border-color: transparent;
            .option-circel {
                border: 2px dashed var(--app-color-primary);
                animation: circle-effect 12s linear infinite;
            }
        }
        .base-option-content {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .option-circel {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
            .img {
                position: absolute;
                top: 34px;
                left: 50%;
                transform: translateX(-50%);
                color: var(--app-color-black);
                font-size: 70px;
            }
            .title {
                position: absolute;
                top: 110px;
                left: 50%;
                transform: translateX(-50%);
                color: var(--app-color-black);
                margin-top: 12px;
            }
        }
    }
    @keyframes circle-effect {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
}
</style>
