<template>
    <div id="candidate">
        <div class="container-candidate">
            <div class="content-title">
                <Icon
                    :icon="'mdi:users'"
                    :color="'#2563eb'"
                    width="24"
                    height="24"
                    class="mx-6"
                />
                <div class="text-title">Ứng viên</div>
            </div>
            <div class="toolbar">
                <base-text-box :config="searchDefaultConfig" />
                <base-button :config="buttonConfig" />
            </div>
            <div class="grid">
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
                :totalRecord="totalCount"
                @onNavigationChange="pagingChange"
            />
        </div>
        <popup-candidate v-if="isShowPopup" :isShowPopup="isShowPopup" :candidateID="candidateID" :is-edit="isUpdate" @onClose="isShowPopup = false"  @on-save="handleSaveSucces"></popup-candidate>
    </div>
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
import type { Column } from "devextreme/ui/data_grid";
import CandidateApi from "../../apis/candidate/candidate-api"
import PopupCandidate from "./popup/PopupCandidate.vue"
import { formatDate } from "../../utils";

const toastStore = useToastStore();
const { t, getLocale, setLocale } = useI18n();
const candidateApi = new CandidateApi();
const filterPaging = new PagingRequest();
const totalCount = ref<number>(0);
const baseTableRef = ref();
const isShowPopup =  ref(false);
const isUpdate = ref<boolean>(false);
const collection = ref(new CollectionModel());
const showPopupDelete = ref<boolean>(false);
const candidateID = ref(undefined)
const popupTitle = ref("Thêm bộ sưu tập");

const dataSource = new CustomStore({
    key: "CandidateID",
    async load(loadOptions) {
        const res = await candidateApi.getFilterPaging(filterPaging);
        if (res) {
            totalCount.value = res.data.Data.TotalCount;
        }
        return res.data.Data.Data || [];
    },
    loadMode: "processed",
});


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
        console.log(e);
    },
    onRowDblClick(e) {
        candidateID.value = e.data.CandidateID
        isUpdate.value = true
        isShowPopup.value = true
    },
});

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
        filterPaging.SearchValue = e.value?.trim();
        filterPaging.Collums = ["CandidateName", "Email", "Mobile", "EducationMajorName", "EducationDegreeName"]
        filterPaging.PageIndex = 1;
        baseTableRef.value.getInstance().refresh();
    },
};

const buttonConfig = ref<DxButton>({
    type: ButtonType.default,
    height: 32,
    text: "Thêm bộ sưu tập",
    stylingMode: ButtonStylingMode.contained,
    icon: "plus",
    onClick(e) {
        collection.value = new CollectionModel();
        popupTitle.value = "Thêm bộ sưu tập";
        isShowPopup.value = true;
        isUpdate.value = false;
        candidateID.value = undefined
    },
});

function pagingChange(e: BaseNavigationType) {
    filterPaging.PageIndex = e.pageIndex;
    filterPaging.PageSize = e.pageSize;
    baseTableRef.value.getInstance().refresh();
}

function handleSaveSucces(){
    baseTableRef.value.getInstance().refresh();
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

async function handleDelete(event: any) {
    
    const res = await candidateApi.delete(event.CandidateID)
    if(res.data.Success){
        toastStore.toggleToast(true, "Xóa thành công", ToastType.success);
        baseTableRef.value.getInstance().refresh();
    }else{
        toastStore.toggleToast(true, "Xóa thất bại", ToastType.error);
    }
}
</script>

<style lang="scss" scoped>
.container-candidate{
    width: 100%;
    height: calc(100vh - 48px);
    background-color: #EBECEF;
    padding-bottom: 16px;
}
#candidate {
    .content-title {
        display: flex;
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
        padding: 0 16px;
        justify-content: space-between;
    }
    .grid {
        width: 100%;
        padding: 0 16px;
        height: calc(100% - 48px - 48px - 46px);
    }
}
.text-title{
    font-size: 20px;
    font-weight: 700;
}
.add-category-header {
    width: 100%;
    height: 48px;
    line-height: 1.25;
    font-weight: bold;
}
.add-category-body {
    margin-bottom: 24px;
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
