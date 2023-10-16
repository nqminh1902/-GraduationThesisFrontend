import type { BaseBreadcrumbType } from '@/types';
import i18n from '@/locales/i18n';
import type {
    DxButton,
    DxNumberBox,
    DxSelectBox,
    DxTextBox,
} from 'devextreme-vue';

const t = i18n.t;

export const breadcrumbCheckoutConfig = ref<BaseBreadcrumbType>({
    currentPage: 'Checkout',
    prevPages: [
        {
            text: t('app.title.checkout'),
            link: '/cart',
        },
    ],
});

export const buttonCheckoutConfig: DxButton = {
    text: 'Place Order',
    width: '100%',
};

export const userNameConfig: DxTextBox = {
    placeholder: 'Họ và tên',
};

export const emailCheckoutConfig: DxTextBox = {
    placeholder: 'Email',
};

export const phoneNumberConfig: DxNumberBox = {
    placeholder: 'Số điện thoại',
    showSpinButtons: false,
    format: '#',
};

export const addressCheckoutConfig: DxTextBox = {
    placeholder: 'Địa chỉ nhà',
};

export const cityCheckoutConfig: DxSelectBox = {
    width: '100%',
    placeholder: 'Tỉnh/Thành phố',
    valueExpr: 'Id',
    displayExpr: 'Name',
    noDataText: 'Không có dữ liệu',
};

export const districtCheckoutConfig: DxSelectBox = {
    width: '100%',
    placeholder: 'Quận/Huyện',
    noDataText: 'Vui lòng chọn Tỉnh/Thành phố',
    valueExpr: 'Id',
    displayExpr: 'Name',
};

export const wardCheckoutConfig: DxSelectBox = {
    width: '100%',
    placeholder: 'Phường/Xã',
    noDataText: 'Vui lòng chọn Quận/Huyện',
    valueExpr: 'Id',
    displayExpr: 'Name',
};
