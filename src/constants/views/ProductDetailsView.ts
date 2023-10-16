import type { BaseBreadcrumbType } from '@/types';
import i18n from '@/locales/i18n';
const t = i18n.t;

export const breadcrumbDetailsConfig = ref<BaseBreadcrumbType>({
    currentPage: 'GIƯỜNG MÀU ĐỎ',
    prevPages: [
        {
            text: t('base.filter.products'),
            link: '/',
        },
    ],
});
