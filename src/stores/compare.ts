import type { CompareStoreType } from '@/types';
import { ProductModel } from './../models/ProductModel';
import { defineStore } from 'pinia';

export const useCompareStore = defineStore('compare', () => {
    const compare = ref<CompareStoreType>({
        isVisible: false,
        dataSource: [],
    });

    const addCompare = (product: ProductModel) => {
        if (compare.value.dataSource?.includes(product)) return;
        compare.value.dataSource?.push(product);
        if (compare.value.dataSource?.length >= 2)
            compare.value.isVisible = true;
        if (compare.value.dataSource?.length === 3) {
            compare.value.dataSource?.shift();
        }
    };
    const removeCompare = (product: ProductModel) => {
        compare.value.dataSource = compare.value.dataSource?.filter(
            (item) => item.ProductID !== product.ProductID
        );
    };

    return {
        compare,
        addCompare,
        removeCompare,
    };
});
