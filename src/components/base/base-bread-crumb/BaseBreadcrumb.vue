<template>
    <div class="base-breadcrumb">
        <h2 class="breadcrumb-title">{{ breadcrumbConfig.currentPage }}</h2>
        <div class="breadcrumb-navigation">
            <div class="breadcrumb-wrapper">
                <router-link to="/">{{
                    t('app.title.home').toUpperCase()
                }}</router-link>
                {{ t('sign.slash') }}
            </div>
            <div
                class="breadcrumb-wrapper"
                v-for="(item, index) of breadcrumbConfig.prevPages"
                :key="index"
            >
                <router-link :to="item.link">{{
                    item.text.toUpperCase()
                }}</router-link>
            </div>
            <span v-if="breadcrumbConfig.prevPages" class="m-r-4">
                {{ t('sign.slash') }}
            </span>
            {{ breadcrumbConfig.currentPage.toUpperCase() }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue3-i18n';
import { RouterLink } from 'vue-router';
import type { BaseBreadcrumbType } from '@/types';
import { mergeObjects } from '@/utils';
import { defaultBreadcrumbConfig } from '@/constants/components/base';
import { ref, watch } from 'vue';

// #region common
const { t } = useI18n();

const props = defineProps<{
    config: BaseBreadcrumbType;
}>();

const breadcrumbConfig = ref<any>(
    mergeObjects(defaultBreadcrumbConfig, props.config)
);
// #endregion

watch(
    () => props.config,
    (currentValue) => {
        if (currentValue) {
            breadcrumbConfig.value = mergeObjects(
                defaultBreadcrumbConfig,
                props.config
            );
        }
    },
    {
        deep: true,
        immediate: true
    }
);
</script>

<style lang="scss" scoped>
.base-breadcrumb {
    padding-top: 80px;
    padding-bottom: 80px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 80px;
    background-color: var(--app-color-bg-collection);
    h2 {
        font-size: 28px;
        overflow: hidden;
        line-height: 1.58;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-transform: uppercase;
        font-weight: 600;
        color: var(--app-color-text-collection);
    }
    .breadcrumb-navigation {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        a:hover {
            color: var(--app-color-primary);
        }
        .breadcrumb-wrapper {
            margin-right: 4px;
        }
    }
}
</style>
