<template>
    <dx-switch v-bind="baseSwitchConfig" v-model:value="internalValue" />
</template>

<script setup lang="ts">
import { mergeObjects } from "@/utils";
import { DxSwitch } from "devextreme-vue/switch";
import { computed } from "vue";
import { useI18n } from "vue3-i18n";

// #region common
const { t } = useI18n();

const props = defineProps<{
    config: DxSwitch;
    modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue", "onValueChange"]);

const internalValue = computed({
    get() {
        return props.modelValue ?? props.config.value ?? false;
    },
    set(newValue) {
        emit("update:modelValue", newValue);
        emit("onValueChange", newValue);
    },
});

const defaultConfig: DxSwitch = {
    readOnly: false,
    disabled: false,
    width: 40,
    hoverStateEnabled: true,
    focusStateEnabled: true,
    switchedOnText: "",
    switchedOffText: "",
    elementAttr: {
        class: "base-switch",
    },
};

const baseSwitchConfig: DxSwitch = mergeObjects(defaultConfig, props.config);

// #endregion
</script>

<style lang="scss">
.base-switch {
    .dx-switch-handle::before {
        background-color: var(--app-color-primary) !important;
    }
    &.dx-switch.dx-state-focused,
    &.dx-switch.dx-state-active,
    &.dx-switch.dx-state-hover {
        .dx-switch-container {
            border-color: var(--app-color-primary);
        }
    }
}
</style>
