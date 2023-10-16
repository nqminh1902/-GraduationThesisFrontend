import type { DxSelectBox, DxTextBox } from 'devextreme-vue';

export interface BaseFilterType {
    selectBoxConfig: DxSelectBox;
    isShowSearchBox?: boolean;
    textSelectBox?: string;
    textboxConfig?: DxTextBox;
}
