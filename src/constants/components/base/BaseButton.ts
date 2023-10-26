import { ButtonStylingMode, ButtonType } from '@/enums';
import { DxButton } from 'devextreme-vue/button';

export const defaultBaseButtonConfig: DxButton = {
    width: 'auto',
    height: 32,
    type: ButtonType.default,
    stylingMode: ButtonStylingMode.contained,
    elementAttr: {
        class: 'base-button',
    },
};
