import type { BaseBreadcrumbType } from '@/types';
import i18n from '@/locales/i18n';
const t = i18n.t;
const getLocale = i18n.getLocale;

export const breadcrumbOrdersConfig = ref<BaseBreadcrumbType>({
    currentPage: t('page.orders.title'),
});

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            breadcrumbOrdersConfig.value.currentPage = t('page.orders.title');
        }
    }
);
