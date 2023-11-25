<template>
    <div class="flex flex-col w-full h-full">
        <div class="w-full px-[24px] pt-[24px] header">
            <div class="flex">
                <div class="">
                    <Icon
                        :icon="'ph:arrow-left-bold'"
                        :color="'#FF0000'"
                        width="20"
                        height="20"
                        class="cursor-pointer"
                        @click="backPage"
                    />
                </div>
                <div class="flex-1">
                    <div class="flex items-center">
                        <div class="recruitment-status">
                            <div class="recruitment-status-dot"></div>
                        </div>
                        <div class="title" :title="recruitment.Title">{{ recruitment.Title }}</div>
                        <div class="edit-btn flex items-center cursor-pointer">
                            <Icon
                                :icon="'material-symbols:edit-outline'"
                                width="16"
                                height="16"
                                class="cursor-pointer ml-[4px]"
                            />
                            <div class="ml-[2px]" @click="handleEditRecruitment">Sửa tin</div>
                        </div>
                    </div>
                    <div class="flex pt-[8px] pb-[16px] items-center ml-[42px]">
                        <div class="news-sub-content" :title="recruitment.JobPositionName">{{ recruitment.JobPositionName }}</div>
                        <div class="bg-[#6a727d] w-[6px] h-[6px] rounded-full mx-[7px]"></div>
                        <div class="news-sub-content mr-[15px] pr-[15px] border-solid border-[#e0e0e0] border-r-[1px]" :title="recruitment.WorkLocationName">{{ recruitment.WorkLocationName }}</div>
                        <div class="sub-content mr-[15px] pr-[15px] border-solid border-[#e0e0e0] border-r-[1px]">Số lượng cần tuyển: <b>{{ recruitment.ActualQuantity }}</b></div>
                        <div class="sub-content mr-[15px] pr-[15px] border-solid border-[#e0e0e0] border-r-[1px]">Hạn nộp hồ sơ: <b>{{ formatDate(recruitment.RegistrationExpiryDate) }}</b></div>
                        <div class="sub-content cursor-pointer"  @click="handleOpenMoreInfor(recruitment.RecruitmentID)" :id="'more-popover'">Xem thêm</div>
                    </div>
                </div>
                <div class="add-candidate">
                    <base-button :config="buttonConfig" />
                </div>
            </div>
            <div class="tab-detail flex">
                <div class="tab-list flex-1 flex">
                    <div class="py-[8px] px-[16px] tab-item cursor-pointer" :class="currentTab==1 && 'active'" @click="handleActiveTab(1)">Ứng viên</div>
                    <div class="py-[8px] px-[16px] tab-item cursor-pointer" :class="currentTab==2 && 'active'" @click="handleActiveTab(2)">Lịch phỏng vấn</div>
                </div>
                
                <base-select-box ref="periodRef" :config="periodConfig" v-model="currentPeriod" v-if="recruitment.RecruitmentPeriods.length"/>
                <div class="tab-status rounded-[4px] ml-[8px] flex items-center cursor-pointer" :class="detailStatus" id="status">
                    <div class="recruitment-status">
                        <div class="recruitment-status-dot"></div>
                    </div>
                    <div class="">Công khai</div>
                    <Icon
                        :icon="'icon-park-outline:down'"
                        width="20"
                        height="20"
                        class="ml-[4px] mr-[16px]"
                    />
                </div>
            </div>
        </div>
        <div class="w-full flex-1 bg-[#f5f7f8] p-[16px]">
            <div class="w-full h-full rounded-[4px] bg-white">
                <div class="w-full h-[56px] flex items-center px-[16px]">
                    <div class="flex-1 flex" >
                        <b class="">{{ candidateStatus }}</b>
                        <Icon
                            id="status-candidate"
                            :icon="'icon-park-outline:down'"
                            width="20"
                            height="20"
                            class="ml-[4px] cursor-pointer"
                        />
                    </div>
                    <div class="flex items-center">
                        <base-text-box :config="searchDefaultConfig" />
                        <div class="ml-[8px] p-[5px] rounded-[4px] cursor-pointer" style="border: 1px solid #e0e6ec;">
                            <Icon
                                :icon="'tabler:file-export'"
                                width="20"
                                height="20"
                            />
                        </div>
                    </div>
                </div>
                <div class="w-full h-[56px] flex items-center" v-if="selectedRowKey.length == 0">
                    <dx-scroll-view width="100%" direction="horizontal">
                        <div class="flex items-center w-full h-[32px]">
                            <div class="item-content" @click="handleClickRound(item.RecruitmentRoundID)" v-for="item in recruitment.RecruitmentRounds" :key="item.RecruitmentRoundID">
                                <div class="text-center text-xl font-bold" :class="currentRound == item.RecruitmentRoundID && 'text-[#2680eb]'">{{ handleShowTotal(item.RecruitmentRoundID) }}</div>
                                <div class="round-name" :class="currentRound == item.RecruitmentRoundID && 'text-[#2680eb]'">{{ item.RecruitmentRoundName }}</div>
                            </div>
                        </div>
                    </dx-scroll-view>
                </div>
                <div class="w-full h-[56px] flex items-center" v-else>
                    <div class="flex items-center w-full h-[32px]">
                        <div class="d-flex items-center ml-[16px]">
                            <span class="mr-[4px]">Đã chọn: </span>
                            <b>{{ selectedRowKey.length }}</b>
                        </div>
                        <base-button :config="changeRoundConfig" class=" ml-[12px]"/>
                        <base-button :config="EliminateConfig" class=" ml-[12px]"/>
                        <base-button :config="EmployeeConfig" class=" ml-[12px]" v-if="currentRound == recruitment.RecruitmentRounds[recruitment.RecruitmentRounds.length - 1].RecruitmentRoundID"/>
                        <base-button :config="RecruitmentContinueConfig" class=" ml-[12px]" v-if="currentStatus == 2"/>
                        <base-button :config="RevokeEmployeeConfig" class=" ml-[12px]" v-if="currentRound == recruitment.RecruitmentRounds[recruitment.RecruitmentRounds.length - 1].RecruitmentRoundID"/>
                        <base-button :config="DeleteMultipleConfig" class=" ml-[12px]"/>
                        <base-button :config="RemoveFromRecruitConfig" class=" ml-[12px]"/>
                    </div>
                </div>
                <div class="w-full" style="height:  calc(100% - 56px - 56px - 46px);">
                    <base-table
                    :config="tableConfig"
                    ref="baseTableRef"
                    @on-delete="handleDelete"
                    >
                        <template #date="data">
                            <div class="">{{ formatDate(data.data.data.ApplyDate) }}</div>
                        </template>
                        <template #birthday="data">
                            <div class="">{{ formatDate(data.data.data.Birthday) }}</div>
                        </template>
                        <template #name="data">
                            <div class="flex items-center">
                                <img style="width: 30px; height: 30px; border-radius: 50%;" v-if="data.data.data.Avatar" :src="data.data.data.Avatar" alt="">
                                <div class="text-center" :style="{backgroundColor: getBackGroundColor()}" style="width: 30px; height: 30px; border-radius: 50%;" v-else>
                                    <p class="text-white leading-[30px] text-[13px] font-medium">{{ getInitials(data.data.data.CandidateName) }}</p>
                                </div>
                                <span class="ml-[12px]">{{ data.data.data.CandidateName }}</span>
                            </div>
                        </template>
                    </base-table>
                </div>
                <base-navigation
                    style="margin: 0px;"
                    :totalRecord="totalCount"
                    @onNavigationChange="pagingChange"
                />
            </div>
        </div>
    </div>
    <popup-candidate v-if="isShowPopup" :isShowPopup="isShowPopup" :recruitmentDetail="recruitmentDetail" :candidateID="candidateID" :is-edit="isUpdate" @onClose="isShowPopup = false" @on-save="handleSaveCandidate(2)"></popup-candidate>
    <popup-change-round v-if="showPopupChangeRound" :ids="selectedRowKey" :isShowPopup="showPopupChangeRound" @onSave="handleSaveCandidate(1)" @onClose="showPopupChangeRound = false" :recruitmentRound="recruitment.RecruitmentRounds"></popup-change-round>
    <popup-eliminate-candidate v-if="isShowPopupEliminated" :ids="selectedRowKey" :recruitmentID="recruitment.RecruitmentID" :isShowPopup="isShowPopupEliminated" @onSave="handleSaveCandidate(3)" @onClose="isShowPopupEliminated = false"></popup-eliminate-candidate>
    <popup-employee v-if="isShowPopupEmployee" :ids="selectedRowKey" :recruitmentID="recruitment.RecruitmentID" :isShowPopup="isShowPopupEmployee" @onSave="handleSaveCandidate(4)" @onClose="isShowPopupEmployee = false"></popup-employee>
    <popup-revoke-employee v-if="isShowPopupRevokeEmployee" :ids="selectedRowKey" :recruitmentID="recruitment.RecruitmentID" :isShowPopup="isShowPopupRevokeEmployee" @onSave="handleSaveCandidate(5)" @onClose="isShowPopupRevokeEmployee = false"></popup-revoke-employee>
    <popup-continue-recruit v-if="isShowPopupContinueRecruit" :ids="selectedRowKey" :recruitmentID="recruitment.RecruitmentID" :isShowPopup="isShowPopupContinueRecruit" @onSave="handleSaveCandidate(6)" @onClose="isShowPopupContinueRecruit = false"></popup-continue-recruit>
    
    <DxPopover 
        target="#more-popover"
        show-event="click"
        :visible="false"
        :hideOnOutsideClick="true"
        position="bottom"
        width="372px"
        >
        <div class="">
            <div class="py-[8px]">Người tạo: <span class="font-bold">{{ recruitment.CreatedBy }}</span></div>
            <div class="py-[8px]">Ngày tạo: <span class="font-bold">{{ formatDate(recruitment.CreatedDate) }}</span></div>
            <div class="py-[8px]">Thời hạn dự kiến: <span class="font-bold">{{ formatDate(recruitment.ExpectedTime) }}</span></div>
        </div>
    </DxPopover>
    <DxPopover 
        target="#status"
        show-event="click"
        :visible="false"
        :hideOnOutsideClick="true"
        position="bottom"
        width="250"
        >
        <div class="">
            <div class="flex cursor-pointer hover:bg-[#e1eeffcc] p-[8px] hover:rounded-[4px]" v-if="recruitment.Status != 2">
                <div class="recruitment-status items-center flex" style="margin-left: 0;">
                    <div class="recruitment-status-dot" style="background-color: red;"></div>
                </div>
                <div class="flex-1">
                    <div class="font-bold">Ngừng nhận hồ sơ</div>
                    <div class="">Tin sẽ được gỡ khỏi các kênh tuyển dụng. Không cho phép nộp đơn ứng tuyển</div>
                </div>
            </div>
            <div class="flex cursor-pointer hover:bg-[#e1eeffcc] p-[8px] hover:rounded-[4px] mt-[12px]"  v-if="recruitment.Status != 1">
                <div class="recruitment-status items-center flex" style="margin-left: 0;">
                    <div class="recruitment-status-dot"></div>
                </div>
                <div class="flex-1">
                    <div class="font-bold">Nhận hồ sơ</div>
                    <div class="">Thiết tục nhận hồ sơ</div>
                </div>
            </div>
        </div>
    </DxPopover>
    <DxPopover 
        target="#status-candidate"
        show-event="click"
        :visible="false"
        :hideOnOutsideClick="true"
        position="bottom"
        width="200"
        >
        <div class="">
            <div class="flex cursor-pointer items-center p-[8px] hover:bg-[#e1eeffcc] p-[8px] hover:rounded-[4px]" @click="handleChangeStatus(0)">
                <span>Tất cả</span>
            </div>
            <div class="flex cursor-pointer items-center p-[8px]  hover:bg-[#e1eeffcc] p-[8px] hover:rounded-[4px]" @click="handleChangeStatus(1)">
                <span>Đang tuyển dụng</span>
            </div>
            <div class="flex cursor-pointer items-center p-[8px]  hover:bg-[#e1eeffcc] p-[8px] hover:rounded-[4px]" @click="handleChangeStatus(2)">
                <span>Bị loại</span>
            </div>
            <div class="flex cursor-pointer items-center p-[8px]  hover:bg-[#e1eeffcc] p-[8px] hover:rounded-[4px]" @click="handleChangeStatus(3)">
                <span>Đã thành nhân viên</span>
            </div>
        </div>
    </DxPopover>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { DxButton, DxDataGrid, DxSelectBox, DxTextBox, DxScrollView } from "devextreme-vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
    BaseTable,
    BasePaging,
    BaseNavigation,
    BaseTextBox,
    BaseStatus,
    BaseButton,
    BasePopup,
    BaseSelectBox
} from "../../../components/base/index";
import { ButtonStylingMode, ButtonType, ToastType } from "../../../enums";
import { formatDate } from "../../../utils";
import PopupCandidate from "../../candidate/popup/PopupCandidate.vue"
import PopupChangeRound from "./popup/PopupChangeRound.vue"
import PopupEliminateCandidate from "./popup/PopupEliminateCandidate.vue"
import PopupEmployee from "./popup/PopupEmployee.vue"
import PopupRevokeEmployee from "./popup/PopupRevokeEmployee.vue"
import PopupContinueRecruit from "./popup/PopupContinueRecruit.vue"
import { useRecruitmentStore } from "../../../stores";
import { DxPopover } from 'devextreme-vue/popover';
import { storeToRefs } from "pinia";
import RecruitmentApi from "../../../apis/recruitment/recruitment-api"
import { PagingRequest, RecruitmentDetailModel, RecruitmentPeriodModel } from "../../../models";
import type { BaseNavigationType } from "../../../types";
import type { Column } from "devextreme/ui/data_grid";
import CandidateApi from "../../../apis/candidate/candidate-api"
import RecruitmentDetailApi from "../../../apis/recruitment-detail-api/recruitment-detail-api"
import { useToastStore } from "../../../stores";

const recruitmentStore = useRecruitmentStore()
const toastStore = useToastStore();
const {recruitment} = storeToRefs(recruitmentStore)
const recruitmentApi = new RecruitmentApi()
const candidateApi = new CandidateApi();
const recruitmentDetailApi = new RecruitmentDetailApi();


const route = useRoute()
const router = useRouter()
const isShowPopup = ref(false)
const isShowPopupEliminated = ref(false)
const isUpdate = ref(false)
const isShowPopupEmployee = ref(false)
const isShowPopupRevokeEmployee = ref(false)
const isShowPopupContinueRecruit = ref(false)
const candidateID = ref(undefined)
const currentTab = ref(1)
const detailStatus = "publish"
const isMoreInfor = ref(0)
const currentPeriod = ref(0)
const periods = [{RecruitmentPeriodID: 0, PeriodName: "Tất cả"}]
const periodRef = ref<InstanceType<typeof DxSelectBox>>()
const totalCount = ref(0)
const filterPaging = new PagingRequest();
const baseTableRef = ref<InstanceType<typeof DxDataGrid>>(null)
const candidateStatus = ref("Đang tuyển dụng")
const recruitmentDetail = new RecruitmentDetailModel()
const currentRound = ref(0)
const selectedRowData = ref<RecruitmentDetailModel[]>([])
const selectedRowKey = ref<number[]>([])
const showPopupChangeRound = ref(false)
let dataSource: any[] = []

const buttonConfig = ref<DxButton>({
    type: ButtonType.default,
    height: 32,
    text: "Thêm ứng viên",
    stylingMode: ButtonStylingMode.contained,
    icon: "plus",
    onClick(e) {
        isShowPopup.value = true;
        isUpdate.value = false;
        candidateID.value = undefined
    },
});

const changeRoundConfig = ref<DxButton>({
    type: ButtonType.success,
    height: '100%',
    text: "Chuyển vòng",
    stylingMode: ButtonStylingMode.outlined,
    onClick(e) {
        showPopupChangeRound.value = true
    },
});

const EliminateConfig = ref<DxButton>({
    type: ButtonType.danger,
    height: '100%',
    text: "Loại ứng viên",
    stylingMode: ButtonStylingMode.outlined,
    icon: "remove",
    onClick(e) {
        isShowPopupEliminated.value = true
    },
});

const RecruitmentContinueConfig = ref<DxButton>({
    type: ButtonType.normal,
    height: '100%',
    text: "Tiếp tục tuyển dụng",
    stylingMode: ButtonStylingMode.outlined,
    onClick(e) {
        isShowPopupContinueRecruit.value = true
    },
})

const EmployeeConfig = ref<DxButton>({
    type: ButtonType.default,
    height: '100%',
    text: "Chuyển thành nhân viên",
    stylingMode: ButtonStylingMode.outlined,
    icon: "user",
    onClick(e) {
        isShowPopupEmployee.value = true
    },
})

const RevokeEmployeeConfig = ref<DxButton>({
    type: ButtonType.normal,
    height: '100%',
    text: "Thu hồi trạng thái nhân viên",
    stylingMode: ButtonStylingMode.outlined,
    onClick(e) {
        isShowPopupRevokeEmployee.value = true
    },
})

const DeleteMultipleConfig = ref<DxButton>({
    type: ButtonType.danger,
    height: '100%',
    text: "Xóa ứng viên",
    icon:"trash",
    stylingMode: ButtonStylingMode.outlined,
    async onClick(e) {
        const res = await candidateApi.deleteBulk(selectedRowKey.value)
        if(res.data.Success){
            toastStore.toggleToast(true, "Xóa thành công", ToastType.success);
            getCandidates()
            getTotalCandidateByRound(recruitmentDetail.RecruitmentID, currentStatus, currentPeriod.value)
        }else{
            toastStore.toggleToast(true, "Xóa thất bại", ToastType.error);
        }
    },
})

const RemoveFromRecruitConfig = ref<DxButton>({
    type: ButtonType.danger,
    height: '100%',
    text: "Xóa khỏi tin",
    icon:"trash",
    stylingMode: ButtonStylingMode.outlined,
    async onClick(e) {
        removeFromRecruitmentMultiple()
    },
})

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
       filterPaging.SearchValue = e.value
       getCandidates()
    }
}

const periodConfig = ref<DxSelectBox>({
    valueExpr: "RecruitmentPeriodID",
    displayExpr: "PeriodName",
    width: 230,
    height: 34,
    searchEnabled: false,
    dataSource: periods,
    onValueChanged(e) {
        currentPeriod.value = e.value
        recruitmentDetail.RecruitmentPeriodID = currentPeriod.value
        getCandidates()
        getTotalCandidateByRound(recruitmentDetail.RecruitmentID, currentStatus, currentPeriod.value)
    },
})

async function getCandidates(){
    const filter = [["RecruitmentRoundID", "=", currentRound.value], ["RecruitmentID", "=", recruitment.value.RecruitmentID]]
    if(filterStatus.length){
        filter.push(filterStatus)
    }
    if(currentPeriod.value){
        filter.push(["RecruitmentPeriodID", "=", currentPeriod.value.toString()])
    }
    filterPaging.CustomFilter = btoa(JSON.stringify(filter))
    const res = await recruitmentDetailApi.getFilterPaging(filterPaging);
    if (res) {
        totalCount.value = res.data.Data.TotalCount;
        dataSource = res.data.Data.Data || [];
        baseTableRef.value?.getInstance()?.option("dataSource", dataSource)
    }
}

const totalCandidateByRound= ref<any[]>([])

async function getTotalCandidateByRound(recruitmentID: number, status: number, periodID?: number) {
    const res = await recruitmentDetailApi.getTotalCandidateByRound(recruitmentID,status,periodID);
    if (res) {
        totalCandidateByRound.value = res.data.Data || [];
    }
}

const tableConfig = ref<DxDataGrid>({
    width: '100%',
    columns: [
        {
            alignment: "left",
            caption: "Tên ứng viên",
            dataField: "CandidateName",
            dataType: "string",
            cellTemplate: "name-template",
            width: 300,
        },
        {
            alignment: "left",
            caption: "Số điện thoại",
            dataField: "Mobile",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Email",
            dataField: "Email",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Ngày sinh",
            dataField: "Birthday",
            cellTemplate: "birthday-template",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Ngày ứng tuyển",
            dataField: "ApplyDate",
            cellTemplate: "date-template",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Vị trí ứng tuyển",
            dataField: "JobPositionName",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Tin tuyển dụng",
            dataField: "RecruitmentName",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Vòng ứng tuyển",
            dataField: "RecruitmentRoundName",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Nguồn ứng viên",
            dataField: "ChannelName",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Trình độ đào tạo",
            dataField: "EducationDegreeName",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Nơi đào tạo",
            dataField: "EducationPlaceName",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Chuyên ngành",
            dataField: "EducationMajorName",
            dataType: "string",
            width: 200,
        },
    ] as (string | Column<any, any>)[],
    dataSource: dataSource,
    keyExpr: "CandidateID",
    onSelectionChanged(e) {
        selectedRowData.value = e.selectedRowsData
        selectedRowKey.value = e.selectedRowKeys 
    },
    onRowDblClick(e) {
        candidateID.value = e.data.CandidateID
        isUpdate.value = true
        isShowPopup.value = true
    },
});

getRecruitment()

async function getRecruitment(){
    const res = await recruitmentApi.getByID(route.params.id.toString())
    if(res.data.Success){
        recruitment.value = res.data.Data;
        if(recruitment.value.RecruitmentPeriods){
            setTimeout(() => {
                periodRef.value?.getInstance()?.option("dataSource", [...periods, ...recruitment.value.RecruitmentPeriods])
            }, 200)
        }
        currentRound.value = recruitment.value.RecruitmentRounds[0].RecruitmentRoundID
        if(recruitment.value.RecruitmentPeriods.length){
            currentPeriod.value = recruitment.value.RecruitmentPeriods[0].RecruitmentPeriodID
        }
        recruitmentDetail.RecruitmentID = recruitment.value.RecruitmentID
        recruitmentDetail.RecruitmentRoundID = currentRound.value
        recruitmentDetail.RecruitmentPeriodID = recruitment.value.RecruitmentPeriods.length ? recruitment.value.RecruitmentPeriods[0].RecruitmentPeriodID : undefined
        recruitmentDetail.Status = 1
        getCandidates()
        getTotalCandidateByRound(recruitmentDetail.RecruitmentID, 1, recruitmentDetail.RecruitmentPeriodID)
    }
}

function pagingChange(e: BaseNavigationType) {
    filterPaging.PageIndex = e.pageIndex;
    filterPaging.PageSize = e.pageSize;
    baseTableRef.value?.getInstance()?.refresh();
}

let filterStatus: string[] = ["Status", "=", "1"]
let currentStatus: number = 1

function handleChangeStatus(type: number){
    switch (type) {
        case 1:
            candidateStatus.value = "Đang tuyển dụng"
            filterStatus = ["Status", "=", "1"]
            currentStatus = 1
            getTotalCandidateByRound(recruitmentDetail.RecruitmentID, currentStatus, recruitmentDetail.RecruitmentPeriodID)
            break;
        case 2:
            candidateStatus.value = "Bị loại"
            filterStatus = ["Status", "=", "2"]
            currentStatus = 2
            getTotalCandidateByRound(recruitmentDetail.RecruitmentID, currentStatus, recruitmentDetail.RecruitmentPeriodID)
            break;
        case 3:
            candidateStatus.value = "Đã thành nhân viên"
            filterStatus = ["IsEmployee", "=", "1"]
            currentStatus = 3
            getTotalCandidateByRound(recruitmentDetail.RecruitmentID, currentStatus, recruitmentDetail.RecruitmentPeriodID)

            break;
        default:
            candidateStatus.value = "Tất cả"
            filterStatus = []
            currentStatus = 0
            getTotalCandidateByRound(recruitmentDetail.RecruitmentID, currentStatus)
            break;
    }
    getCandidates()
}

function handleEditRecruitment(){
    router.push({name: 'setting-recruitment', params: {id: recruitment.value.RecruitmentID}})
}

function handleOpenMoreInfor(recruimnetID: number){
    isMoreInfor.value = recruimnetID
}

function handleActiveTab(tab: number){
    currentTab.value = tab
}

function handleSaveCandidate(number: number){
    if(number == 1){
        showPopupChangeRound.value = false
    }else if(number == 3){
        isShowPopupEliminated.value = false
    }else if(number == 4){
        isShowPopupEmployee.value = false
    }else if(number == 5){
        isShowPopupRevokeEmployee.value = false
    }else if(number == 6){
        isShowPopupContinueRecruit.value = false
    }
    else{
        isShowPopup.value = false
    }
    getCandidates()
    getTotalCandidateByRound(recruitment.value.RecruitmentID, currentStatus, currentPeriod.value)
    baseTableRef.value.getInstance().deselectAll()
}

async function handleDelete(event: any) { 
    const res = await candidateApi.delete(event.CandidateID)
    if(res.data.Success){
        toastStore.toggleToast(true, "Xóa thành công", ToastType.success);
        getCandidates()
        getTotalCandidateByRound(recruitmentDetail.RecruitmentID, currentStatus, currentPeriod.value)
    }else{
        toastStore.toggleToast(true, "Xóa thất bại", ToastType.error);
    }
}

async function removeFromRecruitmentMultiple() {
    const res = await recruitmentDetailApi.deleteBulk(selectedRowKey.value)
    if(res.data.Success){
        toastStore.toggleToast(true, "Xóa thành công", ToastType.success);
        getCandidates()
        getTotalCandidateByRound(recruitmentDetail.RecruitmentID, currentStatus, currentPeriod.value)
    }else{
        toastStore.toggleToast(true, "Xóa thất bại", ToastType.error);
    }
}

function handleShowTotal(id: number){
    for (const round of totalCandidateByRound.value) {
        if(round.RecruitmentRoundID == id){
            return round.TotalCount
        }
    } 
    return 0
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

function handleClickRound(id: number){
    currentRound.value = id
    getCandidates()
}

function backPage(){
    router.go(-1)
}
</script>
<style lang="scss">
.publish{
    border: solid 1px #48bb56!important;
    color: #48bb56!important;
    height: 34px;
}
.stop{
    border: solid 1px red!important;
    color: red!important;
    height: 34px;
}
.header{
    border-bottom: 1px solid #e0e0e0;
    background-color: #fff;
}
.title{
    font-size: 20px;
    font-weight: 700;
    line-height: 26px;
    padding: 2px 0;
    color: #1e2633;
    white-space: nowrap;
    max-width: 690px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 700;
}
.edit-btn{
    border-radius: 11.5px;
    min-width: 76px;
    width: 77px!important;
    padding: 1px 2px 0;
    height: 24px;
    border: 1px solid #e0e6ec;
    background-color: #fff;
    overflow: hidden;
    margin-left: 21px;
}
.recruitment-status{
    margin: 0 16px;
    width: fit-content;
    .recruitment-status-dot{
        background-color: #48bb56 ;
        width: 10px;
        height: 10px;
        border-radius:50%;
    }
}
.news-sub-content{
    font-size: 14px;
    max-width: 200px;
    color: #1E2633;
    line-height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.sub-content{
    font-size: 14px;
    color: #6a727d;
    line-height: 20px;
}
.tab-detail{
    width: 100%;
    height: 42px;
    margin-top: 12px;
}
.active{
    color: #2680eb;
    border-bottom: 3px solid #2680eb;
    font-weight: 700;
    cursor: pointer;
}
.item-content{
    min-width: 120px;
    border-radius: 5px;
    cursor: pointer;
    flex: 1;
}
.round-name{
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>