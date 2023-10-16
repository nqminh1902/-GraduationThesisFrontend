<template>
    <div id="admin">
        <div class="left-admin">
            <sidebar-admin />
        </div>
        <div class="right-admin">
            <div class="header-admin">
                <header-admin />
            </div>
            <div class="content">
                <transition name="fade">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";
import HeaderAdmin from "./header/HeaderAdmin.vue";
import SidebarAdmin from "./sidebar/SidebarAdmin.vue";
</script>

<style lang="scss" scoped>
#admin {
    width: 100%;
    height: 100vh;
    display: flex;
    background-color: var(--color-admin-background);
}
.left-admin {
    width: 230px;
    height: 100vh;
    padding: 8px 0px 8px 8px;
    background-color: var(--color-admin-background);
}
.right-admin {
    flex: 1;
    width: calc(100% - 230px);
    height: 100vh;
    .header-admin {
        width: 100%;
        height: 56px;
    }
    .content {
        width: 100%;
        height: calc(100vh - 56px);
    }
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease-out;
}
</style>
