import { PositionPopup } from '@/enums';
import type DxPopup from 'devextreme-vue/popup';

export const defaultBasePopupConfig: DxPopup = {
    width: 300,
    height: 'auto',
    titleTemplate: 'headerTemplete',
    dragEnabled: true,
    hideOnOutsideClick: true,
    showCloseButton: true,
    showTitle: false,
    contentTemplate: 'contentTemplete',
    position: PositionPopup.center,
    wrapperAttr: {
        class: 'base-popup',
    },
};
