import i18n from '@/locales/i18n';

const t = i18n.t;

const categoryAdminRouter = [
    {
        path: '/admin/category-admin',
        name: 'category-admin',
        meta: {
            Title: t('app.title.category'),
        },
        component: () => import('../views/admin/category/CategoryAdmin.vue'),
    },
];

export default categoryAdminRouter;