import i18n from '@/locales/i18n';
const t = i18n.t;

export function getUrls(url: string): string {
    return `/${t('app.name')}/${url}`;
}
