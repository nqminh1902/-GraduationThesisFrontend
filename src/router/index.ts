import { createRouter, createWebHistory } from 'vue-router';
import dashboardRouter from './dashboard';
import accountAdminRouter from './account-admin';
import productAdminRouter from './product-admin';
import customerAdminRouter from './customer-admin';
import collectionAdminRouter from './collection-admin';
import orderAdminRouter from './order-admin';
import categoryAdminRouter from './category-admin';
import postAdminRouter from './post-admin';
import i18n from '@/locales/i18n';
import productColorRouter from './product-color'

const t = i18n.t;

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'recruitment-news',
            meta: {
                Title: t('app.title.admin'),
            },
            component: () => import('../views/recruitment-news/RecruitmentNews.vue'),
        },
        {
            path: '/candidate',
            name: 'candidate',
            meta: {
                Title: t('app.title.admin'),
            },
            component: () => import('../views/candidate/Candidate.vue'),
        },
        {
            path: '/recruitment-news/:id',
            name: 'setting-recruitment',
            meta: {
                Title: t('app.title.admin'),
            },
            redirect: { name: 'setting-recruitment-infor' },
            children: [
                {
                    path: '/recruitment-news/:id/infor',
                    name: 'setting-recruitment-infor',
                    meta: {
                        Title: t('app.title.admin'),
                    },
                    component: () => import('../views/recruitment-news/setting-recruitment/SettingRecruitmentInfor.vue'),
                },
                {
                    path: '/recruitment-news/:id/plan',
                    name: 'setting-recruitment-plan',
                    meta: {
                        Title: t('app.title.admin'),
                    },
                    component: () => import('../views/recruitment-news/setting-recruitment/SettingRecruitmentPlan.vue'),
                },
                {
                    path: '/recruitment-news/:id/process',
                    name: 'setting-recruitment-process',
                    meta: {
                        Title: t('app.title.admin'),
                    },
                    component: () => import('../views/recruitment-news/setting-recruitment/SettingRecruitmentProcess.vue'),
                },
                {
                    path: '/recruitment-news/:id/council',
                    name: 'setting-recruitment-council',
                    meta: {
                        Title: t('app.title.admin'),
                    },
                    component: () => import('../views/recruitment-news/setting-recruitment/SettingRecruitmentCouncil.vue'),
                },
            ],
            component: () => import('../views/recruitment-news/setting-recruitment/SettingRecruitment.vue'),
        },
        {
            path: '/admin',
            meta: {
                Title: t('app.title.admin'),
            },
            redirect: { name: "dashboard" },
            children: [
                ...dashboardRouter,
                ...postAdminRouter,
                ...categoryAdminRouter,
                ...orderAdminRouter,
                ...collectionAdminRouter,
                ...productAdminRouter,
                ...customerAdminRouter,
                ...accountAdminRouter,
                ...productColorRouter
            ],
            component: () => import('../views/admin/AdminView.vue'),
        },
        {
            path: '/:catchAll(.*)',
            component: () => import('../views/errorPages/404Page.vue'),
        },
    ],
});

router.afterEach((e) => {
    document.title = e.meta.Title
        ? `${e.meta.Title} | ${t('app.name')} - ${t('app.slogan')}`
        : `${t('app.title.notFound')} | ${t('app.name')} - ${t('app.slogan')}`;
});

export default router;
