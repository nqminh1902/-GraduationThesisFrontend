<template >
    <div class="recruitment-infor">
        <div class="wrap-block">
            <div class="flex items-center justify-between mb-[16px]">
                <div class="heading-title">
                    Vị trí công việc
                </div>
                <div class="flex ">
                    <button class="candidate-btn" @click="handleAdd">
                        <Icon
                            :icon="'tabler:plus'"
                            :color="'#ffffff'"
                            width="20"
                            height="20"
                        />
                        <div class="text-white ml-[4px]">Thêm vị trí</div>
                    </button>
                </div>
            </div>
            <div class="flex-1" style="height: calc(100% - 52px);">
                <div class="h-[48px]">
                    <base-text-box :config="searchDefaultConfig" />
                </div>
                <div class="w-full" style="height:  calc(100% - 48px - 48px);">
                    <base-table
                        :config="tableConfig"
                        ref="baseTableRef"
                        @on-delete="handleDelete"
                        @on-edit="handleEdit"
                    >
                        <template #status="data">
                            <div :class="data.data.data.Status == '1' ? 'publish' : 'stop'">{{ data.data.data.Status == 1 ? 'Đang sử dụng' : 'Ngưng sử dụng' }}</div>
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
    <base-popup
        v-if="isShowPopup"
        :config="popupConfig"
        :showBtnFooter="true"
        :popupVisible="isShowPopup"
        @close="isShowPopup = false"
        @save="handleSave"
    >
        <template #body>
            <div class="add-category-header text-3xl">
                {{ popupTitle }}
            </div>
            <div class="add-category-body">
                <div class="field">
                    <div class="lable">
                        Mã vị trí<span style="color: red"> *</span>
                    </div>

                    <base-text-box
                        :config="textBoxConfig"
                        v-model="jobPosition.JobPositionCode"
                        class="mb-6"
                    />
                </div>
                <div class="field">
                    <div class="lable">
                        Tên vị trí<span style="color: red"> *</span>
                    </div>

                    <base-text-box
                        :config="JobPositionNameConfig"
                        v-model="jobPosition.JobPositionName"
                        class="mb-6"
                    />
                </div>
                <div class="field">
                    <div class="lable">
                        Trạng thái<span style="color: red"> *</span>
                    </div>

                    <base-select-box
                        :config="selectBoxConfig"
                        v-model="jobPosition.Status"
                    />
                </div>
            </div>
        </template>
    </base-popup>
    <base-popup
        v-if="showPopupDelete"
        :config="popupConfig"
        :showBtnFooter="true"
        :popupVisible="showPopupDelete"
        @close="showPopupDelete = false"
        @save="handleRemove"
    >
        <template #body>
            <div class="add-category-header text-3xl">Cảnh báo</div>
            <div class="add-category-body">
                <div class="d-flex items-center">
                    <Icon
                        :icon="'ph:warning'"
                        :color="'yellow'"
                        width="30"
                        height="30"
                        class="mr-6"
                    />
                    Bạn có chắc chắn muốn xóa vị trí công việc không?
                </div>
            </div>
        </template>
    </base-popup>
</template>
<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { DxButton, DxDataGrid, DxSelectBox, DxTextBox, DxScrollView, DxPopup } from "devextreme-vue";
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
import { DxPopover } from 'devextreme-vue/popover';
import { ref } from "vue";
import type { Column } from "devextreme/ui/data_grid";
import { PagingRequest } from "../../../models";
import type { BaseNavigationType } from "../../../types";
import { useToastStore } from "../../../stores";
import { JobPositionModel } from "@/models/JobPositionModel";
import JobPositionApi from "../../../apis/job-position/job-position-api"
import { ToastType } from "../../../enums";
import CustomStore from "devextreme/data/custom_store";

const isShowPopupImport = ref(false)
const totalCount = ref(0)
const filterPaging = new PagingRequest();
const baseTableRef = ref<InstanceType<typeof DxDataGrid>>(null)
const showPopupDelete = ref(false)
const isShowPopup = ref(false)
const popupTitle = ref("Thêm vị trí");
const toastStore = useToastStore();
const isEdit = ref(false)
const jobPosition = ref<JobPositionModel>(new JobPositionModel())
const jobPositionApi = new JobPositionApi()

const popupConfig = ref<DxPopup>({
    height: "auto",
    width: 400,
});

const JobPositionNameConfig: DxTextBox = {
    placeholder: "Tên vị trí",
    onValueChanged: (e) => {
        
    },
};

const textBoxConfig: DxTextBox = {
    placeholder: "Mã vị trí",
    onValueChanged: (e) => {
        
    },
};

const selectBoxConfig = ref<DxSelectBox>({
    displayExpr: "name",
    valueExpr: "id",
    dataSource: [
        {
            id: 2,
            name: "Không kích hoạt",
        },
        {
            id: 1,
            name: "Kích hoạt",
        },
    ],
    searchEnabled: false,
    onValueChanged: (e) => {},
});

const dataSource = new CustomStore({
    key: "JobPositionID",
    async load(loadOptions) {
        filterPaging.Collums = ["JobPositionCode", "JobPositionName"];
        const res = await jobPositionApi.getFilterPaging(filterPaging);
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
            caption: "Mã vị trí",
            dataField: "JobPositionCode",
            dataType: "string",
        },
        {
            alignment: "left",
            caption: "Tên vị trí",
            dataField: "JobPositionName",
            dataType: "string",
        },
        {
            alignment: "left",
            caption: "Trạng thái",
            dataField: "Status",
            dataType: "string",
            width: 150,
            cellTemplate: "status-template"
        },
    ] as (string | Column<any, any>)[],
    dataSource: dataSource,
    keyExpr: "JobPositionID",
    onSelectionChanged(e) {
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
       filterPaging.SearchValue = e.value
       filterPaging.PageIndex = 1
       baseTableRef.value?.getInstance()?.refresh();
    }
}

async function handleDelete(event: any) { 
    jobPosition.value = event
    showPopupDelete.value = true
}

function pagingChange(e: BaseNavigationType) {
    filterPaging.PageIndex = e.pageIndex;
    filterPaging.PageSize = e.pageSize;
    baseTableRef.value?.getInstance()?.refresh();
}


function handleAdd(){
    jobPosition.value = new JobPositionModel()
    isEdit.value = false;
    isShowPopup.value = true
}

async function handleEdit(event: any) {
    try {
        const res: any = await jobPositionApi.getByID(event.JobPositionID);
        if (res?.data.Success) {
            jobPosition.value = res?.data.Data;
            popupTitle.value = "Sửa vị trí công việc";
            isEdit.value = true;
            isShowPopup.value = true;
        } else {
            toastStore.toggleToast(
                true,
                "Lấy thông tin vị trí công việc viên thất bại",
                ToastType.error
            );
        }
    } catch (error) {
        toastStore.toggleToast(
            true,
            "Lấy thông tin vị trí công việc viên thất bại",
            ToastType.error
        );
    }
}

async function handleRemove() {
    const res = await jobPositionApi.delete(jobPosition.value.JobPositionID)
    if(res.data.Success){
        toastStore.toggleToast(true, "Xóa vị trí công việc thành công", ToastType.success)
        baseTableRef.value?.getInstance()?.refresh();
        showPopupDelete.value = false
    }else{
        toastStore.toggleToast(true, "Xóa vị trí công việc thất bại", ToastType.error)
    }
}

async function handleSave() {
    if(isEdit.value){
        const res = await jobPositionApi.update(jobPosition.value.JobPositionID, jobPosition.value)
        if(res.data.Success){
            toastStore.toggleToast(true, "Cập nhật vị trí công việc thành công", ToastType.success)
            baseTableRef.value?.getInstance()?.refresh();
            isShowPopup.value = false
        }else{
            toastStore.toggleToast(true, "Cập nhật vị trí công việc thất bại", ToastType.error)
        }
    }else{
        const res = await jobPositionApi.insert(jobPosition.value)
        if(res.data.Success){
            toastStore.toggleToast(true, "Thêm mới vị trí công việc thành công", ToastType.success)
            baseTableRef.value?.getInstance()?.refresh();
            isShowPopup.value = false
        }else{
            toastStore.toggleToast(true, "Thêm mới vị trí công việc thất bại", ToastType.error)
        }
    }
}
</script>
<style lang="scss" scoped>
    .recruitment-infor{
        height: calc(100vh - 48px);
        overflow-y: auto;
        background-color: #F1F2F6;
        padding: 8px;
        min-height: 100%;
        .wrap-block{
            background-color: #ffffff;
            border-radius: 6px;
            width: 100%;
            padding: 16px 24px;
            height: 100%;
            display: flex;
            flex-direction: column;
            .heading-title{
                font-size: 16px;
                color: #1E2633;
                text-transform: uppercase;
                font-weight: 700;
            }
            .sub-title{
                font-size: 14px;
                color: #6a727d;
            }
        }
    }
    .candidate-btn{
    width: auto;
    font-weight: 500;
    font-size: 14px!important;
    height: 36px!important;
    padding: 8px 12px!important;
    border-radius: 4px 0 0 4px;
    display: flex;
    align-items: center;
    background-color: #2680eb!important;
    border-right: 1px solid #ffffff;
}
.option-btn{
    width: auto;
    font-weight: 500;
    font-size: 14px!important;
    height: 36px!important;
    padding: 8px 12px!important;
    border-radius: 4px;
    background-color: #2680eb!important;
}
.publish{
    color: #48bb56!important;
    display: flex;
    align-items: center;
    height: 30px;
}
.stop{
    color: red!important;
    display: flex;
    align-items: center;
    height: 30px;
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
</style>