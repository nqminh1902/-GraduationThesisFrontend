import type DxNumberBox from 'devextreme-vue/number-box';

export const defaultBaseNumberBoxConfig: DxNumberBox = {
    height: 32,
    width: '100%',
    showSpinButtons: true,
    min: 0,
    format: '#,##0',
    elementAttr: {
        class: 'base-number-box',
    },
};
