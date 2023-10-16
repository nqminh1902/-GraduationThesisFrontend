import i18n from '@/locales/i18n';
const t = i18n.t;
const getLocale = i18n.getLocale;

export const footerInformationData = ref<string[]>([
    t('footer.footerInformation.aboutUs'),
    t('footer.footerInformation.manufactures'),
    t('footer.footerInformation.trackingOrder'),
    t('footer.footerInformation.privacyPolicy'),
    t('footer.footerInformation.termsConditions'),
]);

export const footerAccountData = ref<string[]>([
    t('footer.footerAccount.login'),
    t('footer.footerAccount.myCart'),
    t('footer.footerAccount.wishlist'),
    t('footer.footerAccount.compare'),
    t('footer.footerAccount.myAccount'),
]);

export const footerPayment = ref<string[]>([
    'fa6-brands:cc-paypal',
    'fa6-brands:cc-visa',
    'fa6-brands:cc-mastercard',
    'arcticons:momo',
    'arcticons:v-vnpay',
]);

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            footerInformationData.value = [
                t('footer.footerInformation.aboutUs'),
                t('footer.footerInformation.manufactures'),
                t('footer.footerInformation.trackingOrder'),
                t('footer.footerInformation.privacyPolicy'),
                t('footer.footerInformation.termsConditions'),
            ];
            footerAccountData.value = [
                t('footer.footerAccount.login'),
                t('footer.footerAccount.myCart'),
                t('footer.footerAccount.wishlist'),
                t('footer.footerAccount.compare'),
                t('footer.footerAccount.myAccount'),
            ];
        }
    }
);
