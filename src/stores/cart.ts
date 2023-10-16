import type { ProductModel } from '@/models';
import type { CartModel } from '@/models/CartModel';
import { defineStore } from 'pinia';
import CartApi from '@/apis/cart/cart-api';

interface ProductCartModel {
    ProductID: number;
    ProductName: string;
    Price: number;
    ProductCode: string;
    ProductImage: string;
    QuantityBuy: number;
}

function getCartStorage(): ProductCartModel[] {
    const cart = localStorage.getItem('cartStorage');
    if (!cart) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

function getTotalProductInCart(): number {
    const cart = localStorage.getItem('cartStorage');
    if (!cart) {
        return 0;
    } else {
        return JSON.parse(cart).length;
    }
}

export const useCartStore = defineStore('cartStore', {
    state: () => ({
        cartList: getCartStorage(),
        totalPrice: 0,
        totalNumberProduct: getTotalProductInCart(),
    }),
    getters: {},
    actions: {
        addToCart(product: ProductModel) {
            const productCart = this.cartList.find(
                (cart) => cart.ProductID === product.ProductID
            );
            if (productCart) {
                productCart.QuantityBuy++;
            } else {
                this.cartList.push({
                    ProductName: product.ProductName,
                    ProductID: product.ProductID,
                    Price: product.ProductPrice,
                    ProductCode: product.ProductCode,
                    ProductImage: product.ProductImages[0].ImageUrl,
                    QuantityBuy: 1,
                });
            }
            localStorage.setItem('cartStorage', JSON.stringify(this.cartList));
        },
        removeFromCart(productId: number) {
            this.cartList = this.cartList.filter(
                (product) => product.ProductID != productId
            );
            localStorage.setItem('cartStorage', JSON.stringify(this.cartList));
        },
        removeAllProducts() {
            this.cartList = [];
            localStorage.setItem('cartStorage', JSON.stringify(this.cartList));
        },
        totalPriceChange() {
            localStorage.setItem('cartStorage', JSON.stringify(this.cartList));
        },
        async order(orderCart: CartModel) {
            try {
                const cartApi = new CartApi();
                const res = await cartApi.insert(orderCart);
                if (res) {
                    //Bật toast thông báo thành công
                    //Clear local storage
                } else {
                    //Bật toast thông báo lỗi
                }
            } catch (error) {
                console.error(error);
                //Bật toast thông báo lỗi
            }
        },
    },
});
