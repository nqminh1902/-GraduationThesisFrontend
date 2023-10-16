import type { ProductModel } from '@/models';
import type {
    DxButton,
    DxSelectBox,
    DxTextArea,
    DxTextBox,
} from 'devextreme-vue';
import i18n from '@/locales/i18n';
const t = i18n.t;
const buttonCommentConfig: DxButton = {
    width: '100%',
    text: t('base.button.send'),
};

const colorSelectBoxConfig: DxSelectBox = {
    dataSource: ['red', 'orange', 'black'],
    width: '100%',
};

const sizeSelectBoxConfig: DxSelectBox = {
    dataSource: ['apple', 'panana', 'orange'],
    width: '100%',
};

const textAreaConfig: DxTextArea = {
    height: 96,
    maxHeight: 96,
    placeholder: t('base.textArea.message'),
};

const textBoxConfig: DxTextBox = {
    placeholder: t('base.general.typeValue'),
};

export {
    textBoxConfig,
    textAreaConfig,
    sizeSelectBoxConfig,
    buttonCommentConfig,
    colorSelectBoxConfig,
    product,
};
