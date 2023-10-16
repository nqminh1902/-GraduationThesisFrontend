import i18n from '@/locales/i18n';
const t = i18n.t;
const getLocale = i18n.getLocale;

export const displayBy = ref<string[]>([
    t('page.homeView.displayBy.newArrival'),
    t('page.homeView.displayBy.featured'),
    t('page.homeView.displayBy.onSale'),
    t('page.homeView.displayBy.trending'),
]);

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            displayBy.value = [
                t('page.homeView.displayBy.newArrival'),
                t('page.homeView.displayBy.featured'),
                t('page.homeView.displayBy.onSale'),
                t('page.homeView.displayBy.trending'),
            ];
        }
    }
);
