import { LanguageEnum } from '@/enums';
import i18n from '@/locales/i18n';
const t = i18n.t;
const getLocale = i18n.getLocale;

export function formatCurrency(price: number) {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    });
    return formatter.format(price);
}

export function formatTextNumber(price: string) {
    const transferToText = price
        .substring(0, price.length - 2)
        .replace(/\./g, '');
    if (transferToText === '0') {
        if (getLocale() == LanguageEnum.en) return `0 ${t('app.unit.usd')}`;
        if (getLocale() == LanguageEnum.vi) return `0 ${t('app.unit.vnd')}`;
    }
    const len = transferToText.length;
    let result;
    if (len > 6 && len <= 9) {
        result = `${transferToText.substring(0, len - 6)} ${t(
            'app.unit.million'
        )}`;
    } else if (len > 9) {
        result = `${transferToText.substring(0, len - 9)} ${t(
            'app.unit.billion'
        )}`;
    }
    return result;
}
