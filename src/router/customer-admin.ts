import i18n from '@/locales/i18n';

const t = i18n.t;

const customerAdminRouter = [
    {
        path: '/admin/customer-admin',
        name: 'customer-admin',
        meta: {
            Title: t('app.title.customer'),
        },
        component: () => import('../views/admin/customer/CustomerAdmin.vue'),
    },
];

export default customerAdminRouter;