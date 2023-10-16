<template>
    <div class="orders-content">
        <div class="badge-wrapper" v-if="config?.isHot">
            {{ t('base.orderItem.hot') }}
        </div>
        <div class="content-above d-flex-center">
            <div class="left">
                <img :src="config?.src" :alt="config?.alt" />
            </div>
            <div class="right">
                <div class="title" :title="config?.title">
                    {{ config?.title }}
                </div>
                <div class="info d-flex-center">
                    <div class="info-left">
                        {{ config?.color }}
                    </div>
                    <div class="info-right font-bold">
                        x{{ config?.quantity }}
                    </div>
                </div>
                <div class="price d-flex-center">
                    <div class="price-left d-flex-center">
                        <div class="service-wrapper" v-if="config?.hasService">
                            {{ t('base.orderItem.return') }}
                        </div>
                    </div>
                    <div class="price-right d-flex-center">
                        <div class="old-price line-through">
                            đ{{ config?.oldPrice }}
                        </div>
                        <div class="new-price">đ{{ config?.newPrice }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-center">
            <div class="above d-flex-center">
                <div class="left">
                    {{ config?.quantity }} {{ t('base.orderItem.product') }}
                </div>
                <div class="right d-flex-center">
                    <Icon icon="grommet-icons:money" />
                    <span class="total-text"
                        >{{ t('base.orderItem.total')
                        }}{{ t('sign.colon') }} </span
                    ><span class="the-price">đ{{ config?.total }}</span>
                </div>
            </div>
            <div class="below d-flex-center">
                <div class="below-left d-flex-center">
                    <Icon icon="carbon:delivery" />
                    <div class="text">{{ config?.status }}</div>
                </div>
                <div class="below-right">
                    <Icon icon="simple-line-icons:arrow-right" />
                </div>
            </div>
        </div>
        <div class="content-below d-flex-center">
            <div class="content-below-left">
                {{ t('base.orderItem.remind') }}
            </div>
            <div class="content-below-right">
                <base-button ref="buttonConfirmRef" :config="buttonConfirm" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { DxButton } from 'devextreme-vue';
import { BaseButton } from '@/components/base';
import { useI18n } from 'vue3-i18n';
import type { BaseOrderType } from '@/types';

// #region common
const { t, getLocale } = useI18n();

const props = defineProps<{
    config: BaseOrderType;
}>();
// #endregion

// #region config
const buttonConfirm = ref<DxButton>({
    text: t('base.orderItem.received'),
});

const buttonConfirmRef = ref();

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            buttonConfirmRef.value
                ?.getInstance()
                ?.option('text', t('base.orderItem.received'));
        }
    }
);
// #endregion
</script>

<style lang="scss" scoped>
.orders-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 80px;
    border-radius: 8px;
    padding: 16px 24px;
    width: 410px;
    overflow: hidden;
    box-shadow: 1px 1px 6px 2px var(--app-color-shadow-order);
    .badge-wrapper {
        font-size: 12px;
        display: inline-block;
        width: fit-content;
        margin-bottom: 12px;
        padding: 2px 6px;
        border-radius: 4px;
        color: var(--app-color-white);
        background-color: var(--app-color-primary);
    }
    .content-above {
        height: 100px;
        width: 100%;
        margin-bottom: 16px;
        .left {
            width: 100px;
            min-width: 100px;
            height: 100%;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .right {
            height: 100%;
            width: calc(100% - 100px);
            padding-left: 24px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .title {
                font-size: 16px;
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .info {
                width: 100%;
                justify-content: space-between;
                .info-left {
                    color: var(--app-color-sub-text-order);
                }
            }
            .price {
                width: 100%;
                justify-content: space-between;
                .new-price {
                    margin-left: 12px;
                    color: var(--app-color-primary);
                }
                .old-price {
                    color: var(--app-color-sub-text-order);
                }
                .service-wrapper {
                    font-size: 12px;
                    padding: 1px 4px;
                    color: var(--app-color-primary);
                    border: 1px solid var(--app-color-primary);
                }
            }
        }
    }
    .content-center {
        padding-bottom: 10px;
        border-bottom: 1px solid var(--app-color-border-lighter);
        border-top: 1px solid var(--app-color-border-lighter);
        .above {
            padding: 10px 0;
            border-bottom: 1px solid var(--app-color-border-lighter);
            justify-content: space-between;
            .left {
                font-size: 13px;
                color: var(--app-color-sub-text-order);
            }
            .right {
                color: var(--app-color-sub-text-order);
                .total-text {
                    margin: 0 4px;
                }
                .the-price {
                    color: var(--app-color-primary);
                }
            }
        }
        .below {
            padding: 10px 0 0;
            justify-content: space-between;
            .below-left {
                color: var(--app-color-primary);
                .text {
                    margin-left: 6px;
                }
            }
        }
    }
    .content-below {
        padding-top: 10px;
        justify-content: space-between;
        .content-below-left {
            font-size: 12px;
            margin-right: 30px;
            text-align: justify;
            color: var(--app-color-sub-text-order);
        }
    }
}
</style>
