import type { DxButton, DxCheckBox, DxPopup, DxTextBox } from 'devextreme-vue';
import i18n from '@/locales/i18n';
const t = i18n.t;

export const popupSignupConfig: DxPopup = {
    width: 780,
    minHeight: 420,
    wrapperAttr: {
        class: 'popup-signup base-popup',
    },
};

export const accountSignupConfig: DxTextBox = {
    label: t('popupSignup.account'),
    labelMode: 'floating',
    elementAttr: {
        class: 'account-text-box',
    },
};

export const firstNameSignupConfig: DxTextBox = {
    label: t('popupSignup.firstName'),
    labelMode: 'floating',
    elementAttr: {
        class: 'firstName',
    },
};

export const lastNameSignupConfig: DxTextBox = {
    label: t('popupSignup.lastName'),
    labelMode: 'floating',
    elementAttr: {
        class: 'lastName',
    },
};

export const passwordSignupConfig: DxTextBox = {
    label: t('popupSignup.password'),
    labelMode: 'floating',
    elementAttr: {
        class: 'password-text-box',
    },
};

export const confirmPasswordConfig: DxTextBox = {
    label: t('popupSignup.confirmPassword'),
    labelMode: 'floating',
    elementAttr: {
        class: 'confirmPassword',
    },
};

export const checkboxSignupConfig: DxCheckBox = {
    text: t('popupSignup.accept'),
    elementAttr: {
        class: 'base-check-box check-box-accept',
    },
};

export const btnRegisterConfig: DxButton = {
    text: t('popupSignup.register'),
    width: '100%',
};
