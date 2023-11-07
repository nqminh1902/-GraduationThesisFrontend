<template>
    <div class="recruitment-infor">
        <div class="wrap-block">
            <div class="heading-title">
                Thông tin chung
            </div>
            <div class="field">
                <div class="lable">Tiêu đề tin tuyển dụng <span style="color: red;">*</span></div>
                <base-text-box
                    :config="titleConfig"
                    v-model="recruitment.Title"
                />
            </div>
            <div class="field">
                <div class="lable">Vị trí tuyển dụng <span style="color: red;">*</span></div>
                <base-select-box :config="jobPositionConfig"  v-model="recruitment.JobPositionID"/>
            </div>
            <div class="field">
                <div class="lable">Ngành nghề <span style="color: red;">*</span></div>
                <base-select-box :config="carrerConfig" v-model="recruitment.CarrerID"/>
            </div>
            <div class="field">
                <div class="lable">Địa điểm làm việc <span style="color: red;">*</span></div>
                <base-select-box :config="workLocationConfig" v-model="recruitment.WorkLocationID"/>
            </div>
            <div class="flex">
                <div class="field flex-1">
                    <div class="lable">Loại hình công việc</div>
                    <base-select-box :config="typeOfWorkConfig" v-model="recruitment.WorkType"/>
                </div>
                <div class="w-[12px]"></div>
                <div class="field flex-1">
                    <div class="lable">Hạn nộp hồ sơ <span style="color: red;">*</span></div>
                    <base-date-box :config="deathLineConfig" v-model="recruitment.RegistrationExpiryDate"/>
                </div>
            </div>
            <div class="title-time">Mức lương</div>
            <div class="flex">
                <div class="field">
                    <div class="lable">Từ <span style="color: red;">*</span></div>
                    <base-number-box 
                        :config="salaryFromConfig"
                        v-model="recruitment.MinSalary"
                    />
                </div>
                <div class="w-[12px]"></div>
                <div class="field">
                    <div class="lable">Đến <span style="color: red;">*</span></div>
                    <base-number-box 
                        :config="salaryToConfig"
                        v-model="recruitment.MaxSalary"
                    />
                </div>
                <div class="w-[12px]"></div>
                <div class="field">
                    <div class="lable">Loại tiền <span style="color: red;">*</span></div>
                    <base-select-box :config="currencyConfig" v-model="recruitment.CurrencyCodeID"/>
                </div>
            </div>
        </div>

        <div class="wrap-block">
            <div class="heading-title">
                Mô tả công việc
            </div>
            <div class="field">
                <div class="lable">Mô tả công việc <span style="color: red;">*</span></div>
                <base-text-area :config="descriptionConfig" v-model="recruitment.Summary"/>
            </div>
            <div class="field">
                <div class="lable">Mô tả chung về công việc <span style="color: red;">*</span></div>
                <DxHtmlEditor v-bind="generalDescriptionConfig" v-model="recruitment.Description">
                    <DxToolbar :multiline="true">
                        <DxItem name="undo" />
                        <DxItem name="redo" />
                        <DxItem name="separator" />
                        <DxItem
                            name="size"
                            :accepted-values="sizeValues"
                        />
                        <DxItem
                            name="font"
                            :accepted-values="fontValues"
                        />
                        <DxItem name="separator" />
                        <DxItem name="bold" />
                        <DxItem name="italic" />
                        <DxItem name="strike" />
                        <DxItem name="underline" />
                        <DxItem name="separator" />
                        <DxItem name="alignLeft" />
                        <DxItem name="alignCenter" />
                        <DxItem name="alignRight" />
                        <DxItem name="alignJustify" />
                        <DxItem name="separator" />
                        <DxItem name="orderedList" />
                        <DxItem name="bulletList" />
                        <DxItem name="separator" />
                        <DxItem
                            name="header"
                            :accepted-values="headerValues"
                        />
                        <DxItem name="separator" />
                        <DxItem name="color" />
                        <DxItem name="background" />
                        <DxItem name="separator" />
                        <DxItem name="link" />
                        <DxItem name="image" />
                        <DxItem name="separator" />
                        <DxItem name="clear" />
                    </DxToolbar>
                    <DxTableContextMenu :enabled="true" />
                    <DxMediaResizing :enabled="true" />
                </DxHtmlEditor>
            </div>
            <div class="field">
                <div class="lable">Yêu cầu công việc <span style="color: red;">*</span></div>
                <DxHtmlEditor v-bind="requirementsConfig" v-model="recruitment.Requirement">
                    <DxToolbar :multiline="true">
                        <DxItem name="undo" />
                        <DxItem name="redo" />
                        <DxItem name="separator" />
                        <DxItem
                            name="size"
                            :accepted-values="sizeValues"
                        />
                        <DxItem
                            name="font"
                            :accepted-values="fontValues"
                        />
                        <DxItem name="separator" />
                        <DxItem name="bold" />
                        <DxItem name="italic" />
                        <DxItem name="strike" />
                        <DxItem name="underline" />
                        <DxItem name="separator" />
                        <DxItem name="alignLeft" />
                        <DxItem name="alignCenter" />
                        <DxItem name="alignRight" />
                        <DxItem name="alignJustify" />
                        <DxItem name="separator" />
                        <DxItem name="orderedList" />
                        <DxItem name="bulletList" />
                        <DxItem name="separator" />
                        <DxItem
                            name="header"
                            :accepted-values="headerValues"
                        />
                        <DxItem name="separator" />
                        <DxItem name="color" />
                        <DxItem name="background" />
                        <DxItem name="separator" />
                        <DxItem name="link" />
                        <DxItem name="image" />
                        <DxItem name="separator" />
                        <DxItem name="clear" />
                    </DxToolbar>
                    <DxTableContextMenu :enabled="true" />
                    <DxMediaResizing :enabled="true" />
                </DxHtmlEditor>
            </div>
            <div class="field">
                <div class="lable">Quyền lợi <span style="color: red;">*</span></div>
                <DxHtmlEditor v-bind="interestConfig" v-model="recruitment.Benefit">
                    <DxToolbar :multiline="true">
                        <DxItem name="undo" />
                        <DxItem name="redo" />
                        <DxItem name="separator" />
                        <DxItem
                            name="size"
                            :accepted-values="sizeValues"
                        />
                        <DxItem
                            name="font"
                            :accepted-values="fontValues"
                        />
                        <DxItem name="separator" />
                        <DxItem name="bold" />
                        <DxItem name="italic" />
                        <DxItem name="strike" />
                        <DxItem name="underline" />
                        <DxItem name="separator" />
                        <DxItem name="alignLeft" />
                        <DxItem name="alignCenter" />
                        <DxItem name="alignRight" />
                        <DxItem name="alignJustify" />
                        <DxItem name="separator" />
                        <DxItem name="orderedList" />
                        <DxItem name="bulletList" />
                        <DxItem name="separator" />
                        <DxItem
                            name="header"
                            :accepted-values="headerValues"
                        />
                        <DxItem name="separator" />
                        <DxItem name="color" />
                        <DxItem name="background" />
                        <DxItem name="separator" />
                        <DxItem name="link" />
                        <DxItem name="image" />
                        <DxItem name="separator" />
                        <DxItem name="clear" />
                    </DxToolbar>
                    <DxTableContextMenu :enabled="true" />
                    <DxMediaResizing :enabled="true" />
                </DxHtmlEditor>
            </div>
        </div>

        <div class="wrap-block">
            <div class="heading-title">
                Thông tin liên hệ
            </div>
            <div class="flex">
                <div class="field flex-1">
                    <div class="lable">Người liên hệ <span style="color: red;">*</span></div>
                    <base-text-box
                        :config="contactPersonConfig" v-model="recruitment.ContactName"
                    />
                </div>
                <div class="w-[12px]"></div>
                <div class="field flex-1">
                    <div class="lable">Chức danh <span style="color: red;">*</span></div>
                    <base-text-box
                        :config="jobTitleConfig" v-model="recruitment.ContactPosition"
                    />
                </div>
            </div>
            <div class="flex">
                <div class="field flex-1">
                    <div class="lable">Số điện thoại <span style="color: red;">*</span></div>
                    <base-text-box
                        :config="phoneConfig" v-model="recruitment.ContactMobile"
                    />
                </div>
                <div class="w-[12px]"></div>
                <div class="field flex-1">
                    <div class="lable">Email <span style="color: red;">*</span></div>
                    <base-text-box
                        :config="emailConfig" v-model="recruitment.ContactEmail"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
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
    BaseDateBox
} from "../../../components/base";
import {
    DxToolbar,
    DxItem,
    DxTableContextMenu,
    DxMediaResizing
} from 'devextreme-vue/html-editor';
import { useRecruitmentStore } from "../../../stores";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { DxDateBox, DxHtmlEditor, DxNumberBox, DxSelectBox, DxTextArea, DxTextBox } from "devextreme-vue";
import {jobPositions, carrers, workLocations, currencys, workTypes} from "../../../mocks"

const titleConfig = ref<DxTextBox>({
    placeholder: "Tiêu đề tin đăng",
})

const contactPersonConfig = ref<DxTextBox>({
    placeholder: "Người liên hệ..."
})

const jobTitleConfig = ref<DxTextBox>({
    placeholder: "Nhập chức danh..."
})

const phoneConfig = ref<DxTextBox>({
    placeholder: "Số điện thoại..."
})

const emailConfig = ref<DxTextBox>({
    placeholder: "Email..."
})

const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt']
const fontValues = ['Arial', 'Georgia', 'Tahoma', 'Times New Roman', 'Verdana']
const headerValues = [false, 1, 2, 3, 4, 5]

const jobPositionConfig = ref<DxSelectBox>({
    width: '100%',
    placeholder: 'Vị trí tuyển dụng',
    noDataText: 'Không có dữ liệu',
    displayExpr: "JobPositionName",
    valueExpr: "JobPositionID",
    dataSource: jobPositions,
    searchEnabled: true,
    onItemClick(e) {
        recruitment.value.JobPositionID = e.itemData.JobPositionID
        recruitment.value.JobPositionName = e.itemData.JobPositionName
    }
});

const carrerConfig = ref<DxSelectBox>({
    width: '100%',
    placeholder: 'Chọn ngành nghề',
    noDataText: 'Không có dữ liệu',
    displayExpr: "CarrerName",
    valueExpr: "CareerID",
    dataSource: carrers,
    searchEnabled: true,
    onItemClick(e) {  
        recruitment.value.CarrerID = e.itemData.CareerID
        recruitment.value.CarrerName = e.itemData.CarrerName
    }
});

const workLocationConfig = ref<DxSelectBox>({
    width: '100%',
    placeholder: 'Chọn Địa điểm làm việc',
    noDataText: 'Không có dữ liệu',
    displayExpr: "WorkLocationName",
    valueExpr: "WorkLocationID",
    dataSource: workLocations,
    searchEnabled: true,
    onItemClick(e) {
        recruitment.value.WorkLocationID = e.itemData.WorkLocationID
        recruitment.value.WorkLocationName = e.itemData.WorkLocationName
    }
});

const deathLineConfig = ref<DxDateBox>({
    placeholder: "dd/MM/yyyy"
})

const typeOfWorkConfig = ref<DxSelectBox>({
    width: '100%',
    placeholder: 'Chọn loại hình công việc',
    noDataText: 'Không có dữ liệu',
    displayExpr: "TypeOfWorkName",
    valueExpr: "TypeOfWorkID",
    dataSource: workTypes,
    searchEnabled: true,
    onItemClick(e) {
        recruitment.value.WorkType = e.itemData.TypeOfWorkID
    }
});

const currencyConfig = ref<DxSelectBox>({
    width: '100%',
    placeholder: 'Chọn loại tiền',
    noDataText: 'Không có dữ liệu',
    displayExpr: "value",
    valueExpr: "id",
    dataSource: currencys,
    searchEnabled: true,
    onValueChanged(e) {
        recruitment.value.CurrencyCodeID = e.value
    },
});

const salaryFromConfig = ref<DxNumberBox>({
    min: 0,
    format: '#,##0',
})

const salaryToConfig = ref<DxNumberBox>({
    min: 0,
    format: '#,##0',
})

const descriptionConfig: DxTextArea = {
    height: 96,
    maxHeight: 96,
    placeholder: "Mô tả tóm tắt công việc",
};

const generalDescriptionConfig = ref<DxHtmlEditor>({
    allowSoftLineBreak: true,
    height: 300,
    activeStateEnabled: true,
    hoverStateEnabled: true,
    placeholder: "Những công việc mà vị trí này phải đảm nhận...",
    onValueChanged(e) {
        recruitment.value.Description = e.value
    },
})

const requirementsConfig = ref<DxHtmlEditor>({
    allowSoftLineBreak: true,
    height: 300,
    activeStateEnabled: true,
    hoverStateEnabled: true,
    placeholder: "Những yêu cầu mà ứng viên phải đáp ứng...",
    onValueChanged(e) {
        recruitment.value.Requirement = e.value
    },
})

const interestConfig = ref<DxHtmlEditor>({
    allowSoftLineBreak: true,
    height: 300,
    activeStateEnabled: true,
    hoverStateEnabled: true,
    placeholder: "Những quyền lợi mà ứng viên được nhận nếu trúng tuyển",
    onValueChanged(e) {
        recruitment.value.Benefit = e.value
    },
})

const recruitmentStore = useRecruitmentStore()

const { recruitment } = storeToRefs(recruitmentStore);


</script>

<style lang="scss" scoped>
    .recruitment-infor{
        max-height: calc(100vh - 48px - 66px);
        overflow-y: auto;
        background-color: #F1F2F6;
        padding: 8px;
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
</style>