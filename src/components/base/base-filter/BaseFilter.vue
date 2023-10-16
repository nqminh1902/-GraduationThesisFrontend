<template>
    <div class="base-filter">
        <div class="filer-left">
            <div class="search-box" v-if="isShowTextBox()">
                <base-text-box :config="finalTextBoxConfig" />
            </div>
        </div>
        <div class="filter-right">
            <span class="label">{{
                config.textSelectBox || defaultConfig.textSelectBox
            }}</span>
            <base-select-box
                ref="baseSelectBoxRef"
                :config="finalSelectBoxConfig"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { BaseSelectBox, BaseTextBox } from "@/components/base";
import type { BaseFilterType } from "@/types";
import { mergeObjects } from "@/utils";
import type { DxSelectBox, DxTextBox } from "devextreme-vue";
import { ref, watch } from "vue";
import { useI18n } from "vue3-i18n";

// #region common
const { t, getLocale } = useI18n();

const props = defineProps<{
    config: BaseFilterType;
}>();

const emit = defineEmits<{
    (e: "onSelectValueChanged", value: any): void;
    (e: "onSearchValueChanged", value: any): void;
}>();

const isShowTextBox = (): boolean => {
    if (
        props.config.isShowSearchBox ||
        props.config.isShowSearchBox === undefined
    ) {
        return true;
    }
    return false;
};

const defaultConfig = ref<BaseFilterType>({
    isShowSearchBox: true,
    textSelectBox: t("base.filter.sortBy"),
    selectBoxConfig: {
        dataSource: [
            t("base.filter.options.relevance"),
            t("base.filter.options.nameAZ"),
            t("base.filter.options.nameZA"),
            t("base.filter.options.priceLH"),
            t("base.filter.options.priceHL"),
        ],
        placeholder: t("base.general.selectValue"),
        onValueChanged: (e) => {
            emit("onSelectValueChanged", e.value);
        },
    },
});

const searchDefaultConfig: DxTextBox = {
    width: 260,
    placeholder: t("base.general.typeValue"),
    buttons: [
        {
            name: "BtnSearch",
            location: "before",
            options: {
                icon: "search",
            },
        },
    ],
    onValueChanged: (e) => {
        emit("onSearchValueChanged", e.value);
    },
};

const finalTextBoxConfig: DxTextBox = mergeObjects(
    searchDefaultConfig,
    props.config.textboxConfig || {}
);

const finalSelectBoxConfig: DxSelectBox = mergeObjects(
    defaultConfig.value.selectBoxConfig || {},
    props.config.selectBoxConfig
);
// #endregion

// #region localize
const baseSelectBoxRef = ref();

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            baseSelectBoxRef.value
                ?.getInstance()
                .option("placeholder", t("base.general.selectValue"));
            baseSelectBoxRef.value
                ?.getInstance()
                .option("dataSource", [
                    t("base.filter.options.relevance"),
                    t("base.filter.options.nameAZ"),
                    t("base.filter.options.nameZA"),
                    t("base.filter.options.priceLH"),
                    t("base.filter.options.priceHL"),
                ]);
        }
    }
);
// #endregion
</script>

<style lang="scss">
.base-filter {
    .dx-texteditor-container {
        .dx-button-mode-contained {
            border-color: transparent;
        }
    }
    .dx-button-mode-contained {
        &.dx-state-hover,
        &.dx-state-active,
        &.dx-state-focused {
            background-color: var(--app-color-white);
        }
    }
}
</style>

<style lang="scss" scoped>
.base-filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 56px;
    padding: 10px 20px;
    margin-bottom: 40px;
    background-color: var(--app-color-background);
    .filter-right {
        display: flex;
        align-items: center;
        .label {
            margin-right: 18px;
            font-weight: 600;
        }
    }
    .filer-left {
        display: flex;
        align-items: center;
        span:first-child {
            margin-right: 10px;
        }
    }
}
</style>
