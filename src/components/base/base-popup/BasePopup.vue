<template>
    <dx-popup
        v-bind="popupConfig"
        :visible="popupVisible"
        @hidden="handleClosePopup()"
    >
        <template #headerTemplete>
            <slot name="header">
                <div class="base-header" v-if="popupConfig.showTitle">
                    <div class="base-header-title">{{ title }}</div>
                    <div
                        class="close-btn"
                        v-if="!popupConfig.showTitle"
                        @click="handleClosePopup()"
                    >
                        <Icon icon="fa6-solid:xmark" />
                    </div>
                </div>
            </slot>
        </template>
        <template #contentTemplete>
            <div class="base-popup">
                <div
                    class="close-btn"
                    v-if="!popupConfig.showTitle"
                    @click="handleClosePopup()"
                >
                    <Icon icon="fa6-solid:xmark" />
                </div>
                <div class="base-body">
                    <slot name="body"></slot>
                </div>

                <slot name="footer">
                    <div class="base-footer" v-if="showBtnFooter">
                        <base-button :config="closeBtn" />
                        <base-button :config="saveBtn" class="m-l-8" />
                    </div>
                </slot>
            </div>
        </template>
    </dx-popup>
</template>

<script setup lang="ts">
import { DxPopup } from "devextreme-vue/popup";
import { BaseButton } from "..";
import { mergeObjects } from "../../../utils";
import { DxButton } from "devextreme-vue";
import { defaultBasePopupConfig } from "@/constants/components/base";
import { Icon } from "@iconify/vue";
import { ButtonStylingMode, ButtonType } from "@/enums";
import { useI18n } from "vue3-i18n";
import { ref } from "vue";

// #region common
const { t } = useI18n();

const props = defineProps<{
    config: DxPopup;
    showBtnFooter?: boolean;
    popupVisible: boolean;
    title?: string;
}>();

const popupConfig: DxPopup = mergeObjects(defaultBasePopupConfig, props.config);

const emit = defineEmits(["close", "save"]);
// #endregion

// #region config
const saveBtn = ref<DxButton>({
    width: "auto",
    height: 30,
    text: t("base.button.save"),
    onClick: () => {
        emit("save");
    },
});

const closeBtn = ref<DxButton>({
    width: "auto",
    height: 30,
    stylingMode: ButtonStylingMode.contained,
    type: ButtonType.normal,
    text: t("base.button.cancel"),
    onClick: () => {
        handleClosePopup();
    },
});
// #endregion

function handleClosePopup() {
    emit("close");
}
</script>

<style lang="scss">
.base-popup {
    display: flex;
    flex-direction: column;
    .base-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &-title {
            font-size: 20px;
            font-weight: 600;
        }
    }
    .close-btn {
        background-color: var(--app-color-primary);
        border-radius: 50%;
        position: absolute;
        right: -12px;
        top: -10px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 26px;
        height: 26px;
        cursor: pointer;
        svg {
            color: var(--app-color-white);
        }
    }
    .base-body {
        flex: 1;
    }
    .base-footer {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .dx-popup-content {
        padding: 16px;
    }

    .dx-overlay-content {
        overflow: visible;
    }
    .dx-popup-title {
        border-bottom: none;
    }
}
.dx-overlay-shader {
    background-color: var(--app-color-bg-overlay) !important;
}
</style>
