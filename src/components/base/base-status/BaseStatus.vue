<template>
    <div class="status" :class="statusType">{{ statusName }}</div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
    status: number;
}>();

const statusType = ref("");
const statusName = ref("");

switch (props.status) {
    case 0:
        statusType.value = "inactivated";
        statusName.value = "Ngừng kích hoạt";
        break;
    case 1:
        statusType.value = "activated";
        statusName.value = "Đang kích hoạt";
        break;
}
</script>
<style lang="scss" scoped>
.status {
    width: max-content;
    padding: 0 4px;
    color: white;
    border-radius: 10px;
}

.inactivated {
    background-color: red;
}

.activated {
    background-color: green;
}
</style>
