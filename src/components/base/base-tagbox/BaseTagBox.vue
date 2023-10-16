<template>
    <dx-tag-box
        ref="dxTagBoxRef"
        v-model="internalValue"
        v-bind="tagboxConfig"
    >
    </dx-tag-box>
</template>

<script setup lang="ts">
import { mergeObjects } from '@/utils';
import { defaultBaseTagBoxConfig } from '@/constants/components/base';
import { Icon } from '@iconify/vue';
import { computed, ref, watch } from 'vue';
import DxTagBox from 'devextreme-vue/tag-box';
import i18n from '@/locales/i18n';
const t = i18n.t;
// #region common
const props = defineProps<{
    config: DxTagBox;
    modelValue?: any;
}>();

const defaultConfig = ref<DxTagBox>({
    width: '100%',
    height: 40,
    disabled: false,
    readOnly: false,
    searchEnabled: true,
    focusStateEnabled: true,
    hoverStateEnabled: true,
    searchMode: "contains",
    multiline: false,
    placeholder: t('base.general.selectValue'),
    dropDownButtonTemplate: 'iconTemplate',
    elementAttr: {
        class: 'base-tag-box',
    },
    onSelectionChanged(e) {
        handleValueChange(e)
        
    },
})

const tagboxConfig: DxTagBox = mergeObjects(
    defaultConfig.value || {},
    props.config
)

const emit = defineEmits<{
    (e: 'update:modelValue', value: any): void;
    (e: 'onValueChange', value: any[]): void;
}>();

const internalValue = computed({
    get() {
        return props.modelValue ?? '';
    },
    set(newValue) {
        emit('update:modelValue', newValue);
    },
});

let values: any[] = []
let isFistMouted = true
function handleValueChange(e:any){
    if(isFistMouted){
        isFistMouted = false
        return
    }
    if(e.addedItems.length > 0){
        values.push(...e.addedItems)
    }else if(e.removedItems.length > 0){
        e.removedItems.forEach((item: any) => {
            values = values.filter((value: any) => {
             return value[`${tagboxConfig?.valueExpr ?? ''}`] != item[`${tagboxConfig?.valueExpr ?? ''}`]})
        });
    }
    emit('onValueChange', values)
}
// #endregion

const dxTagBoxRef = ref<InstanceType<typeof DxTagBox>>();

defineExpose({
    getInstance: () => dxTagBoxRef.value?.instance,
});
</script>

<style lang="scss">
.base-select-box {
    &.dx-texteditor.dx-state-hover,
    &.dx-texteditor.dx-state-focused,
    &.dx-texteditor.dx-state-active {
        border-color: var(--app-color-primary);
    }
    &.dx-dropdowneditor.dx-state-active .dx-dropdowneditor-icon,
    &.dx-dropdowneditor.dx-state-focused .dx-dropdowneditor-icon,
    &.dx-dropdowneditor.dx-state-hover:not(.dx-custom-button-hovered)
        .dx-dropdowneditor-icon,
    &.dx-dropdowneditor-button.dx-state-active .dx-dropdowneditor-icon,
    &.dx-dropdowneditor.dx-dropdowneditor-active .dx-dropdowneditor-icon {
        background-color: transparent;
    }
    .dx-dropdowneditor-button {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.dx-dropdownlist-popup-wrapper .dx-empty-message,
.dx-dropdownlist-popup-wrapper .dx-list-item {
    height: 40px;
    margin-top: 2px;
}
.dx-dropdownlist-popup-wrapper
    .dx-list:not(.dx-list-select-decorator-enabled)
    .dx-list-item-content {
    padding: 8px 9px;
}
.dx-list:not(.dx-list-select-decorator-enabled) .dx-list-item {
    &.dx-state-active,
    &.dx-state-focused,
    &.dx-list-item-selected {
        color: var(--app-color-white);
        background-color: var(--app-color-primary);
    }
}
.dx-list:not(.dx-list-select-decorator-enabled) .dx-list-item {
    &.dx-list-item-selected.dx-state-hover,
    &.dx-list-item-selected.dx-state-focused,
    &.dx-list-item-selected.dx-state-active {
        color: var(--app-color-white) !important;
        background-color: var(--app-color-primary) !important;
    }
}
</style>