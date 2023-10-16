<template>
    <dx-button v-bind="buttonConfig" ref="buttonRef" />
</template>

<script setup lang="ts">
import DxButton from "devextreme-vue/button";
import { mergeObjects } from "../../../utils";
import { defaultBaseButtonConfig } from "@/constants/components/base";
import { onMounted, ref, watch } from "vue";
import { ButtonType } from "@/enums";

// #region common
const props = defineProps<{
    config: DxButton;
    loading?: boolean;
}>();

const buttonConfig: DxButton = mergeObjects(
    defaultBaseButtonConfig,
    props.config
);

const buttonRef = ref<InstanceType<typeof DxButton>>();
// #endregion

// #region loading
onMounted(() => {
    stylingButton();
    if (props.loading) {
        startLoading();
    }
});

watch(
    () => props.loading,
    (currentValue) => {
        if (currentValue) {
            startLoading();
        } else {
            endLoading();
        }
    }
);

function startLoading() {
    const button = buttonRef.value?.instance?.element();
    if (button) {
        const btnLoading = document.createElement("div");
        btnLoading.classList.add("btn-loading");
        const loading = document.createElement("div");
        loading.classList.add("loader");
        btnLoading.appendChild(loading);
        button.appendChild(btnLoading);
        button.querySelector(".dx-button-content").style.visibility = "hidden";
    }
}

function endLoading() {
    const button = buttonRef.value?.instance?.element();
    if (button) {
        button.querySelector(".btn-loading").remove();
        button.querySelector(".dx-button-content").style.visibility = "visible";
    }
}
// #endregion

// #region style
function stylingButton() {
    const button = buttonRef.value?.instance?.element();

    if (buttonConfig?.type == ButtonType.default) {
        button.classList.add("default-btn");
    } else if (buttonConfig?.type == ButtonType.normal) {
        button.classList.add("normal-btn");
    }
}
// #endregion

defineExpose({
    getInstance: () => buttonRef.value?.instance,
});
</script>

<style lang="scss">
.default-btn {
    position: relative;
    background-color: var(--app-color-primary) !important;
    font-weight: 600;
    border-radius: 0px;
    transition: all 0.4s ease 0s;
    font-size: 14px;
    &:hover {
        color: var(--app-color-white);
        background-color: var(--app-color-pure-black) !important;
    }
}

.normal-btn {
    position: relative;
    background-color: var(--app-color-black) !important;
    font-weight: 600;
    border-radius: 0px;
    transition: all 0.4s ease 0s;
    font-size: 14px;
    border: none;
    color: var(--app-color-white);
    &:hover {
        background-color: var(--app-color-primary) !important;
    }
}

.btn-loading {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loader {
    border: 4px solid var(--app-color-border);
    border-top: 4px solid var(--app-color-border-top-loading);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
