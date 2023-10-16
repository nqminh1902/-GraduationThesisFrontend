<template>
    <div class="base-auto-complete">
        <dx-autocomplete
            ref="autoCompleteRef"
            v-bind="autoCompleteConfig"
            v-model="internalValue"
        />
    </div>
</template>

<script setup lang="ts">
import { mergeObjects } from "@/utils";
import { DxAutocomplete } from "devextreme-vue/autocomplete";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue3-i18n";

// #region common
const { t, getLocale } = useI18n();

const props = defineProps<{
    config: DxAutocomplete;
    modelValue?: string | number | undefined;
}>();

const emit = defineEmits(["update:modelValue", "onValueChange"]);

const internalValue = computed({
    get() {
        return props.modelValue ?? props.config.value ?? "";
    },
    set(newValue) {
        emit("update:modelValue", newValue.toString().trim());
        emit("onValueChange", newValue.toString().trim());
    },
});

const defaultConfig: DxAutocomplete = {
    height: 38,
    width: "100%",
    disabled: false,
    showClearButton: true,
    placeholder: t("base.general.typeValue"),
};

const autoCompleteConfig: DxAutocomplete = mergeObjects(
    defaultConfig,
    props.config
);

const autoCompleteRef = ref<InstanceType<typeof DxAutocomplete>>();

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            autoCompleteRef.value.instance?.option(
                "placeholder",
                t("base.general.typeValue")
            );
        }
    }
);
// #endregion

defineExpose({
    getInstance: () => autoCompleteRef.value?.instance,
    focus: () => autoCompleteRef.value?.instance?.focus(),
});
</script>

<style lang="scss" scoped>
.base-auto-complete {
    .dx-textbox.dx-state-hover {
        border-color: var(--app-color-primary) !important;
    }
    .dx-textbox.dx-state-focused {
        border-color: var(--app-color-primary) !important;
    }
}
</style>
