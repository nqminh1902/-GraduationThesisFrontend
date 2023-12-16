<template>
    <div class="base-date-box">
        <dx-date-box v-model="internalValue" v-bind="dateBoxConfig" />
    </div>
</template>

<script setup lang="ts">
import { defaultBaseDateBoxConfig } from '@/constants/components/base';
import { mergeObjects } from '@/utils';
import DxDateBox from 'devextreme-vue/date-box';
import { computed } from 'vue';

// #region common
const props = defineProps<{
    config: DxDateBox;
    modelValue?: any;
}>();

const dateBoxConfig = mergeObjects(defaultBaseDateBoxConfig, props.config);

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const internalValue = computed({
    get() {
        return props.modelValue ?? '';
    },
    set(newValue) {
        emit('update:modelValue', newValue);
    },
});
// #endregion
</script>

<style lang="scss">
.base-date-box {
    &.dx-texteditor.dx-state-hover,
    &.dx-texteditor.dx-state-active,
    &.dx-texteditor.dx-state-focused {
        border-color: #2680EB;
    }
}
.dx-calendar-navigator .dx-calendar-caption-button.dx-button .dx-button-content,
.dx-calendar-navigator-next-view.dx-button .dx-icon,
.dx-calendar-navigator-previous-view.dx-button .dx-icon {
    color: #2680EB;
}
.dx-calendar-cell.dx-calendar-selected-date.dx-calendar-contoured-date,
.dx-calendar-cell.dx-calendar-selected-date,
.dx-calendar-cell.dx-calendar-selected-date.dx-calendar-today,
.dx-calendar-cell.dx-calendar-selected-date.dx-calendar-today.dx-calendar-contoured-date {
    -webkit-box-shadow: inset 0 0 0 1px var(--app-color-shalow-datebox),
        inset 0 0 0 1000px #2680EB;
    box-shadow: inset 0 0 0 1px var(--app-color-shalow-datebox),
        inset 0 0 0 1000px #2680EB;
}
.dx-state-disabled{
    background-color: #f4f4f4 !important;
}
</style>
