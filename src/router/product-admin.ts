import i18n from '@/locales/i18n';

const t = i18n.t;

const productAdminRouter = [
    {
        path: '/admin/product-admin',
        name: 'product-admin',
        meta: {
            Title: t('app.title.product'),
        },
        redirect: { name: "list-product-admin" }, 
        children:[
            {
                path: '',
                name: 'list-product-admin',
                meta: {
                    Title: t('app.title.product'),
                },
                component: () => import('../views/admin/product/ListProductAdmin.vue'),
            },
            {
                path: '/admin/product-admin/:id',
                name: 'add-product-admin',
                meta: {
                    Title: t('app.title.product'),
                },
                component: () => import('../views/admin/product/AddProductAdmin.vue'),
            },
        ],
        component: () => import('../views/admin/product/ProductAdmin.vue'),
    },
    
    
];

export default productAdminRouter;