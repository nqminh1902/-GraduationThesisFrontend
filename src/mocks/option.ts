import type { BaseOptionType } from '@/types';
import i18n from '@/locales/i18n';
const t = i18n.t;

export const dataOptions: BaseOptionType[] = [
    {
        text: t('product.shirt'),
        icon: 'fa6-solid:shirt',
    },
    {
        text: t('product.glasses'),
        icon: 'fa6-solid:glasses',
    },
    {
        text: t('product.socks'),
        icon: 'fa6-solid:socks',
    },
    {
        text: t('product.skirt'),
        icon: 'solar:skirt-bold',
    },
    {
        text: t('product.jacket'),
        icon: 'tabler:jacket',
    },
    {
        text: t('product.hat'),
        icon: 'mingcute:hat-2-fill',
    },
];
