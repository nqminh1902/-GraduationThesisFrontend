import type DxSelectBox from 'devextreme-vue/select-box';
import i18n from '@/locales/i18n';

const t = i18n.t;

export const defaultBaseSelectBoxConfig: DxSelectBox = {
    width: 220,
    height: 32,
    disabled: false,
    readOnly: false,
    searchEnabled: true,
    showClearButton: false,
    focusStateEnabled: true,
    hoverStateEnabled: true,
    searchMode: 'contains',
    placeholder: t('base.general.selectValue'),
    elementAttr: {
        class: 'base-select-box',
    },
};
