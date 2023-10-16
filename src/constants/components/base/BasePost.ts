import i18n from '@/locales/i18n';
import type { PostModel } from '@/models';

const t = i18n.t;

export const defaultBasePostConfig: PostModel = {
    PostID: 0,
    PostCode: '0',
    PostTitle: '',
    PostImage: '',
    Description: '',
    Author: t('app.unknown'),
    Date: t('app.unknown'),
    ButtonContent: t('base.button.readMore'),
    TagID: [0],
    TagName: [''],
};
