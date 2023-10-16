import i18n from '@/locales/i18n';

const t = i18n.t;

const dashboardRouter = [
    {
        path: '/admin/dashboard',
        name: 'dashboard',
        meta: {
            Title: t('app.title.dashboard'),
        },
        component: () => import('../views/admin/dashboard/DashBoardView.vue')
    },
];

export default dashboardRouter;
