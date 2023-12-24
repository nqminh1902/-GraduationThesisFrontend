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
            <h2 class="px-[8px]">Chỉnh sửa lịch</h2>
            <div class="mt-[16px] px-[8px]" >
                <div class="flex items-center">
                    <div class="recruitment-text font-medium">{{ candidateScheduleDetail.CandidateName }}</div>
                    <div class="recruitment-text ml-[4px]">{{ candidateScheduleDetail.RecruitmentTitle }}</div>
                </div>
            </div>
            <div class="p-[8px] mt-[12px] flex" style="height: calc(100% - 28px);">
                <div class="schedule-form flex-1">
                    <div class="flex">
                        <div class="field flex-1">
                            <div class="lable">Ngày <span style="color: red;">*</span></div>
                            <base-date-box :config="dateConfig" v-model="candidateScheduleDetail.StartTime"/>
                        </div>
                        <div class="w-[12px]"></div>
                        <div class="field flex-1">
                            <div class="lable">Giờ bắt đầu <span style="color: red;">*</span></div>
                            <base-date-box :config="startTimeConfig" v-model="candidateScheduleDetail.StartTime"/>
                        </div>
                        <div class="w-[12px]"></div>
                        <div class="field flex-1">
                            <div class="lable">Thời lượng phút <span style="color: red;">*</span></div>
                            <base-number-box :config="timeConfig" v-model="candidateScheduleDetail.Duration"/>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="field flex-1">
                            <div class="lable">Địa điểm <span style="color: red;">*</span></div>
                            <base-select-box :config="addressConfig" v-model="candidateScheduleDetail.AddressID"/>
                        </div>
                        <div class="w-[12px]"></div>
                        <div class="field flex-1">
                            <div class="lable">Phòng <span style="color: red;">*</span></div>
                            <base-text-box :config="roomConfig" v-model="candidateScheduleDetail.Room"/>
                        </div>
                    </div>
                    <div class="field">
                        <div class="lable">Loại lịch <span style="color: red;">*</span></div>
                        <base-select-box :config="scheduleConfig" v-model="candidateScheduleDetail.ScheduleType"/>
                    </div>
                    <div class="field">
                        <div class="lable">Lưu ý <span style="color: red;">*</span></div>
                        <base-text-area :config="noteConfig" v-model="candidateScheduleDetail.Note"/>
                    </div>
                    <div class="flex">
                        <div class="field flex-1">
                            <base-check-box :config="candidateConfig" v-model="candidateScheduleDetail.IsNotifyCandidate"/>
                        </div>
                        <div class="w-[12px]"></div>
                        <div class="field flex-1">
                            <base-check-box :config="councilConfig" v-model="candidateScheduleDetail.IsNotifyCouncil"/>
                        </div>
                    </div>
                    <!-- <div class="field">
                        <div class="lable">Hội đồng tuyển dụng <span style="color: red;">*</span></div>
                        <div class="flex items-center">
                            <div class="add-new-member" id="add-council">+</div>
                            <div class="flex ml-[4px]" v-for="(item,index) of [1,2,4]" :key="index">
                                <img style="width: 30px; height: 30px; border-radius: 50%;" v-if="false">
                                <div class="text-center" :style="{backgroundColor: getBackGroundColor()}" style="width: 30px; height: 30px; border-radius: 50%;" v-else>
                                    <p class="text-white leading-[30px] text-[13px] font-medium">{{ getInitials('Nguyễn Quang Minh') }}</p>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </template>
    </base-popup>
    <DxPopover 
        :target="'#add-council'"
        show-event="click"
        :visible="false"
        :hideOnOutsideClick="true"
        position="bottom"
        width="auto"
        height="auto"
        >
        <div class="h-[200px]">
            <dx-scroll-view :height="'100%'">
                <div class="flex items-center mb-[8px] cursor-pointer" v-for="(item,index) of [1,2,3,4,5,6,7,8,9,0]" :key="index">
                    <img style="width: 30px; height: 30px; border-radius: 50%;" v-if="false">
                    <div class="text-center" :style="{backgroundColor: getBackGroundColor()}" style="width: 30px; height: 30px; border-radius: 50%;" v-else>
                        <p class="text-white leading-[30px] text-[13px] font-medium">{{ getInitials('Nguyễn Quang Minh') }}</p>
                    </div>
                    <span class="ml-[12px] font-medium">{{ 'Nguyễn Quang Minh' }}</span>
                </div>
            </dx-scroll-view>
        </div>
    </DxPopover>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { DxCheckBox, DxDateBox, DxNumberBox, DxPopup, DxSelectBox, DxTextArea, DxTextBox } from "devextreme-vue";
import { useToastStore } from "../../../stores";
import { ToastType } from "../../../enums";
import {
    BasePopup,
    BaseRadioGroup,
    BaseSelectBox,
    BaseDateBox,
    BaseNumberBox,
    BaseTextBox,
    BaseTextArea,
    BaseCheckBox
} from "../../../components/base/index";
import CustomStore from "devextreme/data/custom_store";
import { DxPopover } from 'devextreme-vue/popover';
import { DxScrollView } from "devextreme-vue/scroll-view";
import CandidateScheduleDetailApi from "../../../apis/candidate-schedule/candidate-schedule-detail";
import { CandidateScheduleDetailModel, PagingRequest } from "../../../models";
import { schedule, workLocations } from "../../../mocks";
import _ from "lodash"
import WorkLocationApi from "../../../apis/work-location/work-location-api"
import DataSource from "devextreme/data/data_source";
import type { LoadOptions } from "devextreme/data";

const props = withDefaults(defineProps<{
    isShowPopup: boolean
    scheduleDetailID: number
}>(), {
    isShowPopup: false,
});

const emit = defineEmits(["onClose", "onSave"]);

const workLocationApi = new WorkLocationApi() 

const roomConfig = ref<DxTextBox>({
    placeholder: "Phòng"
})

const dateConfig = ref<DxDateBox>({
    placeholder: "Ngày"
})

const startTimeConfig = ref<DxDateBox>({
    placeholder: "Ngày bắt đầu",
    type: "time",
    displayFormat: "HH:mm",
    pickerType: "list",
    // min: new Date(new Date().setHours(0,0,0,0)),
    // max: new Date(new Date().setHours(23,59,59,999)),
    interval: 15,
    validationError: false,
})



const workLocationData = new DataSource({
    load: async (options: LoadOptions) => {
        const param = new PagingRequest () 
        param.Collums = ["WorkLocationName"],
        param.PageIndex = (options.skip || 0)/(options.take || 20) + 1,
        param.PageSize = options.take || 15,
        param.SearchValue = options.searchValue
        const res = await workLocationApi.getFilterPaging(param)
        return res.data.Data.Data || []
    },
    byKey: async (id: any) => {
        if(!id) return null
        const res = await workLocationApi.getByID(id)
        return res.data.Data
    }
})

const addressConfig = ref<DxSelectBox>({
    width: '100%',
    placeholder: 'Địa chỉ',
    noDataText: 'Không có dữ liệu',
    displayExpr: "WorkLocationName",
    valueExpr: "WorkLocationID",
    dataSource: workLocationData,
    searchEnabled: true,
    onItemClick(e) {
        candidateScheduleDetail.value.Address = e.itemData.WorkLocationName
    },
})

const noteConfig = ref<DxTextArea>({
    placeholder: "Lưu ý",
    height: 80
})

const scheduleConfig = ref<DxSelectBox>({
    width: '100%',
    placeholder: 'Loại lịch',
    noDataText: 'Không có dữ liệu',
    displayExpr: "ScheduleName",
    valueExpr: "ScheduleType",
    dataSource: schedule,
    searchEnabled: true,
    onItemClick(e) {
        candidateScheduleDetail.value.ScheduleName = e.itemData.ScheduleName
    },
})

const candidateConfig = ref<DxCheckBox>({
    text: "Thông báo cho ứng viên"
})

const councilConfig = ref<DxCheckBox>({
    text: "Thông báo cho hội đồng"
})

const timeConfig = ref<DxNumberBox>({
    placeholder: "",
})


const popupConfig = ref<DxPopup>({
    height: 'auto',
    width: 500,
    wrapperAttr: {
        class: "popup-change-round"
    }
});

const scheduleDetailApi = new CandidateScheduleDetailApi()

const candidateScheduleDetail = ref<CandidateScheduleDetailModel>(new CandidateScheduleDetailModel())

const startDate =  ref(_.cloneDeep(candidateScheduleDetail.value.StartTime))

getScheduleDetailById()

async function getScheduleDetailById(){
    const res = await scheduleDetailApi.getByID(props.scheduleDetailID)
    if(res.data.Success){
        candidateScheduleDetail.value = res.data.Data
    }
}

const toastStore = useToastStore();

function handleClose(){
    emit("onClose")
}

async function handleSave(){
    let endTime = _.cloneDeep(new Date (candidateScheduleDetail.value.StartTime))
    const endTimeMinute = endTime.setMinutes(endTime.getMinutes() + candidateScheduleDetail.value.Duration)
    candidateScheduleDetail.value.EndTime = new Date(endTimeMinute)
    candidateScheduleDetail.value.IsNotifyCandidate = candidateScheduleDetail.value.IsNotifyCandidate ? true : false
    candidateScheduleDetail.value.IsNotifyCouncil = candidateScheduleDetail.value.IsNotifyCouncil ? true : false
    const res = await scheduleDetailApi.update(candidateScheduleDetail.value.CandidateScheduleDetailID,candidateScheduleDetail.value)
    if(res.data.Success){
        toastStore.toggleToast(true, "Sửa lịch thành công", ToastType.success);
        emit("onSave")
    }else{
        toastStore.toggleToast(true, "Sửa lịch thất bại", ToastType.error);
    }
}

function getBackGroundColor(){
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getInitials(name: string) {
   // Tách các từ trong tên bằng khoảng trắng
   const tuArr = name.split(' ');

    // Lấy chữ cái đầu tiên của hai từ cuối cùng và ghép lại
    let chuoiKetQua = '';
    const soTu = tuArr.length;
    if (soTu >= 2) {
    chuoiKetQua += tuArr[soTu - 2][0];
    chuoiKetQua += tuArr[soTu - 1][0];
    }

    // Trả về chữ cái đầu tiên đã được trích xuất
    return chuoiKetQua.toUpperCase();
}


</script>
<style lang="scss">
    .dx-popup-wrapper > .dx-overlay-content{
        overflow: visible;
    }
</style>
<style lang="scss" scoped>
.field{
        margin-bottom: 12px;
        .lable{
            font-size: 14px;
            color: #1e2633;
            height: 25px!important;
            line-height: 25px!important;
            font-family: Roboto;
            font-weight: 500;
        }
    }

.list-council{
    max-width: 475px;
    overflow: hidden;
    height: 40px;
    overflow-x: auto;
}
.add-new-member{
    width: 32px;
    height: 32px;
    min-width: 30px;
    border-radius: 50%;
    border: 1px dashed #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    cursor: pointer;
}
.list-schedule{
    max-height: 350px;
    overflow-y: auto;
}

.status{
    width: 8px;
    height: 8px;
    background-color: #39b54a;
    border-radius: 50%;
    margin: 0 8px;
}
.recruitment-text{
    white-space: nowrap;
    max-width: 600px;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>