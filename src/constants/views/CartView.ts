import type { BaseBreadcrumbType } from '@/types';
import type { DxButton, DxNumberBox, DxTextBox } from 'devextreme-vue';
import i18n from '@/locales/i18n';

const t = i18n.t;
const getLocale = i18n.getLocale;

export const breadcrumbCartConfig = ref<BaseBreadcrumbType>({
    currentPage: t('app.title.cart'),
});

export const numberBoxCartConfig: DxNumberBox = {
    min: 1,
    width: 80,
};

export const textboxConfig: DxTextBox = {
    height: 48,
    width: '100%',
};

export const couponBtnConfig: DxButton = {
    text: t('page.cart.coupon'),
    height: 48,
};

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            breadcrumbCartConfig.value.currentPage = t('app.title.cart');
        }
    }
);
