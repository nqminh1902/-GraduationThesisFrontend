<template>
    <base-popup
        v-if="isShowPopup"
        :config="popupConfig"
        :popupVisible="isShowPopup"
        :show-btn-footer="false"
        @close="handleClose"
        ref="popupRef"
    >
        <template #body>
            <h2>{{ scheduleDetail.ScheduleName }}</h2>
            <div class="mt-[16px]" >
                <div class="flex items-center">
                    <div class="status"></div>
                    <div class="recruitment-text">{{ scheduleDetail.RecruitmentTitle }}</div>
                </div>
            </div>
            <div class="mt-[16px]">
                <div class="">ỨNG VIÊN</div>
                <div class="font-medium mt-[8px]">{{ scheduleDetail.CandidateName }}</div>
                <div class="flex cursor-pointer mt-[8px]" @click="showPopupCandidate = true">
                    <div class="text-[#2680eb] font-medium">Xem chi tiết</div>
                    <Icon
                        :icon="'ph:arrow-right-bold'"
                        :color="'#2563eb'"
                        width="20"
                        height="20"
                        class="ml-[8px]"
                    />
                </div>
            </div>
            <div class="mt-[16px]">
                <div class="">THỜI GIAN</div>
                <div class="font-medium mt-[8px]">{{ `${ formatDate(scheduleDetail.StartTime)}, ${ getTimeToDisplay(scheduleDetail.StartTime)} - ${ getTimeToDisplay(scheduleDetail.EndTime)}` }}</div>
            </div>
            <div class="mt-[16px]">
                <div class="">ĐỊA ĐIỂM</div>
                <div class="font-medium mt-[8px]">{{ scheduleDetail.Address }}</div>
            </div>
            <div class="mt-[16px]">
                <div class="">HỘI ĐỒNG</div>
                <div class="mt-[8px] flex">
                    <div class="flex ml-[8px]" v-for="(item,index) of recruitmentBroads" :key="index">
                        <img style="width: 26px; height: 26px; border-radius: 50%;" v-if="false">
                        <div class="text-center" :style="{backgroundColor: getBackGroundColor()}" style="width: 26px; height: 26px; border-radius: 50%;" v-else>
                            <p class="text-white leading-[26px] text-[12px] font-medium">{{ getInitials(item.FullName) }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-[16px] flex">
                <base-button :config="deleteConfig"/>
                <base-button :config="editConfig" class="ml-[8px]"/>
            </div>
        </template>
    </base-popup>
    <popup-edit-schedule v-if="showPopupEdit" :is-show-popup="showPopupEdit" :schedule-detail-i-d="scheduleDetail.CandidateScheduleDetailID" @on-close="showPopupEdit=false" @on-save="handleSaveSuccess(1)"/>
    <popup-candidate v-if="showPopupCandidate" :is-view="true" :isShowPopup="showPopupCandidate" :candidateID="scheduleDetail.CandidateID" :is-edit="true" @onClose="showPopupCandidate = false"  @on-save="handleSaveSuccess(2)"></popup-candidate>
    <popup-delete-schedule v-if="showPopupDelete" :isShowPopup="showPopupDelete" :schedule-detail="scheduleDetail" @onClose="showPopupDelete = false"  @on-save="handleSaveSuccess(3)"/>

</template>
<script lang="ts" setup>
import { ref } from "vue";
import { DxButton, DxPopup } from "devextreme-vue";
import { useToastStore } from "../../../stores";
import { formatDate, getTimeToDisplay } from "../../../utils";
import { ButtonStylingMode, ButtonType, ToastType } from "../../../enums";
import PopupEditSchedule from "./PopupEditSchedule.vue";
import PopupCandidate from "../../candidate/popup/PopupCandidate.vue"
import PopupDeleteSchedule from "./PopupDeleteSchedule.vue"
import RecruitmentApi from "@/apis/recruitment/recruitment-api";
import {
    BaseButton,
    BasePopup
} from "../../../components/base/index";
import { Icon } from "@iconify/vue";
import { CandidateScheduleDetailModel, CandidateScheduleModel, RecruitmentBroadModel } from "../../../models";

 const props = withDefaults(defineProps<{
    isShowPopup: boolean,
    scheduleDetail: CandidateScheduleDetailModel
}>(), {
    isShowPopup: false,
});

const emit = defineEmits(["onClose", "onSave"]);

const recruitmentApi = new RecruitmentApi()

const popupConfig = ref<DxPopup>({
    height: 'auto',
    width: 500,
    wrapperAttr: {
        class: "popup-change-round"
    }
});


const deleteConfig = ref<DxButton>({
    type: ButtonType.danger,
    height: '100%',
    text: "Xóa",
    icon: "remove",
    stylingMode: ButtonStylingMode.outlined,
    onClick(e) {
        showPopupDelete.value = true
    },
});

const editConfig = ref<DxButton>({
    type: ButtonType.normal,
    height: '100%',
    text: "Chỉnh sửa",
    icon:"edit",
    stylingMode: ButtonStylingMode.outlined,
    onClick(e) {
        showPopupEdit.value = true
    },
});

const showPopupEdit = ref(false)
const showPopupDelete = ref(false)
const showPopupCandidate = ref(false)

const toastStore = useToastStore();

function handleClose(){
    emit("onClose")
}

const recruitmentBroads = ref<RecruitmentBroadModel[]>([])

async function getRecruitmentBroad(){
    const res = await recruitmentApi.getRecruitmentBroad(props.scheduleDetail.RecruitmentID || 0)

    if(res.data.Success){
        recruitmentBroads.value = res.data.Data.RecruitmentBroad
    }

}
getRecruitmentBroad()

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

function handleSaveSuccess(number: number){
    if(number == 1){
        showPopupEdit.value =false
    }else if(number == 2){
        showPopupCandidate.value = false
    }else if(number == 3){
        showPopupEdit.value = false
    }

    emit('onSave')
}

</script>
<style lang="scss">
    .dx-popup-wrapper > .dx-overlay-content{
        overflow: visible;
    }
    .dx-popup-content{
        padding: 16px !important;
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