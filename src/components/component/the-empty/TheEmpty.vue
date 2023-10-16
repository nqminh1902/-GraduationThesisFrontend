<template>
    <div class="the-empty">
        <div class="empty-img">
            <img :src="emptyTypeConfig.img" alt="" />
        </div>
        <div class="empty-text">
            {{ emptyTypeConfig.text }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { defaultTheEmptyConfig } from '@/constants/components/component';
import type { TheEmptyType } from '@/types';
import { mergeObjects } from '@/utils';
import { useI18n } from 'vue3-i18n';

// #region common
const { getLocale } = useI18n();

const props = defineProps<{
    config?: TheEmptyType;
}>();

const emptyTypeConfig = ref<any>(
    mergeObjects(defaultTheEmptyConfig.value, props.config || {})
);
// #endregion

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            if (!props.config) {
                emptyTypeConfig.value = defaultTheEmptyConfig.value;
            } else {
                emptyTypeConfig.value = mergeObjects(
                    defaultTheEmptyConfig.value,
                    props.config || {}
                );
            }
        }
    }
);
</script>

<style lang="scss" scoped>
.the-empty {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    .empty-img {
        width: 440px;
        overflow: hidden;
        img {
            object-fit: cover;
        }
    }
    .empty-text {
        font-size: 18px;
    }
}
</style>
