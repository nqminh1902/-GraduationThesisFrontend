import type { DxButton } from 'devextreme-vue';

export interface BaseGalleryType {
    buttonConfig?: DxButton;
    width?: string;
    height?: string;
    dataSource: BaseGalleryTypeConfig[];
}

export interface BaseGalleryTypeConfig {
    id: number;
    src: string;
    alt?: string;
    state: string;
    title: string;
    description: string;
}
