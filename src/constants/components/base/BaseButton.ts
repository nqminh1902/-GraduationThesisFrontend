import { ButtonStylingMode, ButtonType } from '@/enums';
import { DxButton } from 'devextreme-vue/button';

export const defaultBaseButtonConfig: DxButton = {
    width: 'auto',
    height: 40,
    type: ButtonType.default,
    stylingMode: ButtonStylingMode.contained,
    elementAttr: {
        class: 'base-button',
    },
};
