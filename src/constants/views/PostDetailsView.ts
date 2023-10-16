import type { BaseBreadcrumbType } from '@/types';
import i18n from '@/locales/i18n';
const t = i18n.t;
const getLocale = i18n.getLocale;

export const breadcrumbPostConfig = ref<BaseBreadcrumbType>({
    currentPage: t('page.post.title'),
});

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            breadcrumbPostConfig.value.currentPage = t('page.post.title');
        }
    }
);
