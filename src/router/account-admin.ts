import i18n from '@/locales/i18n';

const t = i18n.t;

const accountAdminRouter = [
    {
        path: '/admin/account-admin',
        name: 'account-admin',
        meta: {
            Title: t('app.title.account'),
        },
        component: () => import('../views/admin/account/AccountAdmin.vue'),
    },
];

export default accountAdminRouter;