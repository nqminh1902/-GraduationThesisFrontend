<template>
    <div class="recruitment-infor">
        <div class="wrap-block">
            <div class="heading-title">
                KẾ HOẠCH THỰC HIỆN
            </div>
            <div class="sub-title">
                Khai báo tin này tuyển cho nhu cầu tháng nào và SL cần tuyển thực tế để phục vụ thống kê báo cáo. Có thể chia tin thành nhiều đợt tuyển dụng
            </div>
            <div class="title-time">
                Kế hoạch theo tin
            </div>
            <div class="flex">
                <div class="field flex-1">
                    <div class="lable">SL cần tuyển thực tế <span style="color: red;">*</span></div>
                    <base-number-box 
                        :config="realQuantityConfig"
                    />
                </div>
                <div class="w-[12px]"></div>
                <div class="field flex-1">
                    <div class="lable">Chỉ tiêu tháng <span style="color: red;">*</span></div>
                    <base-date-box :config="monthlyTargetConfig"/>
                </div>
                <div class="w-[12px]"></div>
                <div class="field flex-1">
                    <div class="lable">Thời hạn dự kiến<span style="color: red;">*</span></div>
                    <base-date-box :config="expectedDeadlineConfig"/>
                </div>
            </div>
            <div class="w-full mb-[12px]">
                <base-check-box :config="checkboxConfig" v-model="isShowPopup"/>
            </div>
            <div class="w-full" v-show="recruitmentPeriods.length">
                <div class="flex justify-between">
                    <div class="title-time">KẾ HOẠCH THEO ĐỢT</div>
                    <base-button :config="addPeriodConfig"/>
                </div>
                <base-table :config="tableConfig" 
                    ref="baseTableRef" 
                    :isShowCustomButton="true" 
                    @onDelete="handleDeletePeriod"
                    @onEdit="handleEditPeriod"
                    >
                    <template #date="data">
                        <div class="">{{ formatDate(data.data.data.ReportPeriod) }}</div>
                    </template>
                    <template #image="data">
                       <div class="">{{ formatDate(data.data.data.StartDate) + ' - ' + formatDate(data.data.data.EndDate) }}</div>
                    </template>
                </base-table>
            </div>
        </div>
    </div>
    <base-popup
        v-if="isShowPopup"
        :config="popupPeriodConfig"
        :popupVisible="isShowPopup"
        @close="isShowPopup = false"
        ><template #body>
            <h2 class="mb-[12px]">{{isEdit ? 'Sửa đợt' : 'Thêm đợt'}}</h2>
            <div class="field">
                <div class="lable"> Tên đợt tuyển dụng <span style="color: red;">*</span></div>
                <base-text-box 
                    :config="periodNameConfig"
                    v-model="recruitmentPeriod.PeriodName"
                />
            </div>
            <div class="flex">
                <div class="field flex-1">
                    <div class="lable">Từ ngày <span style="color: red;">*</span></div>
                    <base-date-box :config="fromDateConfig" v-model="recruitmentPeriod.StartDate"/>
                </div>
                <div class="w-[12px]"></div>
                <div class="field flex-1">
                    <div class="lable">Đến ngày <span style="color: red;">*</span></div>
                    <base-date-box :config="toDateConfig" v-model="recruitmentPeriod.EndDate"/>
                </div>
            </div>
            <div class="flex">
                <div class="field flex-1">
                    <div class="lable">Số lượng cần tuyển <span style="color: red;">*</span></div>
                    <base-number-box :config="recruitedNumberConfig" v-model="recruitmentPeriod.Quantity"/>
                </div>
                <div class="w-[12px]"></div>
                <div class="field flex-1">
                    <div class="lable">Chỉ tiêu tháng <span style="color: red;">*</span></div>
                    <base-date-box :config="targetDate" v-model="recruitmentPeriod.ReportPeriod"/>
                </div>
            </div>
            <div class="w-full py-[16px] flex justify-end">
                <base-button :config="saveButton"/>
            </div>
        </template>
    </base-popup>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { DxButton, DxCheckBox, DxDataGrid, DxDateBox, DxNumberBox, DxPopup, DxTextBox } from "devextreme-vue";
import {
    BaseNumberBox,
    BaseTable,
    BaseTextBox,
    BaseStatus,
    BaseButton,
    BasePopup,
    BaseSelectBox,
    BaseUploadImage,
    BaseTextArea,
    BaseDateBox,
    BaseCheckBox,
} from "../../../components/base";
import { ButtonStylingMode, ButtonType } from "../../../enums";
import {RecruitmentPeriodModel} from "../../../models"
import { formatDate } from "../../../utils";

const realQuantityConfig = ref<DxNumberBox>({
    min: 0,
    value: 0
})

const recruitedNumberConfig = ref<DxNumberBox>({
    min: 1,
    value: 1
})

const monthlyTargetConfig = ref<DxDateBox>({
    placeholder: "dd/MM/yyyy"
})

const expectedDeadlineConfig = ref<DxDateBox>({
    placeholder: "dd/MM/yyyy"
})

const checkboxConfig = ref<DxCheckBox>({
    text: "Lên kế hoạch theo đợt"
})

const popupPeriodConfig: DxPopup = {
    width: 500,
    height: 'auto',
    wrapperAttr: {
        class: 'popup-period base-popup',
    },
}

const isShowPopup = ref(false)

const baseTableRef = ref();

const periodNameConfig = ref<DxTextBox>({
    placeholder: "Tên đợt tuyển dụng"
})

const fromDateConfig = ref<DxDateBox>({
    disabled : true
})

const toDateConfig = ref<DxDateBox>({
    placeholder: "dd/MM/yyyy"
})

const targetDate = ref<DxDateBox>({
    placeholder: "MM/yyyy",
    displayFormat: "MM/yyyy",
    pickerType:"calendar",
    openOnFieldClick: true
})

const recruitmentPeriods = ref<RecruitmentPeriodModel[]>([])
const recruitmentPeriod = ref<RecruitmentPeriodModel>(new RecruitmentPeriodModel())

const saveButton = ref<DxButton>({
    type: ButtonType.default,
    height: 36,
    width: 'auto',
    text: "Lưu",
    stylingMode: ButtonStylingMode.contained,
    onClick(e) {
        if(isEdit.value){
            let period = recruitmentPeriods.value.find((period) => period.RecruitmentPeriodID == recruitmentPeriod.value.RecruitmentPeriodID)
            period ? period = recruitmentPeriod.value : period
        }else{
            recruitmentPeriods.value.push(recruitmentPeriod.value)
        }
        isEdit.value = false
        recruitmentPeriod.value = new RecruitmentPeriodModel()
        isShowPopup.value = false
        baseTableRef.value.getInstance().refresh()
    },
})

const addPeriodConfig = ref<DxButton>({
    type: ButtonType.default,
    height: 36,
    width: 'auto',
    text: "Thêm đợt",
    stylingMode: ButtonStylingMode.contained,
    onClick(e) {
        isShowPopup.value = true
        if(!recruitmentPeriods.value.length) return 
        recruitmentPeriod.value.RecruitmentPeriodID = recruitmentPeriods.value[recruitmentPeriods.value.length - 1].RecruitmentPeriodID++
    },
})

const isEdit = ref(false)

const tableConfig = ref<DxDataGrid>({
    height: "auto",
    columns: [
        {
            alignment: "left",
            caption: "Tên đợt tuyển dụng",
            dataField: "PeriodName",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Thời gian",
            dataType: "string",
            dataField: "StartDate",
            cellTemplate: "image-template",
            width: 200,
        },
        {
            alignment: "right",
            caption: "Số lượng cần tuyển",
            dataType: "number",
            dataField: "Quantity",
            width: 150,
        },
        {
            alignment: "left",
            caption: "Chỉ tiêu tháng",
            dataType: "string",
            dataField: "ReportPeriod",
            cellTemplate: "date-template",
            width: 200,
        },
    ],
    selection: {
        mode: "none"
    },
    dataSource: recruitmentPeriods.value,
    keyExpr: "RecruitmentPeriodID",
});

function handleDeletePeriod(e: RecruitmentPeriodModel){
    recruitmentPeriods.value = recruitmentPeriods.value.filter((period) => period.RecruitmentPeriodID != e.RecruitmentPeriodID)
    console.log(recruitmentPeriods.value);
    baseTableRef.value?.getInstance()?.option('dataSource', recruitmentPeriods.value)
}

function handleEditPeriod(e: RecruitmentPeriodModel){
    isShowPopup.value = true
    isEdit.value = true
    recruitmentPeriod.value = e
}

</script>
<style lang="scss" scoped>
    .recruitment-infor{
        max-height: calc(100vh - 48px - 66px);
        overflow-y: auto;
        background-color: #F1F2F6;
        padding: 8px;
        min-height: 100%;
        .wrap-block{
            background-color: #ffffff;
            border-radius: 6px;
            width: 100%;
            padding: 16px 24px;
            margin-bottom: 16px;
            .heading-title{
                font-size: 16px;
                color: #1E2633;
                margin-bottom: 16px;
                text-transform: uppercase;
                font-weight: 700;
            }
            .sub-title{
                font-size: 14px;
                color: #6a727d;
            }
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
            .title-time{
                font-size: 16px;
                color: #1E2633;
                font-weight: 700;
                margin-bottom: 8px;
            }
        }
    }
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
</style>