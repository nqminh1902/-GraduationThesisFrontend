import { ToastType } from '@/enums';
import { defineStore } from 'pinia';

export const useToastStore = defineStore('cartStore', {
    state: () => ({
        isShowToast: false,
        toastMessage: "",
        ToastType: "info" 
    }),
    getters: {},
    actions: {
        toggleToast(isShow: boolean, message: string, type:ToastType){
            this.isShowToast = isShow;
            this.toastMessage = message
            this.ToastType = type
        }
    },
});