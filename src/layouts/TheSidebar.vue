<template>
    <div class="sidebar-admin">
        <div class="sidebar-list">
            <dx-scroll-view :height="'100%'">
                <router-link
                    class="sidebar-item cursor-pointer"
                    :class="{active: index == selected}"
                    v-for="(item, index) in recruitmentSidebar"
                    :key="index"
                    :to="{ name: item.name }"
                    @click="handleClicked(index)"
                >
                    <Icon
                        :icon="item.icon"
                        :color="index == selected ? '#ffffff' : '#2563eb'"
                        width="24"
                        height="24"
                        class="mx-6"
                    />
                    <div class="sidebar-title">{{ item.title }}</div>
                </router-link>
            </dx-scroll-view>
        </div>
        <div class="sidebar-footer">
            <Icon
                :icon="'material-symbols:logout'"
                :color="'#ffffff'"
                width="24"
                height="24"
            />
            <div class="sidebar-logout">{{ t("theAccount.logOut") }}</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue3-i18n";
import { useRoute, useRouter } from "vue-router";
const { t, getLocale, setLocale } = useI18n();
import { DxScrollView } from "devextreme-vue/scroll-view";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { recruitmentSidebar } from "../mocks/sidebar-item";

const route = useRoute();
const router = useRouter();
const selected = ref(0);

function handleClicked(index: number) {
    selected.value = index;
}
</script>
<style lang="scss" scoped>
.sidebar-admin {
    width: 220px;
    height: calc(100vh - 48px);
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid #e0e6ec;
    .sidebar-header {
        width: 100%;
        height: 48px;
        padding: 12px 0;
        border-radius: 10px 10px 0px 0px;
        margin-bottom: 8px;
        background-color: #F5F7F8;
        .brand-name {
            margin-left: 6px;
            font-weight: 600;
            color: var(--app-color-pure-black);
        }
    }
    .sidebar-list {
        flex: 1;
        width: 100%;
        padding: 16px 0px;
        .sidebar-item {
            padding: 12px 0px;
            margin: 0px 12px 8px;
            border-radius: 4px;
            display: flex;
            color: var(--color-admin-primary);
            .sidebar-title {
                font-size: 16px;
            }
            &:hover {
                background-color: #eee;
            }
        }
        .sidebar-item.active {
            background-color: var(--color-admin-primary);
            color: #ffffff;
        }
    }
    .sidebar-footer {
        width: 100%;
        height: 56px;
        background-color: var(--color-admin-primary);
        border-radius: 0px 0px 10px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        .sidebar-logout {
            font-size: 16px;
            color: #ffffff;
        }
    }
}
</style>

