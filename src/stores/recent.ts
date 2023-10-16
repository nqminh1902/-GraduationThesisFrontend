import { ProductModel } from '../models/ProductModel';
import { defineStore } from 'pinia';
import { readonly } from 'vue';

function getRecentStorage(): ProductModel[] {
    const theRecent = localStorage.getItem('theRecent');
    if (theRecent) {
        return JSON.parse(theRecent);
    } else {
        return [];
    }
}

export const useRecentStore = defineStore('recent', () => {
    const recent = ref<ProductModel[]>(getRecentStorage());

    const getRecent = () => readonly(recent);
    const addRecent = (product: ProductModel) => {
        if (recent.value.includes(product)) return;
        if (recent.value.length === 20) {
            recent.value.shift();
        }
        recent.value.push(product);
        localStorage.setItem('theRecent', JSON.stringify(recent.value));
    };
    const removeRecent = (product: ProductModel) => {
        recent.value = recent.value.filter(
            (recentProduct) => recentProduct.ProductID !== product.ProductID
        );
        localStorage.setItem('theRecent', JSON.stringify(recent.value));
    };

    return {
        getRecent,
        addRecent,
        removeRecent,
    };
});
