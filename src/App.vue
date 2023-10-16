<template>
    <home-view/>
    <base-toast ref="toastRef" :config="toastConfig" />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { BaseToast } from "./components/base";
import { useToastStore } from "./stores/toast";
import type { DxToast } from "devextreme-vue";
import { ToastType } from "./enums";
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import HomeView from "./views/home/HomeView.vue";

const toastConfig = ref<DxToast>({
    type: ToastType.success,
    message: "Success!",
});
</script>

<style lang="scss" scoped></style>
