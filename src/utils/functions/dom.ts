import { useUserStore } from '@/stores';
import { createPinia, storeToRefs } from 'pinia';

export const handleAppUnmounted = () => {
    const app: HTMLElement | null = document.querySelector('#app');
    if (app) {
        app.style.height = 'auto';
        app.style.overflow = 'unset';
    }
};

export const handleAppMounted = () => {
    const app: HTMLElement | null = document.querySelector('#app');
    if (app) {
        app.style.height = '100vh';
        app.style.overflow = 'hidden';
    }
};

export const translateScreen = (yCoord: number, xCoord: number = 0) => {
    window.scrollTo(xCoord, yCoord);
};

export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const checkUserPermission = (SubsystemCode: string, permission?: string) => {
    const userStore = useUserStore()

    const { user, permissions } = storeToRefs(userStore)

    if (SubsystemCode && permission) {
        const findPermission = permissions.value.find((per) => per.SubsystemCode == SubsystemCode && per.PermissionName == permission)
        if (findPermission) {
            return true
        } else {
            return false
        }
    } else if (SubsystemCode) {
        const findPermission = permissions.value.find((per) => per.SubsystemCode == SubsystemCode)
        if (findPermission) {
            return true
        } else {
            return false
        }
    }


    return true
}