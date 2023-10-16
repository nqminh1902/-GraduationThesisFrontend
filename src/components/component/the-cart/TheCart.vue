<template>
    <div class="the-cart cpointer" v-show="!isExpand" @click="toggleExpand">
        <div class="the-cart-wrapper">
            <div class="the-cart-icon">
                <Icon icon="icon-park-outline:mall-bag" />
            </div>
            <div class="the-cart-total-quantity">
                {{ numberItems }} {{ t('theCart.items') }}
            </div>
            <div class="the-cart-total-price">
                <div class="the-cart-text-price">
                    {{ formatTextNumber(formatCurrency(price)) }}
                </div>
            </div>
            <a href="#" class="move-to-top" @click.stop>
                <Icon icon="ep:arrow-up" />
            </a>
        </div>
    </div>
    <transition name="fade">
        <div class="the-cart-sidebar" v-show="isExpand">
            <div class="cart-header d-flex-center">
                <div class="cart-title">{{ t('theCart.title') }}</div>
                <div class="cart-close" @click="toggleExpand">
                    <Icon icon="uil:times" />
                </div>
            </div>
            <div class="empty-cart" v-if="cartList.length == 0">
                <div class="empty-cart-icon">
                    <Icon icon="ion:bag-handle-outline" />
                </div>
                <div class="empty-cart-text">{{ t('theCart.empty') }}</div>
            </div>
            <div class="cart-content" v-else>
                <div
                    class="cart-product"
                    v-for="product of cartList"
                    :key="product.ProductID"
                >
                    <router-link to="">
                        <img
                            :src="product.ProductImage"
                            alt=""
                            style="width: 127px; height: 127px"
                        />
                    </router-link>
                    <div class="cart-product-info">
                        <div class="cart-product-detail">
                            <router-link to="" class="cart-product-name">
                                {{ product.ProductName }}
                            </router-link>
                            <div class="cart-product-quantity">
                                {{ product.QuantityBuy }} x
                                <span class="">{{
                                    formatCurrency(product.Price)
                                }}</span>
                            </div>
                            <div class="mt-2.5">
                                <base-number-box
                                    :config="numberBoxConfig"
                                    v-model="product.QuantityBuy"
                                />
                            </div>
                        </div>
                        <Icon
                            icon="zondicons:close-outline"
                            width="18"
                            height="18"
                            class="cursor-pointer"
                            @click="handleRemoveFromCart(product.ProductID)"
                        />
                    </div>
                </div>
            </div>
            <div class="view-cart" @click="handleClickViewCart">
                <div class="view-cart-text">{{ t('theCart.viewCart') }}</div>
                <div class="view-cart-total">{{ formatCurrency(price) }}</div>
            </div>
        </div>
    </transition>
    <transition name="fade-opacity">
        <div class="overlay" v-show="isExpand" @click="toggleExpand"></div>
    </transition>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue3-i18n';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import { formatCurrency, formatTextNumber } from '@/utils';
import { DxNumberBox } from 'devextreme-vue';
import { BaseNumberBox } from '@/components/base';

// #region common
const { t, getLocale } = useI18n();
const cart = useCartStore();
const router = useRouter();
const { cartList, totalPrice } = storeToRefs(cart);

const props = defineProps<{
    modelValue: boolean;
}>();

const numberBoxConfig = ref<DxNumberBox>({
    min: 1,
    width: 80,
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();
// #endregion

// #region handleNumber
const numberItems = ref<number>(
    cartList.value.reduce((total, product) => {
        return total + product.QuantityBuy;
    }, 0)
);

const price = computed(() => {
    totalPrice.value = cartList.value.reduce((total, product) => {
        return total + product.Price * product.QuantityBuy;
    }, 0);

    return totalPrice.value;
});

watch(
    () => price.value,
    () => {
        cart.totalPriceChange();
        numberItems.value = cartList.value.reduce((total, product) => {
            return total + product.QuantityBuy;
        }, 0);
    }
);

const handleClickViewCart = () => {
    router.push({ name: 'cart' });
    isExpand.value = false;
};
// #endregion

// #region expand
const isExpand = computed({
    get() {
        return props.modelValue ?? false;
    },
    set(newValue) {
        emit('update:modelValue', newValue);
    },
});

const toggleExpand = () => {
    isExpand.value = !isExpand.value;
};

function handleRemoveFromCart(id: number) {
    cart.removeFromCart(id);
}
// #endregion
</script>

<style lang="scss" scoped>
.the-cart {
    padding: 32px 16px 16px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 50%;
    right: -40px;
    transform: translateY(-50%);
    color: var(--app-color-white);
    background-color: var(--app-color-bg-the-cart);
    box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.5);
    transition: 0.4s;
    z-index: 120;
    &:hover {
        right: 0;
        transition: 0.4s;
    }
    .move-to-top {
        position: absolute;
        display: block;
        text-decoration: none;
        color: var(--app-color-white);
        left: 50%;
        top: 0;
        width: calc(100% + 1px);
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateX(-50%);
        background-color: var(--app-color-secondary);
    }
    .the-cart-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
            font-size: 20px;
            color: var(--app-color-secondary);
        }
    }
    .the-cart-total-price,
    .the-cart-total-quantity {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .the-cart-total-quantity {
        margin-top: 2px;
        font-weight: 500;
    }
    .the-cart-total-price {
        color: var(--app-color-secondary);
        background-color: var(--app-color-white);
        font-weight: 700;
        width: 65px;
        height: 25px;
        padding: 0 5px;
        border-radius: 3px;
        margin-top: 5px;
    }
}
.the-cart-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 386px;
    height: 100vh;
    background-color: var(--app-color-white);
    z-index: 120;
    display: flex;
    flex-direction: column;
    .cart-header {
        padding: 20px;
        height: 70px;
        justify-content: space-between;
        border-bottom: 1px solid var(--app-color-border-lighter);
        .cart-title {
            font-size: 20px;
            font-weight: 700;
        }
        .cart-close {
            font-size: 30px;
            color: var(--app-color-secondary);
            &:hover {
                cursor: pointer;
            }
        }
    }
    .empty-cart {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .empty-cart-icon {
            color: var(--app-color-secondary);
            svg {
                font-size: 100px;
            }
        }
        .empty-cart-text {
            font-size: 20px;
            margin-top: 15px;
            font-weight: 600;
        }
    }
    .cart-content {
        flex: 1;
        overflow-y: auto;
        .cart-product {
            display: flex;
            flex-wrap: wrap;
            padding: 25px 20px 20px;
            border-bottom: 1px solid rgb(235, 235, 235);
            .cart-product-info {
                display: flex;
                margin-top: -4px;
                position: relative;
                padding-left: 12px;
                align-items: flex-start;
                flex: 1 0 calc(100% - 150px);
                -webkit-box-pack: justify;
                justify-content: space-between;
                font-family: 'Open Sans';
                .cart-product-name {
                    color: rgb(33, 33, 33);
                    font-family: 'Open Sans';
                    font-size: 16px;
                    font-weight: 400;
                }
                .cart-product-quantity {
                    font-size: 14px;
                    display: block;
                    margin-top: 3px;
                    span {
                        font-size: 16px;
                        font-weight: 500;
                        color: rgb(255, 112, 4);
                    }
                }
            }
        }
    }
    .view-cart {
        margin: 20px;
        padding: 10px;
        border-radius: 3px;
        width: calc(100% - 40px);
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--app-color-white);
        background-color: var(--app-color-secondary);
        transition: 0.3s;
        &:hover {
            cursor: pointer;
            transition: 0.3s;
            background-color: var(--app-color-bg-the-cart);
        }
        .view-cart-text {
            font-weight: 600;
            font-size: 16px;
        }
        .view-cart-total {
            padding: 8px 10px;
            color: var(--app-color-secondary);
            background-color: var(--app-color-white);
            font-weight: 600;
            border-radius: 3px;
        }
    }
}
.fade-leave-to,
.fade-enter-from {
    opacity: 0;
    right: -400px;
}
.fade-leave-from,
.fade-enter-to {
    opacity: 1;
    right: 0;
}
.fade-leave-active,
.fade-enter-active {
    transition: all 0.5s;
}
.fade-overlay-leave-to,
.fade-overlay-enter-from {
    opacity: 0;
}
.fade-overlay-leave-from,
.fade-overlay-enter-to {
    opacity: 1;
}
.fade-overlay-leave-active,
.fade-overlay-enter-active {
    transition: opacity 0.5s;
}
</style>
