import { layoutType } from '@/enums';
import i18n from '@/locales/i18n';
import type { DxRadioGroup } from 'devextreme-vue';

const t = i18n.t;

export const defaultBaseRadioGroupConfig: DxRadioGroup = {
    disabled: false,
    layout: layoutType.horizontal,
    elementAttr: {
        class: 'base-radio-group',
    },
};
