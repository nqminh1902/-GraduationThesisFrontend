import i18n from '@/locales/i18n';

const t = i18n.t;

const adminRouter = [
    {
        path: '/admin',
        name: 'admin',
        meta: {
            Title: t('app.title.admin'),
        },
        component: () => import('../views/admin/AdminView.vue'),
    },
];

export default adminRouter;
