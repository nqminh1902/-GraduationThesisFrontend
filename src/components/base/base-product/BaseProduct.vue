<template>
    <div class="base-product unselect">
        <div class="product-img cursor-pointer" @click="goDetailProduct()">
            <img
                style="width: 100%; height: 100%"
                :src="`${product.Images.split(';')[0]}`"
                :alt="product.ProductName"
            />
            <div class="option-btn">
                <div
                    class="wish-list"
                    :id="`wish-list-${targetRandom}`"
                    @click.stop="handleAddWishList"
                >
                    <Icon icon="fa6-regular:heart" />
                </div>
                <base-tooltip :config="wishtListTooltip">{{
                    t("base.product.love")
                }}</base-tooltip>
                <div
                    class="quick-view"
                    :id="`quick-view-${targetRandom}`"
                    @click.stop="handleQuickView"
                >
                    <Icon icon="gg:maximize-alt" />
                </div>
                <base-tooltip :config="quickViewTooltip">{{
                    t("base.product.quickView")
                }}</base-tooltip>
                <div
                    class="compare"
                    :id="`compare-${targetRandom}`"
                    @click.stop="handleCompare"
                >
                    <Icon icon="fa6-solid:code-compare" />
                </div>
                <base-tooltip :config="compareTooltip">{{
                    t("base.product.compare")
                }}</base-tooltip>
            </div>
            <div class="product-tags">
                <div
                    class="sale"
                    :style="{
                        display: product.DiscountPercent ? 'block' : 'none',
                    }"
                >
                    -{{ product.DiscountPercent }} %
                </div>
                <div
                    class="out-of-stock"
                    :style="{
                        display: product.TotalQuantity >= 1 ? 'none' : 'block',
                    }"
                >
                    {{ t("base.product.outOfStock") }}
                </div>
            </div>
        </div>
        <div class="product-name">
            <div
                class="product-name-text cursor-pointer"
                @click="goDetailProduct()"
            >
                {{ product.ProductName }}
            </div>
        </div>
        <div class="product-price">
            <div
                class="product-price"
                v-if="product.Sale"
                style="margin-top: 0"
            >
                <span style="text-decoration: line-through"
                    >{{ formatCurrency(product.ProductPrice) }}
                </span>
                <span style="margin-left: 8px">{{
                    formatCurrency(product.Sale)
                }}</span>
            </div>
            <p class="" v-else>{{ formatCurrency(product.ProductPrice) }}</p>
        </div>
        <div class="product-button">
            <base-button ref="baseButtonRef" :config="buttonConfig" />
        </div>
    </div>

    <!-- Popup xem nhanh sản phẩm -->
    <base-popup
        v-if="isShowPopup"
        :config="popupConfig"
        :popupVisible="isShowPopup"
        @close="isShowPopup = false"
    >
        <template #body>
            <div class="product-detail">
                <div class="product-detail-img">
                    <img
                        style="width: 100%; height: 100%"
                        :src="`${product.Images.split(';')[0]}`"
                        alt=""
                    />
                </div>
                <div class="product-detail-right">
                    <div class="product-detail-code">
                        <strong>
                            {{ t("base.product.sku") }}{{ t("sign.colon") }}
                        </strong>
                        {{ product.ProductCode }}
                    </div>
                    <div class="product-detail-available">
                        <strong
                            >{{ t("base.product.availability")
                            }}{{ t("sign.colon") }}
                        </strong>
                        {{ product.TotalQuantity }}
                    </div>
                    <div class="product-detail-name">
                        {{ product.ProductName }}
                    </div>
                    <div class="product-detail-price">
                        <div
                            v-if="product.Sale"
                            class="product-price"
                            style="margin-top: 0"
                        >
                            <span
                                class="price-old"
                                style="text-decoration: line-through"
                                >{{ formatCurrency(product.ProductPrice) }}
                            </span>
                            <span style="margin-left: 8px">{{
                                formatCurrency(product.Sale)
                            }}</span>
                        </div>
                        <p class="" v-else>
                            {{ formatCurrency(product.ProductPrice) }}
                        </p>
                    </div>
                    <div class="product-detail-description">
                        {{ product.QuickDescription }}
                    </div>
                    <div class="product-detail-cart">
                        <base-number-box
                            :config="numberBoxConfig"
                            @on-value-change="handleValueChange"
                        />
                        <base-button :config="buttonConfig" class="m-l-10" />
                    </div>
                    <div class="product-detail-feature">
                        <div class="add-to-wishlist d-flex-center">
                            <Icon icon="fa6-regular:heart" />
                            <span style="margin-left: 8px">{{
                                t("base.product.addToWishlist")
                            }}</span>
                        </div>
                        <div
                            class="add-to-compare d-flex-center"
                            style="margin-left: 16px"
                        >
                            <Icon icon="fa6-solid:code-compare" />
                            <span style="margin-left: 8px">{{
                                t("base.product.addToCompare")
                            }}</span>
                        </div>
                    </div>
                    <div class="product-detail-social">
                        <h4 class="">
                            {{ t("base.product.share") }}{{ t("sign.colon") }}
                        </h4>
                        <a href="">
                            <Icon icon="uil:facebook" />
                        </a>
                        <a href="">
                            <Icon icon="formkit:twitter" />
                        </a>
                        <a href="">
                            <Icon icon="uil:linkedin" />
                        </a>
                    </div>
                </div>
            </div>
        </template>
    </base-popup>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { BaseButton, BaseTooltip, BasePopup, BaseNumberBox } from "..";
import { formatCurrency } from "../../../utils";
import { popupConfig } from "@/constants/components/base";
import { DxTooltip, DxNumberBox, DxButton } from "devextreme-vue";
import { PositionTooltip, ToastType } from "@/enums";
import { useI18n } from "vue3-i18n";
import { Icon } from "@iconify/vue";
import { useCartStore } from "@/stores";
import { ProductModel } from "../../../models";
import { useToastStore } from "@/stores";
import { ref, watch } from "vue";

// #region common
const { t, getLocale } = useI18n();
const cart = useCartStore();
const router = useRouter();
const toastStore = useToastStore();

const props = defineProps<{
    product: ProductModel;
}>();
// #endregion

// #region config
const buttonConfig = ref<DxButton>({
    width: 200,
    icon: "fa-solid fa-cart-shopping",
    disabled: props.product.TotalQuantity ? false : true,
    text: props.product.TotalQuantity
        ? t("base.product.addToCart")
        : t("base.product.outOfStock"),
    onClick(e) {
        cart.addToCart(props.product);
        toastStore.toggleToast(true, "Thêm vào giở hàng thành công", ToastType.success);
    },
});

const baseButtonRef = ref();

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            baseButtonRef.value
                .getInstance()
                ?.option(
                    "text",
                    props.product.TotalQuantity
                        ? t("base.product.addToCart")
                        : t("base.product.outOfStock")
                );
        }
    }
);
// #endregion

// #region config
const targetRandom = Math.floor(Math.random() * 100) + 1;

const wishtListTooltip = ref<DxTooltip>({
    target: `#wish-list-${targetRandom}`,
    position: PositionTooltip.left,
});

const compareTooltip = ref<DxTooltip>({
    target: `#compare-${targetRandom}`,
    position: PositionTooltip.left,
});

const quickViewTooltip = ref<DxTooltip>({
    target: `#quick-view-${targetRandom}`,
    position: PositionTooltip.left,
});

let quantityPurchased: number = 0;

const numberBoxConfig: DxNumberBox = {
    max: props.product.TotalQuantity,
    width: 100,
    height: 38,
    value: quantityPurchased,
};
// #endregion

// #region handle events
const isShowPopup = ref<boolean>(false);

function handleAddWishList() {}

function handleQuickView(event: any) {
    event.stopPropagation();
    isShowPopup.value = !isShowPopup.value;
}

function handleValueChange(value: number) {
    quantityPurchased = value;
}

function goDetailProduct() {
    router.push({ name: "product", params: { id: props.product.ProductID } });
}

const emit = defineEmits<{
    (e: "onClickCompare"): void;
}>();

function handleCompare() {
    emit("onClickCompare");
}
// #endregion
</script>

<style lang="scss" scoped>
.base-product {
    position: relative;
    height: "auto";
    transition: all 1s ease-out;
    img {
        transition: 0.3s;
    }
    &:hover img {
        transform: scale(1.1);
        transition: 0.3s;
    }
    &:hover .compare {
        display: flex;
    }
    &:hover .quick-view {
        display: flex;
    }
    .product-img {
        text-align: center;
        width: 100%;
        height: 253px;
        overflow: hidden;
        .option-btn {
            position: absolute;
            right: 15px;
            top: 0;
        }
    }
    .product-name {
        margin-top: 20px;
        .product-name-text {
            text-align: center;
            text-decoration: none;
            font-size: 16px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
            font-weight: 600;
            color: var(--app-color-text-product);
            &:hover {
                color: var(--app-color-primary);
            }
        }
    }
    .product-price {
        font-size: 14px;
        line-height: 1;
        font-family: Montserrat;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--app-color-text-product);
        margin-top: 9px;
        -webkit-box-pack: center;
        -webkit-box-align: center;
        p {
            font-weight: 500;
        }
    }
    .product-button {
        text-align: center;
        margin-top: 10px;
    }
}
.wish-list {
    width: 40px;
    height: 40px;
    margin-top: 10px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3 all ease-in-out;
    background-color: var(--app-color-white);
    &:hover {
        background-color: var(--app-color-primary);
    }
    &:hover svg {
        color: var(--app-color-white);
    }
}
.quick-view {
    width: 40px;
    height: 40px;
    margin-top: 10px;
    border-radius: 50%;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3 all ease-in-out;
    background-color: var(--app-color-white);
    &:hover {
        background-color: var(--app-color-primary);
    }
    &:hover svg {
        color: var(--app-color-white);
    }
}
.compare {
    width: 40px;
    height: 40px;
    margin-top: 10px;
    border-radius: 50%;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3 all ease-in-out;
    background-color: var(--app-color-white);
    &:hover {
        background-color: var(--app-color-primary);
    }
    &:hover svg {
        color: var(--app-color-white);
    }
}
.product-tags {
    position: absolute;
    top: 20px;
    left: 15px;
    .sale {
        display: block;
        font-size: 12px;
        font-weight: 500;
        font-family: "Open Sans";
        line-height: 1;
        padding: 5px 7px;
        text-align: center;
        text-transform: uppercase;
        width: 54px;
        border-radius: 3px;
        color: var(--app-color-white);
        background-color: var(--app-color-tag-product);
    }
    .out-of-stock {
        font-size: 12px;
        font-weight: 500;
        font-family: "Open Sans";
        line-height: 1;
        display: block;
        padding: 5px 7px;
        text-align: center;
        text-transform: uppercase;
        width: auto;
        border-radius: 3px;
        margin-top: 5px;
        color: var(--app-color-white);
        background-color: var(--app-color-primary);
    }
}
.product-detail {
    width: 100%;
    height: 100%;
    display: flex;
    .product-detail-img {
        padding-right: 15px;
        flex: 1;
    }
    .product-detail-right {
        padding-left: 14px;
        flex: 1;
    }
    .product-detail-available {
        margin-top: 4px;
    }
    .product-detail-name {
        line-height: 1;
        font-size: 24px;
        margin: 14px 0px 12px;
        font-weight: 600;
        color: var(--app-color-text-product);
    }
    .product-detail-price {
        font-size: 22px;
        margin-top: 14px;
        margin-bottom: 20px;
        color: var(--app-color-text-product);
    }
    .price-old {
        margin-right: 5px;
        color: var(--app-color-price-old-product);
    }
    .product-detail-description {
        line-height: 1.6;
        margin-bottom: 20px;
        font-size: 16px;
    }
    .product-detail-cart {
        display: flex;
    }
    .product-detail-feature {
        margin-top: 20px;
        display: flex;
        cursor: pointer;
        .add-to-wishlist:hover {
            color: var(--app-color-primary);
        }
        .add-to-compare:hover {
            color: var(--app-color-primary);
        }
    }
    .product-detail-social {
        margin-top: 12px;
        display: flex;
        align-items: center;
        & a {
            margin-left: 16px;
            font-size: 18px;
            display: inline-block;
            color: var(--app-color-black);
        }
        & a:hover {
            color: var(--app-color-primary);
        }
    }
}
</style>
