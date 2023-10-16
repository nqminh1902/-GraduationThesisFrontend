<template>
    <dx-tooltip v-bind="tooltipConfig">
        <slot></slot>
    </dx-tooltip>
</template>

<script setup lang="ts">
import { DxTooltip } from 'devextreme-vue/tooltip';
import { mergeObjects } from '../../../utils';
import { defaultBaseToolTipConfig } from '../../../constants/components/base';

// #region common
const props = defineProps<{
    config: DxTooltip;
}>();

const tooltipConfig: DxTooltip = mergeObjects(
    defaultBaseToolTipConfig,
    props.config
);
// #endregion
</script>

<style lang="scss"></style>
