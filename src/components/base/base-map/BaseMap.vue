<template>
    <div class="base-map-wrapper">
        <dx-map v-bind="mapConfig" />
    </div>
</template>

<script setup lang="ts">
import { defaultMapConfig } from '@/constants/components/base';
import { mergeObjects } from '@/utils';
import DxMap from 'devextreme-vue/map';

// #region common
const props = defineProps<{
    config: DxMap;
}>();

const mapConfig = mergeObjects(defaultMapConfig, props.config);
// #endregion
</script>

<style lang="scss" scoped></style>
