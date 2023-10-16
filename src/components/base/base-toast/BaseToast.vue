<template>
    <dx-toast
        v-bind="toastConfig"
        v-model:visible="isShowToast"
        v-model:message="toastMessage"
        v-model:type="ToastType"
    />
</template>

<script setup lang="ts">
import { defaultBaseToastConfig } from "@/constants/components/base";
import { useToastStore } from "@/stores";
import { DxToast } from "devextreme-vue/toast";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";

// #region common

const toast = useToastStore();

const { isShowToast, toastMessage, ToastType } = storeToRefs(toast);

const toastConfig = computed<DxToast>(() => defaultBaseToastConfig);
// #endregion

const toastRef = ref<InstanceType<typeof DxToast>>();

defineExpose({
    getInstance: () => toastRef.value?.instance,
});
</script>

<style lang="scss"></style>
