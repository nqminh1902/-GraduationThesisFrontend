<template>
    <div class="w-full h-full">
        <div class="setting-header">
            <Icon
                :icon="'ph:arrow-left-bold'"
                :color="'#FF0000'"
                width="20"
                height="20"
                class="cursor-pointer"
                @click="backPage"
            />
            <div class="title">{{ isEdit ? "Sửa tin" : "Thêm mới" }}</div>
        </div>
        <div class="setting-content">
            <div class="setting-sidebar">
                <div class="setting-sidebar-item" :class="routeActive == 'infor' && 'active'" @click="ChangeRouter('infor')">
                    <Icon icon="material-symbols:edit-outline"  
                    width="20"
                    height="20"
                    :color="'#7a8188'"
                    class="cursor-pointer mr-[8px]"/>
                    <div  class="">Thông tin tuyển dụng</div>
                </div>
                <div class="setting-sidebar-item" :class="routeActive == 'plan' && 'active'" @click="ChangeRouter('plan')">
                    <Icon icon="mdi:floor-plan"  
                    width="20"
                    height="20"
                    :color="'#7a8188'"
                    class="cursor-pointer mr-[8px]"/>
                    <div class="">Kế hoạch thực hiện</div>
                </div>
                <div class="setting-sidebar-item" :class="routeActive == 'process' && 'active'" @click="ChangeRouter('process')">
                    <Icon icon="carbon:ibm-process-mining"  
                    width="20"
                    height="20"
                    :color="'#7a8188'"
                    class="cursor-pointer mr-[8px]"/>
                    <div  class="">Quy trình tuyển dụng</div>
                </div>
                <div class="setting-sidebar-item" :class="routeActive == 'council' && 'active'" @click="ChangeRouter('council')">
                    <Icon icon="pepicons-pop:people"  
                    width="20"
                    height="20"
                    :color="'#7a8188'"
                    class="cursor-pointer mr-[8px]"
                    />
                    <div class="">Hội đồng tuyển dụng</div>
                </div>
            </div>
            <div class="flex-1 h-full overflow-hidden">
                <router-view></router-view>
            </div>
            <div class="setting-btn">
                <div class="group-btn">
                    <base-button :config="buttonSaveConfig" class="mb-[12px]"/>
                    <div class="tab-status rounded-[4px] flex items-center cursor-pointer justify-between" :class="recruitment.Status == 1 ? 'publish' : 'stop'" id="status">
                        <div class="recruitment-status">
                            <div :class="'recruitment-status-' + recruitment.Status"></div>
                        </div>
                        <div class="">{{ recruitment.Status == 1 ? "Tuyển dụng" : "Ngưng tuyển dụng" }}</div>
                        <Icon
                            :icon="'icon-park-outline:down'"
                            width="20"
                            height="20"
                            class="ml-[4px] mr-[16px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <DxPopover 
        target="#status"
        show-event="click"
        :visible="false"
        :hideOnOutsideClick="true"
        position="bottom"
        width="250"
        >
        <div class="">
            <div class="flex cursor-pointer hover:bg-[#e1eeffcc] p-[8px] hover:rounded-[4px]" v-if="recruitment.Status != 2" @click="handleUpdateStatus(2)">
                <div class="recruitment-status items-center flex" style="margin-left: 0;">
                    <div class="recruitment-status-2"></div>
                </div>
                <div class="flex-1">
                    <div class="font-bold">Ngừng nhận hồ sơ</div>
                    <div class="">Tin sẽ được gỡ khỏi các kênh tuyển dụng. Không cho phép nộp đơn ứng tuyển</div>
                </div>
            </div>
            <div class="flex cursor-pointer hover:bg-[#e1eeffcc] p-[8px] hover:rounded-[4px] mt-[12px]"  v-if="recruitment.Status != 1" @click="handleUpdateStatus(1)">
                <div class="recruitment-status items-center flex" style="margin-left: 0;">
                    <div class="recruitment-status-1"></div>
                </div>
                <div class="flex-1">
                    <div class="font-bold">Tuyển dụng</div>
                    <div class="">Thiết tục nhận hồ sơ</div>
                </div>
            </div>
        </div>
    </DxPopover>
</template>
<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { DxButton } from "devextreme-vue";
import { ref } from "vue";
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
} from "../../../components/base/index";
import { ButtonStylingMode, ButtonType, ToastType } from "../../../enums";
import { useRecruitmentStore } from "../../../stores";
import { storeToRefs } from "pinia";
import RecruitmentApi from "../../../apis/recruitment/recruitment-api"
import { useRoute, useRouter } from "vue-router";
import { RecruitmentModel } from "../../../models";
import { useToastStore } from "../../../stores";
import { DxPopover } from 'devextreme-vue/popover';

const recruitmentStore = useRecruitmentStore()
const {recruitment} = storeToRefs(recruitmentStore)
const recruitmentApi = new RecruitmentApi()
const toastStore = useToastStore();
const route = useRoute()
const router = useRouter()
const routeActive = ref("infor")
let isEdit = ref(false)

if(route.params.id != "0"){
    getRecruitment()
    isEdit.value = true
}else{
    recruitment.value = new RecruitmentModel()
}

async function getRecruitment(){
    const res = await recruitmentApi.getByID(route.params.id.toString())
    if(res.data.Success){
        recruitment.value = res.data.Data;
        
    }
}

const buttonSaveConfig = ref<DxButton>({
    type: ButtonType.default,
    height: 36,
    width: '100%',
    text: "Lưu và đăng tin",
    stylingMode: ButtonStylingMode.contained,
    async onClick(e) {
        if(!recruitment.value.RecruitmentBroads.length){
            toastStore.toggleToast(true, "Vui lòng chọn hội đồng tuyển dụng", ToastType.warning)
            return
        }
        if(!isEdit.value){
            recruitment.value.RecruitmentRounds.forEach((round, index) => {
                round.SordOrder = index + 1
            })
            const res = await recruitmentApi.insert(recruitment.value)
            if( res.data.Success) {
                toastStore.toggleToast(true, "Thêm thành công", ToastType.success);
                router.push({name: "recruitment-news"})
            }else{
                toastStore.toggleToast(true, "Thêm thất bại", ToastType.error);
            }
        }else{
            const res = await recruitmentApi.update(recruitment.value.RecruitmentID,recruitment.value)
            if( res.data.Success) {
                toastStore.toggleToast(true, "Cập nhật thành công", ToastType.success);
                router.push({name: "recruitment-news"})
            }else{
                toastStore.toggleToast(true, "Cập nhật thất bại", ToastType.error);
            }
        }
    },
});

const buttonDraftConfig = ref<DxButton>({
    type: ButtonType.normal,
    height: 36,
    width: '100%',
    text: "Lưu nháp",
    stylingMode: ButtonStylingMode.contained,
    onClick(e) {
        
    },
});

function ChangeRouter(name: string){
    if(!validate()){
        toastStore.toggleToast(true, "Vui lòng nhập đầy đủ thông tin bắt buộc", ToastType.warning)
        return
    }
    routeActive.value = name
    switch (name) {
        case "infor":
            router.push({ name: 'setting-recruitment-infor', params: {id: route.params.id} })
            break;
        case "plan":
            router.push({ name: 'setting-recruitment-plan', params: {id: route.params.id}  })
            break;
        case "process":
            router.push({ name: 'setting-recruitment-process', params: {id: route.params.id}  })
            break;
        case "council":
            router.push({ name: 'setting-recruitment-council', params: {id: route.params.id}  })
            break;
        default:
            router.push({ name: 'setting-recruitment-infor', params: {id: route.params.id} })
            break;
    }
}

function validate(){
    let result = true
    if(!recruitment.value.Title){
        result = false
    }
    if(!recruitment.value.JobPositionID){
        result = false
    }
    if(!recruitment.value.CarrerID){
        result = false
    }
    if(!recruitment.value.WorkLocationID){
        result = false
    }
    if(!recruitment.value.RegistrationExpiryDate){
        result = false
    }
    if(!recruitment.value.MinSalary){
        result = false
    }
    if(!recruitment.value.MaxSalary){
        result = false
    }
    if(!recruitment.value.CurrencyCodeID){
        result = false
    }
    if(!recruitment.value.Summary){
        result = false
    }
    if(!recruitment.value.Description){
        result = false
    }
    if(!recruitment.value.Requirement){
        result = false
    }
    if(!recruitment.value.Benefit){
        result = false
    }
    if(!recruitment.value.ContactName){
        result = false
    }
    if(!recruitment.value.ContactMobile){
        result = false
    }
    if(!recruitment.value.ContactEmail){
        result = false
    }
    if(!recruitment.value.ContactMobile){
        result = false
    }
    return result
}

function backPage(){
    router.push({name: "recruitment-news"})
}


async function handleUpdateStatus(status: number){
    recruitment.value.Status = status
}

</script>


<style lang="scss" scoped>
.setting-header{
    width: 100%;
    height: 66px;
    padding: 16px 16px;
    z-index: 10;
    align-items: center;
    display: flex;
    background-color: #ffffff;
    border-bottom: 1px solid #e0e6ec;
    .title{
        margin-left: 16px;
        max-width: 550px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 20px!important;
        font-weight: 700;
    }
}
.setting-content{
    width: 100%;
    height: calc(100% - 66px);
    display: flex;
    .setting-sidebar{
        width: 212px;
        height: 100%;
        background: #FFFFFF;
        border-top-left-radius: 3px;
        padding: 12px;
        .setting-sidebar-item{
            width: 100%;
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #1E2633;
            padding: 12px;
            justify-content: flex-start;
            cursor: pointer;
            white-space: nowrap;
            text-align: center;
            background-color: #ffffff;
            
        }
    }
    .setting-btn{
        right: 0;
        width: 260px;
        padding: 8px;
        height: 100%;
        background-color: #F1F2F6;
        border-top-left-radius: 3px;
        .group-btn{
            background: #ffffff;
            padding: 24px;
            border-radius: 6px;
        }
    }
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
.recruitment-status{
    margin: 0 8px;
    width: fit-content;
    .recruitment-status-1{
        background-color: #48bb56 ;
        width: 10px;
        height: 10px;
        border-radius:50%;
    }

    .recruitment-status-2{
        background-color: red ;
        width: 10px;
        height: 10px;
        border-radius:50%;
    }
}
.active {
    color: #2680eb !important;
    border-radius: 4px;
    font-weight: 700;
    border-bottom: none;
    background-color: rgba(225, 238, 255, 0.8) !important;
}
</style>