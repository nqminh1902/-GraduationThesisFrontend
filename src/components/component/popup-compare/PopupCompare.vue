<template>
    <base-popup
        v-if="internalValue"
        :config="popupCompareConfig"
        :popupVisible="internalValue"
        @close="handleClosePopup"
        ><template #body>
            <div class="title">{{ t('popupCompare.compare') }}</div>
            <div class="popup-compare-content d-flex-center">
                <div
                    class="product-wrapper"
                    v-if="dataCompare.dataSource.length > 0"
                >
                    <div
                        v-for="(product, index) of dataCompare.dataSource"
                        :class="{
                            'mr-10':
                                index + 1 !== dataCompare.dataSource.length,
                        }"
                        :key="product.ProductID"
                    >
                        <base-product :product="product" />
                    </div>
                </div>
                <div v-else>
                    <the-empty />
                </div>
            </div> </template
    ></base-popup>
</template>

<script setup lang="ts">
import { BasePopup, BaseProduct } from '@/components/base';
import { popupCompareConfig } from '@/constants/components/component';
import { useI18n } from 'vue3-i18n';
import { useCompareStore } from '@/stores';
import { TheEmpty } from '..';

// #region common
const { t, getLocale } = useI18n();
const compareStore = useCompareStore();
const dataCompare = compareStore.compare;

const props = defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'onClickCreate'): void;
}>();

const internalValue = computed({
    get() {
        return props.modelValue;
    },
    set(newValue) {
        emit('update:modelValue', newValue);
    },
});

const handleClosePopup = () => {
    internalValue.value = false;
    compareStore.compare.isVisible = false;
    compareStore.compare.dataSource = [];
};
// #endregion

// #region config
watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
        }
    }
);
// #endregion
</script>

<style lang="scss">
.popup-compare {
    .title {
        font-size: 20px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .product-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .popup-compare-content {
        height: 100%;
        padding: 24px 24px 20px;
    }
}
</style>
