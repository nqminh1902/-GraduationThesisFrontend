import { PositionTooltip } from '@/enums';
import type { DxTooltip } from 'devextreme-vue/tooltip';

export const defaultBaseToolTipConfig: DxTooltip = {
    hideOnOutsideClick: false,
    showEvent: 'mouseenter',
    hideEvent: 'mouseleave',
    position: PositionTooltip.bottom,
    wrapperAttr: {
        class: 'base-tooltip',
    },
    animation: {
        show: {
            type: 'slide',
            duration: 400,
            from: {
                top: 100,
                opacity: 0,
            },
            to: {
                top: 0,
                opacity: 1,
            },
        },
        hide: {
            type: 'pop',
            duration: 400,
            from: {
                scale: 1,
                opacity: 1,
            },
            to: {
                scale: 0.1,
                opacity: 0,
            },
        },
    },
};
