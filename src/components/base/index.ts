import { defineAsyncComponent } from 'vue';

const BaseSelectBox = defineAsyncComponent(
    () => import('./base-select-box/BaseSelectBox.vue')
);
const BaseFilter = defineAsyncComponent(
    () => import('./base-filter/BaseFilter.vue')
);
const BaseCheckBox = defineAsyncComponent(
    () => import('./base-check-box/BaseCheckBox.vue')
);
const BasePost = defineAsyncComponent(() => import('./base-post/BasePost.vue'));
const BaseButton = defineAsyncComponent(
    () => import('./base-button/BaseButton.vue')
);
const BaseTextBox = defineAsyncComponent(
    () => import('./base-text-box/BaseTextBox.vue')
);
const BasePopup = defineAsyncComponent(
    () => import('./base-popup/BasePopup.vue')
);
const BaseTextArea = defineAsyncComponent(
    () => import('./base-text-area/BaseTextArea.vue')
);
const BaseDateBox = defineAsyncComponent(
    () => import('./base-date-box/BaseDateBox.vue')
);
const BaseNumberBox = defineAsyncComponent(
    () => import('./base-number-box/BaseNumberBox.vue')
);
const BaseTooltip = defineAsyncComponent(
    () => import('./base-tooltip/BaseTooltip.vue')
);
const BaseToast = defineAsyncComponent(
    () => import('./base-toast/BaseToast.vue')
);
const BaseSwitch = defineAsyncComponent(
    () => import('./base-switch/BaseSwitch.vue')
);
const BaseProduct = defineAsyncComponent(
    () => import('./base-product/BaseProduct.vue')
);
const BaseGallery = defineAsyncComponent(
    () => import('./base-gallery/BaseGallery.vue')
);
const BaseDropDown = defineAsyncComponent(
    () => import('./base-drop-down/BaseDropDown.vue')
);
const BaseBanner = defineAsyncComponent(
    () => import('./base-banner/BaseBanner.vue')
);
const BaseAutoComplete = defineAsyncComponent(
    () => import('./base-auto-complete/BaseAutoComplete.vue')
);
const BaseRatingStar = defineAsyncComponent(
    () => import('./base-rating-star/BaseRatingStar.vue')
);
const BaseRadioGroup = defineAsyncComponent(
    () => import('./base-radio-group/BaseRadioGroup.vue')
);
const BaseBreadcrumbs = defineAsyncComponent(
    () => import('./base-bread-crumb/BaseBreadcrumb.vue')
);
const BaseMap = defineAsyncComponent(() => import('./base-map/BaseMap.vue'));
const BaseNavigation = defineAsyncComponent(
    () => import('./base-navigation/BaseNavigation.vue')
);
const BaseOrderItem = defineAsyncComponent(
    () => import('./base-order-item/BaseOrderItem.vue')
);
const BaseTable = defineAsyncComponent(
    () => import('./base-table/BaseTable.vue')
);
const BaseStatus = defineAsyncComponent(
    () => import('./base-status/BaseStatus.vue')
);
const BasePaging = defineAsyncComponent(
    () => import('./base-paging/Basepaging.vue')
);
const BaseUploadImage = defineAsyncComponent(
    () => import('./base-file-preview/BaseUploadImage.vue')
);

const BaseTagBox = defineAsyncComponent(
    () => import('./base-tagbox/BaseTagBox.vue')
);
export {
    BaseSelectBox,
    BaseFilter,
    BaseCheckBox,
    BasePost,
    BaseButton,
    BaseTextBox,
    BasePopup,
    BaseTextArea,
    BaseDateBox,
    BaseNumberBox,
    BaseTooltip,
    BaseToast,
    BaseSwitch,
    BaseProduct,
    BaseGallery,
    BaseDropDown,
    BaseBanner,
    BaseAutoComplete,
    BaseRatingStar,
    BaseRadioGroup,
    BaseBreadcrumbs,
    BaseMap,
    BaseNavigation,
    BaseOrderItem,
    BaseTable,
    BaseStatus,
    BasePaging,
    BaseUploadImage,
    BaseTagBox
};
