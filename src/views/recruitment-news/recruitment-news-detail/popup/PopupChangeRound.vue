

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
            <h2>Chuyển vòng</h2>
            <div class="p-[8px]">
                <base-radio-group :config="recruitmentRoundConfig" v-model="selectedRound"/>
            </div>
        </template>
    </base-popup>
</template>
<script setup lang="ts">
import { useToastStore } from "../../../../stores";
import { ToastType } from "../../../../enums";
import { DxPopup, DxRadioGroup } from "devextreme-vue";
import { ref } from "vue";
import {
    BasePopup,
    BaseRadioGroup,
} from "../../../../components/base/index";
import { RecruitmentRoundModel } from "../../../../models";
import RecruitmentDetailApi from "../../../../apis/recruitment-detail-api/recruitment-detail-api"

const recruitmentDetailApi = new RecruitmentDetailApi();

 const props = withDefaults(defineProps<{
    isShowPopup: boolean
    recruitmentRound: RecruitmentRoundModel[]
    ids: number[]
}>(), {
    isShowPopup: false,
});

const emit = defineEmits(["onClose", "onSave"]);

const popupConfig = ref<DxPopup>({
    height: "auto",
    wrapperAttr: {
        class: "popup-change-round"
    }
});

const selectedRound = ref(props.recruitmentRound[0].RecruitmentRoundID)

const toastStore = useToastStore();

const popupRef = ref<InstanceType<typeof DxPopup>>();

const recruitmentRoundConfig = ref<DxRadioGroup>({
    items: props.recruitmentRound,
    layout: "vertical",
    valueExpr: "RecruitmentRoundID",
    displayExpr: "RecruitmentRoundName",
    onValueChanged(e) {
        selectedRound.value = e.value
    }
})

function handleClose(){
    emit("onClose")
}

async function handleSave(){
    let round = null
    props.recruitmentRound.forEach((item) => {
        if(item.RecruitmentRoundID == selectedRound.value){
            round = item
        }
    })
    if(round){
        const res = await recruitmentDetailApi.changeRoundCandidate(round, props.ids)
        if(res && res.data.Success){
            toastStore.toggleToast(true, "Chuyển vòng thành công", ToastType.success);
        }else{
            toastStore.toggleToast(true, "Chuyển vòng thất bại", ToastType.error);
        }
        emit("onSave")
    }
}

</script>
<style lang="scss">
    
</style>