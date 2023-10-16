<template>
    <footer>
        <div class="footer-above d-flex">
            <div class="col-4 p-r-40">
                <div
                    class="footer-about-title font-size-15 font-weight-500 m-b-15"
                >
                    {{ t('footer.title.aboutUs') }}
                </div>
                <div class="footer-about-description">
                    Lorem ipsum dolor sit amet cons adipisicing elit sed do
                    eiusm tempor incididunt ut labor et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud.
                </div>
                <div class="footer-about-socials d-flex-center">
                    <a href="" target="_blank"
                        ><Icon icon="ic:baseline-facebook"
                    /></a>
                    <a href="" target="_blank"><Icon icon="mdi:twitter" /></a>
                    <a href="" target="_blank"><Icon icon="mdi:linkedin" /></a>
                    <a href="" target="_blank"
                        ><Icon icon="ri:youtube-fill"
                    /></a>
                    <a href="" target="_blank"><Icon icon="mdi:instagram" /></a>
                </div>
            </div>
            <div class="col-4 p-x-40">
                <div
                    class="footer-information-title font-size-15 font-weight-500 m-b-15"
                >
                    {{ t('footer.title.information') }}
                </div>
                <div class="footer-list-wrapper">
                    <a
                        v-for="(item, index) of footerInformationData"
                        class="footer-list-item m-b-8"
                        :key="index"
                        @click="handleClickFooterItem(item)"
                    >
                        {{ item }}
                    </a>
                </div>
            </div>
            <div class="col-4 p-x-40">
                <div
                    class="footer-account-title font-size-15 font-weight-500 m-b-15"
                >
                    {{ t('footer.title.account') }}
                </div>
                <div class="footer-list-wrapper">
                    <a
                        v-for="(item, index) of footerAccountData"
                        class="footer-list-item m-b-8"
                        :key="index"
                        @click="handleClickFooterItem(item)"
                    >
                        {{ item }}
                    </a>
                </div>
            </div>
            <div class="col-4 p-l-40">
                <div
                    class="footer-notification-title font-size-15 font-weight-500 m-b-15"
                >
                    {{ t('footer.title.newsletter') }}
                </div>
                <div class="footer-notification-input">
                    <base-text-box
                        ref="baseTextBoxRef"
                        :config="newsletterConfig"
                    />
                </div>
                <div class="footer-notification-button">
                    <base-button
                        ref="buttonConfirmRef"
                        :config="buttonConfỉmConfig"
                    />
                </div>
            </div>
        </div>
        <div class="footer-below d-flex-center">
            <div class="footer-below-left">
                {{ t('footer.theRight') }}, {{ t('app.name') }}.
                {{ t('footer.madeBy') }}
                <a
                    href="https://www.facebook.com/nnhiep582"
                    class="footer-author"
                    target="_blank"
                    >nnhiep</a
                >
                &
                <a
                    href="https://www.facebook.com/profile.php?id=100056062366164"
                    class="footer-author"
                    target="_blank"
                    >nqminh1</a
                >.
            </div>
            <div class="footer-below-right">
                <div class="footer-list-wrapper d-flex-center">
                    <a
                        v-for="(item, index) of footerPayment"
                        class="footer-list-item m-b-8"
                        :key="index"
                    >
                        <Icon :icon="item" />
                    </a>
                </div>
            </div>
        </div>
    </footer>
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
import { useI18n } from 'vue3-i18n';
import {
    footerInformationData,
    footerAccountData,
    footerPayment,
} from '@/constants/views';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';
import { BaseButton, BaseTextBox } from '@/components/base';
import type { DxButton, DxTextBox } from 'devextreme-vue';
import { PopupSignin, PopupSignup } from '@/components/component';
import { useUserOptionStore } from '@/stores';

// #region common
const { t, getLocale } = useI18n();
const router = useRouter();
const isLogin = ref<boolean>(useUserOptionStore().userOptions.IsLogin);
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

// #region config
const newsletterConfig = ref<DxTextBox>({
    placeholder: t('footer.placeholder.newsletter'),
});

const buttonConfỉmConfig = ref<DxButton>({
    text: t('footer.subscribe'),
    elementAttr: {
        class: 'base-button m-t-15',
    },
});
// #endregion

// #region handle events
const handleClickFooterItem = (item: string) => {
    switch (item) {
        case t('footer.footerInformation.aboutUs'):
            router.push({ name: 'about' });
            break;
        case t('footer.footerInformation.manufactures'):
            break;
        case t('footer.footerInformation.trackingOrder'):
            if (isLogin.value) {
                router.push({ name: 'orders' });
            } else {
                isOpenPopupSignin.value = true;
            }
            break;
        case t('footer.footerInformation.privacyPolicy'):
            break;
        case t('footer.footerInformation.termsConditions'):
            break;
        case t('footer.footerAccount.login'):
            isOpenPopupSignin.value = true;
            break;
        case t('footer.footerAccount.myCart'):
            router.push({ name: 'cart' });
            break;
        case t('footer.footerAccount.wishlist'):
            if (isLogin.value) {
                router.push({ name: 'wishlist' });
            }
            break;
        case t('footer.footerAccount.compare'):
            router.push({ name: 'shop' });
            break;
        case t('footer.footerAccount.myAccount'):
            if (isLogin.value) {
                router.push({ name: 'account' });
            } else {
                isOpenPopupSignin.value = true;
            }
            break;
    }
};

const baseTextBoxRef = ref();
const buttonConfirmRef = ref();

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            baseTextBoxRef.value
                ?.getInstance()
                ?.option('placeholder', t('footer.placeholder.newsletter'));
            buttonConfirmRef.value
                ?.getInstance()
                ?.option('text', t('footer.subscribe'));
        }
    }
);
// #endregion
</script>

<style lang="scss" scoped>
footer {
    width: 100%;
    color: var(--app-color-white);
    .footer-above {
        width: 100%;
        padding: var(--app-padding-content);
        padding-top: 100px;
        height: var(--app-height-footer-above);
        background-color: var(--app-color-bg-footer);
        .footer-about-description {
            line-height: 24px;
        }
        .footer-about-socials {
            margin-top: 16px;
            a {
                display: block;
                text-decoration: none;
                color: var(--app-color-white);
                padding: 6px;
                border-radius: 50%;
                transition: 0.3s;
                &:hover {
                    background-color: var(--app-color-secondary);
                    transition: 0.3s;
                }
                & + a {
                    margin-left: 4px;
                }
                svg {
                    color: var(--app-color-white);
                    font-size: 20px;
                }
            }
        }
        .footer-list-wrapper {
            display: flex;
            flex-direction: column;
            .footer-list-item {
                transition: 0.4s;
                display: inline-block;
                width: fit-content;
                text-decoration: none;
                color: var(--app-color-white);
                &:hover {
                    color: var(--app-color-primary);
                    transition: 0.4s;
                    cursor: pointer;
                    transform: translateX(10px);
                }
            }
        }
    }
    .footer-below {
        width: 100%;
        padding: var(--app-padding-content);
        height: var(--app-height-footer-below);
        justify-content: space-between;
        background-color: var(--app-color-bg-footer-below);
        .footer-list-item {
            svg {
                font-size: 26px;
                border-radius: 3px;
                color: var(--app-color-white);
            }
            & + .footer-list-item {
                margin-left: 6px;
            }
        }
        .footer-author {
            text-decoration: none;
            color: var(--app-color-white);
            &:hover {
                color: var(--app-color-primary);
            }
        }
    }
}
</style>
