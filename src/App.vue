<template>
    <div class="">
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { RouterView } from "vue-router";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "./stores";


const userStore = useUserStore()
const {user} = storeToRefs(userStore)
const route = useRoute()
const router = useRouter()

watch(() => route.path, (newPath, oldPath) => {
    if(newPath.includes("login")){
        user.value == null
    }
})
</script>

<style lang="scss" scoped>
</style>
