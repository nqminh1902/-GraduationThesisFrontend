<template>
    <dx-text-area
        ref="textAreaRef"
        v-model="internalValue"
        v-bind="textAreaConfig"
    />
</template>

<script setup lang="ts">
import { defaultBaseTextAreaConfig } from '@/constants/components/base';
import { mergeObjects } from '@/utils';
import DxTextArea from 'devextreme-vue/text-area';

// #region common
const props = defineProps<{
    config: DxTextArea;
    modelValue?: string;
}>();

const textAreaConfig = mergeObjects(defaultBaseTextAreaConfig, props.config);

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const internalValue = computed({
    get() {
        return props.modelValue ?? '';
    },
    set(newValue) {
        emit('update:modelValue', newValue);
    },
});

const textAreaRef = ref<InstanceType<typeof DxTextArea>>();
// #endregion

defineExpose({
    getInstance: () => textAreaRef.value?.instance,
    focus: () => textAreaRef.value?.instance?.focus(),
});
</script>

<style lang="scss">
.base-text-area {
    &.dx-texteditor.dx-state-hover,
    &.dx-texteditor.dx-state-active,
    &.dx-texteditor.dx-state-focused {
        border-color: var(--app-color-primary);
    }
}
</style>
