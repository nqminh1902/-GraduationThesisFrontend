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
            <h2>Đặt lịch</h2>
            <div class="p-[8px] flex" style="height: calc(100% - 28px);">
                <div class="schedule-form flex-1">
                    <div class="field">
                        <div class="lable">Tin tuyển dụng <span style="color: red;">*</span></div>
                        <base-select-box :config="recruitmentConfig" v-model="candidateSchedule.RecruitmentID" :class="{'border-red': errorMessage.Recruitment}"/>
                        <div class="validate-string">{{ errorMessage.Recruitment }}</div>
                    </div>
                    <div class="flex">
                        <div class="field flex-1">
                            <div class="lable">Ngày <span style="color: red;">*</span></div>
                            <base-date-box :config="dateConfig" v-model="candidateSchedule.EvaluationDate" :class="{'border-red': errorMessage.EvaluationDate}"/>
                            <div class="validate-string">{{ errorMessage.EvaluationDate }}</div>
                        </div>
                        <div class="w-[12px]"></div>
                        <div class="field flex-1">
                            <div class="lable">Giờ bắt đầu <span style="color: red;">*</span></div>
                            <base-date-box :config="startTimeConfig" v-model="candidateSchedule.StartTime" :class="{'border-red': errorMessage.StartTime}"/>
                            <div class="validate-string">{{ errorMessage.StartTime }}</div>
                        </div>
                        <div class="w-[12px]"></div>
                        <div class="field flex-1">
                            <div class="lable">Thời lượng phút <span style="color: red;">*</span></div>
                            <base-number-box :config="timeConfig" v-model="candidateSchedule.Duration" :class="{'border-red': errorMessage.Duration}"/>
                            <div class="validate-string">{{ errorMessage.Duration }}</div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="field flex-1">
                            <div class="lable">Địa điểm <span style="color: red;">*</span></div>
                            <base-select-box :config="addressConfig" v-model="candidateSchedule.AddressID" :class="{'border-red': errorMessage.Address}"/>
                            <div class="validate-string">{{ errorMessage.Address }}</div>
                        </div>
                        <div class="w-[12px]"></div>
                        <div class="field flex-1">
                            <div class="lable">Phòng <span style="color: red;">*</span></div>
                            <base-text-box :config="roomConfig" v-model="candidateSchedule.Room" :class="{'border-red': errorMessage.Room}"/>
                            <div class="validate-string">{{ errorMessage.Room }}</div>
                        </div>
                    </div>
                    <div class="field">
                        <div class="lable">Loại lịch <span style="color: red;">*</span></div>
                        <base-select-box :config="scheduleConfig" v-model="candidateSchedule.ScheduleType" :class="{'border-red': errorMessage.ScheduleName}"/>
                        <div class="validate-string">{{ errorMessage.ScheduleName }}</div>
                    </div>
                    <div class="field">
                        <div class="lable">Lưu ý</div>
                        <base-text-area :config="noteConfig" v-model="candidateSchedule.Note"/>
                    </div>
                    <div class="flex">
                        <div class="field flex-1">
                            <base-check-box :config="candidateConfig" v-model="candidateSchedule.IsNotifyCandidate"/>
                        </div>
                        <div class="w-[12px]"></div>
                        <div class="field flex-1">
                            <base-check-box :config="councilConfig" v-model="candidateSchedule.IsNotifyCouncil"/>
                        </div>
                    </div>
                </div>
                <div class="w-[12px]"></div>
                <div class="flex-1 bg-[#ebebeb] h-full rounded-[4px] p-[16px]">
                    <div class="font-medium">HỘI ĐỒNG TUYỂN DỤNG</div>
                    <div class="list-council mt-[16px] w-full flex">
                        <div class="add-new-member" id="add-council2">+</div>
                        <div class="flex ml-[4px]" v-for="(item,index) of candidateSchedule.RecruitmentBroads" :key="index">
                            <img style="width: 30px; height: 30px; border-radius: 50%;" v-if="false">
                            <div class="text-center" :style="{backgroundColor: getBackGroundColor()}" style="width: 30px; height: 30px; border-radius: 50%;" v-else>
                                <p class="text-white leading-[30px] text-[13px] font-medium">{{ getInitials(item.FullName) }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="font-medium">ỨNG VIÊN</div>
                    <div class="list-schedule">
                        <dx-scroll-view :height="'100%'">
                            <div class="flex w-full bg-[#f5f5f5] h-[40px] items-center mt-[16px]">
                                <div class="flex-1 font-medium ml-[12px]">Tên ứng viên</div>
                                <div class="w-[30%] font-medium ml-[12px]">Thời gian</div>
                                <div class="w-[7%] text-center cursor-pointer"></div>
                            </div>
                            <div class="flex w-full bg-white h-[50px] items-center" v-for="(item,index) of candidateSchedule.CandidateScheduleDetails" :key="index">
                                <div class="flex-1 font-medium ml-[12px] flex items-center">
                                        <img style="width: 30px; height: 30px; border-radius: 50%;" v-if="false">
                                        <div class="text-center" :style="{backgroundColor: getBackGroundColor()}" style="width: 30px; height: 30px; border-radius: 50%;" v-else>
                                            <p class="text-white leading-[30px] text-[13px] font-medium">{{ getInitials(item.CandidateName) }}</p>
                                        </div>
                                        <span class="ml-[12px] font-medium">{{ item.CandidateName }}</span>
                                </div>
                                <div class="w-[30%] font-medium ml-[12px]">{{ `${getTimeToDisplay(item.StartTime)} - ${getTimeToDisplay(item.EndTime)}` }}</div>
                                <div class="w-[7%] text-center cursor-pointer" @click="handleRemove(index)">
                                    <Icon
                                        :icon="'gg:remove'"
                                        :color="'red'"
                                        width="16"
                                        height="16"
                                    />
                                </div>
                            </div>
                        </dx-scroll-view>
                    </div>
                    <div class="text-[#2680eb] mt-[16px] cursor-pointer" v-if="listRecruitmentDetail.length" style="width: fit-content;" id="add-candidate">+ Thêm ứng viên</div>
                </div>
            </div>
        </template>
    </base-popup>
    <DxPopover 
        :target="'#add-candidate'"
        show-event="click"
        :visible="false"
        :hideOnOutsideClick="true"
        position="bottom"
        width="auto"
        height="auto"
        >
        <div class="h-[200px] p-[8px] overflow-y-auto">
                <div class="flex p-[8px] hover:bg-[#E7F1FF] items-center mb-[8px] cursor-pointer" v-for="(item,index) of listRecruitmentDetail" :key="index" @click="handleAddCandidate(item)">
                    <img style="width: 30px; height: 30px; border-radius: 50%;" v-if="false">
                    <div class="text-center" :style="{backgroundColor: getBackGroundColor()}" style="width: 30px; height: 30px; border-radius: 50%;" v-else>
                        <p class="text-white leading-[30px] text-[13px] font-medium">{{ getInitials(item.CandidateName) }}</p>
                    </div>
                    <span class="ml-[12px] font-medium">{{ item.CandidateName }}</span>
                </div>
        </div>
    </DxPopover>
    <DxPopover 
        :target="'#add-council2'"
        show-event="click"
        :visible="false"
        :hideOnOutsideClick="true"
        position="bottom"
        width="auto"
        height="auto"
        >
        <div class="h-[200px] p-[8px]">
            <dx-scroll-view :height="'100%'">
                <div class="flex p-[8px] hover:bg-[#E7F1FF] items-center mb-[8px] cursor-pointer" @click="handleAddCouncil(item)" v-for="(item,index) of councils" :key="index">
                    <img style="width: 30px; height: 30px; border-radius: 50%;" v-if="item.Avatar" :src="item.Avatar">
                    <div class="text-center" :style="{backgroundColor: getBackGroundColor()}" style="width: 30px; height: 30px; border-radius: 50%;" v-else>
                        <p class="text-white leading-[30px] text-[13px] font-medium">{{ getInitials(item.FullName) }}</p>
                    </div>
                    <span class="ml-[12px] font-medium">{{ item.FullName }}</span>
                </div>
            </dx-scroll-view>
        </div>
    </DxPopover>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { DxCheckBox, DxDateBox, DxNumberBox, DxPopup, DxSelectBox, DxTextArea, DxTextBox } from "devextreme-vue";
import { useToastStore } from "../../../stores";
import { StateEnum, ToastType } from "../../../enums";
import RecruitmentDetailApi from "../../../apis/recruitment-detail-api/recruitment-detail-api"
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
import RecruitmentApi from "@/apis/recruitment/recruitment-api";
import { workLocations, schedule} from "../../../mocks"
import _ from "lodash"
import { Icon } from "@iconify/vue";
import {councils} from "../../../mocks"
import CandidateScheduleApi from "../../../apis/candidate-schedule/candidate-schedule-api"
import { CandidateScheduleDetailModel, CandidateScheduleModel, PagingRequest, RecruitmentBroadModel, RecruitmentDetailModel } from "../../../models";
import DataSource from "devextreme/data/data_source";
import WorkLocationApi from "../../../apis/work-location/work-location-api"
import type { LoadOptions } from "devextreme/data";

const workLocationApi = new WorkLocationApi() 

 const props = withDefaults(defineProps<{
    isShowPopup: boolean
}>(), {
    isShowPopup: false,
});

const emit = defineEmits(["onClose", "onSave"]);

const errorMessage = ref({
    Recruitment:"",
    ScheduleName: "",
    EvaluationDate: "",
    StartTime: "",
    Duration: "",
    Room: "",
    Address: "",
    Note: ""
})

const recruitmentApi = new RecruitmentApi()

const candidateScheduleApi = new CandidateScheduleApi()

const candidateSchedule = ref(new CandidateScheduleModel())

const listRecruitmentDetail = ref<RecruitmentDetailModel[]>([])

const recruitmentBroad = ref<RecruitmentBroadModel[]>([])

const listRecruitment = new CustomStore({
    key: "RecruitmentID",
    async load(loadOptions) {
        const res = await recruitmentApi.getAll();
        return res.data.Data || [];
    },
    async byKey(key) {
        const res = await recruitmentApi.getByID(key);
        return res.data.Data;
    },
    loadMode: "raw",
})

const recruitmentConfig = ref<DxSelectBox>({
    width: '100%',
    placeholder: 'Chọn tin tuyển dụng',
    noDataText: 'Không có dữ liệu',
    displayExpr: "Title",
    valueExpr: "RecruitmentID",
    dataSource: listRecruitment,
    searchEnabled: true,
    onItemClick(e) {
        candidateSchedule.value.RecruitmentTitle = e.itemData.Title
        candidateSchedule.value.JobPositionName = e.itemData.JobPositionName
        getRecruitmentBroad(e.itemData.RecruitmentID)
    },
})

async function getRecruitmentBroad(id: any){
    const res = await recruitmentApi.getRecruitmentBroad(id)
    if(res){
        candidateSchedule.value.RecruitmentBroads = res.data.Data.RecruitmentBroad
        listRecruitmentDetail.value = res.data.Data.Candidates
    }
}

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
    min: new Date(new Date().setHours(0,0,0,0)),
    max: new Date(new Date().setHours(23,59,59,999)),
    interval: 15,
    onValueChanged(e) {
        let startTime = new Date(_.cloneDeep(new Date(new Date(candidateSchedule.value.EvaluationDate.setHours(e.value.getHours())).setMinutes(e.value.getMinutes()))))
        candidateSchedule.value.CandidateScheduleDetails.forEach((detail) => {
            let endTime = _.cloneDeep(startTime)
            const endTimeMinute = endTime.setMinutes(endTime.getMinutes() + candidateSchedule.value.Duration)
            detail.StartTime = startTime
            detail.EndTime = new Date(endTimeMinute)
            startTime = new Date(endTimeMinute)
        })
    },
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
        candidateSchedule.value.Address = e.itemData.WorkLocationName
    },
})

const candidateConfig = ref<DxCheckBox>({
    text: "Thông báo cho ứng viên"
})

const councilConfig = ref<DxCheckBox>({
    text: "Thông báo cho hội đồng"
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
        candidateSchedule.value.ScheduleName = e.itemData.ScheduleName
    },
})

const timeConfig = ref<DxNumberBox>({
    placeholder: "",
})

const selectedValue = ref(0)

const popupConfig = ref<DxPopup>({
    height: 650,
    width: 990,
    wrapperAttr: {
        class: "popup-change-round"
    }
});

const toastStore = useToastStore();

function handleClose(){
    emit("onClose")
}

async function handleSave(){
    if(!validate()) return
    candidateSchedule.value.CandidateScheduleDetails.forEach(detail => {
        detail.Address = candidateSchedule.value.Address
        detail.AddressID = candidateSchedule.value.AddressID
        detail.Duration = candidateSchedule.value.Duration
        detail.Note = candidateSchedule.value.Note
        detail.Room = candidateSchedule.value.Room
        detail.ScheduleType = candidateSchedule.value.ScheduleType
        detail.ScheduleName = candidateSchedule.value.ScheduleName
        detail.IsNotifyCandidate = candidateSchedule.value.IsNotifyCandidate
        detail.IsNotifyCouncil = candidateSchedule.value.IsNotifyCouncil
        detail.EvaluationDate = candidateSchedule.value.EvaluationDate
        detail.JobPositionName = candidateSchedule.value.JobPositionName
    });
    const res = await candidateScheduleApi.insert(candidateSchedule.value)
    if(res.data.Success){
        toastStore.toggleToast(true, "Đặt lịch thành công", ToastType.success);
        emit("onSave")
    }else{
        toastStore.toggleToast(true, "Đặt lịch thất bại", ToastType.error);
    }
    
}

function validate(){
    let result = true
    if(!candidateSchedule.value.RecruitmentID){
        errorMessage.value.Recruitment = "Tin tuyển dụng không được để trống"
        result = false
    }
    if(!candidateSchedule.value.EvaluationDate){
        errorMessage.value.EvaluationDate = "Ngày không được để trống"
        result = false
    }
    if(!candidateSchedule.value.StartTime){
        errorMessage.value.StartTime = "Giờ bắt đầu không được để trống"
        result = false
    }
    if(!candidateSchedule.value.Room){
        errorMessage.value.Room = "Phòng không được để trống"
        result = false
    }
    if(!candidateSchedule.value.Address){
        errorMessage.value.Address = "Địa chỉ không được để trống"
        result = false
    }
    if(!candidateSchedule.value.ScheduleName){
        errorMessage.value.ScheduleName = "Loại lịch không được để trống"
        result = false
    }
    if(!candidateSchedule.value.CandidateScheduleDetails.length){
        toastStore.toggleToast(true, "Vui lòng chọn ứng viên", ToastType.warning)
        result = false
    }
    return result
}

watch(() => candidateSchedule.value.ScheduleName , (newVal) => {
    if(newVal){
        errorMessage.value.ScheduleName = ""
    }else{
        errorMessage.value.ScheduleName = "Địa chỉ không được để trống"
    }
})

watch(() => candidateSchedule.value.Address, (newVal) => {
    if(newVal){
        errorMessage.value.Address = ""
    }else{
        errorMessage.value.Address = "Email không được để trống"
    }
})

watch(() => candidateSchedule.value.Room, (newVal) => {
    if(newVal){
         errorMessage.value.Room = ""
    }else{
         errorMessage.value.Room = "Số điện thoại không được để trống"
    }
})

watch(() => candidateSchedule.value.StartTime, (newVal) => {
    if(newVal){
        errorMessage.value.StartTime = ""
    }else{
        errorMessage.value.StartTime = "Trình độ đào tạo không được để trống"
    }
})

watch(() => candidateSchedule.value.EvaluationDate, (newVal) => {
    if(newVal){
        errorMessage.value.EvaluationDate = ""

    }else{
        errorMessage.value.EvaluationDate = "Chuyên ngành không được để trống"
    }
})

watch(() => candidateSchedule.value.RecruitmentID, (newVal) => {
    if(newVal){
        errorMessage.value.Recruitment = ""
    }else{
        errorMessage.value.Recruitment = "Nơi đào tạo không được để trống"
    }
})

function handleRemove(index: number){
        candidateSchedule.value.CandidateScheduleDetails.splice(index,1)
        let startTime = new Date(_.cloneDeep(new Date(new Date(candidateSchedule.value.EvaluationDate.setHours(candidateSchedule.value.StartTime.getHours())).setMinutes(candidateSchedule.value.StartTime.getMinutes()))))
        candidateSchedule.value.CandidateScheduleDetails.forEach((detail) => {
            let endTime = _.cloneDeep(startTime)
            const endTimeMinute = endTime.setMinutes(endTime.getMinutes() + candidateSchedule.value.Duration)
            detail.StartTime = startTime
            detail.EndTime = new Date(endTimeMinute)
            startTime = new Date(endTimeMinute)
        })
}

function getBackGroundColor(){
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getInitials(name: string = "") {
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

function handleAddCandidate(candidate: RecruitmentDetailModel){
    const isExist = candidateSchedule.value.CandidateScheduleDetails.find(item => item.CandidateID == candidate.CandidateID)

    if(!isExist){
        let startTime = new Date(_.cloneDeep(new Date(new Date(candidateSchedule.value.EvaluationDate.setHours(candidateSchedule.value.StartTime.getHours())).setMinutes(candidateSchedule.value.StartTime.getMinutes()))))
        const scheduleDetail = new CandidateScheduleDetailModel()
        scheduleDetail.CandidateID = candidate.CandidateID
        scheduleDetail.CandidateName = candidate.CandidateName
        scheduleDetail.Gender = candidate.Gender
        candidateSchedule.value.CandidateScheduleDetails.push(scheduleDetail)
        candidateSchedule.value.CandidateScheduleDetails.forEach((detail) => {
            let endTime = _.cloneDeep(startTime)
            const endTimeMinute = endTime.setMinutes(endTime.getMinutes() + candidateSchedule.value.Duration)
            detail.StartTime = startTime
            detail.EndTime = new Date(endTimeMinute)
            startTime = new Date(endTimeMinute)
        })
    }
    
}

function handleAddCouncil(council: any){
    const isExist = recruitmentBroad.value.find(item => item.UserID == council.UserID)
    if(!isExist){
        const broad = new RecruitmentBroadModel()
        broad.FullName = council.FullName
        broad.Avatar = council.Avatar
        broad.Email = council.Email
        broad.UserID = council.UserID
        broad.State = StateEnum.Insert
        recruitmentBroad.value.push(broad)
    }
}

function getTimeToDisplay(time: any){
    const format = new Date(time)
    let hh: any = format.getHours()
    let mm: any = format.getMinutes()

    if(hh < 10){
        hh = "0" + hh
    }
    if(mm < 10){
        mm = "0" + mm
    }

    return hh + ":" + mm
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
        position: relative;
        .lable{
            font-size: 14px;
            color: #1e2633;
            height: 25px!important;
            line-height: 25px!important;
            font-family: Roboto;
            font-weight: 500;
        }
        .validate-string{
            position: absolute;
            width: 100%;
            text-overflow: ellipsis;
            color: red;
            overflow: hidden;
            white-space: nowrap;
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
</style>
