<template>
    <div class="header-admin">
        <div class="dark-mode">
            <Icon
                :icon="'ph:moon'"
                :color="!darkMode ? 'yellow' : '#2563eb'"
                width="24"
                height="24"
            />
            <base-switch
                :config="switchConfig"
                v-model="darkMode"
                class="mx-1.5"
            />
            <Icon
                :icon="'ph:sun'"
                :color="darkMode ? 'yellow' : '#2563eb'"
                width="24"
                height="24"
            />
        </div>
        <div class="account">
            <div class="user-avatar">
                <img
                    src="https://ik.imagekit.io/2hun4xkhf/web%20image/minh.jpg?updatedAt=1692462541669"
                    alt="Nguyễn Quang Minh"
                    style="width: 24px; height: 24px; border-radius: 50%"
                />
            </div>
            <div class="user-name">Nguyễn Quang Minh</div>
            <Icon
                :icon="'bxs:down-arrow'"
                :color="'#2563eb'"
                width="14"
                height="14"
                class="cursor-pointer"
                id="account"
            />
        </div>
        <DxPopover
            :width="150"
            :shading="true"
            target="#account"
            show-event="click"
            position="bottom"
            shading-color="rgba(0, 0, 0, 0.1)"
        >
            <div class="account-item">
                <Icon
                    :icon="'mdi:user-outline'"
                    :color="'#2563eb'"
                    width="14"
                    height="14"
                    class="cursor-pointer mr-1.5"
                />
                {{ t("theAccount.account") }}
            </div>
            <div class="account-item">
                <Icon
                    :icon="'material-symbols:logout'"
                    :color="'#2563eb'"
                    width="14"
                    height="14"
                    class="cursor-pointer mr-1.5"
                />
                {{ t("theAccount.logOut") }}
            </div>
        </DxPopover>
    </div>
</template>
<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { DxSwitch } from "devextreme-vue";
import { ref, watch } from "vue";
import { BaseSwitch } from "../../../components/base";
import { DxPopover } from "devextreme-vue/popover";
import { useI18n } from "vue3-i18n";

// #region common
const { t } = useI18n();
const darkMode = ref(false);

const switchConfig = ref<DxSwitch>({});
</script>
<style lang="scss">
.header-admin {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 16px;
    .dx-switch-handle::before {
        background-color: var(--color-admin-primary) !important;
    }
    &.dx-switch.dx-state-focused,
    &.dx-switch.dx-state-active,
    &.dx-switch.dx-state-hover {
        .dx-switch-container {
            border-color: var(--color-admin-primary) !important;
        }
    }
    .dark-mode {
        display: flex;
    }
    .account {
        display: flex;
        margin-left: 16px;
        align-items: center;
        .user-name {
            margin: 0 4px;
        }
    }
}
.account-item {
    width: 100%;
    padding: 8px;
    color: var(--color-admin-primary);
    display: flex;
    cursor: pointer;
    align-items: center;
}
</style>
