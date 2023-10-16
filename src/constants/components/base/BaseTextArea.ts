import type DxTextArea from 'devextreme-vue/text-area';
import i18n from '@/locales/i18n';

const t = i18n.t;

export const defaultBaseTextAreaConfig: DxTextArea = {
    disabled: false,
    readOnly: false,
    width: '100%',
    maxHeight: 90,
    autoResizeEnabled: true,
    hoverStateEnabled: true,
    focusStateEnabled: true,
    elementAttr: {
        class: 'base-text-area',
    },
};
