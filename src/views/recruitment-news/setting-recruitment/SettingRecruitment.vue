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
            <div class="title">{{ isEdit ? "Sửa tin" : "Thêm mói" }}</div>
        </div>
        <div class="setting-content">
            <div class="setting-sidebar">
                <router-link class="setting-sidebar-item" :to="{ name: 'setting-recruitment-infor', params: {id: route.params.id} }">
                    <Icon icon="material-symbols:edit-outline"  
                    width="20"
                    height="20"
                    :color="'#7a8188'"
                    class="cursor-pointer mr-[8px]"/>
                    <div  class="">Thông tin tuyển dụng</div>
                </router-link>
                <router-link class="setting-sidebar-item" :to="{ name: 'setting-recruitment-plan', params: {id: route.params.id}  }">
                    <Icon icon="mdi:floor-plan"  
                    width="20"
                    height="20"
                    :color="'#7a8188'"
                    class="cursor-pointer mr-[8px]"/>
                    <div class="">Kế hoạch thực hiện</div>
                </router-link>
                <router-link class="setting-sidebar-item" :to="{ name: 'setting-recruitment-process', params: {id: route.params.id}  }">
                    <Icon icon="carbon:ibm-process-mining"  
                    width="20"
                    height="20"
                    :color="'#7a8188'"
                    class="cursor-pointer mr-[8px]"/>
                    <div  class="">Quy trình tuyển dụng</div>
                </router-link>
                <router-link class="setting-sidebar-item" :to="{ name: 'setting-recruitment-council', params: {id: route.params.id}  }">
                    <Icon icon="pepicons-pop:people"  
                    width="20"
                    height="20"
                    :color="'#7a8188'"
                    class="cursor-pointer mr-[8px]"
                    />
                    <div class="">Hội đồng tuyển dụng</div>
                </router-link>
            </div>
            <div class="flex-1 h-full overflow-hidden">
                <router-view></router-view>
            </div>
            <div class="setting-btn">
                <div class="group-btn">
                    <base-button :config="buttonSaveConfig" class="mb-[12px]"/>
                    <base-button :config="buttonDraftConfig" />
                </div>
            </div>
        </div>
    </div>
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

const recruitmentStore = useRecruitmentStore()
const {recruitment} = storeToRefs(recruitmentStore)
const recruitmentApi = new RecruitmentApi()
const toastStore = useToastStore();
const route = useRoute()
const router = useRouter()
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

function backPage(){
    router.go(-1)
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
            &.router-link-active {
                color: #2680eb;
                border-radius: 4px;
                font-weight: 700;
                border-bottom: none;
                background-color: rgba(225, 238, 255, 0.8);
        }
        }
    }
    .setting-btn{
        right: 0;
        width: 230px;
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
</style>