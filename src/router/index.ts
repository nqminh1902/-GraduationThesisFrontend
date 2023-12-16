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
                Title: 'Tin tuyển dụng',
            },
            component: () => import('../views/recruitment-news/RecruitmentNews.vue'),
        },
        {
            path: '/detail/:id',
            name: 'recruitment-news-detail',
            meta: {
                Title: 'Chi tiết tin',
            },
            component: () => import('../views/recruitment-news/recruitment-news-detail/RecruitmentNewsDetail.vue'),
        },
        {
            path: '/candidate',
            name: 'candidate',
            meta: {
                Title: 'Ứng viên',
            },
            component: () => import('../views/candidate/Candidate.vue'),
        },
        {
            path: '/schedule',
            name: 'schedule',
            meta: {
                Title: "Lịch tuyển dụng",
            },
            component: () => import('../views/schedule/RecruitmentSchedule.vue'),
        },
        {
            path: '/recruitment-news/:id',
            name: 'setting-recruitment',
            meta: {
                Title: 'Tin tuyển dụng',
            },
            redirect: { name: 'setting-recruitment-infor' },
            children: [
                {
                    path: '/recruitment-news/:id/infor',
                    name: 'setting-recruitment-infor',
                    meta: {
                        Title: 'Tin tuyển dụng',
                    },
                    component: () => import('../views/recruitment-news/setting-recruitment/SettingRecruitmentInfor.vue'),
                },
                {
                    path: '/recruitment-news/:id/plan',
                    name: 'setting-recruitment-plan',
                    meta: {
                        Title: 'Tin tuyển dụng',
                    },
                    component: () => import('../views/recruitment-news/setting-recruitment/SettingRecruitmentPlan.vue'),
                },
                {
                    path: '/recruitment-news/:id/process',
                    name: 'setting-recruitment-process',
                    meta: {
                        Title: 'Tin tuyển dụng',
                    },
                    component: () => import('../views/recruitment-news/setting-recruitment/SettingRecruitmentProcess.vue'),
                },
                {
                    path: '/recruitment-news/:id/council',
                    name: 'setting-recruitment-council',
                    meta: {
                        Title: 'Tin tuyển dụng',
                    },
                    component: () => import('../views/recruitment-news/setting-recruitment/SettingRecruitmentCouncil.vue'),
                },
            ],
            component: () => import('../views/recruitment-news/setting-recruitment/SettingRecruitment.vue'),
        },
        {
            path: '/setting',
            name: 'setting',
            meta: {
                Title: 'Thiết lập',
            },
            redirect: { name: 'setting-position' },
            children: [
                {
                    path: '/setting/job-position',
                    name: 'setting-position',
                    meta: {
                        Title: 'Thiết lập',
                    },
                    component: () => import('../views/setting/tabs/JobPosition.vue'),
                },
                {
                    path: '/setting/university',
                    name: 'setting-university',
                    meta: {
                        Title: 'Thiết lập',
                    },
                    component: () => import('../views/setting/tabs/University.vue'),
                },
                {
                    path: 'setting/education-major',
                    name: 'setting-education-major',
                    meta: {
                        Title: 'Thiết lập',
                    },
                    component: () => import('../views/setting/tabs/EducationMajor.vue'),
                },
                {
                    path: 'setting/reason-eliminate',
                    name: 'setting-reason-eliminate',
                    meta: {
                        Title: 'Thiết lập',
                    },
                    component: () => import('../views/setting/tabs/ReasonEliminate.vue'),
                },
                {
                    path: 'setting/work-location',
                    name: 'setting-work-location',
                    meta: {
                        Title: 'Thiết lập',
                    },
                    component: () => import('../views/setting/tabs/WorkLocation.vue'),
                },
            ],
            component: () => import('../views/setting/RecruitmentSetting.vue')
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
