import i18n from '@/locales/i18n';

const t = i18n.t;

const homeRouter = [
    {
        path: '/home',
        name: 'home',
        meta: {
            Title: t('app.title.home'),
        },
        component: () => import('../views/home/HomeView.vue'),
    },
];

export default homeRouter;
