import type { BaseBreadcrumbType } from '@/types';
import i18n from '@/locales/i18n';
const t = i18n.t;
const getLocale = i18n.getLocale;

export const breadcrumbContactConfig = ref<BaseBreadcrumbType>({
    currentPage: t('page.contact.title'),
});

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            breadcrumbContactConfig.value.currentPage = t('page.contact.title');
        }
    }
);
