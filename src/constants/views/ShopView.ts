import type { BaseBreadcrumbType } from '@/types';
import i18n from '@/locales/i18n';
const t = i18n.t;
const getLocale = i18n.getLocale;

export const breadcrumbShopConfig = ref<BaseBreadcrumbType>({
    currentPage: t('page.shop.title'),
});

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            breadcrumbShopConfig.value.currentPage = t('page.shop.title');
        }
    }
);
