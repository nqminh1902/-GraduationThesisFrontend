<template>
    <base-popup
        v-if="isShowPopup"
        :config="popupConfig"
        :showBtnFooter="true"
        :popupVisible="isShowPopup"
        @close="handleClose"
        @save="handleSave"
        ref="popupRef"
    >
        <template #body>
            <h2>Chuyển thành nhân viên</h2>
            <div class="p-[8px]">
                <div>Bạn có chắc chắn muốn chuyển những ứng viên đã chọn thành nhân viên không?</div>
            </div>
        </template>
    </base-popup>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { DxPopup, DxSelectBox } from "devextreme-vue";
import { useToastStore } from "../../../../stores";
import { ToastType } from "../../../../enums";
import RecruitmentDetailApi from "../../../../apis/recruitment-detail-api/recruitment-detail-api"
import {
    BasePopup,
    BaseRadioGroup,
    BaseSelectBox
} from "../../../../components/base/index";
import CustomStore from "devextreme/data/custom_store";

const recruitmentDetailApi = new RecruitmentDetailApi();
 const props = withDefaults(defineProps<{
    isShowPopup: boolean
    ids: number[]
    recruitmentID: number
}>(), {
    isShowPopup: false,
});

const emit = defineEmits(["onClose", "onSave"]);

const selectedValue = ref(0)

const popupConfig = ref<DxPopup>({
    height: "auto",
    width: 500,
    wrapperAttr: {
        class: "popup-change-round"
    }
});

const toastStore = useToastStore();

function handleClose(){
    emit("onClose")
}

async function handleSave(){
        let res = await recruitmentDetailApi.transferToEmployee(props.ids, selectedValue.value, props.recruitmentID)
        if(res && res.data.Success){
            toastStore.toggleToast(true, "Chuyển ứng viên thành nhân viên thành công", ToastType.success);
        }else{
            toastStore.toggleToast(true, "Chuyển ứng viên thành nhân viên thất bại", ToastType.error);
        }
        emit("onSave")
    
}

</script>
<style lang="scss">
    
</style>