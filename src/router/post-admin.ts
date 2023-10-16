import i18n from '@/locales/i18n';

const t = i18n.t;

const postAdminRouter = [
    {
        path: '/admin/post-admin',
        name: 'post-admin',
        meta: {
            Title: t('app.title.post'),
        },
        component: () => import('../views/admin/posts/PostAdmin.vue'),
    },
];

export default postAdminRouter;