import i18n from '@/locales/i18n';

const t = i18n.t;

const orderAdminRouter = [
    {
        path: '/admin/order-admin',
        name: 'order-admin',
        meta: {
            Title: t('app.title.orders'),
        },
        component: () => import('../views/admin/orders/OrdersAdmin.vue'),
    },
];

export default orderAdminRouter;