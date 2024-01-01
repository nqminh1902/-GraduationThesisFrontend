<template>
    <base-popup
            v-if="isShowPopup"
            :config="popupConfig"
            :showBtnFooter="true"
            :popupVisible="isShowPopup"
            @close="handleClose"
            @save="handleSave"
            :width="widthPopup"
            ref="popupRef"
        >
            <template #body>
                <h2>{{ !isEdit ? "Thêm người dùng" : "Sửa người dùng" }}</h2>
                <div class="flex h-full">
                    <div class="flex-1 py-[16px]" style="height: calc(100% - 27px);">
                        <dx-scroll-view :height="'100%'">
                            <div class="flex w-full mt-[16px]">
                                <div class="candidate-avatar">
                                    <div class="avatar">
                                        <div class="show-image flex items-center justify-center cursor-pointer overflow-hidden">
                                            <span v-if="!user.Avatar">Ảnh</span>
                                            <img :src="user.Avatar" v-else/>
                                        </div>
                                        <input accept="image/*" type="file" class="opacity-0 file-input" @change="setCandidateAvatar"/>
                                    </div>
                                </div>
                                <div class="candidate-infor flex-1">
                                    <div class="field">
                                        <div class="lable">Họ và tên <span style="color: red;">*</span></div>
                                        <base-text-box
                                            :config="candidateNameConfig" v-model="user.FullName" :class="{'border-red': errorMessage.FullName}"
                                        />
                                        <div class="validate-string">{{ errorMessage.FullName }}</div>
                                    </div>
                                    <div class="flex">
                                        <div class="field flex-1">
                                            <div class="lable">Ngày sinh <span style="color: red;">*</span></div>
                                            <base-date-box :config="dateOfBirdthConfig" v-model="user.BirthDay" :class="{'border-red': errorMessage.BirthDay}"/> 
                                            <div class="validate-string">{{ errorMessage.BirthDay }}</div>
                                        </div>
                                        <div class="w-[12px]"></div>
                                        <div class="field flex-1">
                                            <div class="lable">Giới tính <span style="color: red;">*</span></div>
                                            <base-radio-group :config="GenderConfig" v-model="user.Gender" />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="lable">Số điện thoại <span style="color: red;">*</span></div>
                                        <base-number-box :config="phoneConfig" v-model="user.Mobile" :class="{'border-red': errorMessage.Mobile}"/>
                                        <div class="validate-string">{{ errorMessage.Mobile }}</div>
                                    </div>
                            
                                    <div class="field">
                                        <div class="lable">Email liên hệ <span style="color: red;">*</span></div>
                                        <base-text-box
                                            :config="emailConfig" v-model="user.Email" :class="{'border-red': errorMessage.Email}"
                                        />
                                        <div class="validate-string">{{ errorMessage.Email }}</div>
                                    </div>
                                    <div class="field">
                                        <div class="lable">Địa chỉ <span style="color: red;">*</span></div>
                                        <base-text-box
                                            :config="addressConfig" v-model="user.Address" :class="{'border-red': errorMessage.Address}"
                                        />
                                        <div class="validate-string">{{ errorMessage.Address }}</div>
                                    </div>
                                    <div class="field ">
                                        <div class="lable">Vị trí công việc</div>
                                        <base-select-box :config="jobPositionConfig" v-model="user.JobPositionID" :class="{'border-red': errorMessage.JobPosition}"/>
                                        <div class="validate-string">{{ errorMessage.JobPosition }}</div>
                                    </div>
                                    <hr class="my-[12px]">
                                    <div class="field">
                                        <base-check-box :config="{text: 'Là người dùng'}" v-model="user.IsUser"/>
                                    </div>
                                    <template v-if="user.IsUser">
                                        <div class="field ">
                                            <div class="lable">Tên tài khoản </div>
                                            <base-text-box
                                                :config="candidateNameConfig" v-model="user.UserName" :class="{'border-red': errorMessage.UserName}"
                                            />
                                            <div class="validate-string">{{ errorMessage.UserName }}</div>
                                        </div>
                                        <div class="field ">
                                            <div class="lable">Email công ty </div>
                                            <base-text-box
                                                :config="candidateNameConfig" v-model="user.EmailOffice" :class="{'border-red': errorMessage.EmailOffice}"
                                            />
                                            <div class="validate-string">{{ errorMessage.EmailOffice }}</div>
                                        </div>
                                        <div class="field ">
                                            <div class="lable">Vai trò </div>
                                            <base-select-box :config="roleConfig" v-model="user.RoleID" :class="{'border-red': errorMessage.Role}"/>
                                            <div class="validate-string">{{ errorMessage.Role }}</div>
                                        </div>
                                        <div class="field ">
                                            <div class="lable">Trạng thái người dùng </div>
                                            <base-select-box :config="statusConfig" v-model="user.Status"/>
                                        </div>
                                        <base-check-box :config="{text: 'Gửi email kích hoạt tài khoản'}" v-model="user.IsSendActive"/>
                                    </template>
                                    
                                </div>
                            </div>
                        </dx-scroll-view>
                    </div>
                </div>
            </template>
        </base-popup>
</template>
<script lang="ts" setup>
import { DxDateBox, DxNumberBox, DxPopup, DxRadioGroup, DxSelectBox, DxTextArea, DxTextBox } from "devextreme-vue";
import { onMounted, onUpdated, ref, watch } from "vue";
import {
    BaseTextBox,
    BaseStatus,
    BaseButton,
    BasePopup,
    BaseCheckBox,
    BaseSelectBox,
    BaseDateBox,
    BaseRadioGroup,
    BaseNumberBox,
    BaseTextArea
} from "../../../components/base/index";
import { degrees, trainingPlaces, specializeds, candidateFrom } from "../../../mocks";
import { Icon } from "@iconify/vue";
import { WorkExperientModel } from "../../../models/CandidateModel";
import {UserModel} from "../../../models/UserModel"
import { DxPopover } from 'devextreme-vue/popover';
import CandidateApi from "../../../apis/candidate/candidate-api"
import UserApi from "@/apis/user/user-api";
import { useToastStore } from "../../../stores";
import { StateEnum, ToastType } from "../../../enums";
import axios from "axios";
import _ from 'lodash';    
import { PagingRequest } from "../../../models";
import { DxScrollView } from 'devextreme-vue/scroll-view';
import { validateEmail } from "../../../utils";
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
import type { LoadOptions } from "devextreme/data";
import JobPositionApi from "../../../apis/job-position/job-position-api";
import RoleApi from "@/apis/role/role-api";

const props = withDefaults(defineProps<{
    isShowPopup: boolean
    isEdit: boolean
    userID? : number
}>(), {
    isShowPopup: false,
    isEdit: false
});

const userAPi = new UserApi()
const roleApi = new RoleApi()

const errorMessage = ref({
    FullName: "",
    BirthDay: "",
    Mobile: "",
    Email: "",
    Address: "",
    EmailOffice: "",
    UserName: "",
    Role: "",
    JobPosition: ""
})

const emit = defineEmits(["onClose", "onSave"]);

const jobPositionApi = new JobPositionApi() 

const toastStore = useToastStore();

const popupRef = ref<InstanceType<typeof DxPopup>>();

const popupConfig = ref<DxPopup>({
    height: "calc(100vh - 32px)",
    wrapperAttr: {
        class: "popup-candidate"
    }
});

const widthPopup = ref(600)

if(props.isEdit && props.userID){
    getCandidateByID()
}

const candidateNameConfig = ref<DxTextBox>({
    placeholder: "Tên ứng viên",
})

const emailConfig = ref<DxTextBox>({
    placeholder: "Nhập email",
})

const addressConfig = ref<DxTextBox>({
    placeholder: "Nhập địa chỉ",
})

const dateOfBirdthConfig = ref<DxDateBox>({
    placeholder: "dd/MM/yyyy"
})

const phoneConfig = ref<DxNumberBox>({
    placeholder: "Nhập số điện thoại",
    showSpinButtons: false,
    format:""
})

const statusConfig = ref<DxSelectBox>({
    width: '100%',
    placeholder: 'Trạng thái',
    noDataText: 'Không có dữ liệu',
    displayExpr: "text",
    valueExpr: "id",
    dataSource: [{
        id: 1,
        text: "Đang hoạt động"
    },
    {
        id: 2,
        text: "Ngưng hoạt động"
    }
    ],
    searchEnabled: true,
    onItemClick(e) {
        user.value.JobPositionName = e.itemData.JobPositionName
    }
}); 

const GenderConfig = ref<DxRadioGroup>({
    items: [
        {
            id: 0, text: "Nam"
        },
        {
            id: 1 , text: "Nữ"
        }
    ],
    layout: "horizontal",
    valueExpr: "id",
    displayExpr: "text",
    value: 1
})

const jobPositionData = new DataSource({
    load: async (options: LoadOptions) => {
        const param = new PagingRequest () 
        param.Collums = ["JobPositionName"],
        param.PageIndex = (options.skip || 0)/(options.take || 20) + 1,
        param.PageSize = options.take || 15,
        param.SearchValue = options.searchValue
        const res = await jobPositionApi.getFilterPaging(param)
        return res.data.Data.Data || []
    },
    byKey: async (id: any) => {
        if(!id) return
        const res = await jobPositionApi.getByID(id)
        return res.data.Data 
    }
})

const jobPositionConfig = ref<DxSelectBox>({
    width: '100%',
    placeholder: 'Vị trí tuyển dụng',
    noDataText: 'Không có dữ liệu',
    displayExpr: "JobPositionName",
    valueExpr: "JobPositionID",
    dataSource: jobPositionData,
    searchEnabled: true,
    onItemClick(e) {
        user.value.JobPositionName = e.itemData.JobPositionName
    }
});

const roleData = new DataSource({
    load: async (options: LoadOptions) => {
        const param = new PagingRequest () 
        param.Collums = ["RoleName"],
        param.PageIndex = (options.skip || 0)/(options.take || 20) + 1,
        param.PageSize = options.take || 15,
        param.SearchValue = options.searchValue
        const res = await roleApi.getFilterPaging(param)
        return res.data.Data.Data || []
    },
    byKey: async (id: any) => {
        if(!id) return
        const res = await roleApi.getByID(id)
        return res.data.Data.role 
    }
})

const roleConfig = ref<DxSelectBox>({
    width: '100%',
    placeholder: 'Vai trò',
    noDataText: 'Không có dữ liệu',
    displayExpr: "RoleName",
    valueExpr: "RoleID",
    dataSource: roleData,
    searchEnabled: true,
    onItemClick(e) {
        user.value.RoleName = e.itemData.RoleName
    }
});

const user = ref<UserModel>(new UserModel())

async function getCandidateByID(){
    const res = await userAPi.getByID(props.userID + "")
    if(res.data.Success){
        user.value = res.data.Data
    }
}

async function handleSave(){
    if(!validate()) return
    user.value.Mobile = user.value.Mobile?.toString()
    if(!props.isEdit){
        const res = await userAPi.insert(user.value)
        if(res.data.Success){
            emit("onClose")
            emit("onSave")
            toastStore.toggleToast(true, "Thêm thành công", ToastType.success);
        }else{
            toastStore.toggleToast(true, "Thêm thất bại", ToastType.error);
        }
    }else{
        const res = await userAPi.update(user.value.UserID, user.value)
        if(res.data.Success){
            emit("onClose")
            emit("onSave")
            toastStore.toggleToast(true, "Cập nhật thành công", ToastType.success);
        }else{
            toastStore.toggleToast(true, "Cập nhật thất bại", ToastType.error);
        }
    }
}

function setCandidateAvatar(e: any){
    var selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append("files", selectedFile);
    axios
    .post("http://localhost:7236/api/Upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (response?.data) {
        const resposeImage = response.data[0];
        user.value.Avatar = resposeImage.url
      }
    })
    .catch((error) => {
      console.error(error);
    });
    if(e.target.files) e.target.value = null;
}

function handleClose(){
    emit("onClose")
}

function validate() : boolean{
    let result = true
    if(!user.value.FullName){
        errorMessage.value.FullName = "Tên ứng viên không được để trống"
        result = false
    }
    if(!user.value.BirthDay){
        errorMessage.value.BirthDay = "Ngày sinh không được để trống"
        result = false
    }
    if(!user.value.Address){
        errorMessage.value.Address = "Địa chỉ không được để trống"
        result = false
    }
    if(!user.value.Email){
        errorMessage.value.Email = "Email không được để trống"
        result = false
    }
    if(user.value.Email && !validateEmail(user.value.Email)){
        errorMessage.value.Email = "Email liên hệ không hợp lệ"
        result = false
    }
    if(!user.value.Mobile){
        errorMessage.value.Mobile = "Số điện thoại không được để trống"
        result = false
    }
    if(!user.value.JobPositionID){
        errorMessage.value.JobPosition = "Vị trí công việc không được để trống"
        result = false
    }
    if(user.value.IsUser){
        if(!user.value.EmailOffice){
            errorMessage.value.EmailOffice = "Email công ty không được để trống"
            result = false
        }
        if(user.value.EmailOffice && !validateEmail(user.value.EmailOffice)){
            errorMessage.value.EmailOffice = "Email công ty không hợp lệ"
            result = false
        }
        if(!user.value.UserName){
            errorMessage.value.UserName = "Tên tài khoản không được để trống"
            result = false
        }
        
        if(!user.value.RoleID){
            errorMessage.value.Role = "Vai trò không được để trống"
            result = false
        }
    }

    return result
}

watch(() => user.value.FullName, (newVal) => {
    if(newVal){
        errorMessage.value.FullName = ""
    }else{
        errorMessage.value.FullName = "Họ và tên không được để trống"
    }
})

watch(() => user.value.BirthDay, (newVal) => {
    if(newVal){
        errorMessage.value.BirthDay = ""
    }else{
        errorMessage.value.BirthDay = "Ngày sinh không được để trống"
    }
})

watch(() => user.value.Address , (newVal) => {
    if(newVal){
        errorMessage.value.Address = ""
    }else{
        errorMessage.value.Address = "Địa chỉ không được để trống"
    }
})

watch(() => user.value.Email, (newVal) => {
    if(newVal){
        errorMessage.value.Email = ""
    }else{
        errorMessage.value.Email = "Email không được để trống"
    }
})

watch(() => user.value.Mobile, (newVal) => {
    if(newVal){
        errorMessage.value.Mobile = ""
    }else{
        errorMessage.value.Mobile = "Số điện thoại không được để trống"
    }
})

watch(() => user.value.EmailOffice, (newVal) => {
    if(!newVal && user.value.IsUser){
        errorMessage.value.EmailOffice = "Email công ty không được để trống"
    }else{
        errorMessage.value.EmailOffice = ""
    }
})

watch(() => user.value.JobPositionID, (newVal) => {
    if(!newVal && user.value.IsUser){
        errorMessage.value.JobPosition = "Vị trí công việc không được để trống"
    }else{
        errorMessage.value.JobPosition = ""
    }
})

watch(() => user.value.RoleID, (newVal) => {
    if(!newVal && user.value.IsUser){
        errorMessage.value.Role = "Vai trò không được để trống"
    }else{
        errorMessage.value.Role = ""
    }
})

watch(() => user.value.UserName, (newVal) => {
    if(!newVal && user.value.IsUser){
        errorMessage.value.UserName = "Tên tài khoản được để trống"
    }else{
        errorMessage.value.UserName = ""
    }
})

watch(() => user.value.IsUser, (newVal) => {
    if(!newVal && !props.isEdit){
        user.value.EmailOffice = ""
        user.value.Password = ""
        user.value.UserName = ""
        user.value.IsSendActive = false
        user.value.RoleID = 0
        user.value.RoleName = ""
        user.value.Status = 2
    }else if(!newVal){
        user.value.IsSendActive = false
        user.value.RoleID = 0
        user.value.RoleName = ""
        user.value.Status = 2
    }       
})

</script>
<style lang="scss" scoped>
    .add-cv{
        position: relative;
        text-align: center;
        display: flex;
        align-items: center;
        width: 100%;
        height: 100px;
        border: 1px dashed #e0e0e0;
        border-radius: 3px;
        justify-content: center;
        .wrap-file{
            text-align: center;
            font-size: 13px !important;
            width: 100%;
        }
        
    }
    .avatar{
        width: 63px;
        height: 63px;
        border-radius: 50%;
        margin-right: 16px;
        margin-top: 3px;
        position: relative;
        .show-image{
            width: 100%;
            height: 100%;
            border-radius: 50% !important;
            -o-object-fit: cover;
            object-fit: cover;
            border: 1px dashed #e0e0e0;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover
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
.file-input{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
    opacity: 0;
}

.recruitment-status{
    margin-right: 12px;
    width: fit-content;
    .recruitment-status-1{
        background-color: #48bb56 ;
        width: 10px;
        height: 10px;
        border-radius:50%;
        margin-top: 6px;
    }

    .recruitment-status-2{
        background-color: red ;
        width: 10px;
        height: 10px;
        border-radius:50%;
        margin-top: 6px;
    }
}

.heading-title{
    font-size: 14px;
    color: #1e2633;
    height: 25px!important;
    line-height: 25px!important;
    font-family: Roboto;
    font-weight: 500;
    margin-top: 12px;
}

.pdfContainer {
    width: 100%;
    height: calc(100vh - 132px);
}

</style>

<style>
.dx-overlay-content{
    overflow: unset !important;
}

</style>