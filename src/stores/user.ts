import { PermissionModel, UserModel } from "@/models";
import { defineStore } from "pinia";


export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: null,
        permissions: [] as PermissionModel[]
    }),
    getters: {
        getUser(state) {
            if (!state.user) {
                state.user = JSON.parse(localStorage.getItem('user') || "");
            }
            return state.user;
        },
        getPermission(state) {
            if (!state.permissions.length) {
                state.permissions = JSON.parse(localStorage.getItem('permissions') || "");
            }
            return state.permissions;
        }
    },
    actions: {
        setUser(data: any) {
            this.user = data
        },

        setPermission(data: PermissionModel[]) {
            this.permissions = data;
        },

        removeUser() {
            this.user = null;
            localStorage.removeItem('user');
        },

        removePermission() {
            this.permissions = [];
            localStorage.removeItem('permissions');
        }

    },
});

