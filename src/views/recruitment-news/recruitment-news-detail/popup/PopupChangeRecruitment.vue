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
            <h2>Chuyển tin tuyển dụng</h2>
            <div class="p-[8px]">
                <div class="field">
                    <div class="lable">Tin tuyển dụng <span style="color: red;">*</span>
                    </div>
                    <base-select-box :config="selectBoxConfig" v-model="selectedRecruitmentID"/>
                </div>
                <div class="field">
                    <div class="lable">Hình thức chuyển <span style="color: red;">*</span>
                    </div>
                    <base-radio-group :config="chooseConfig" v-model="selectedChoose"/>
                </div>
                <div class="field">
                    <div class="lable">Đợt tuyển dụng <span style="color: red;">*</span>
                    </div>
                    <base-radio-group ref="periodRef" :config="periodConfig" v-model="selectedPeriod"/>
                </div>
                <div class="field">
                    <div class="lable">Vòng tuyển dụng <span style="color: red;">*</span>
                    </div>
                    <base-radio-group ref="roundRef" :config="recruitmentRoundConfig" v-model="selectedRound"/>
                </div>
                
            </div>
        </template>
    </base-popup>
</template>
<script setup lang="ts">
import { useToastStore } from "../../../../stores";
import { ToastType } from "../../../../enums";
import { DxPopup, DxRadioGroup, DxSelectBox } from "devextreme-vue";
import { ref } from "vue";
import {
    BasePopup,
    BaseRadioGroup,
    BaseSelectBox,
} from "../../../../components/base/index";
import { PagingRequest, RecruitmentPeriodModel, RecruitmentRoundModel } from "../../../../models";
import RecruitmentDetailApi from "../../../../apis/recruitment-detail-api/recruitment-detail-api"
import CustomStore from "devextreme/data/custom_store";
import RecruitmentApi from "../../../../apis/recruitment/recruitment-api";

const recruitmentDetailApi = new RecruitmentDetailApi();

const recruitmentApi = new RecruitmentApi()

const periodRef = ref<InstanceType<typeof DxRadioGroup>>()
const roundRef = ref<InstanceType<typeof DxRadioGroup>>()

 const props = withDefaults(defineProps<{
    isShowPopup: boolean
    recruitmentID: number
    selectedKey: number[]
}>(), {
    isShowPopup: false,
    recruitmentID: 0
});

const emit = defineEmits(["onClose", "onSave"]);

const popupConfig = ref<DxPopup>({
    height: "auto",
    width: 500,
    wrapperAttr: {
        class: "popup-change-round"
    }
});

const selectedChoose = ref(1)
const selectedRound = ref()
const selectedRecruitmentID = ref()
const selectedPeriod = ref()

let listRound: RecruitmentRoundModel[] = []
let listPeriod: RecruitmentPeriodModel[] = []

const listRecruitment = new CustomStore({
    key: "RecruitmentID",
    async load(loadOptions) {
        const filterPaging = new PagingRequest()
        filterPaging.PageIndex = 1
        filterPaging.PageSize = 1000
        filterPaging.CustomFilter = btoa(JSON.stringify([["RecruitmentID", "<>", props.recruitmentID]]))
        const res = await recruitmentApi.getFilterPaging(filterPaging);
        return res.data.Data.Data || [];
    },
    async byKey(key) {
        const res = await recruitmentApi.getByID(key);
        return res.data.Data || [];
    },
    loadMode: "raw",
})

const selectBoxConfig = ref<DxSelectBox>({
    width: '100%',
    placeholder: 'Chọn tin tuyển dụng',
    noDataText: 'Không có dữ liệu',
    displayExpr: "Title",
    valueExpr: "RecruitmentID",
    dataSource: listRecruitment,
    searchEnabled: true,
    onItemClick(e) {
        listRound = e.itemData.RecruitmentRounds
        listPeriod = e.itemData.RecruitmentPeriods
        if(listPeriod.length){
            selectedPeriod.value = listPeriod[0].RecruitmentPeriodID
        }
        selectedRound.value = listRound[0].RecruitmentRoundID
        periodRef.value.getInstance().option("items", listPeriod)
        roundRef.value.getInstance().option("items", listRound)
    },
})

const toastStore = useToastStore();

const popupRef = ref<InstanceType<typeof DxPopup>>();

const chooseConfig = ref<DxRadioGroup>({
    items: [
        {
            id: 1,
            text: "Chuyển hắn sang tin khác"
        },
        {
            id: 2,
            text: "Giữ ứng viên ở cả 2 tin"
        }
    ],
    layout: "horizontal",
    valueExpr: "id",
    displayExpr: "text",
    onValueChanged(e) {
        selectedChoose.value = e.value
    }
})


const recruitmentRoundConfig = ref<DxRadioGroup>({
    items: listRound,
    layout: "vertical",
    valueExpr: "RecruitmentRoundID",
    displayExpr: "RecruitmentRoundName",
    onValueChanged(e) {
        selectedRound.value = e.value
    }
})

const periodConfig = ref<DxRadioGroup>({
    items: listRound,
    layout: "vertical",
    valueExpr: "RecruitmentPeriodID",
    displayExpr: "PeriodName",
    onValueChanged(e) {
        selectedPeriod.value = e.value
    }
})

function handleClose(){
    emit("onClose")
}

async function handleSave(){
    if(!selectedRecruitmentID.value){
        toastStore.toggleToast(true, "Vui lòng chọn tin tuyển dụng", ToastType.warning);
        return
    }
    const res = await recruitmentDetailApi.changeRecruitment(props.selectedKey, selectedRecruitmentID.value, selectedChoose.value,selectedRound.value,selectedPeriod.value)
    if(res && res.data.Success){
        toastStore.toggleToast(true, "Chuyển vòng thành công", ToastType.success);
    }else{
        toastStore.toggleToast(true, "Chuyển vòng thất bại", ToastType.error);
    }
    emit("onSave")
}

</script>
<style lang="scss" scoped>
    .field{
        margin-bottom: 12px; 
        .lable{
            display: block;
            font-size: 14px;
            color: #1e2633;
            height: 25px!important;
            line-height: 25px!important;
            font-family: Roboto;
            font-weight: 500;
        }
    }
</style>