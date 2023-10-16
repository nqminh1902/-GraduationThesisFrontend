import type DxMap from 'devextreme-vue/map';

export const defaultMapConfig: DxMap = {
    zoom: 10,
    width: '100%',
    height: 400,
    controls: true,
    hoverStateEnabled: true,
    activeStateEnabled: true,
    center: '21.0228, 105.7957',
    elementAttr: {
        class: 'base-map',
    },
};
