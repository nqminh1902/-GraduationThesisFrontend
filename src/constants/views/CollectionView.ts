import type { BaseBreadcrumbType } from '@/types';
import i18n from '@/locales/i18n';
const t = i18n.t;
const getLocale = i18n.getLocale;

export const breadcrumbConfig = ref<BaseBreadcrumbType>({
    currentPage: 'BEDROOM',
    prevPages: [
        {
            text: t('app.title.collection'),
            link: '/',
        },
    ],
});

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            breadcrumbConfig.value.prevPages = [
                {
                    text: t('app.title.collection'),
                    link: '/',
                },
            ];
        }
    }
);
