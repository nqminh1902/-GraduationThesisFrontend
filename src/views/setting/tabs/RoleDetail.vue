<template>
    <div class="recruitment-infor">
        <div class="wrap-block">
            <div class="flex items-center justify-between mb-[16px]">
                <div class="">
                    <p class="heading-title">Thêm mới vai trò</p>
                </div>
                <div class="flex ">
                    <base-button :config="CancelConfig" class="mr-[8px]"></base-button>
                    <base-button :config="SaveConfig"></base-button>
                </div>
            </div>
            <div class="field">
                <div class="lable">
                    Tên vai trò<span style="color: red"> *</span>
                </div>

                <base-text-box
                    :config="textBoxConfig"
                    v-model="role.RoleName"
                />
            </div>
            <div class="field">
                <div class="lable">
                    Mô tả<span style="color: red"> *</span>
                </div>

                <base-text-box
                    :config="textBoxConfig"
                    v-model="role.RoleDescription"
                />
            </div>
            <div class="flex ">
                <div class="flex-1">
                    <div class="mt-[12px]" v-for="(sub,index) of listDisplayPermissions.filter(per => per.Column == 1)" :key="index">
                        <p class="font-bold">
                            {{ sub.SubsystemName }}
                        </p>
                        <div class="mt-[8px] pl-[16px]" v-for="per of sub.ListPermission" :key="per.PermissionID">
                            <base-check-box :config="{}" v-model="per.Value"/> 
                            <span class="ml-[8px]">{{ per.PermissionName }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex-1">
                    <div class="mt-[12px]" v-for="(sub,index) of listDisplayPermissions.filter(per => per.Column == 2)" :key="index">
                        <p class="font-bold">
                            {{ sub.SubsystemName }}
                        </p>
                        <div class="mt-[8px] pl-[16px]" v-for="per of sub.ListPermission" :key="per.PermissionID">
                            <base-check-box :config="{}" v-model="per.Value"/> 
                            <span class="ml-[8px]">{{ per.PermissionName }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { DxButton, DxDataGrid, DxSelectBox, DxTextBox, DxScrollView, DxPopup, DxCheckBox } from "devextreme-vue";
import { ref, watch } from "vue";
import {
    BaseTextBox,
    BaseButton,
    BaseCheckBox
} from "../../../components/base/index";
import { ButtonStylingMode, ButtonType, StateEnum, ToastType } from "../../../enums";
import { RoleModel, PermissionModel } from "@/models";
import PermissionApi from "../../../apis/role/permission-api"
import { useRoute, useRouter } from "vue-router";
import { forEach, iteratee } from "lodash";
const toastStore = useToastStore();
import RoleApi from "../../../apis/role/role-api";
import { useToastStore } from "../../../stores";

const roleApi = new RoleApi()

const SaveConfig = ref<DxButton>({
    type: ButtonType.default,
    height: '100%',
    text: "Lưu",
    stylingMode: ButtonStylingMode.contained,
    async onClick(e) {
        if(validate()){
            handleBeforeSave()
            if(isEdit.value){
                role.value.State = StateEnum.Update
            }else{
                role.value.State = StateEnum.Insert
            }
            const res = await roleApi.saveRole(role.value)
            handleAfterSave(res)
            
        }
    },
})

function handleAfterSave(res: any){
    if(res.data.Success){
        toastStore.toggleToast(
            true,
            "Lưu thành công",
            ToastType.success
        );
    }else{
        toastStore.toggleToast(
            true,
            "Lưu thất bại",
            ToastType.error
        );
    }
    router.push({name: "role"})
}

const CancelConfig = ref<DxButton>({
    type: ButtonType.normal,
    height: '100%',
    text: "Hủy",
    stylingMode: ButtonStylingMode.contained,
    onClick(e) {
        router.push({name: "role"})
    },
})

const textBoxConfig = ref<DxTextBox>({})

const permissionApi = new PermissionApi()

const role = ref<RoleModel>(new RoleModel()) 
const route = useRoute()
const router = useRouter()
const isEdit = ref(false)

const listPermissions = ref<PermissionModel[]>([])
const listDisplayPermissions = ref<PermissionModel[]>([])

watch(() => listDisplayPermissions.value, (newValue) => {
    for (const per of newValue) {
        const viewPer = per.ListPermission?.find(item => item.PermissionName == "Xem")
        const isExistTruePer = per.ListPermission?.filter(item => item.Value && item.PermissionName != "Xem")
        if(viewPer && isExistTruePer?.length){
            viewPer.Value = true
        }
    }
},{deep: true})

if(route.params && route.params.id != "0"){
    isEdit.value = true
}
getAllPermission()

async function getAllPermission(){
    const res = await permissionApi.getAll()
    if(res.data.Success){
        listPermissions.value = res.data.Data
        if(isEdit.value){
            getPermissionByID(route.params.id.toString())
        }else{
            listPermissions.value.forEach((per: PermissionModel) => {
                per.Value = false
            })
        }
        handleDisplayRolePermission()   
    }
}

async function getPermissionByID(id: string) {
    const res = await roleApi.getByID(id)
    if(res.data.Success){
        role.value = res.data.Data.role
        listPermissions.value.forEach(per => {
            const isExist = res.data.Data.permissions.find((item:PermissionModel) => item.SubsystemCode == per.SubsystemCode && item.PermissionName == per.PermissionName)
            if(isExist){
                per.Value = true
            }else{
                per.Value = false
            }
        })
    }
}

function validate(){
    return true
}

function handleDisplayRolePermission(){
    listPermissions.value.forEach((per) => {
        const isExist = listDisplayPermissions.value.find(item => item.SubsystemCode == per.SubsystemCode)
        if(isExist){
            isExist.Column = 2
            if(isExist.SubsystemCode == "Recruitment" || isExist.SubsystemCode == "Candidate"){
                isExist.Column = 1
            }
            isExist.ListPermission?.push(per)
        }else{
            const parentPermission = new PermissionModel()
            parentPermission.SubsystemCode = per.SubsystemCode
            parentPermission.SubsystemName = per.SubsystemName
            parentPermission.ListPermission?.push(per)
            listDisplayPermissions.value.push(parentPermission)
        }
    })
}

function handleBeforeSave(){
    const permission: PermissionModel[] = []
    listDisplayPermissions.value.forEach(per => {
        permission.push(...per.ListPermission||[])
    })
    role.value.Permissions = permission.filter(per => per.Value)
}

</script>
<style lang="scss">
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