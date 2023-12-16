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
            <h2>Loại ứng viên</h2>
            <div class="p-[8px]">
                <div class="mb-[8px]" for="">Lý do <span style="color: red;">*</span></div>
                <base-select-box :config="selectBoxConfig" v-model="selectedValue"/>
                <div class="mt-[12px]">
                    <base-check-box :config="candidateConfig" v-model="isSendEmail"/>
                </div>
            </div>
        </template>
    </base-popup>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { DxCheckBox, DxPopup, DxSelectBox } from "devextreme-vue";
import { useToastStore } from "../../../../stores";
import { ToastType } from "../../../../enums";
import RecruitmentDetailApi from "../../../../apis/recruitment-detail-api/recruitment-detail-api"
import {
    BasePopup,
    BaseRadioGroup,
    BaseCheckBox,
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

const selectBoxConfig = ref<DxSelectBox>({
    placeholder: "Chọn lý do loại",
    valueExpr: "EliminateID",
    width: 400,
    displayExpr: "Reason",
    dataSource: [
        {
            EliminateID: 1,
            Reason: "Không phù hợp với văn hóa doanh nghiệp"
        },
        {
            EliminateID: 2,
            Reason: "Không đáp ứng được nhu cầu tuyển dụng"
        },
        {
            EliminateID: 3,
            Reason: "Mức lương đưa ra không phù hợp"
        },
        {
            EliminateID: 4,
            Reason: "Không tham gia thi tuyển/ phỏng vấn"
        }
    ]
})

const candidateConfig = ref<DxCheckBox>({
    text: "Gửi email cho ứng viên"
})

const isSendEmail = ref(false)

const popupConfig = ref<DxPopup>({
    height: "auto",
    width: "auto",
    wrapperAttr: {
        class: "popup-change-round"
    }
});

const toastStore = useToastStore();

function handleClose(){
    emit("onClose")
}

async function handleSave(){
    if(!selectedValue.value){
        toastStore.toggleToast(true, "Vui lòng chọn lý do loại ứng viên", ToastType.warning);
        return
    }
    let res = await recruitmentDetailApi.changeEliminateCandidate(props.ids, selectedValue.value, props.recruitmentID, isSendEmail.value)
    if(res && res.data.Success){
        toastStore.toggleToast(true, "Loại ứng viên thành công", ToastType.success);
    }else{
        toastStore.toggleToast(true, "Loại ứng viên thất bại", ToastType.error);
    }
    emit("onSave")
    
}

</script>
<style lang="scss">
    
</style>