<template>
    <div class="container-app">
        <the-header></the-header>
        <div class="flex w-full" style="height: calc(100% - 48px) ;">
            <the-sidebar></the-sidebar>
            <div class="" style="width: calc(100% - 220px); height: 100%;">
                <router-view></router-view>
            </div>
        </div>
    </div>
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
import TheHeader from "./layouts/TheHeader.vue";
import TheSidebar from "./layouts/TheSidebar.vue";

const toastConfig = ref<DxToast>({
    type: ToastType.success,
    message: "Success!",
});
</script>

<style lang="scss" scoped>
.container-app{
    width: 100%;
    height: 100vh;
}
</style>
