import type DxDateBox from 'devextreme-vue/date-box';
import i18n from '@/locales/i18n';

const t = i18n.t;

export const defaultBaseDateBoxConfig: DxDateBox = {
    readOnly: false,
    disabled: false,
    type: 'date',
    pickerType: 'calendar',
    showAnalogClock: true,
    showClearButton: false,
    adaptivityEnabled: true,
    applyButtonText: t('base.button.ok'),
    cancelButtonText: t('base.button.cancel'),
    focusStateEnabled: true,
    hoverStateEnabled: true,
    elementAttr: {
        class: 'base-date-box',
    },
};
