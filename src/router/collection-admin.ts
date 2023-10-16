import i18n from '@/locales/i18n';

const t = i18n.t;

const collectionAdminRouter = [
    {
        path: '/admin/collection-admin',
        name: 'collection-admin',
        meta: {
            Title: t('app.title.collection'),
        },
        component: () => import('../views/admin/collection/CollectionAdmin.vue'),
    },
];

export default collectionAdminRouter;