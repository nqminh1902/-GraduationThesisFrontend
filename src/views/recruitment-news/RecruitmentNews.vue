<template>
    <div id="recruiment-news">
        <div class="container-candidate">
            <div class="content-title">
                <div class="flex">
                    <Icon
                        :icon="'tabler:news'"
                        :color="'#2563eb'"
                        width="24"
                        height="24"
                        class="mr-6"
                    />
                    <div class="text-title">Tin tuyển dụng</div>
                </div>
                <div class="">
                    <base-button :config="buttonConfig" />
                </div>
            </div>
            <div class="toolbar">
                <base-text-box :config="searchDefaultConfig" />
            </div>
            <div class="list-recruitment">
                <div class="list-item">
                    <div class="recruitment-news-infor">
                        <div class="recruitment-status">
                            <div class="recruitment-status-dot"></div>
                        </div>
                        <div class="recruitment-infor">
                            <div class="flex justify-between ">
                                <div class="recruitment-news-name">{{ recruitmentTemp.Title }}</div>
                                <div class="recruitment-option">
                                    <Icon
                                        :icon="'entypo:dots-three-vertical'"
                                        :color="'#7a8188'"
                                        width="16"
                                        height="16"
                                        class="cursor-pointer"
                                        :id="'recruiment-'+recruitmentTemp.RecruitmentID"
                                        @click="handleOpenOptionBtn(recruitmentTemp.RecruitmentID)"
                                    />
                                </div>
                            </div>
                            <div class="flex pt-[8px] pb-[16px] items-center">
                                <div class="news-sub-content">{{ recruitmentTemp.JobPositionName }}</div>
                                <div class="bg-[#6a727d] w-[6px] h-[6px] rounded-full mx-[7px]"></div>
                                <div class="news-sub-content mr-[15px] pr-[15px] border-solid border-[#e0e0e0] border-r-[1px]">{{ recruitmentTemp.DepartmentName }}</div>
                                <div class="sub-content mr-[15px] pr-[15px] border-solid border-[#e0e0e0] border-r-[1px]">Số lượng cần tuyển: <b>{{ recruitmentTemp.Quantity }}</b></div>
                                <div class="sub-content mr-[15px] pr-[15px] border-solid border-[#e0e0e0] border-r-[1px]">Hạn nộp hồ sơ: <b>{{ formatDate(recruitmentTemp.RegistrationExpiryDate) }}</b></div>
                                <div class="sub-content">Xem thêm</div>
                            </div>
                        </div>
                    </div>
                    <div class="recruitment-news-rounds">
                        <div class="flex items-center">
                            <div class="item-content" v-for="item in recruitmentTemp.RecruitmentRounds" :key="item.RecruitmentRoundID">
                                <div class="text-center text-xl font-bold"> - </div>
                                <div class="round-name">{{ item.RecruitmentRoundName }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <DxPopover 
        :target="'#recruiment-'+recruitmentTemp.RecruitmentID"
        show-event="click"
        @onHidden="isShowPopover = 0"
        :visible="isShowPopover == recruitmentTemp.RecruitmentID"
        :hideOnOutsideClick="true"
        position="bottom"
        width="150px"
        >
                <div class="item-btn">
                    <Icon
                        :icon="'material-symbols:edit-outline'"
                        :color="'#7a8188'"
                        width="20"
                        height="20"
                        class="cursor-pointer"
                    />
                    <div class="">Sửa</div>
                </div>
                <div class="item-btn">
                    <Icon
                        :icon="'humbleicons:duplicate'"
                        :color="'#7a8188'"
                        width="20"
                        height="20"
                        class="cursor-pointer"
                    />
                    <div class="">Nhân bản</div>
                </div>
                <div class="item-btn">
                    <Icon
                        :icon="'ic:baseline-delete'"
                        :color="'#FF0000'"
                        width="20"
                        height="20"
                        class="cursor-pointer"
                    />
                    <div class="" style="color: #FF0000;">Xóa</div>
                </div>
    </DxPopover>
</template>
<script lang="ts" setup>
import { useI18n } from "vue3-i18n";
import {
    BaseTable,
    BasePaging,
    BaseNavigation,
    BaseTextBox,
    BaseStatus,
    BaseButton,
    BasePopup,
    BaseSelectBox,
} from "../../components/base/index";
import { Icon } from "@iconify/vue";
import type {
    DxButton,
    DxDataGrid,
    DxPopup,
    DxSelectBox,
} from "devextreme-vue";
import { ref } from "vue";
import CustomStore from "devextreme/data/custom_store";
import CollectionApi from "../../apis/collection/collection-api";
import { CollectionModel, PagingRequest } from "../../models";
import type { BaseNavigationType } from "../../types";
import type DxTextBox from "devextreme-vue/text-box";
import { ButtonStylingMode, ButtonType, ToastType } from "../../enums";
import { useToastStore } from "../../stores";
import { formatDate } from "../../utils";
import { DxPopover } from 'devextreme-vue/popover';
import { useRouter } from "vue-router";

const toastStore = useToastStore();
const { t, getLocale, setLocale } = useI18n();
const router = useRouter()


const searchDefaultConfig: DxTextBox = {
    width: 260,
    placeholder: t("base.general.typeValue"),
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

const textBoxConfig: DxTextBox = {
    placeholder: t("base.general.typeValue"),
    onValueChanged: (e) => {
    },
};

const buttonConfig = ref<DxButton>({
    type: ButtonType.default,
    height: 36,
    text: "Thêm bộ sưu tập",
    stylingMode: ButtonStylingMode.contained,
    icon: "plus",
    onClick(e) {
        router.push({name: 'setting-recruitment', params: {id: 0}})
    },
});

const recruitment = ref(JSON.stringify({
    "RecruitmentID": 580,
    "Title": "Tin tuyển dụng đào tạo",
    "ValueSearch": "Tin tuyen dung dao tao",
    "DepartmentID": "65725e22-3b53-452b-be69-70398321a498",
    "DepartmentName": "VĂN PHÒNG ĐẠI DIỆN CÔNG TY CỔ PHẦN XÂY DỰNG CENTRAL",
    "JobPositionID": 428,
    "ListCareerID": null,
    "ListCareerName": null,
    "RankID": null,
    "RankName": null,
    "JobPositionName": "Lập trình viên",
    "Quantity": 1,
    "WorkType": 0,
    "RegistrationExpiryDate": "2023-10-31T23:59:59.000+07:00",
    "MinSalary": 0,
    "MaxSalary": 0,
    "CurrencyCodeID": null,
    "Description": null,
    "Summary": null,
    "RecruitmentURL": null,
    "ContactName": null,
    "ContactEmail": "misaamisdemo@gmail.com",
    "ContactPhone": "0912345689",
    "ContactTitle": null,
    "ContactUserID": "e652097d-a0d6-40db-8a09-e8c16234e31d",
    "Position": null,
    "Email": null,
    "Mobile": null,
    "Status": 1,
    "ShowRecruiment": 0,
    "UserID": "e652097d-a0d6-40db-8a09-e8c16234e31d",
    "FullName": null,
    "RecruitmentChannelIDs": null,
    "MessageID": null,
    "Requirement": null,
    "Benifit": null,
    "EmailRecruitment": null,
    "PasswordEmail": null,
    "CoverImage": null,
    "LastMessageUid": null,
    "ListPageFacebookID": null,
    "IsSendMailWhenCandidateApply": false,
    "IsUpdateCandidateByPeriod": null,
    "IsAutoRecruit": null,
    "EmailApplyTemplate": null,
    "FacebookPost": null,
    "SalaryContent": null,
    "EmailSubject": null,
    "IsChangerCoverImage": false,
    "IsChangeJobPosition": false,
    "IsChangeTemplate": false,
    "GoogleTagCode": null,
    "EmailTemplateID": null,
    "TemplateID": null,
    "CloseDate": null,
    "ReportPeriod": null,
    "RecruitmentRounds": [
        {
            "RecruitmentRoundID": 3845,
            "RecruitmentRoundName": "Ứng tuyển",
            "RecruitmentID": 580,
            "EvaluationFormIDs": null,
            "EvaluationFormNames": null,
            "RoundTypeID": 45,
            "RoundType": 1,
            "RoundTypeColor": "#B1C4D2",
            "SortOrder": 1,
            "IsSystem": true,
            "IsRequestTrain": null,
            "CountCandidate": null,
            "RecruitmentRoundDetailEvaluations": null,
            "Candidates": null,
            "TenantID": "bfb5c2c4-7d5a-49c7-9520-c45b5aa31126",
            "CreatedDate": "2023-10-18T14:21:46.552+07:00",
            "CreatedBy": null,
            "ModifiedDate": "2023-10-18T14:22:09.556+07:00",
            "ModifiedBy": "NV000003",
            "EditVersion": "2023-10-18T14:22:09.554+07:00",
            "State": 0,
            "OldData": null,
            "PassWarningCode": null
        },
        {
            "RecruitmentRoundID": 3846,
            "RecruitmentRoundName": "Sơ loại hồ sơ",
            "RecruitmentID": 580,
            "EvaluationFormIDs": null,
            "EvaluationFormNames": null,
            "RoundTypeID": 305,
            "RoundType": null,
            "RoundTypeColor": "rgba(251, 145, 172, 0.8)",
            "SortOrder": 2,
            "IsSystem": false,
            "IsRequestTrain": null,
            "CountCandidate": null,
            "RecruitmentRoundDetailEvaluations": null,
            "Candidates": null,
            "TenantID": "bfb5c2c4-7d5a-49c7-9520-c45b5aa31126",
            "CreatedDate": "2023-10-18T14:21:46.552+07:00",
            "CreatedBy": null,
            "ModifiedDate": "2023-10-18T14:22:09.562+07:00",
            "ModifiedBy": "NV000003",
            "EditVersion": "2023-10-18T14:22:09.556+07:00",
            "State": 0,
            "OldData": null,
            "PassWarningCode": null
        },
        {
            "RecruitmentRoundID": 3847,
            "RecruitmentRoundName": "Phỏng vấn vòng 1",
            "RecruitmentID": 580,
            "EvaluationFormIDs": null,
            "EvaluationFormNames": null,
            "RoundTypeID": 43,
            "RoundType": 3,
            "RoundTypeColor": "#21AAEA",
            "SortOrder": 3,
            "IsSystem": false,
            "IsRequestTrain": null,
            "CountCandidate": null,
            "RecruitmentRoundDetailEvaluations": null,
            "Candidates": null,
            "TenantID": "bfb5c2c4-7d5a-49c7-9520-c45b5aa31126",
            "CreatedDate": "2023-10-18T14:21:46.552+07:00",
            "CreatedBy": null,
            "ModifiedDate": "2023-10-18T14:22:09.564+07:00",
            "ModifiedBy": "NV000003",
            "EditVersion": "2023-10-18T14:22:09.558+07:00",
            "State": 0,
            "OldData": null,
            "PassWarningCode": null
        },
        {
            "RecruitmentRoundID": 3848,
            "RecruitmentRoundName": "PV vòng 2",
            "RecruitmentID": 580,
            "EvaluationFormIDs": null,
            "EvaluationFormNames": null,
            "RoundTypeID": 43,
            "RoundType": 3,
            "RoundTypeColor": "#21AAEA",
            "SortOrder": 4,
            "IsSystem": false,
            "IsRequestTrain": null,
            "CountCandidate": null,
            "RecruitmentRoundDetailEvaluations": null,
            "Candidates": null,
            "TenantID": "bfb5c2c4-7d5a-49c7-9520-c45b5aa31126",
            "CreatedDate": "2023-10-18T14:21:46.552+07:00",
            "CreatedBy": null,
            "ModifiedDate": "2023-10-18T14:22:09.566+07:00",
            "ModifiedBy": "NV000003",
            "EditVersion": "2023-10-18T14:22:09.559+07:00",
            "State": 0,
            "OldData": null,
            "PassWarningCode": null
        },
        {
            "RecruitmentRoundID": 3849,
            "RecruitmentRoundName": "Offer",
            "RecruitmentID": 580,
            "EvaluationFormIDs": null,
            "EvaluationFormNames": null,
            "RoundTypeID": 42,
            "RoundType": 4,
            "RoundTypeColor": "#39C5AB",
            "SortOrder": 5,
            "IsSystem": false,
            "IsRequestTrain": null,
            "CountCandidate": null,
            "RecruitmentRoundDetailEvaluations": null,
            "Candidates": null,
            "TenantID": "bfb5c2c4-7d5a-49c7-9520-c45b5aa31126",
            "CreatedDate": "2023-10-18T14:21:46.552+07:00",
            "CreatedBy": null,
            "ModifiedDate": "2023-10-18T14:22:09.567+07:00",
            "ModifiedBy": "NV000003",
            "EditVersion": "2023-10-18T14:22:09.561+07:00",
            "State": 0,
            "OldData": null,
            "PassWarningCode": null
        },
        {
            "RecruitmentRoundID": 3850,
            "RecruitmentRoundName": "Học việc",
            "RecruitmentID": 580,
            "EvaluationFormIDs": null,
            "EvaluationFormNames": null,
            "RoundTypeID": 44,
            "RoundType": 2,
            "RoundTypeColor": "#4285DF",
            "SortOrder": 6,
            "IsSystem": false,
            "IsRequestTrain": true,
            "CountCandidate": 1,
            "RecruitmentRoundDetailEvaluations": null,
            "Candidates": null,
            "TenantID": "bfb5c2c4-7d5a-49c7-9520-c45b5aa31126",
            "CreatedDate": "2023-10-18T14:21:46.552+07:00",
            "CreatedBy": null,
            "ModifiedDate": "2023-10-18T14:22:09.569+07:00",
            "ModifiedBy": "NV000003",
            "EditVersion": "2023-10-18T14:22:09.562+07:00",
            "State": 0,
            "OldData": null,
            "PassWarningCode": null
        },
        {
            "RecruitmentRoundID": 3851,
            "RecruitmentRoundName": "Trúng tuyển",
            "RecruitmentID": 580,
            "EvaluationFormIDs": null,
            "EvaluationFormNames": null,
            "RoundTypeID": 42,
            "RoundType": 4,
            "RoundTypeColor": "#39C5AB",
            "SortOrder": 7,
            "IsSystem": true,
            "IsRequestTrain": null,
            "CountCandidate": null,
            "RecruitmentRoundDetailEvaluations": null,
            "Candidates": null,
            "TenantID": "bfb5c2c4-7d5a-49c7-9520-c45b5aa31126",
            "CreatedDate": "2023-10-18T14:21:46.552+07:00",
            "CreatedBy": null,
            "ModifiedDate": "2023-10-18T14:22:09.570+07:00",
            "ModifiedBy": "NV000003",
            "EditVersion": "2023-10-18T14:22:09.563+07:00",
            "State": 0,
            "OldData": null,
            "PassWarningCode": null
        },
        {
            "RecruitmentRoundID": 3852,
            "RecruitmentRoundName": "Đã tuyển",
            "RecruitmentID": 580,
            "EvaluationFormIDs": null,
            "EvaluationFormNames": null,
            "RoundTypeID": 41,
            "RoundType": 5,
            "RoundTypeColor": "#64D271",
            "SortOrder": 8,
            "IsSystem": true,
            "IsRequestTrain": null,
            "CountCandidate": null,
            "RecruitmentRoundDetailEvaluations": null,
            "Candidates": null,
            "TenantID": "bfb5c2c4-7d5a-49c7-9520-c45b5aa31126",
            "CreatedDate": "2023-10-18T14:21:46.552+07:00",
            "CreatedBy": null,
            "ModifiedDate": "2023-10-18T14:22:09.571+07:00",
            "ModifiedBy": "NV000003",
            "EditVersion": "2023-10-18T14:22:09.565+07:00",
            "State": 0,
            "OldData": null,
            "PassWarningCode": null
        },
        {
            "RecruitmentRoundID": 3852,
            "RecruitmentRoundName": "Đã tuyển",
            "RecruitmentID": 580,
            "EvaluationFormIDs": null,
            "EvaluationFormNames": null,
            "RoundTypeID": 41,
            "RoundType": 5,
            "RoundTypeColor": "#64D271",
            "SortOrder": 8,
            "IsSystem": true,
            "IsRequestTrain": null,
            "CountCandidate": null,
            "RecruitmentRoundDetailEvaluations": null,
            "Candidates": null,
            "TenantID": "bfb5c2c4-7d5a-49c7-9520-c45b5aa31126",
            "CreatedDate": "2023-10-18T14:21:46.552+07:00",
            "CreatedBy": null,
            "ModifiedDate": "2023-10-18T14:22:09.571+07:00",
            "ModifiedBy": "NV000003",
            "EditVersion": "2023-10-18T14:22:09.565+07:00",
            "State": 0,
            "OldData": null,
            "PassWarningCode": null
        },
        {
            "RecruitmentRoundID": 3852,
            "RecruitmentRoundName": "Đã tuyển",
            "RecruitmentID": 580,
            "EvaluationFormIDs": null,
            "EvaluationFormNames": null,
            "RoundTypeID": 41,
            "RoundType": 5,
            "RoundTypeColor": "#64D271",
            "SortOrder": 8,
            "IsSystem": true,
            "IsRequestTrain": null,
            "CountCandidate": null,
            "RecruitmentRoundDetailEvaluations": null,
            "Candidates": null,
            "TenantID": "bfb5c2c4-7d5a-49c7-9520-c45b5aa31126",
            "CreatedDate": "2023-10-18T14:21:46.552+07:00",
            "CreatedBy": null,
            "ModifiedDate": "2023-10-18T14:22:09.571+07:00",
            "ModifiedBy": "NV000003",
            "EditVersion": "2023-10-18T14:22:09.565+07:00",
            "State": 0,
            "OldData": null,
            "PassWarningCode": null
        },
        {
            "RecruitmentRoundID": 3852,
            "RecruitmentRoundName": "Đã tuyển",
            "RecruitmentID": 580,
            "EvaluationFormIDs": null,
            "EvaluationFormNames": null,
            "RoundTypeID": 41,
            "RoundType": 5,
            "RoundTypeColor": "#64D271",
            "SortOrder": 8,
            "IsSystem": true,
            "IsRequestTrain": null,
            "CountCandidate": null,
            "RecruitmentRoundDetailEvaluations": null,
            "Candidates": null,
            "TenantID": "bfb5c2c4-7d5a-49c7-9520-c45b5aa31126",
            "CreatedDate": "2023-10-18T14:21:46.552+07:00",
            "CreatedBy": null,
            "ModifiedDate": "2023-10-18T14:22:09.571+07:00",
            "ModifiedBy": "NV000003",
            "EditVersion": "2023-10-18T14:22:09.565+07:00",
            "State": 0,
            "OldData": null,
            "PassWarningCode": null
        },
        {
            "RecruitmentRoundID": 3852,
            "RecruitmentRoundName": "Đã tuyển",
            "RecruitmentID": 580,
            "EvaluationFormIDs": null,
            "EvaluationFormNames": null,
            "RoundTypeID": 41,
            "RoundType": 5,
            "RoundTypeColor": "#64D271",
            "SortOrder": 8,
            "IsSystem": true,
            "IsRequestTrain": null,
            "CountCandidate": null,
            "RecruitmentRoundDetailEvaluations": null,
            "Candidates": null,
            "TenantID": "bfb5c2c4-7d5a-49c7-9520-c45b5aa31126",
            "CreatedDate": "2023-10-18T14:21:46.552+07:00",
            "CreatedBy": null,
            "ModifiedDate": "2023-10-18T14:22:09.571+07:00",
            "ModifiedBy": "NV000003",
            "EditVersion": "2023-10-18T14:22:09.565+07:00",
            "State": 0,
            "OldData": null,
            "PassWarningCode": null
        },
        {
            "RecruitmentRoundID": 3852,
            "RecruitmentRoundName": "Đã tuyển",
            "RecruitmentID": 580,
            "EvaluationFormIDs": null,
            "EvaluationFormNames": null,
            "RoundTypeID": 41,
            "RoundType": 5,
            "RoundTypeColor": "#64D271",
            "SortOrder": 8,
            "IsSystem": true,
            "IsRequestTrain": null,
            "CountCandidate": null,
            "RecruitmentRoundDetailEvaluations": null,
            "Candidates": null,
            "TenantID": "bfb5c2c4-7d5a-49c7-9520-c45b5aa31126",
            "CreatedDate": "2023-10-18T14:21:46.552+07:00",
            "CreatedBy": null,
            "ModifiedDate": "2023-10-18T14:22:09.571+07:00",
            "ModifiedBy": "NV000003",
            "EditVersion": "2023-10-18T14:22:09.565+07:00",
            "State": 0,
            "OldData": null,
            "PassWarningCode": null
        }
    ],
    "RecruitmentInfoFields": null,
    "RecruitmentQuestions": null,
    "RecruitmentBoards": null,
    "RecruitmentPeriods": null,
    "RecruitmentCosts": null,
    "RecruitmentDetails": null,
    "IsLessThanNow": false,
    "RecruitmentDetailSocialPages": null,
    "CandidateSchedules": null,
    "WebsiteConnectedData": null,
    "LinkedinConnectedPage": null,
    "LinkedinShareContent": null,
    "TopCVCode": null,
    "RecruitmentWebsiteDetailSettingData": null,
    "TitleWebsite": "Tin tuyển dụng đào tạo",
    "Files": null,
    "IsEditable": true,
    "IsPublished": null,
    "PublishDate": null,
    "RecruitmentPreselectConditions": null,
    "RecruitmentPreselectActions": null,
    "KeyWords": null,
    "PlanType": null,
    "ActualQuantity": 1,
    "DescriptionFiles": null,
    "ExpectedTime": "2023-10-31T00:00:00.000+07:00",
    "ClosedReason": null,
    "ClosedNote": null,
    "WebsiteLanguage": null,
    "IsEditProcess": null,
    "IsPlainText": false,
    "IsHideForCollaborator": false,
    "IsHighlight": false,
    "Advantage": null,
    "GroupJobPositionID": null,
    "GroupJobPositionName": null,
    "RecruitmentWorkLocations": null,
    "TenantID": "bfb5c2c4-7d5a-49c7-9520-c45b5aa31126",
    "CreatedDate": "2023-10-17T17:06:42.220+07:00",
    "CreatedBy": "AMIS MISA",
    "ModifiedDate": "2023-10-21T22:03:02.873+07:00",
    "ModifiedBy": null,
    "EditVersion": null,
    "State": 0,
    "OldData": null,
    "PassWarningCode": null
}))

const recruitmentTemp = JSON.parse(recruitment.value)

const isShowPopover = ref(0)

function handleOpenOptionBtn(recruimnetID: number){
    isShowPopover.value = recruimnetID
}

</script>

<style lang="scss" scoped>
.container-candidate{
    width: 100%;
    height: calc(100vh - 48px);
    background-color: #EBECEF;
    padding-bottom: 16px;
    padding-left: 16px;
    padding-right: 16px;
}
#recruiment-news {
    .content-title {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 48px;
        align-items: center;
        line-height: 1.25;
    }
    .toolbar {
        height: 48px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .list-recruitment{
        width: 100%;
        margin-bottom: 12px;
        height: fit-content;
        border-radius: 5px;
        background-color: #ffffff;
        .list-item{
            padding: 24px;
            width: 100%;
            .recruitment-news-infor{
                position: relative;
                border-bottom: solid 1px #e0e6ec;
                display: flex;
                .recruitment-status{
                    margin-right: 12px;
                    height: 58px;
                    width: fit-content;
                    .recruitment-status-dot{
                        background-color: #48bb56 !important;
                        width: 10px;
                        height: 10px;
                        border-radius:50%;
                        margin-top: 6px;
                    }
                }
                .recruitment-infor{
                    flex: 1;
                    .recruitment-news-name{
                        max-width: 80%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        height: 23px;
                        line-height: 24px;
                        font-size: 20px!important;
                        font-weight: 500;
                        color: #1e2633;
                        cursor: pointer;
                    }
                    .recruitment-option{
    
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
                }
            }
            .recruitment-news-rounds{
                width: 100%;
                overflow-x: auto;
                .item-content{
                    padding: 2px 10px;
                    height: 58px;
                    margin-top: 14px;
                    margin-bottom: 16px;
                    min-width: 120px;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .round-name{
                    color: #6a727d;
                    text-align: center;
                    font-size: 14px;
                    font-weight: 500;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }
        }
    }
}
.item-btn{
    display: flex;
    align-items: center ;
    padding: 8px 8px;
    cursor: pointer;
    &:hover{
        background-color: rgba(225,238,255,.8);
    }
}
.text-title{
    font-size: 20px;
    font-weight: 700;
}
.error-message {
    color: red;
    position: absolute;
    bottom: -16px;
}
.field {
    position: relative;
}
.lable {
    margin-bottom: 8px;
}
</style>

<style>
.dx-popup-content{
    padding: 8px;
}
</style>