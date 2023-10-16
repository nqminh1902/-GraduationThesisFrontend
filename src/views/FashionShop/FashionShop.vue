<template>
    <!-- <loading-view /> -->
    <the-header
        class="md:block hidden"
        @onClickCart="handleClickCart"
        @onClickAccount="handleClickAccount"
        @onClickNotification="handleClickNotification"
    />
    <transition name="fade">
        <the-header-mobile
            class="md:hidden block"
            @onClickMenuMobile="handleClickSidebarMobile"
        />
    </transition>
    <div class="app-content">
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
    <the-account v-model="isExpandAccountProps" />
    <the-cart v-model="isExpandCartProps" />
    <the-side-bar-mobile v-model="isExpandSidebarMobileProps" />
    <the-footer />
    <popup-compare v-model="isOpenPopupCompare" />
    <the-preview-compare />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "../../layouts/TheHeader.vue";
import TheHeaderMobile from "../../layouts/TheHeaderMobile.vue";
import TheFooter from "../../layouts/TheFooter.vue";
import {
    TheCart,
    TheAccount,
    TheSideBarMobile,
    ThePreviewCompare,
} from "@/components/component";
import LoadingView from "../../views/loading/LoadingView.vue";
import {
    useUserOptionStore,
    useToastStore,
    useCompareStore,
} from "../../stores";
import { PopupCompare } from "../../components/component";
import type { DxToast } from "devextreme-vue";
import { ToastType } from "../../enums";
import { ref, watch } from "vue";

// #region handle events
const compareStore = useCompareStore();
const isOpenPopupCompare = ref<boolean>(compareStore.compare.isVisible);
useUserOptionStore().initData();

const isExpandCartProps = ref<boolean>(false);
const isExpandAccountProps = ref<boolean>(false);
const isExpandSidebarMobileProps = ref<boolean>(false);

const handleClickCart = () => {
    isExpandCartProps.value = true;
};

const handleClickSidebarMobile = () => {
    isExpandSidebarMobileProps.value = true;
};

const handleClickAccount = () => {
    isExpandAccountProps.value = true;
};

const handleClickNotification = () => {
    console.log("Click notification");
};
// #endregion

watch(
    () => compareStore.compare.isVisible,
    (currentValue) => {
        isOpenPopupCompare.value = currentValue;
    }
);
</script>

<style lang="scss" scoped>
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease-out;
}
</style>
