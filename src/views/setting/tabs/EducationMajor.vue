<template >
    <div class="recruitment-infor">
        <div class="wrap-block">
            <div class="flex items-center justify-between mb-[16px]">
                <div class="heading-title">
                    Chuyên ngành học
                </div>
                <div class="flex ">
                    <button class="candidate-btn" @click="handleAdd">
                        <Icon
                            :icon="'tabler:plus'"
                            :color="'#ffffff'"
                            width="20"
                            height="20"
                        />
                        <div class="text-white ml-[4px]">Thêm chuyên ngành</div>
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
                        Tên chuyên ngành<span style="color: red"> *</span>
                    </div>

                    <base-text-box
                        :config="textBoxConfig"
                        class="mb-6"
                        v-model="educationMajor.EducationMajorName"
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
                    Bạn có chắc chắn muốn xóa chuyển ngành không
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
    BasePopup
} from "../../../components/base/index";
import { DxPopover } from 'devextreme-vue/popover';
import { ref } from "vue";
import type { Column } from "devextreme/ui/data_grid";
import { PagingRequest } from "../../../models";
import type { BaseNavigationType } from "../../../types";
import { useToastStore } from "../../../stores";
import { EducationMajorModel } from "../../../models";
import EducationMajorApi from "../../../apis/education-major/education-major-api"
import { ToastType } from "../../../enums";
import CustomStore from "devextreme/data/custom_store";


const isShowPopupImport = ref(false)
const totalCount = ref(0)
const filterPaging = new PagingRequest();
const baseTableRef = ref<InstanceType<typeof DxDataGrid>>(null)
const showPopupDelete = ref(false)
const isShowPopup = ref(false)
const popupTitle = ref("Thêm chuyên ngành");
const toastStore = useToastStore();
const isEdit = ref(false)
const educationMajor = ref<EducationMajorModel>(new EducationMajorModel())
const educationMajorApi = new EducationMajorApi()

const popupConfig = ref<DxPopup>({
    height: "auto",
    width: 400,
});

const textBoxConfig: DxTextBox = {
    placeholder: "Tên chuyên ngành",
    onValueChanged: (e) => {
        
    },
};

const dataSource = new CustomStore({
    key: "EducationMajorID",
    async load(loadOptions) {
        filterPaging.Collums = ["EducationMajorName"];
        const res = await educationMajorApi.getFilterPaging(filterPaging);
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
            caption: "Tên chuyên ngành",
            dataField: "EducationMajorName",
            dataType: "string",
        },
    ] as (string | Column<any, any>)[],
    dataSource: dataSource,
    keyExpr: "EducationMajorID",
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
    educationMajor.value = event
    showPopupDelete.value = true
}

function pagingChange(e: BaseNavigationType) {
    filterPaging.PageIndex = e.pageIndex;
    filterPaging.PageSize = e.pageSize;
    baseTableRef.value?.getInstance()?.refresh();
}

function handleAdd(){
    educationMajor.value = new EducationMajorModel()
    isEdit.value = false;
    isShowPopup.value = true
}

async function handleEdit(event: any) {
    try {
        const res: any = await educationMajorApi.getByID(event.EducationMajorID);
        if (res?.data.Success) {
            educationMajor.value = res?.data.Data;
            popupTitle.value = "Sửa tên chuyên ngành";
            isEdit.value = true;
            isShowPopup.value = true;
        } else {
            toastStore.toggleToast(
                true,
                "Lấy thông tin chuyên ngành viên thất bại",
                ToastType.error
            );
        }
    } catch (error) {
        toastStore.toggleToast(
            true,
            "Lấy thông tin chuyên ngành viên thất bại",
            ToastType.error
        );
    }
}

async function handleRemove() {
    const res = await educationMajorApi.delete(educationMajor.value.EducationMajorID)
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
        const res = await educationMajorApi.update(educationMajor.value.EducationMajorID, educationMajor.value)
        if(res.data.Success){
            toastStore.toggleToast(true, "Cập nhật vị trí công việc thành công", ToastType.success)
            baseTableRef.value?.getInstance()?.refresh();
            isShowPopup.value = false
        }else{
            toastStore.toggleToast(true, "Cập nhật vị trí công việc thất bại", ToastType.error)
        }
    }else{
        const res = await educationMajorApi.insert(educationMajor.value)
        if(res.data.Success){
            toastStore.toggleToast(true, "Thêm mới vị trí công việc thành công", ToastType.success)
            baseTableRef.value?.getInstance()?.refresh();
            isShowPopup.value = false
        }else{
            toastStore.toggleToast(true, "Thêm mới vị trí công việc thất bại", ToastType.error)
        }
    }
}

function SaveImport(){
    isShowPopupImport.value = false
    filterPaging.PageIndex = 1;
    filterPaging.SearchValue = ""
    baseTableRef.value?.getInstance()?.refresh();
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
    border-radius: 4px;
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
    border-radius: 0px 4px 4px 0px;
    background-color: #2680eb!important;
}
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