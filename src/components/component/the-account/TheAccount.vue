<template>
    <transition name="fade">
        <div class="the-account-sidebar" v-show="isExpand">
            <div class="account-header d-flex-center">
                <div class="account-title">{{ t("theAccount.title") }}</div>
                <div class="account-close" @click="toggleExpand">
                    <Icon icon="uil:times" />
                </div>
            </div>
            <div class="account-content">
                <ul class="account-list">
                    <li
                        class="account-item"
                        v-for="(item, index) of theData"
                        :key="index"
                        @click="handeClickItem(item.text)"
                    >
                        <Icon :icon="item.icon" :width="20" />
                        <span class="m-l-8">{{ item.text }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
    <transition name="fade-opacity">
        <div class="overlay" v-show="isExpand" @click="toggleExpand"></div>
    </transition>
    <popup-signin
        v-model="isOpenPopupSignin"
        @on-click-create="handeClickCreate"
    />
    <popup-signup
        v-model="isOpenPopupSignup"
        @on-click-login="handeClickLogin"
    />
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useI18n } from "vue3-i18n";
import { useRouter } from "vue-router";
import { dataAccountWithoutLogin, dataAccountWithLogin } from "@/mocks";
import { useUserOptionStore } from "@/stores";
import type { AccountItem } from "@/types";
import { PopupSignin, PopupSignup } from "@/components/component";
import { computed, ref } from "vue";

// #region common
const { t } = useI18n();
const userOption = useUserOptionStore();
const isLogin = ref<boolean>(userOption.userOptions.IsLogin);
const theData = ref<AccountItem[]>(
    isLogin.value ? dataAccountWithLogin.value : dataAccountWithoutLogin.value
);

const router = useRouter();

const props = defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();
// #endregion

// #region open/close popup
const isOpenPopupSignin = ref<boolean>(false);
const isOpenPopupSignup = ref<boolean>(false);

const handeClickCreate = () => {
    isOpenPopupSignin.value = false;
    isOpenPopupSignup.value = true;
};

const handeClickLogin = () => {
    isOpenPopupSignup.value = false;
    isOpenPopupSignin.value = true;
};
// #endregion

// #region expand
const isExpand = computed({
    get() {
        return props.modelValue ?? false;
    },
    set(newValue) {
        emit("update:modelValue", newValue);
    },
});

const toggleExpand = () => {
    isExpand.value = !isExpand.value;
};
// #endregion

// #region handle events
const handeClickItem = (item: any) => {
    switch (item) {
        case t("theAccount.signIn"):
            isOpenPopupSignin.value = true;
            break;
        case t("theAccount.signUp"):
            isOpenPopupSignup.value = true;
            break;
        case t("theAccount.account"):
            router.push({ name: "account" });
            break;
        case t("theAccount.recent"):
            router.push({ name: "recent" });
            break;
        case t("theAccount.orders"):
            router.push({ name: "orders" });
            break;
        case t("theAccount.wishlist"):
            router.push({ name: "wishlist" });
            break;
        case t("theAccount.logOut"):
            console.log("Logout");
            router.push({ name: "home" });
            break;
    }
    toggleExpand();
};
// #endregion
</script>

<style lang="scss" scoped>
.the-account-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 386px;
    height: 100vh;
    background-color: var(--app-color-white);
    z-index: 120;
    .account-header {
        padding: 20px;
        height: 70px;
        justify-content: space-between;
        border-bottom: 1px solid var(--app-color-border-lighter);
        .account-title {
            font-size: 20px;
            font-weight: 700;
        }
        .account-close {
            font-size: 30px;
            color: var(--app-color-secondary);
            &:hover {
                cursor: pointer;
            }
        }
    }
    .account-content {
        padding: 15px;
        .account-list {
            list-style: none;
            .account-item {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                border-radius: 4px;
                padding: 10px 16px;
                font-weight: 600;
                border: 1px solid var(--app-color-secondary);
                & + .account-item {
                    margin-top: 8px;
                }
                &:hover {
                    cursor: pointer;
                    color: var(--app-color-white);
                    background-color: var(--app-color-secondary);
                    border-color: transparent;
                }
            }
        }
    }
}
.fade-leave-to,
.fade-enter-from {
    opacity: 0;
    left: -400px;
}
.fade-leave-from,
.fade-enter-to {
    opacity: 1;
    left: 0;
}
.fade-leave-active,
.fade-enter-active {
    transition: all 0.5s;
}
.fade-overlay-leave-to,
.fade-overlay-enter-from {
    opacity: 0;
}
.fade-overlay-leave-from,
.fade-overlay-enter-to {
    opacity: 1;
}
.fade-overlay-leave-active,
.fade-overlay-enter-active {
    transition: opacity 0.5s;
}
</style>
