import { FeatureName } from '@/enums';
import i18n from '@/locales/i18n';
import type { HeaderListType } from '@/types';
import type { HeaderItemType } from '@/types';
const t = i18n.t;
const getLocale = i18n.getLocale;

export const headerLanguagesData = ref<string[]>([
    t('header.languages.english'),
    t('header.languages.vietnamese'),
]);

export const headerIconFlags = ref<string[]>([
    'twemoji:flag-united-states',
    'twemoji:flag-vietnam',
]);

export const headerUnitsData = ref<string[]>([
    t('header.units.usd'),
    t('header.units.vnd'),
]);

export const headerCenterRight = ref<HeaderItemType[]>([
    // {
    //     name: FeatureName.search,
    //     icon: 'carbon:search',
    //     isShowNoti: false,
    // },
    {
        name: FeatureName.account,
        icon: 'bi:person',
        isShowNoti: false,
    },
    {
        name: FeatureName.notification,
        icon: 'mdi:bell-outline',
        isShowNoti: true,
        noti: 2,
    },
    {
        name: FeatureName.cart,
        icon: 'ph:bag',
        isShowNoti: true,
        noti: 0,
    },
]);

export const headerBelow = ref<HeaderListType[]>([
    {
        id: 1,
        title: t('app.title.home'),
        children: [],
    },
    {
        id: 2,
        title: t('app.title.about'),
        children: [],
    },
    {
        id: 3,
        title: t('app.title.collection'),
        valueExpr: "CollectionID",
        displayExpr: "CollectionName",
        children: [
        ],
    },
    {
        id: 4,
        title: t('app.title.type'),
        valueExpr: "CategoryID",
        displayExpr: "CategoryName",
        children: [
        ],
    },
    {
        id: 5,
        title: t('app.title.shop'),
        children: [],
    },
    {
        id: 6,
        title: t('app.title.contact'),
        children: [],
    },
]);

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            headerLanguagesData.value = [
                t('header.languages.english'),
                t('header.languages.vietnamese'),
            ];
            headerUnitsData.value = [
                t('header.units.usd'),
                t('header.units.vnd'),
            ];
            headerBelow.value = [
                {
                    id: 1,
                    title: t('app.title.home'),
                    children: [],
                },
                {
                    id: 2,
                    title: t('app.title.about'),
                    children: [],
                },
                {
                    id: 3,
                    title: t('app.title.collection'),
                    children: [
                        {
                            id: 1,
                            title: t('header.collection.springCollection'),
                        },
                        {
                            id: 2,
                            title: t('header.collection.summerCollection'),
                        },
                        {
                            id: 3,
                            title: t('header.collection.autumnCollection'),
                        },
                        {
                            id: 4,
                            title: t('header.collection.winterCollection'),
                        },
                    ],
                },
                {
                    id: 4,
                    title: t('app.title.type'),
                    children: [
                        {
                            id: 5,
                            title: t('header.shop.pants'),
                        },
                        {
                            id: 6,
                            title: t('header.shop.shirt'),
                        },
                        {
                            id: 7,
                            title: t('header.shop.jacket'),
                        },
                        {
                            id: 8,
                            title: t('header.shop.hoodieSweatshirt'),
                        },
                    ],
                },
                {
                    id: 5,
                    title: t('app.title.shop'),
                    children: [],
                },
                {
                    id: 6,
                    title: t('app.title.contact'),
                    children: [],
                },
            ];
        }
    }
);
