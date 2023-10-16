<template>
    <dx-select-box
        ref="dxSelectBoxRef"
        v-model:value="internalValue"
        v-bind="selectboxConfig"
    >
        <template #iconTemplate>
            <Icon icon="fa6-solid:chevron-down" />
        </template>
    </dx-select-box>
</template>

<script setup lang="ts">
import DxSelectBox from 'devextreme-vue/select-box';
import { mergeObjects } from '@/utils';
import { defaultBaseSelectBoxConfig } from '@/constants/components/base';
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';

// #region common
const props = defineProps<{
    config: DxSelectBox;
    modelValue?: any;
}>();

const defaultConfig = ref<DxSelectBox>({
    ...defaultBaseSelectBoxConfig,
});

const selectboxConfig: DxSelectBox = mergeObjects(
    defaultConfig.value || {},
    props.config
);

const emit = defineEmits<{
    (e: 'update:modelValue', value: any): void;
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

const dxSelectBoxRef = ref<InstanceType<typeof DxSelectBox>>()

defineExpose({
    getInstance: () => dxSelectBoxRef.value?.instance,
});
</script>

<style lang="scss">
.base-select-box {
    &.dx-texteditor.dx-state-hover,
    &.dx-texteditor.dx-state-focused,
    &.dx-texteditor.dx-state-active {
        border-color: var(--app-color-primary);
    }
    &.dx-dropdowneditor.dx-state-active .dx-dropdowneditor-icon,
    &.dx-dropdowneditor.dx-state-focused .dx-dropdowneditor-icon,
    &.dx-dropdowneditor.dx-state-hover:not(.dx-custom-button-hovered)
        .dx-dropdowneditor-icon,
    &.dx-dropdowneditor-button.dx-state-active .dx-dropdowneditor-icon,
    &.dx-dropdowneditor.dx-dropdowneditor-active .dx-dropdowneditor-icon {
        background-color: transparent;
    }
    .dx-dropdowneditor-button {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.dx-dropdownlist-popup-wrapper .dx-empty-message,
.dx-dropdownlist-popup-wrapper .dx-list-item {
    height: 40px;
    margin-top: 2px;
}
.dx-dropdownlist-popup-wrapper
    .dx-list:not(.dx-list-select-decorator-enabled)
    .dx-list-item-content {
    padding: 8px 9px;
}
.dx-list:not(.dx-list-select-decorator-enabled) .dx-list-item {
    &.dx-state-active,
    &.dx-state-focused,
    &.dx-list-item-selected {
        color: var(--app-color-white);
        background-color: var(--app-color-primary);
    }
}
.dx-list:not(.dx-list-select-decorator-enabled) .dx-list-item {
    &.dx-list-item-selected.dx-state-hover,
    &.dx-list-item-selected.dx-state-focused,
    &.dx-list-item-selected.dx-state-active {
        color: var(--app-color-white) !important;
        background-color: var(--app-color-primary) !important;
    }
}
</style>
