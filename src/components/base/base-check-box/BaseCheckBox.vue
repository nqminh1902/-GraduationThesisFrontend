<template>
    <dx-check-box v-model="internalValue" v-bind="baseCheckBoxConfig" />
</template>

<script setup lang="ts">
import { defaultBaseCheckBoxConfig } from '@/constants/components/base';
import { mergeObjects } from '@/utils';
import { DxCheckBox } from 'devextreme-vue/check-box';

// #region common
const props = defineProps<{
    config: DxCheckBox;
    modelValue?: boolean | undefined;
}>();

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

const baseCheckBoxConfig: DxCheckBox = mergeObjects(
    defaultBaseCheckBoxConfig || {},
    props.config
);
// #endregion
</script>

<style lang="scss">
.base-check-box {
    &.dx-checkbox.dx-state-hover .dx-checkbox-icon,
    &.dx-checkbox.dx-state-focused .dx-checkbox-icon {
        border: 1px solid var(--app-color-primary);
    }
    &.dx-checkbox-checked .dx-checkbox-icon {
        color: var(--app-color-primary);
    }
}
.dx-checkbox-indeterminate .dx-checkbox-icon::before {
    background-color: var(--app-color-primary);
}
</style>
