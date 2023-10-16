import type { DxButton, DxCheckBox, DxPopup, DxTextBox } from 'devextreme-vue';
import i18n from '@/locales/i18n';
const t = i18n.t;

export const popupConfig: DxPopup = {
    width: 780,
    minHeight: 420,
    wrapperAttr: {
        class: 'popup-signin base-popup',
    },
};

export const accountConfig: DxTextBox = {
    label: t('popupSignin.account'),
    labelMode: 'floating',
    elementAttr: {
        class: 'account-text-box',
    },
};

export const passwordConfig: DxTextBox = {
    label: t('popupSignin.password'),
    labelMode: 'floating',
    elementAttr: {
        class: 'password-text-box',
    },
};

export const rememberConfig: DxCheckBox = {
    text: t('popupSignin.rememberMe'),
    elementAttr: {
        class: 'base-check-box check-box-remember',
    },
};

export const btnLoginConfig: DxButton = {
    text: t('popupSignin.login'),
    width: '100%',
};
