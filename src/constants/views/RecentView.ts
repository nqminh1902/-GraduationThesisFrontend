import type { BaseBreadcrumbType } from '@/types';
import i18n from '@/locales/i18n';
const t = i18n.t;
const getLocale = i18n.getLocale;

export const breadcrumbRecentConfig = ref<BaseBreadcrumbType>({
    currentPage: t('page.recent.title'),
});

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            breadcrumbRecentConfig.value.currentPage = t('page.recent.title');
        }
    }
);
