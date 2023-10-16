<template>
    <dx-number-box
        ref="numberBoxRef"
        v-bind="numberBoxConfig"
        v-model="internalValue"
    />
</template>

<script setup lang="ts">
import { DxNumberBox } from 'devextreme-vue/number-box';
import { mergeObjects } from '@/utils';
import { defaultBaseNumberBoxConfig } from '@/constants/components/base';

// #region common
const props = defineProps<{
    config: DxNumberBox;
    modelValue?: number | undefined;
}>();

const numberBoxConfig: DxNumberBox = mergeObjects(
    defaultBaseNumberBoxConfig,
    props.config
);

const emit = defineEmits(['update:modelValue', 'onValueChange']);

const internalValue = computed({
    get() {
        return props.modelValue ?? props.config.value ?? '';
    },
    set(newValue) {
        emit('update:modelValue', newValue);
        let value = newValue;
        if (!value) {
            value = 0;
        }
        emit('update:modelValue', value);
        emit('onValueChange', value);
    },
});

const numberBoxRef = ref<InstanceType<typeof DxNumberBox>>();
// #endregion

defineExpose({
    getInstance: () => numberBoxRef.value?.instance,
    focus: () => numberBoxRef.value?.instance?.focus(),
});
</script>

<style lang="scss">
.dx-numberbox.dx-state-hover {
    border-color: var(--app-color-primary) !important;
}
.dx-numberbox.dx-state-focused {
    border-color: var(--app-color-primary) !important;
}
</style>
