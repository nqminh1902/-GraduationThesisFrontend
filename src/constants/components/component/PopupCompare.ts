import type { DxPopup } from 'devextreme-vue';
import i18n from '@/locales/i18n';
const t = i18n.t;

export const popupCompareConfig: DxPopup = {
    width: 'auto',
    minHeight: 420,
    wrapperAttr: {
        class: 'popup-compare base-popup',
    },
};
