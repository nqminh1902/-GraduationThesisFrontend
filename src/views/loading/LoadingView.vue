<template>
    <div class="loading-wrapper" v-if="isLoading">
        <div class="loading-image">
            <img src="../../assets/icons/waiting.gif" alt="Gif loading FAON" />
        </div>
        <div class="loading-progress-wrap">
            <div
                class="loading-progress-bar"
                :style="{ width: progressText + '%' }"
            ></div>
        </div>
        <div class="loading-text">
            {{ messageText }} ({{ progressText }}{{ t('sign.percent') }}){{
                t('sign.threedot')
            }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted } from 'vue';
import { useI18n } from 'vue3-i18n';
import { useRouter } from 'vue-router';
import { handleAppMounted, handleAppUnmounted } from '@/utils';

// #region constants
const START_PROGRESS = 10;
const LIMIT_PROGRESS = 92;
const TIME_TO_REACH_LIMIT = 10;
const TIME_SPEED_RUN = 0.05;
const TIME_TO_RUN = TIME_TO_REACH_LIMIT / (LIMIT_PROGRESS - START_PROGRESS);
// #endregion

// #region common
const { t } = useI18n();
const progressText = ref<number>(START_PROGRESS);
const messageText = ref<string>(t('loading.initData'));
let intervalFunction: any = null;

const installApi = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('done');
    }, 5 * 1000);
});
// #endregion

// #region progress
const handleDisabledProgress = () => {
    const progressBar: HTMLElement | null = document.querySelector(
        '.loading-progress-bar'
    );
    if (progressBar) {
        setTimeout(() => {
            progressBar.style.backgroundColor = 'gray';
            progressBar.style.transition = '2s';
            messageText.value = t('loading.failed');
        }, 1000);
    }
};

const router = useRouter();
const isLoading = ref<boolean>(true);

onMounted(() => {
    handleAppMounted();

    intervalFunction = setInterval(() => {
        if (progressText.value < LIMIT_PROGRESS) progressText.value += 2;
        else {
            clearInterval(intervalFunction);
        }
    }, TIME_TO_RUN * 1000);

    installApi
        .then((response) => {
            clearInterval(intervalFunction);
            intervalFunction = setInterval(() => {
                if (progressText.value < 99) progressText.value += 2;
                else {
                    clearInterval(intervalFunction);
                    router.push({ name: 'home' });
                    nextTick();
                    handleAppUnmounted();
                    isLoading.value = false;
                }
            }, TIME_SPEED_RUN * 1000);
        })
        .catch(() => {
            handleDisabledProgress();
        });
});

onBeforeUnmount(() => {
    clearInterval(intervalFunction);
});
// #endregion
</script>

<style lang="scss" scoped>
.loading-wrapper {
    position: fixed;
    z-index: 142;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: var(--app-color-white);
    .loading-image {
        width: 280px;
        margin-bottom: 26px;
    }
    .loading-progress-wrap {
        width: 320px;
        height: 24px;
        border-radius: 40px;
        position: relative;
        margin-bottom: 8px;
        background-color: var(--app-color-bg-progress-bar);
        box-shadow: inset 0 1px 2px rgba($color: #000, $alpha: 0.4),
            0 -1px 1px var(--app-color-white), 0 1px 0 var(--app-color-white);
        .loading-progress-bar {
            height: 100%;
            border-radius: 40px;
            position: absolute;
            top: 1px;
            left: 1px;
            right: 1px;
            background-size: 40px 40px;
            background-color: var(--app-color-secondary);
            background-image: linear-gradient(
                135deg,
                rgba($color: #fff, $alpha: 0.15) 25%,
                transparent 25%,
                transparent 50%,
                rgba($color: #fff, $alpha: 0.15) 50%,
                rgba($color: #fff, $alpha: 0.15) 75%,
                transparent 75%,
                transparent
            );
            animation: striped 1s linear infinite;
        }
        @keyframes striped {
            from {
                background-position: 0 0;
            }
            to {
                background-position: 40px 0;
            }
        }
    }
    .loading-text {
        font-weight: 500;
    }
}
</style>
