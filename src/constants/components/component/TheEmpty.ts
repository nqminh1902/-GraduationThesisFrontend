import type { TheEmptyType } from '@/types';
import i18n from '@/locales/i18n';
import { getUrls } from '@/utils';
const t = i18n.t;
const getLocale = i18n.getLocale;

export const defaultTheEmptyConfig = ref<TheEmptyType>({
    img: getUrls('/src/assets/images/common/empty.jpg'),
    text: t('app.noData'),
});

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            defaultTheEmptyConfig.value.text = t('app.noData');
        }
    }
);
