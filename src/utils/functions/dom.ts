import { useUserStore } from '@/stores';
import { createPinia, storeToRefs } from 'pinia';

const pinia = createPinia();
const userStore = useUserStore(pinia)

const { user, permissions } = storeToRefs(userStore)

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

export const checkUserAuthentication = (permissionRoute: any[]) => {
    if (!user.value && permissionRoute[0].meta.requiresAuth) {
        return true
    }
    return true
}

export const checkUserPermission = (permissionRoute: any[]) => {
    if (permissionRoute[0].meta.requiresPermission) {
        const routePermission = permissionRoute[0].meta.requiresPermission.split(";")
        if (routePermission) {
            const isHaveSubsystem = permissions.value.find(per => per.SubsystemCode == routePermission[0] && per.PermissionName == routePermission[1])
            if (isHaveSubsystem) {
                return true
            } else {
                return true
            }
        }
    } else {
        return true
    }
}