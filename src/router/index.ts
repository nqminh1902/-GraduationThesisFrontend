import { createRouter, createWebHistory } from 'vue-router';
import i18n from '@/locales/i18n';
import { checkUserAuthentication, checkUserPermission } from '@/utils';
const t = i18n.t;

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: { name: 'recruitment-news' },
            meta: {
                Title: "",
            },
            children: [{
                path: '/job',
                name: 'recruitment-news',
                meta: {
                    Title: 'Tin tuyển dụng',
                    SubsystemCode: "Recruitment"
                },
                component: () => import('../views/recruitment-news/RecruitmentNews.vue'),
            },
            {
                path: '/detail/:id',
                name: 'recruitment-news-detail',
                meta: {
                    Title: 'Chi tiết tin',
                    SubsystemCode: "Recruitment"
                },
                component: () => import('../views/recruitment-news/recruitment-news-detail/RecruitmentNewsDetail.vue'),
            },
            {
                path: '/candidate',
                name: 'candidate',
                meta: {
                    Title: 'Ứng viên',
                    SubsystemCode: "Candidate"
                },
                component: () => import('../views/candidate/Candidate.vue'),
            },
            {
                path: '/schedule',
                name: 'schedule',
                meta: {
                    Title: "Lịch tuyển dụng",
                    SubsystemCode: "CandidateSchedule"
                },
                component: () => import('../views/schedule/RecruitmentSchedule.vue'),
            },
            {
                path: '/recruitment-news/:id',
                name: 'setting-recruitment',
                meta: {
                    Title: 'Tin tuyển dụng',
                    SubsystemCode: "Recruitment"
                },
                redirect: { name: 'setting-recruitment-infor' },
                children: [
                    {
                        path: '/recruitment-news/:id/infor',
                        name: 'setting-recruitment-infor',
                        meta: {
                            Title: 'Tin tuyển dụng',
                            SubsystemCode: "Recruitment"
                        },
                        component: () => import('../views/recruitment-news/setting-recruitment/SettingRecruitmentInfor.vue'),
                    },
                    {
                        path: '/recruitment-news/:id/plan',
                        name: 'setting-recruitment-plan',
                        meta: {
                            Title: 'Tin tuyển dụng',
                            SubsystemCode: "Recruitment"
                        },
                        component: () => import('../views/recruitment-news/setting-recruitment/SettingRecruitmentPlan.vue'),
                    },
                    {
                        path: '/recruitment-news/:id/process',
                        name: 'setting-recruitment-process',
                        meta: {
                            Title: 'Tin tuyển dụng',
                            SubsystemCode: "Recruitment"
                        },
                        component: () => import('../views/recruitment-news/setting-recruitment/SettingRecruitmentProcess.vue'),
                    },
                    {
                        path: '/recruitment-news/:id/council',
                        name: 'setting-recruitment-council',
                        meta: {
                            Title: 'Tin tuyển dụng',
                            SubsystemCode: "Recruitment"
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
                    SubsystemCode: "Setting"
                },
                redirect: { name: 'setting-position' },
                children: [
                    {
                        path: '/setting/job-position',
                        name: 'setting-position',
                        meta: {
                            Title: 'Thiết lập',
                            SubsystemCode: "Setting"
                        },
                        component: () => import('../views/setting/tabs/JobPosition.vue'),
                    },
                    {
                        path: '/setting/university',
                        name: 'setting-university',
                        meta: {
                            Title: 'Thiết lập',
                            SubsystemCode: "Setting"
                        },
                        component: () => import('../views/setting/tabs/University.vue'),
                    },
                    {
                        path: 'setting/education-major',
                        name: 'setting-education-major',
                        meta: {
                            Title: 'Thiết lập',
                            SubsystemCode: "Setting"
                        },
                        component: () => import('../views/setting/tabs/EducationMajor.vue'),
                    },
                    {
                        path: 'setting/reason-eliminate',
                        name: 'setting-reason-eliminate',
                        meta: {
                            Title: 'Thiết lập',
                            SubsystemCode: "Setting"
                        },
                        component: () => import('../views/setting/tabs/ReasonEliminate.vue'),
                    },
                    {
                        path: 'setting/work-location',
                        name: 'setting-work-location',
                        meta: {
                            Title: 'Thiết lập',
                            SubsystemCode: "Setting"
                        },
                        component: () => import('../views/setting/tabs/WorkLocation.vue'),
                    },
                    {
                        path: '/setting/role',
                        name: 'role',
                        meta: {
                            Title: 'Thiết lập',
                            SubsystemCode: "Setting"
                        },
                        component: () => import('../views/setting/tabs/Role.vue'),
                    },
                    {
                        path: '/setting/role/:id',
                        name: 'role-detail',
                        meta: {
                            Title: 'Thiết lập',
                            SubsystemCode: "Setting"
                        },
                        component: () => import('../views/setting/tabs/RoleDetail.vue'),
                    },
                ],
                component: () => import('../views/setting/RecruitmentSetting.vue')
            },
            {
                path: '/user',
                name: 'user',
                meta: {
                    Title: "Người dùng",
                },
                component: () => import('../views/users/User.vue'),
            },],
            component: () => import('../Managerment.vue'),
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                Title: "Đăng nhập",
            },
            component: () => import('../views/login/Login.vue'),
        },
        {
            path: '/no-access',
            name: 'no-access',
            meta: {
                Title: "Không có quyền"
            },
            component: () => import('../views/errorPages/403Page.vue'),
        },
        {
            path: '/:catchAll(.*)',
            component: () => import('../views/errorPages/404Page.vue'),
        },
    ],
});

// Hàm middleware kiểm tra đăng nhập
router.beforeEach((to, from, next) => {
    const route = to.matched.filter(item => item.meta.SubsystemCode)
    if (!route.length) next()
    const hasPermission = checkUserPermission(route[0].meta.SubsystemCode as string); // Kiểm tra quyền truy cập
    // Kiểm tra xem route yêu cầu quyền truy cập không
    if (hasPermission) {
        next(); // Cho phép truy cập vào route tiếp theo
    } else {
        next('/no-access'); // Chuyển hướng đến trang không có quyền
    }
});


router.afterEach((e) => {
    document.title = e.meta.Title
        ? `${e.meta.Title} | ${t('app.name')} - ${t('app.slogan')}`
        : `${t('app.title.notFound')} | ${t('app.name')} - ${t('app.slogan')}`;
});

export default router;
