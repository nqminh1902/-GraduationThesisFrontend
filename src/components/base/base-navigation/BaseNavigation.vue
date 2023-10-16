<template>
    <div class="base-navigation">
        <div class="navigation-left">
            <div class="total">
                {{ t("navigation.total") }}
                <span class="total-text">{{ totalRecord }}</span>
                {{ t("navigation.record") }}
            </div>
        </div>
        <div class="navigation-right d-flex-center">
            <div class="record-per-page d-flex-center m-r-15">
                <span class="m-r-4"
                    >{{ t("navigation.numberOfRecords") }}{{ t("sign.slash")
                    }}{{ t("navigation.page") }}</span
                >
                <base-select-box
                    v-model="navigation.pageSize"
                    :config="selectBoxConfig"
                />
            </div>
            <div class="from-to-record m-r-15">
                {{ fromNumber }}{{ t("sign.dash") }}{{ toNumber }}
                {{ t("navigation.record") }}
            </div>
            <div class="controls d-flex-center">
                <div
                    class="previous cpointer m-r-10"
                    @click="handleChangePage(false)"
                >
                    <Icon
                        icon="ooui:next-rtl"
                        :class="navigation.pageIndex == 1 && 'opacity03'"
                    />
                </div>
                <div class="next cpointer" @click="handleChangePage()">
                    <Icon
                        icon="ooui:next-ltr"
                        :class="
                            Math.ceil(totalRecord / navigation.pageSize) <=
                                navigation.pageIndex && 'opacity03'
                        "
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { DxSelectBox } from "devextreme-vue";
import { BaseSelectBox } from "..";
import { useI18n } from "vue3-i18n";
import type { BaseNavigationType } from "@/types";
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";

// #region common
const { t } = useI18n();

const emit = defineEmits<{
    (e: "onNavigationChange", paging: BaseNavigationType): void;
}>();

const props = defineProps<{
    totalRecord: number;
}>();

const navigation = ref<BaseNavigationType>({
    pageIndex: 1,
    pageSize: 15,
    isChangePageSize: false,
});

const fromNumber = computed(() => {
    return navigation.value.pageSize * (navigation.value.pageIndex - 1) + 1;
});

const toNumber = computed(() => {
    return navigation.value.pageSize * navigation.value.pageIndex >
        props.totalRecord
        ? props.totalRecord
        : navigation.value.pageSize * navigation.value.pageIndex;
});
// #endregion

// #region config
const selectBoxConfig = ref<DxSelectBox>({
    width: 80,
    dataSource: [15, 25, 50, 100],
    searchEnabled: false,
    onValueChanged: (e) => {
        navigation.value.pageIndex = 1;
        navigation.value.pageSize = e.value;
        navigation.value.isChangePageSize = true;
        emit("onNavigationChange", navigation.value);
    },
});
// #endregion

// #region handle change page
const handleChangePage = (isNextPage: boolean = true) => {
    if (isNextPage) {
        if (
            Math.ceil(props.totalRecord / navigation.value.pageSize) >
            navigation.value.pageIndex
        ) {
            navigation.value.pageIndex++;
            navigation.value.isChangePageSize = false;
            emit("onNavigationChange", navigation.value);
        }
    } else {
        if (navigation.value.pageIndex > 1) {
            navigation.value.pageIndex--;
            navigation.value.isChangePageSize = false;
            emit("onNavigationChange", navigation.value);
        }
    }
};
// #endregion
</script>

<style lang="scss" scoped>
.base-navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 46px;
    padding: 10px 20px;
    background-color: var(--app-color-background);
    .controls {
        .previous,
        .next {
            padding: 6px;
            cursor: pointer;
        }
    }
    .opacity03 {
        opacity: 0.3;
    }
}
</style>
