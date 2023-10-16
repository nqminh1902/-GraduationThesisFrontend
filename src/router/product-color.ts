import i18n from '@/locales/i18n';

const t = i18n.t;

const productColorRouter = [
    {
        path: '/admin/product-color',
        name: 'product-color',
        meta: {
            Title: t('app.title.productColor'),
        },
        component: () => import('../views/admin/product-color/ProductColor.vue'),
    },
];

export default productColorRouter;