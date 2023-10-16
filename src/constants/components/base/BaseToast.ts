import { PositionPopup, ToastType } from '@/enums';
import type DxToast from 'devextreme-vue/toast';

export const defaultBaseToastConfig: DxToast = {
    type: ToastType.info,
    visible: false,
    width: 300,
    height: 52,
    displayTime: 5000,
    closeOnClick: true,
    focusStateEnabled: false,
    hoverStateEnabled: true,
    hideOnOutsideClick: false,
    hideOnParentScroll: false,
    message: 'This is base toast message',
    position: {
        at: PositionPopup.rightBottom,
        offset: '-160 -40',
    },
    wrapperAttr: {
        class: 'base-toast',
    },
    animation: {
        show: {
            type: 'fade',
            duration: 400,
            from: {
                opacity: 0,
            },
            to: {
                opacity: 1,
            },
        },
        hide: {
            type: 'fade',
            duration: 400,
            from: {
                opacity: 1,
            },
            to: {
                opacity: 0,
            },
        },
    },
};
