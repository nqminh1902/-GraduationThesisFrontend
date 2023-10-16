import { createI18n } from 'vue3-i18n';
import { en, vi } from '.';
import type { UserType } from '@/types';
import { LanguageEnum } from '@/enums';

const currentLanguage =
    (JSON.parse(localStorage.getItem('userOptions')!) as UserType)
        ?.LanguageOption ?? LanguageEnum.en;

const messages = {
    en: en,
    vi: vi,
};

const i18n = createI18n({
    locale: currentLanguage,
    messages,
});

export default i18n;
