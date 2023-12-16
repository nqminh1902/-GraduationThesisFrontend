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
            <h2 style="color: #e54848!important;">Xóa lịch</h2>
            <div class="p-[8px]">
                <div>Lịch sẽ hủy sau khi thực hiện thao tác này, bạn có muốn gửi email thông báo cho hội đồng tuyển dụng và ứng viên không ?</div>
                <div class="h-[12px]"></div>
                <base-check-box :config="councilConfig" v-model="council"/>
                <div class="h-[12px]"></div>
                <base-check-box :config="candidateConfig" v-model="candidate"/>
            </div>
        </template>
    </base-popup>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { DxCheckBox, DxPopup, DxSelectBox } from "devextreme-vue";
import { useToastStore } from "../../../stores";
import { ToastType } from "../../../enums";
import {
    BaseCheckBox,
    BasePopup
} from "../../../components/base/index";
import CandidateScheduleDetailApi from "@/apis/candidate-schedule/candidate-schedule-detail";
import { CandidateScheduleDetailModel } from "../../../models";

 const props = withDefaults(defineProps<{
    isShowPopup: boolean
    scheduleDetail: CandidateScheduleDetailModel
}>(), {
    isShowPopup: false,
});

const emit = defineEmits(["onClose", "onSave"]);

const candidateScheduleDetailApi = new CandidateScheduleDetailApi()

const popupConfig = ref<DxPopup>({
    height: "auto",
    width: 500,
    wrapperAttr: {
        class: "popup-change-round"
    }
});

const council = ref(true)
const candidate = ref(true)

const candidateConfig = ref<DxCheckBox>({
    text: "Thông báo cho úng viên"
})

const councilConfig = ref<DxCheckBox>({
    text: "Thông báo cho hội đồng",
})


const toastStore = useToastStore();

function handleClose(){
    emit("onClose")
}

async function handleSave(){
        let res = await candidateScheduleDetailApi.delete(props.scheduleDetail.CandidateScheduleDetailID)
        if(res && res.data.Success){
            toastStore.toggleToast(true, "Xóa lịch thành công", ToastType.success);
        }else{
            toastStore.toggleToast(true, "Xóa lịch thất bại", ToastType.error);
        }
        emit("onSave")
    
}

</script>
<style lang="scss">
    
</style>