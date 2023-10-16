<template>
    <div class="page-403">
        <img src="../../assets/images/common/403-forbidden.png" alt="" />
        <h2>{{ t('page.page403.title') }}</h2>
        <p>{{ t('page.page403.content') }}</p>
    </div>
</template>

<script setup lang="ts">
import { handleAppMounted, handleAppUnmounted } from '@/utils';
import { onBeforeUnmount, onMounted } from 'vue';
import { useI18n } from 'vue3-i18n';

// #region common
const { t } = useI18n();

onMounted(() => {
    handleAppMounted();
});

onBeforeUnmount(() => handleAppUnmounted());
// #endregion
</script>

<style lang="scss" scoped>
.page-403 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 140;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: var(--app-color-white);
    img {
        width: 330px;
    }
    h2 {
        margin-top: 16px;
    }
    p {
        margin-top: 8px;
    }
}
</style>
