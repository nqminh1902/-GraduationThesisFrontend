<template>
    <div class="base-paging">
        <div class="total">
            <span>Tổng: </span>
            <span class="font-medium">{{ totalRecord }}</span>
        </div>
        <div class="paging"></div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
    totalRecord: number;
}>();
</script>
<style lang="scss" scoped>
.base-paging {
    width: 100%;
    height: 46px;
    background-color: #eee;
    border-radius: 0px 0px 8px 8px;
    display: flex;
    padding: 0px 16px;
    .total {
        line-height: 46px;
    }
    .paging {
    }
}
</style>
