<template>
    <div class="base-text-box" :class="{ 'd-flex': isShowTextButton }">
        <dx-text-box
            ref="textBoxRef"
            v-bind="textBoxConfig"
            v-model="internalValue"
            :class="{ 'textbox-border-radius': isShowTextButton }"
        />
        <template v-if="isShowTextButton">
            <base-button
                :config="buttonConfig"
                :class="{ 'button-border-radius': isShowTextButton }"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
import DxTextBox from "devextreme-vue/text-box";
import { BaseButton } from "../../base";
import { mergeObjects } from "../../../utils";
import { DxButton } from "devextreme-vue";
import { ButtonStylingMode, ButtonType } from "@/enums";
import { computed, ref } from "vue";

// #region common
const props = defineProps<{
    config: DxTextBox;
    modelValue?: string | number | undefined;
    isShowTextButton?: boolean;
}>();

const emit = defineEmits(["update:modelValue", "onValueChange"]);

const internalValue = computed({
    get() {
        return props.modelValue ?? props.config.value ?? "";
    },
    set(newValue) {
        emit("update:modelValue", newValue.toString().trim());
        emit("onValueChange", newValue.toString().trim());
    },
});

const defaultConfig: DxTextBox = {
    height: 38,
    width: "100%",
};

const textBoxConfig: DxTextBox = mergeObjects(defaultConfig, props.config);

const textBoxRef = ref<InstanceType<typeof DxTextBox>>();
// #endregion

// #region config
const buttonConfig = ref<DxButton>({
    type: ButtonType.default,
    height: textBoxConfig.height,
    width: textBoxConfig.height,
    stylingMode: ButtonStylingMode.contained,
    icon: "search",
});
// #endregion

defineExpose({
    getInstance: () => textBoxRef.value?.instance,
    focus: () => textBoxRef.value?.instance?.focus(),
});
</script>

<style lang="scss">
.base-text-box {
    .dx-texteditor.dx-state-hover,
    .dx-textbox.dx-state-hover {
        border-color: var(--app-color-primary) !important;
        .dx-texteditor-label {
            color: var(--app-color-primary) !important;
        }
    }
    .dx-texteditor.dx-state-focused,
    .dx-textbox.dx-state-focused {
        border-color: var(--app-color-primary) !important;
        .dx-texteditor-label {
            color: var(--app-color-primary) !important;
        }
    }
    .textbox-border-radius {
        border-radius: 4px 0px 0px 4px !important;
    }
    .button-border-radius {
        border-radius: 0px 4px 4px 0px;
    }
    .dx-texteditor-container {
        .dx-button-mode-contained {
            border-color: transparent;
        }
    }
    .dx-button-mode-contained {
        &.dx-state-hover,
        &.dx-state-active,
        &.dx-state-focused {
            background-color: var(--app-color-white);
        }
    }
}
</style>
