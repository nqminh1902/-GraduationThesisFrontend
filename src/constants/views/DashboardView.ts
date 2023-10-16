import type { BaseBreadcrumbType } from '@/types';
import i18n from '@/locales/i18n';
const t = i18n.t;
const getLocale = i18n.getLocale;

export const breadcrumbDashboardConfig = ref<BaseBreadcrumbType>({
    currentPage: t('page.dashboard.title'),
});

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            breadcrumbDashboardConfig.value.currentPage = t(
                'page.dashboard.title'
            );
        }
    }
);
