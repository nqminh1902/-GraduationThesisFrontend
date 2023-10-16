import i18n from '@/locales/i18n';
import type { AccountItem } from '@/types';
const t = i18n.t;
const getLocale = i18n.getLocale;

export const dataAccountWithoutLogin = ref<AccountItem[]>([
    {
        text: t('theAccount.signIn'),
        icon: 'material-symbols:login',
    },
    {
        text: t('theAccount.signUp'),
        icon: 'mdi:register',
    },
    {
        text: t('theAccount.recent'),
        icon: 'mdi:recent',
    },
]);

export const dataAccountWithLogin = ref<AccountItem[]>([
    {
        text: t('theAccount.dashboard'),
        icon: 'material-symbols:space-dashboard',
    },
    {
        text: t('theAccount.account'),
        icon: 'material-symbols:account-circle',
    },
    {
        text: t('theAccount.orders'),
        icon: 'fluent-mdl2:reservation-orders',
    },
    {
        text: t('theAccount.recent'),
        icon: 'mdi:recent',
    },
    {
        text: t('theAccount.wishlist'),
        icon: 'mdi:book-love-outline',
    },
    {
        text: t('theAccount.logOut'),
        icon: 'material-symbols:logout',
    },
]);

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            dataAccountWithoutLogin.value = [
                {
                    text: t('theAccount.signIn'),
                    icon: 'material-symbols:login',
                },
                {
                    text: t('theAccount.signUp'),
                    icon: 'mdi:register',
                },
                {
                    text: t('theAccount.recent'),
                    icon: 'mdi:recent',
                },
            ];
            dataAccountWithLogin.value = [
                {
                    text: t('theAccount.dashboard'),
                    icon: 'material-symbols:space-dashboard',
                },
                {
                    text: t('theAccount.account'),
                    icon: 'material-symbols:account-circle',
                },
                {
                    text: t('theAccount.orders'),
                    icon: 'fluent-mdl2:reservation-orders',
                },
                {
                    text: t('theAccount.recent'),
                    icon: 'mdi:recent',
                },
                {
                    text: t('theAccount.wishlist'),
                    icon: 'mdi:book-love-outline',
                },
                {
                    text: t('theAccount.logOut'),
                    icon: 'material-symbols:logout',
                },
            ];
        }
    }
);
