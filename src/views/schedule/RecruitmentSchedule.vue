<template>
    <div class="p-[16px] w-full" style="height: calc(100vh - 48px); background-color: #EBECEF;">
        <div class="heading flex h-[48px] items-center justify-between">
            <div class="flex items-center">
                <DatePicker :is-range="true" v-model.range="range" mode="dateTime" :columns="2" :popover="{visibility: 'click'}" 
                 @dayclick="handleCalendarClick"
                :locale="
                {
                    firstDayOfWeek: 2,
                }">
                    <template  v-slot="{ inputValue, inputEvents }">
                        <div class="flex bg-white h-[32px] rounded-[4px] p-[8px] cursor-pointer items-center" style="border: 1px solid #ddd;">
                            <div class=""  v-on="inputEvents.start">{{ inputValue.start.split(" ")[0]}}</div>
                            <label class="mx-[8px]">-</label>
                            <div class=""  v-on="inputEvents.end">{{ inputValue.end.split(" ")[0] }}</div>
                            <Icon
                                :icon="'uim:schedule'"
                                :color="'#2563eb'"
                                width="20"
                                height="20"
                                class="ml-[8px]"
                            />
                        </div>
                    </template>
                </DatePicker>
                <base-text-box :config="searchDefaultConfig" class="ml-[12px]"/>
            </div>
            <base-button :config="buttonConfig" />
        </div>
        <div class="mt-[16px] w-full overflow-y-auto" v-if="displayList.length" style="height: calc(100% - 48px - 16px)">
            <div class="schedule mb-[12px]" v-for="(item, index) of displayList" :key="index">
                <div class="schedule-time">{{ formatDate(item.Date) }}</div>
                <div class="flex schedule-detail" @click="handleShowPopup(schedule)" v-for="schedule of item.Schedule" :key="schedule.CandidateScheduleDetailID">
                    <div class="font-medium text-[#6a727d] my-[16px] mr-[16px]">{{ `${getTimeToDisplay(schedule.StartTime)} - ${getTimeToDisplay(schedule.EndTime)}` }}</div>
                    <div class="flex-1">
                        <div class="w-full"  style="border-bottom: 1px solid #dee2e6">
                            <div class="candidate flex">
                                <div class="candidate-name flex items-center">
                                    <img style="width: 30px; height: 30px; border-radius: 50%;" v-if="false">
                                    <div class="text-center" :style="{backgroundColor: getBackGroundColor()}" style="width: 30px; height: 30px; border-radius: 50%;" v-else>
                                        <p class="text-white leading-[30px] text-[13px] font-medium">{{ getInitials(schedule.CandidateName) }}</p>
                                    </div>
                                    <span class="ml-[12px] font-medium">{{ schedule.CandidateName }}</span>
                                </div>
                                <div class="recruitment-name flex items-center ml-[4px]">
                                    <div class="recruitment-text">{{ schedule.RecruitmentTitle }}</div>
                                </div>
                            </div>    
                            <div class="schedule-name">{{ schedule.ScheduleName }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-[16px] w-full flex-col d-flex items-center justify-center" v-else style="height: calc(100% - 48px - 16px)">
            <h3 class="font-bold color-[#ddd]">Chưa có lịch phỏng vấn</h3>
            <p class="color-[#ddd]">Đặt lịch để quản lý thời gian thi tuyển phỏng vấn của ứng viên</p>

        </div>
    </div>
    <popup-add-schedule v-if="isShowPopup" :is-show-popup="isShowPopup" @on-close="isShowPopup = false" @on-save="handleSave(1)"/>
    <popup-detail-schedule v-if="isShowPopupDetail" :scheduleDetail="selectedScheduleDetail" :is-show-popup="isShowPopupDetail" @on-close="isShowPopupDetail = false" @on-save="handleSave(2)"/>
</template>
<script setup lang="ts">
import { DxButton, DxTextBox } from "devextreme-vue";
import { ref, watch } from "vue";
import {
    BaseTextBox,
    BaseButton
} from "../../components/base/index";
import { Calendar, DatePicker  } from 'v-calendar';
import { formatDate } from "../../utils";
import 'v-calendar/style.css';
import { Icon } from "@iconify/vue";
import { ButtonStylingMode, ButtonType } from "../../enums";
import PopupAddSchedule from "./popup/PopupAddSchedule.vue";
import PopupDetailSchedule from "./popup/PopupDetailSchedule.vue";
import CandidateScheduleDetailApi from "../../apis/candidate-schedule/candidate-schedule-detail";
import { CandidateScheduleDetailModel, PagingRequest } from "../../models";
import _ from "lodash"
import { DxScrollView } from "devextreme-vue/scroll-view";

// Lấy ngày hiện tại
var currentDate = new Date();

// Lấy ngày thứ 2 trong tuần hiện tại
var monday = new Date(currentDate);
monday.setDate(currentDate.getDate() - (currentDate.getDay() - 1));
if (monday > currentDate) {
  monday.setDate(currentDate.getDate() - (currentDate.getDay() + 6));
}

// Lấy ngày Chủ nhật trong tuần hiện tại
var sunday = new Date(currentDate);
sunday.setDate(currentDate.getDate() + (7 - currentDate.getDay()));
if (sunday < currentDate) {
  sunday.setDate(currentDate.getDate() + (7 - currentDate.getDay() + 7));
}

const candidateScheduleDetailApi = new CandidateScheduleDetailApi()

const listCandidateSchedule =  ref<CandidateScheduleDetailModel[]>([])

const searchDefaultConfig: DxTextBox = {
    width: 260,
    placeholder: "Tìm kiếm",
    buttons: [
        {
            name: "BtnSearch",
            location: "before",
            options: {
                icon: "search",
            },
        },
    ],
    onValueChanged: (e) => {
       
    },
};

const buttonConfig = ref<DxButton>({
    type: ButtonType.default,
    height: 32,
    text: "Đặt lịch",
    stylingMode: ButtonStylingMode.contained,
    icon: "plus",
    onClick(e) {
        isShowPopup.value = true
    },
});

const isShowPopup = ref(false)
const isShowPopupDetail = ref(false)
let selectedScheduleDetail: any

const range = ref({
  start: new Date(monday),
  end: new Date(sunday),
});

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

function handleShowPopup(detail: CandidateScheduleDetailModel){
    selectedScheduleDetail = detail
    isShowPopupDetail.value = true
}

let countClick = 0

function handleCalendarClick(e:any){
    // countClick++
    // if(countClick == 2){
    //     getSchedule()
    //     countClick = 0
    // }    
    // setTimeout(() => {countClick = 0}, 5000)
}

watch(() => range.value.end, (newVal) => {
    getSchedule()
})

const displayList = ref<any[]>([])

const extractDate = (object: any) => {
    const startDate = new Date(object.StartTime);
    return startDate.toISOString().slice(0, 10);
};

async function getSchedule(){
    const pagingParam = new PagingRequest()
    pagingParam.PageIndex = 1
    pagingParam.PageSize = 1000
    pagingParam.CustomParam = {
        startDate: range.value.start,
        endDate: range.value.end
    }
    const res = await candidateScheduleDetailApi.getFilterPaging(pagingParam)
    if(res.data.Data){
        displayList.value = []
        listCandidateSchedule.value = res.data.Data.Data

        
        // Nhóm các đối tượng lại theo ngày startDate
        const sortedObjects = _.orderBy(listCandidateSchedule.value, 'StartTime');
        const groupedByDate = _.groupBy(sortedObjects, extractDate);

        // Sắp xếp các nhóm theo thời gian startTime
        const objs = _.mapValues(groupedByDate, group => _.orderBy(group, 'StartTime'));
        for (const key in objs) {
            displayList.value.push({
                Date: key,
                Schedule: objs[key]
            })
        }
    }
}

getSchedule()

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

function handleSave(number: number){
    if(number == 1){
        isShowPopup.value = false
    }else if(number == 2){
        isShowPopupDetail.value = false
    }
    getSchedule()
}
</script>


<style lang="scss">
    .vc-time-picker.vc-attached{
        display: none !important;
    }
    .schedule{
        min-width: 500px;
        border-radius: 4px;
        box-shadow: inset 0 1px 3px #0000000f;
        background-color: #fff;
        overflow: auto;
        min-height: 150px;
        padding: 24px;
        
        .schedule-time{
            font-size: 20px;
            font-weight: 500;
            color: #1e2633;
        }
        .schedule-detail{
            cursor: pointer;
            &:hover{
            background-color: #e1eeff!important;
            border-radius: 4px;
            }
        .candidate{
            padding: 16px 16px 16px 0;
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
            .schedule-name{
                color: #6a727d;
                font-size: 14px;
                max-width: 500px;
                text-overflow: ellipsis;
            }
        }
    }  
    }
</style>