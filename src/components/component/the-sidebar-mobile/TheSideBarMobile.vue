<template>
    <div>
        <transition name="fade">
            <div class="the-sidebar-mobile" v-show="isExpand">
                <div class="sidebar-header">
                    <a href="/" class="header-center-left unselect">
                        <div class="logo-wrapper">
                            <img
                                src="@/assets/icons/logo-circle.png"
                                :alt="`Logo ${t('app.name')}`"
                            />
                        </div>
                        <div class="brand-name">{{ t("app.name") }}</div>
                    </a>
                    <Icon
                        class="cursor-pointer"
                        icon="iconamoon:close-duotone"
                        color="#ff6000"
                        width="24"
                        height="24"
                        @click="toggleExpand"
                    />
                </div>
                <nav class="p-5 w-full">
                    <ul class="w-full">
                        <li
                            v-for="item of headerBelow"
                            class="header-below-item font-medium"
                            :key="item.id"
                        >
                            <div class="justify-between flex">
                                <router-link to="/">{{
                                    item.title
                                }}</router-link>
                                <Icon
                                    class="cursor-pointer"
                                    icon="uil:plus"
                                    width="16"
                                    height="16"
                                    color="#999"
                                    v-if="
                                        openHeaderChild != item.id &&
                                        item.children.length > 0
                                    "
                                    @click="toggleOpenChild(item.id)"
                                />
                                <Icon
                                    class="cursor-pointer"
                                    icon="majesticons:minus"
                                    width="16"
                                    height="16"
                                    color="#999"
                                    v-else-if="openHeaderChild == item.id"
                                    @click="toggleOpenChild()"
                                />
                            </div>
                            <ul v-show="openHeaderChild == item.id">
                                <li
                                    class="pl-3 font-medium"
                                    v-for="child of item.children"
                                    :key="child.id"
                                >
                                    <router-link to="/">{{
                                        child.title
                                    }}</router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </transition>
        <transition name="fade-opacity">
            <div class="overlay" v-show="isExpand" @click="toggleExpand"></div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { Icon } from "@iconify/vue";
import { headerBelow } from "@/constants/views";
import { useI18n } from "vue3-i18n";

// #region common
const { t, getLocale, setLocale } = useI18n();

const props = defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();

const isExpand = computed({
    get() {
        return props.modelValue ?? false;
    },
    set(newValue) {
        emit("update:modelValue", newValue);
    },
});
// #endregion

const activeItem = ref<number>(1);

function isActiveItem(id: number) {
    return activeItem.value === id;
}

const toggleExpand = () => {
    isExpand.value = !isExpand.value;
};

const openHeaderChild = ref<any>(null);

function toggleOpenChild(id?: number) {
    if (id) {
        openHeaderChild.value = id;
    } else {
        openHeaderChild.value = null;
    }
}
</script>

<style lang="scss" scoped>
.the-sidebar-mobile {
    position: fixed;
    top: 0;
    right: 0;
    width: 340px;
    height: 100vh;
    background-color: var(--app-color-white);
    z-index: 120;
    .sidebar-header {
        width: 100%;
        display: flex;
        padding: 20px;
        flex-wrap: wrap;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        justify-content: space-between;
        border-bottom: 1px solid var(--app-color-border-lighter);
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
.active {
    color: var(--app-color-pure-black);
    &:hover {
        cursor: pointer;
        transition: 0.2s;
        color: var(--app-color-pure-black);
    }
}
</style>
