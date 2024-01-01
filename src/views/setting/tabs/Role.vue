<template >
    <div class="recruitment-infor">
        <div class="wrap-block">
            <div class="flex items-center justify-between mb-[16px]">
                <div class="">
                    <p class="heading-title">Vai trò</p>
                    <p>Tùy chỉnh mức độ quyền hạn cho từng vai trò trong ứng dụng Tuyển dụng.</p>
                </div>
                <div class="flex ">
                    <button class="candidate-btn" @click="handleAdd">
                        <Icon
                            :icon="'tabler:plus'"
                            :color="'#ffffff'"
                            width="20"
                            height="20"
                        />
                        <div class="text-white ml-[4px]">Thêm vai trò</div>
                    </button>
                </div>
            </div>
            <div class="h-[48px]">
                <base-text-box :config="searchDefaultConfig" />
            </div>
            <div class="w-full">
                <div class="flex items-center p-[16px] hover:bg-[#e5f1ff] bg-[#f5f5f5]" :class="{'bg-[#ddd]': index % 2 == 0}" v-for="(role,index) of listRole" :key="role.RoleID">
                    <div class="flex-1">
                        <div class="font-bold">{{ role.RoleName }}</div>
                        <div class="">{{ role.RoleDescription }}</div>
                    </div>
                    <div class="w-[80px]">
                        <div class="flex items-center justify-end" v-if="role.IsAdmin">
                            <Icon
                                :icon="'material-symbols:lock-outline'"
                                :color="'#7A8188'"
                                width="20"
                                height="20"
                                class="cursor-pointer"
                            />
                        </div>
                        <div class="flex items-center justify-end" v-else>
                            <Icon
                                :icon="'ic:round-edit'"
                                :color="'#7A8188'"
                                width="20"
                                height="20"
                                class="mr-[8px] cursor-pointer"
                                @click="handleEdit(role.RoleID)"
                            />
                            <Icon
                                v-if="role.RoleID != 2"
                                :icon="'mdi:delete'"
                                :color="'red'"
                                width="20"
                                height="20"
                                class="cursor-pointer"
                                @click="handleDelete(role.RoleID)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
                    Bạn có chắc chắn muốn xóa vai trò không?
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
import { ref } from "vue";
import { PagingRequest, RoleModel } from "../../../models";
import { useToastStore } from "../../../stores";
import RoleApi from "../../../apis/role/role-api"
import { ToastType } from "../../../enums";
import { useRoute, useRouter } from "vue-router";

const filterPaging = new PagingRequest();
const baseTableRef = ref<InstanceType<typeof DxDataGrid>>(null)
const showPopupDelete = ref(false)
const toastStore = useToastStore();
const listRole = ref<RoleModel[]>([]) 
const roleApi = new RoleApi()
const route = useRoute()
const router = useRouter()
let deleteID = 0

const popupConfig = ref<DxPopup>({
    height: "auto",
    width: 400,
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
       getRoles()
    }
}

getRoles()

async function getRoles(){
    filterPaging.PageSize = 1000
    filterPaging.Collums = ["RoleName"]
    filterPaging.SortOrder = ["ModifiedDate ASC"]
    const res = await roleApi.getFilterPaging(filterPaging)
    if(res.data.Success){
        listRole.value = res.data.Data.Data
    }
}

async function handleDelete(id: number) { 
    showPopupDelete.value = true
    deleteID = id
}


function handleAdd(){
    router.push({name: 'role-detail', params: {id: 0}})
} 

function handleEdit(id: number){
    router.push({name: 'role-detail', params: {id: id}})
}

async function handleRemove() {
    const res = await roleApi.delete(deleteID)
    if(res.data.Success){
        toastStore.toggleToast(true, "Xóa vai trò thành công", ToastType.success)
        getRoles()
        showPopupDelete.value = false
    }else{
        toastStore.toggleToast(true, "Xóa vai trò thất bại", ToastType.error)
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