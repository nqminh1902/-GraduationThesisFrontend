<template>
    <header>
        <div class="header-above">
            <div class="header-above-left">
                {{ t("header.welcomeBack") }},
                {{ data.userOptions.UserName }}
            </div>
            <div class="header-above-right d-flex-center">
                <base-drop-down
                    v-model="currentLanguageDisplay"
                    :dataSource="headerLanguagesData"
                    :icons="headerIconFlags"
                    @changeValue="handleSetLanguage(getCurrentLocale($event))"
                />
                <base-drop-down
                    v-model="currentUnitDisplay"
                    :dataSource="headerUnitsData"
                    @changeValue="handleSetUnit($event)"
                />
            </div>
        </div>
        <div class="header-center">
            <a href="/" class="header-center-left unselect">
                <div class="logo-wrapper">
                    <img
                        src="../assets/icons/logo-circle.png"
                        :alt="`Logo ${t('app.name')}`"
                    />
                </div>
                <div class="brand-name">{{ t("app.name") }}</div>
            </a>
            <div class="header-center-right">
                <div
                    v-for="(item, index) of headerCenterRight"
                    class="center-right-item"
                    :key="index"
                    @click.stop="handleClickFeature(item.name)"
                >
                    <div class="search-header-wrapper">
                        <base-auto-complete
                            v-if="index === 0 && isOpenSearch"
                            v-click-outside="handleBlurSearch"
                            :config="autoCompleteConfig"
                            @click.stop
                        />
                    </div>
                    <div v-if="item.isShowNoti" class="badge">
                        {{ totalCart }}
                    </div>
                    <Icon :icon="item.icon" />
                    <div class="options" v-if="index === 1">
                        <img
                            src="/src/assets/images/common/no_notification.png"
                            alt=""
                        />
                        {{ t("page.homeView.noNoti") }}
                    </div>
                </div>
            </div>
        </div>
    </header>
    <div class="header-below">
        <ul class="header-below-list">
            <li
                v-for="item of headerBelow"
                class="header-below-item"
                :class="{ active: isActiveItem(item.id) }"
                :key="item.id"
            >
                <base-drop-down
                    :dropdownContent="item.title"
                    :dataSource="item.children"
                    :displayValue="item.displayExpr"
                    :valueExpr="item.valueExpr"
                    @changeValue="handleClickHeaderBelow"
                />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue3-i18n";
import {
    headerLanguagesData,
    headerUnitsData,
    headerCenterRight,
    headerBelow,
    headerIconFlags,
} from "@/constants/views";
import { FeatureName, LanguageEnum, UnitOption } from "@/enums";
import { BaseDropDown, BaseAutoComplete } from "@/components/base";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import { onBeforeMount, onMounted, ref, computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";
import type { DxAutocomplete } from "devextreme-vue";
import { useUserOptionStore } from "@/stores";
import CategoryApi from "@/apis/category/category-api";
import CollectionApi from "@/apis/collection/collection-api";
import { PagingRequest } from "../models";

// #region common
const { t, getLocale, setLocale } = useI18n();
const data = useUserOptionStore();
const cart = useCartStore();
const { cartList } = storeToRefs(cart);
const activeItem = ref<number>(headerBelow.value[0].id);
const isActiveItem = (id: number) => activeItem.value === id;
const setActiveItem = (id: number) => (activeItem.value = id);
const categoryApi = new CategoryApi()
const collectionApi = new CollectionApi()
const filterPaging = new PagingRequest();

const emit = defineEmits<{
    (e: "onClickCart"): void;
    (e: "onClickAccount"): void;
    (e: "onClickNotification"): void;
}>();

const autoCompleteConfig = ref<DxAutocomplete>({});

// const totalCart = computed(() => {
//     return cartList.value.reduce((total, cartItem) => {
//         return total + cartItem.QuantityBuy;
//     }, 0);
// });

const totalCart = 0
// #endregion

// #region language
const currentLanguage = data.userOptions.LanguageOption ?? LanguageEnum.en;

const currentLanguageDisplay = ref<string>(
    currentLanguage === LanguageEnum.en
        ? t("header.languages.english")
        : t("header.languages.vietnamese")
);
getData()
async function getData(){
    filterPaging.CustomFilter = btoa("[['Status', '=', '1']]")
    const resCategory = await categoryApi.getFilterPaging(filterPaging)
    if(resCategory){
        headerBelow.value[3].children = resCategory.data.Data.Data
    }
    const resCollection = await collectionApi.getFilterPaging(filterPaging)
    if(resCollection){
        headerBelow.value[2].children = resCollection.data.Data.Data
    }
}

const handleSetLanguage = (language: string) => {
    let tempUnit = t("header.units.usd");
    let tempLanguage = t("header.languages.english");
    setLocale(language);
    data.changeLanguageOption(language);
    currentUnitDisplay.value =
        currentUnitDisplay.value === tempUnit
            ? t("header.units.usd")
            : t("header.units.vnd");
    currentLanguageDisplay.value =
        currentLanguageDisplay.value === tempLanguage
            ? t("header.languages.english")
            : t("header.languages.vietnamese");
};
// #endregion

// #region unit
const currentUnitDisplay = ref<string>(
    data.userOptions.UnitOption === UnitOption.USD
        ? t("header.units.usd")
        : t("header.units.vnd")
);

const handleSetUnit = (unit: string) => {
    currentUnitDisplay.value = unit;
    if (unit === t("header.units.usd")) {
        data.changeUnitOption(UnitOption.USD);
    } else if (unit === t("header.units.vnd")) {
        data.changeUnitOption(UnitOption.VND);
    }
};
// #endregion

// #region handle events
const getCurrentLocale = (localize: string): string => {
    const result =
        localize === t("header.languages.english")
            ? LanguageEnum.en
            : LanguageEnum.vi;
    return result;
};

const handleClickFeature = (featureName: FeatureName) => {
    switch (featureName) {
        // case FeatureName.search:
        //     isOpenSearch.value = !isOpenSearch.value;
        //     break;
        case FeatureName.account:
            emit("onClickAccount");
            break;
        case FeatureName.notification:
            emit("onClickNotification");
            break;
        case FeatureName.cart:
            emit("onClickCart");
            break;
    }
};

const router = useRouter();

const handleActiveTabSimple = (navItem: any) => {
    if (
        navItem === t("app.title.collection") ||
        navItem === t("app.title.type")
    )
        return;
    headerBelow.value.forEach((item: any) => {
        if (item.title === navItem) {
            setActiveItem(item.id);
        }
    });
};

const handleActiveTabComplex = (navItem: any) => {
    if(navItem.hasOwnProperty('CollectionID')){
        setActiveItem(3);
    }else if(navItem.hasOwnProperty('CategoryID')){
        setActiveItem(4);
    }
};

const handleClickHeaderBelow = (navItem: any) => {
    
    handleActiveTabSimple(navItem);
    switch (navItem) {
        case t("app.title.home"):
            router.push({ name: "home" });
            break;
        case t("app.title.about"):
            router.push({ name: "about" });
            break;
        case t("app.title.shop"):
            router.push({ name: "shop" });
            break;
        case t("app.title.contact"):
            router.push({ name: "contact" });
            break;
    }
    if (navItem instanceof Object) {
        // debugger
        if(navItem.hasOwnProperty('CollectionID')){
            handleActiveTabComplex(navItem);
            router.push({
                name: "collection",
                params: { id: navItem.CollectionID },
            });
            return;
        }else if(navItem.hasOwnProperty('CategoryID')){
            handleActiveTabComplex(navItem);
            router.push({
                name: "category",
                params: { id: navItem.CategoryID },
            });
            return;
        }
    }
};
// #endregion

// #region effects
const handleActiveScroll = () => {
    const currentScroll = window.pageYOffset;
    let headerTarget: HTMLElement | null =
        document.querySelector(".header-below");
    if (currentScroll >= 148 && headerTarget) {
        headerTarget.classList.add("onscoll");
    } else if (headerTarget) {
        headerTarget.classList.remove("onscoll");
    }
};

onMounted(() => {
    window.addEventListener("scroll", () => handleActiveScroll());
});

onBeforeMount(() => {
    window.removeEventListener("scroll", () => handleActiveScroll());
});
// #endregion

// #region search
const isOpenSearch = ref<boolean>(false);

const handleBlurSearch = () => {
    if (isOpenSearch.value) {
        isOpenSearch.value = false;
    }
};
// #endregion
</script>

<style lang="scss" scoped>
header {
    width: 100%;
    .header-above {
        width: 100%;
        color: var(--app-color-white);
        height: var(--app-height-header-above);
        background-color: var(--app-color-bg-header);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--app-padding-content);
        .header-above-left {
            font-weight: 300;
            font-style: italic;
            font-size: 15px;
            color: var(--app-color-secondary);
        }
        .header-above-right {
            height: 100%;
            line-height: var(--app-height-header-above);
        }
    }
    .header-center {
        width: 100%;
        height: var(--app-height-header-center);
        background-color: var(--app-color-white);
        display: flex;
        align-items: center;
        padding: var(--app-padding-content);
        justify-content: space-between;
        .header-center-left {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: var(--app-color-black);
            .logo-wrapper {
                img {
                    width: 60px;
                }
            }
            .brand-name {
                margin-left: 6px;
                font-size: 40px;
                font-weight: 600;
                color: var(--app-color-pure-black);
            }
        }
        .header-center-right {
            display: flex;
            align-items: center;
            .search-header-wrapper {
                margin-right: 10px;
            }
            .center-right-item {
                color: var(--app-color-black);
                padding: 0 16px 0 8px;
                position: relative;
                display: flex;
                align-items: center;
                cursor: pointer;
                &:hover .options {
                    display: flex;
                }
                .options {
                    display: none;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    z-index: 105;
                    position: absolute;
                    top: calc(100% + 10px);
                    left: -180px;
                    width: 300px;
                    height: 200px;
                    border-radius: 4px;
                    padding: 8px 12px;
                    overflow-x: hidden;
                    overflow-y: auto;
                    background-color: var(--app-color-white);
                    box-shadow: 0 0 4px 2px var(--app-color-shadow-lighter);
                    animation: fadeIn 0.4s ease-out;
                    img {
                        width: 130px;
                        object-fit: cover;
                    }
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        margin-top: 10px;
                    }
                    to {
                        opacity: 1;
                        margin-top: 0;
                    }
                }
                &:hover {
                    svg {
                        transition: 0.4s;
                        color: var(--app-color-secondary);
                    }
                }
                .badge {
                    font-size: 10px;
                    position: absolute;
                    top: -4px;
                    right: 10px;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--app-color-white);
                    background-color: var(--app-color-secondary);
                }
                &:last-child {
                    .badge {
                        right: -6px;
                    }
                }
                svg {
                    color: var(--app-color-black);
                    transition: 0.4s;
                    font-size: 24px;
                }
                & + .center-right-item {
                    border-left: 1px solid var(--app-color-border-lighter);
                }
                &:last-child {
                    padding-right: 0;
                }
                &:first-child {
                    padding-left: 0;
                }
            }
        }
    }
}
.header-below {
    position: sticky;
    top: 0;
    width: 100%;
    padding: var(--app-padding-content);
    height: var(--app-height-header-below);
    background-color: var(--app-color-bg-header);
    z-index: 104;
    .header-below-list {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: var(--app-color-white);
        .header-below-item {
            font-size: 16px;
            line-height: calc(var(--app-height-header-below) - 10px);
            transition: 0.4s;
            &:hover {
                cursor: pointer;
                transition: 0.4s;
                color: var(--app-color-secondary);
            }
            &.active {
                color: var(--app-color-pure-black);
                background-color: var(--app-color-secondary);
                &:hover {
                    cursor: pointer;
                    transition: 0.2s;
                    color: var(--app-color-pure-black);
                }
            }
        }
    }
}
</style>

<style lang="scss">
.header-below {
    .header-below-item.active {
        .base-dropdown:hover .current-value {
            color: var(--app-color-pure-black) !important;
        }
    }
    .header-below-item {
        padding: 0 20px;
        & + .header-below-item {
            margin-left: 20px;
        }
        .base-dropdown {
            min-width: unset !important;
            .current-value {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }

    &.onscoll {
        height: 50px;
        transition: background-color 0.3s;
        background-color: var(--app-color-secondary);
        .header-below-item {
            &:hover,
            .base-dropdown:hover .current-value {
                color: var(--app-color-bg-header) !important;
            }
        }
    }
}
</style>
