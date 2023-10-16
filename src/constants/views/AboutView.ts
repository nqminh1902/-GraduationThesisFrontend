import type { BaseBreadcrumbType } from '@/types';
import i18n from '@/locales/i18n';
const t = i18n.t;
const getLocale = i18n.getLocale;

export const breadcrumbAboutConfig = ref<BaseBreadcrumbType>({
    currentPage: t('page.about.title'),
});

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            breadcrumbAboutConfig.value.currentPage = t('page.about.title');
        }
    }
);
