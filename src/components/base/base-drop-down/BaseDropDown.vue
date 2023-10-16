<template>
    <div class="base-dropdown unselect">
        <div class="current-value d-flex-center cpointer">
            <span v-if="!dropdownContent" class="m-r-8">{{
                internalValue
            }}</span>
            <span
                v-else
                class="m-r-8"
                @click="handleSetValue(dropdownContent)"
                >{{ dropdownContent }}</span
            >
            <Icon v-show="dataSource.length > 0" icon="ep:arrow-down-bold" />
        </div>
        <ul class="dropdown-list">
            <li
                v-for="(item, index) of dataSource"
                class="dropdown-item"
                :key="index"
                @click="handleSetValue(item)"
            >
                <Icon v-if="icons" :icon="icons[index]" />
                <span
                    v-if="displayValue"
                    :class="{ active: isActiveItem(item[displayValue]) }"
                    >{{ item[displayValue] }}</span
                >
                <span v-else :class="{ active: isActiveItem(item) }">{{
                    item
                }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, watch } from 'vue';

// #region common
const props = defineProps<{
    modelValue?: any;
    dataSource?: any;
    dropdownContent?: string;
    displayValue?: string;
    valueExpr?: number | string;
    icons?: string[];
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'changeValue', value: string): void;
}>();

const internalValue = ref<string>(props.modelValue ?? '');
// #endregion

// #region handle events
const isActiveItem = (item: string) =>
    item === internalValue.value || item === props.dropdownContent;

const handleSetValue = (value: any) => {
    if (props.modelValue || (props.valueExpr && props.displayValue)) {
        if (typeof value === 'object') internalValue.value = value.title;
        else internalValue.value = value;
        emit('update:modelValue', value);
    }
    emit('changeValue', value);
};

watch(
    () => props.modelValue,
    (currentValue) => {
        internalValue.value = currentValue;
    }
);
// #endregion
</script>

<style lang="scss" scoped>
.base-dropdown {
    width: 100%;
    height: 100%;
    min-width: 130px;
    position: relative;
    .current-value {
        transition: 0.3s;
        justify-content: end;
    }
    &:hover {
        .dropdown-list {
            display: block;
            transition: 0.4s;
        }
        .current-value {
            color: var(--app-color-secondary);
            transition: 0.3s;
        }
    }
    &::after {
        content: '';
        width: 100%;
        height: 6px;
        position: absolute;
        top: 100%;
        left: 0;
        background-color: transparent;
    }
    .dropdown-list {
        display: none;
        position: absolute;
        padding: 0 12px;
        top: calc(100% + 6px);
        right: 0;
        width: max-content;
        min-width: 120px;
        color: var(--app-color-black);
        background-color: var(--app-color-white);
        box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.1);
        animation: fadeIn 0.4s ease-out;
        z-index: 101;
        .dropdown-item {
            display: flex;
            align-items: center;
            &:not(:last-child) {
                border-bottom: 1px solid var(--app-color-border-lighter);
            }
            &:hover {
                cursor: pointer;
                color: var(--app-color-secondary);
            }
            span {
                margin-left: 6px;
                &.active {
                    color: var(--app-color-secondary);
                }
            }
        }
    }
    @keyframes fadeIn {
        from {
            opacity: 0;
            margin-top: 10px;
        }
        to {
            opacity: 1;
            margin-top: 0;
        }
    }
}
</style>
