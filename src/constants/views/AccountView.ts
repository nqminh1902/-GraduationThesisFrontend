import type { BaseBreadcrumbType } from '@/types';
import i18n from '@/locales/i18n';
const t = i18n.t;
const getLocale = i18n.getLocale;

export const breadcrumbAccountConfig = ref<BaseBreadcrumbType>({
    currentPage: t('page.account.title'),
});

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            breadcrumbAccountConfig.value.currentPage = t('page.account.title');
        }
    }
);
