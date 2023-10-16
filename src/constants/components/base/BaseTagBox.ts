
import i18n from '@/locales/i18n';
import DxTagBox from 'devextreme-vue/tag-box';

const t = i18n.t;

export const defaultBaseTagBoxConfig: DxTagBox = {
    width: 220,
    height: 40,
    disabled: false,
    readOnly: false,
    searchEnabled: true,
    focusStateEnabled: true,
    hoverStateEnabled: true,
    searchMode: "contains",
    placeholder: t('base.general.selectValue'),
    dropDownButtonTemplate: 'iconTemplate',
    elementAttr: {
        class: 'base-tag-box',
    },
};