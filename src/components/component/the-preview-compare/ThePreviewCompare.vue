<template>
    <div class="the-preview-compare" v-if="isShowPreview">
        <div class="title">Chọn thêm 1 sản phẩm nữa để so sánh</div>
        <div class="base-product unselect">
            <div class="product-img cursor-pointer">
                <img
                    style="width: 100%; height: 100%"
                    src="../../../assets/images/demo/75.jpg"
                    alt=""
                />
                <div class="product-tags">
                    <div
                        class="sale"
                        :style="{
                            display: theData.SalePercent ? 'block' : 'none',
                        }"
                    >
                        -{{ theData.SalePercent }} %
                    </div>
                    <div
                        class="out-of-stock"
                        :style="{
                            display: theData.Quantity >= 1 ? 'none' : 'block',
                        }"
                    >
                        {{ t('base.product.outOfStock') }}
                    </div>
                </div>
            </div>
            <div class="product-name">
                <div class="product-name-text cursor-pointer">
                    {{ theData.ProductName }}
                </div>
            </div>
            <div class="product-price">
                <div
                    v-if="theData.Sale"
                    class="product-price"
                    style="margin-top: 0"
                >
                    <span style="text-decoration: line-through"
                        >{{ formatCurrency(theData.Price) }}
                    </span>
                    <span style="margin-left: 8px">{{
                        formatCurrency(theData.Sale)
                    }}</span>
                </div>
                <p class="" v-else>{{ formatCurrency(theData.Price) }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCompareStore } from '@/stores';
import { BaseProduct } from '@/components/base';
import { formatCurrency } from '@/utils';
import { useI18n } from 'vue3-i18n';

const { t, getLocale } = useI18n();
const isShowPreview = ref<boolean>(false);
const theData = ref();

watch(
    () => useCompareStore().compare.dataSource,
    (currentValue) => {
        if (currentValue.length === 1) {
            isShowPreview.value = true;
            theData.value = currentValue[0];
        }
    },
    {
        deep: true,
    }
);

watch(
    () => isShowPreview.value,
    (currentValue) => {
        if (currentValue) {
            setTimeout(() => {
                isShowPreview.value = false;
            }, 4000);
        }
    }
);
</script>

<style lang="scss" scoped>
.the-preview-compare {
    position: fixed;
    bottom: 30px;
    right: 80px;
    width: 300px;
    height: auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 4px 2px var(--app-color-shadow-lighter);
    background-color: var(--app-color-white);
    .title {
        font-size: 16px;
        margin-bottom: 12px;
        font-weight: 600;
        text-align: center;
    }
    .base-product {
        position: relative;
        height: 'auto';
        transition: all 1s ease-out;
        .product-img {
            text-align: center;
            width: 100%;
            height: 253px;
            overflow: hidden;
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
    }
    .product-tags {
        position: absolute;
        top: 20px;
        left: 15px;
        .sale {
            display: block;
            font-size: 12px;
            font-weight: 500;
            font-family: 'Open Sans';
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
            font-family: 'Open Sans';
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
}
</style>
