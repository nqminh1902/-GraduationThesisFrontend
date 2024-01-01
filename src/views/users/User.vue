<template>
    <div id="candidate">
        <div class="container-candidate">
            <div class="content-title">
                <div class="flex items-center">
                    <Icon
                        :icon="'ri:user-fill'"
                        :color="'#2563eb'"
                        width="24"
                        height="24"
                        class="mr-6"
                    />
                    <div class="text-title">Người dùng</div>
                </div>
                <div class="flex">
                    <button class="candidate-btn" @click="handleAddCandidate">
                        <Icon
                            :icon="'tabler:plus'"
                            :color="'#ffffff'"
                            width="20"
                            height="20"
                        />
                        <div class="text-white ml-[4px]">Thêm người dùng</div>
                    </button>
                </div>
            </div>
            <div class="toolbar" v-if="selectedRowKey.length == 0">
                <base-text-box :config="searchDefaultConfig" />
            </div>
            <div class="toolbar" v-else>
                <div class="flex items-center w-full h-[32px]">
                    <div class="d-flex items-center ml-[16px]">
                        <span class="mr-[4px]">Đã chọn: </span>
                        <b>{{ selectedRowKey.length }}</b>
                    </div>
                    <base-button :config="DeleteMultipleConfig" class=" ml-[12px]"/>
                </div>
            </div>
            <div class="grid">
                <base-table
                    :config="tableConfig"
                    ref="baseTableRef"
                    @on-delete="handleDelete"
                    @on-edit="handleEdit"
                >
                    <template #birthday="data">
                        <div class="">{{ formatDate(data.data.data.BirthDay) }}</div>
                    </template>
                    <template #status="data">
                        <div :class="data.data.data.Status == '1' ? 'publish' : 'stop'">{{ data.data.data.Status == 1 ? 'Đang hoạt động' : 'Ngưng hoạt động' }}</div>
                    </template>
                    <template #gender="data">
                        {{ data.data.data.Gender == 0 ? 'Nam' : 'Nữ' }}
                    </template>
                    <template #name="data">
                        <div class="flex items-center">
                            <img style="width: 30px; height: 30px; border-radius: 50%;" v-if="data.data.data.Avatar" :src="data.data.data.Avatar" alt="">
                            <div class="text-center" :style="{backgroundColor: getBackGroundColor()}" style="width: 30px; height: 30px; border-radius: 50%;" v-else>
                                <p class="text-white leading-[30px] text-[13px] font-medium">{{ getInitials(data.data.data.FullName) }}</p>
                            </div>
                            <span class="ml-[12px]">{{ data.data.data.FullName }}</span>
                        </div>
                    </template>
                </base-table>
            </div>
            <base-navigation
                :totalRecord="totalCount"
                @onNavigationChange="pagingChange"
            />
        </div>
    </div>
    <popup-user v-if="isShowPopup" :isShowPopup="isShowPopup" :is-edit="isUpdate" :user-i-d="userID" @onClose="isShowPopup = false" @on-save="handleSaveSucces"></popup-user>
    <DxPopover 
        :target="'#option'"
        show-event="click"
        :visible="false"
        :hideOnOutsideClick="true"
        position="bottom"
        width="auto"
        height="auto"
        >
            <div class="flex items-center h-[35px] cursor-pointer icon-export" @click="isShowPopupImport = true">
                <Icon
                    :icon="'mdi:import'"
                    :color="'#7A8188'"
                    width="24"
                    height="24"
                    class="mx-[4px]"
                />
                <div class="">Nhập khẩu</div>
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
    DxDataGrid
} from "devextreme-vue";
import { ref } from "vue";
import CustomStore from "devextreme/data/custom_store";
import {PagingRequest } from "../../models";
import type { BaseNavigationType } from "../../types";
import type DxTextBox from "devextreme-vue/text-box";
import { ButtonStylingMode, ButtonType, ToastType } from "../../enums";
import { useToastStore } from "../../stores";
import type { Column } from "devextreme/ui/data_grid";
import { formatDate } from "../../utils";
import { DxPopover } from 'devextreme-vue/popover';
import PopupUser from './popup/PopupUser.vue'
import UserApi from "@/apis/user/user-api";

const toastStore = useToastStore();
const userApi = new UserApi();
const filterPaging = new PagingRequest();
const totalCount = ref<number>(0);
const baseTableRef = ref<InstanceType<typeof DxDataGrid>>(null)
const isShowPopup =  ref(false);
const isUpdate = ref<boolean>(false);;
const isShowPopupImport = ref<boolean>(false);
const userID = ref(undefined)
const selectedRowKey = ref<number[]>([])

const dataSource = new CustomStore({
    key: "UserID",
    async load(loadOptions) {
        filterPaging.Collums = ["FullName","EmailOffice", "UserName", "Email"]
        const res = await userApi.getFilterPaging(filterPaging);
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
            caption: "Họ và tên",
            dataField: "FullName",
            dataType: "string",
            cellTemplate: "name-template",
            width: 300,
        },
        {
            alignment: "left",
            caption: "Giới tính",
            dataField: "Gender",
            cellTemplate: "gender-template",
            dataType: "string",
            width: 200,
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
            width: 300,
        },
        {
            alignment: "left",
            caption: "Vai trò",
            dataField: "RoleName",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Tên tài khoảng",
            dataField: "UserName",
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
            caption: "Địa chỉ",
            dataField: "Address",
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
            caption: "Email công ty",
            dataField: "EmailOffice",
            dataType: "string",
            width: 300,
        },
        {
            alignment: "left",
            caption: "Trạng thái",
            dataField: "Status",
            cellTemplate: "status-template",
            dataType: "string",
            width: 200,
        },
    ] as (string | Column<any, any>)[],
    dataSource: dataSource,
    keyExpr: "UserID",
    onSelectionChanged(e) {
        selectedRowKey.value = e.selectedRowKeys 
    },
});

function handleEdit(e: any){
    userID.value = e.UserID
    isUpdate.value = true
    isShowPopup.value = true
}

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
        filterPaging.PageIndex = 1;
        baseTableRef.value.getInstance().refresh();
    },
};

const DeleteMultipleConfig = ref<DxButton>({
    type: ButtonType.danger,
    height: '100%',
    text: "Xóa thành viên",
    icon:"trash",
    stylingMode: ButtonStylingMode.outlined,
    async onClick(e) {
        const res = await userApi.deleteBulk(selectedRowKey.value)
        if(res.data.Success){
            toastStore.toggleToast(true, "Xóa thành công", ToastType.success);
            baseTableRef.value.getInstance().refresh();
        }else{
            toastStore.toggleToast(true, "Xóa thất bại", ToastType.error);
        }
    },
})

function handleAddCandidate(){
    isShowPopup.value = true;
    isUpdate.value = false;
    userID.value = undefined
}

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
    const res = await userApi.delete(event.CandidateID)
    if(res.data.Success){
        toastStore.toggleToast(true, "Xóa thành công", ToastType.success);
        baseTableRef.value.getInstance().refresh();
    }else{
        toastStore.toggleToast(true, "Xóa thất bại", ToastType.error);
    }
}
</script>

<style lang="scss" scoped>
.icon-export{
    width: 140px;
    &:hover{
        background-color: #E7F1FF;
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
        justify-content: space-between;
        padding: 0 16px;
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
.field {
    position: relative;
}
.lable {
    margin-bottom: 8px;
}
</style>
