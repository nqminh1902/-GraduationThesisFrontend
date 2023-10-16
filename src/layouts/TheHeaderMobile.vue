<template>
    <header class="header-mobile">
        <div class="p-4">
            <div class="header-content">
                <Icon
                    width="24"
                    height="24"
                    color="black"
                    class="cursor-pointer"
                    icon="material-symbols:menu"
                    @click="handleOpenSidebar"
                />
                <a href="/" class="header-center-left unselect">
                    <div class="logo-wrapper">
                        <img
                            src="../assets/icons/logo-circle.png"
                            :alt="`Logo ${t('app.name')}`"
                        />
                    </div>
                    <div class="brand-name">{{ t('app.name') }}</div>
                </a>
                <div class="flex">
                    <Icon
                        color="black"
                        width="24"
                        height="24"
                        icon="ic:baseline-search"
                        class="mr-2 icon-search cursor-pointer"
                    />
                    <Icon
                        color="black"
                        width="24"
                        height="24"
                        icon="uil:setting"
                        class="ml-2 cursor-pointer"
                    />
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue3-i18n';

// #region common
const { t, getLocale, setLocale } = useI18n();

const emit = defineEmits<{
    (e: 'onClickMenuMobile'): void;
}>();
// #endregion

function handleOpenSidebar() {
    emit('onClickMenuMobile');
}
</script>

<style lang="scss" scoped>
.header-mobile {
    top: 0px;
    left: 0px;
    z-index: 99;
    width: 100%;
    position: fixed;
    background-color: var(--app-color-white);
    border-bottom: 1px solid var(--app-color-border-lighter);
    .header-content {
        display: flex;
        flex-wrap: wrap;
        -webkit-box-align: center;
        align-items: center;
        justify-content: space-between;
        .header-center-left {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: var(--app-color-black);
            .logo-wrapper {
                img {
                    width: 30px;
                }
            }
            .brand-name {
                margin-left: 6px;
                font-size: 20px;
                font-weight: 600;
                color: var(--app-color-pure-black);
            }
        }
    }
}
.icon-search::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1px;
    height: 100%;
    background-color: var(--app-color-border-lighter);
}
</style>
