<template>
    <div class="recruitment-infor">
        <div class="wrap-block">
            <div class="heading-title">
                HỘI ĐỒNG TUYỂN DỤNG
            </div>
            <div class="mt-[16px] w-full flex">
                <div class="flex-1 text-[16px] font-medium">Tên thành viên</div>
                <div class="w-[40%] text-center text-[16px] font-medium">Nhận email khi có ứng viên mới</div>
                <div class="w-[7%] text-center cursor-pointer">
                </div>
            </div>
            <div class="mt-[16px] items-center w-full flex" v-for="(council, index) of recruitment.RecruitmentBroads.filter(item => item.State != 3)" :key="council.RecruitmentBroadID">
                <div class="flex flex-1 items-center">
                    <img style="width: 30px; height: 30px; border-radius: 50%;" v-if="council.Avatar" :src="council.Avatar" alt="">
                    <div class="text-center" :style="{backgroundColor: getBackGroundColor()}" style="width: 30px; height: 30px; border-radius: 50%;" v-else>
                        <p class="text-white leading-[30px] text-[13px] font-medium">{{ getInitials(council.FullName) }}</p>
                    </div>
                    <div class="ml-[8px] flex-1">
                        <div class="font-medium">{{ council.FullName }}</div>
                        <div class="">{{ council.Email }}</div>
                    </div>
                </div>
                <div class="w-[40%] text-center">
                    <base-check-box :config="{
                        onValueChanged(e) {
                            if(council.RecruitmentBroadID){
                                council.State = StateEnum.Update  
                            }
                        },
                    }" v-model="council.IsSendMail"/>
                </div>
                <div class="w-[7%] text-center cursor-pointer" @click="handleRemove(council, index)">
                    <Icon
                    :icon="'gg:remove'"
                    :color="'red'"
                    width="16"
                    height="16"
                />
                </div>
            </div>
            <div class="add-council mt-[16px]" id="council">
                <Icon
                    :icon="'lucide:plus'"
                    :color="'#2680eb'"
                    width="20"
                    height="20"
                />
                <div class="ml-[4px]">Thêm thành viên</div>
            </div>
        </div>
    </div>
    <DxPopover 
        :target="'#council'"
        show-event="click"
        :visible="false"
        :hideOnOutsideClick="true"
        position="bottom"
        width="auto"
        height="auto"
        >
        <div class="h-[200px] p-[8px]">
            <dx-scroll-view :height="'100%'">
                <div class="flex p-[8px] hover:bg-[#E7F1FF] items-center mb-[8px] cursor-pointer" @click="handleAddCouncil(item)" v-for="(item,index) of councils" :key="index">
                    <img style="width: 30px; height: 30px; border-radius: 50%;" v-if="item.Avatar" :src="item.Avatar">
                    <div class="text-center" :style="{backgroundColor: getBackGroundColor()}" style="width: 30px; height: 30px; border-radius: 50%;" v-else>
                        <p class="text-white leading-[30px] text-[13px] font-medium">{{ getInitials(item.FullName) }}</p>
                    </div>
                    <span class="ml-[12px] font-medium">{{ item.FullName }}</span>
                </div>
            </dx-scroll-view>
        </div>
    </DxPopover>
</template>
<script lang="ts" setup>
import { BaseCheckBox } from '@/components/base';
import { DxCheckBox } from 'devextreme-vue';
import { ref } from 'vue';
import { RecruitmentBroadModel } from '../../../models';
import { Icon } from "@iconify/vue";
import { DxPopover } from 'devextreme-vue/popover';
import { DxScrollView } from "devextreme-vue/scroll-view";
import {councils} from "../../../mocks"
import { StateEnum } from '@/enums';
import { useRecruitmentStore } from "../../../stores";
import { storeToRefs } from "pinia";

const recruitmentStore = useRecruitmentStore()

const { recruitment } = storeToRefs(recruitmentStore);

const listCouncil = ref<RecruitmentBroadModel[]>([])

const checkboxConfig = ref<DxCheckBox>({
    
})

function handleAddCouncil(council: any){
    const isExist = listCouncil.value.find((item => item.UserID == council.UserID))
    if(!isExist){
        const recruitmentBroad = new RecruitmentBroadModel()
        recruitmentBroad.FullName = council.FullName
        recruitmentBroad.Avatar = council.Avatar
        recruitmentBroad.Email = council.Email
        recruitmentBroad.UserID = council.UserID
        recruitmentBroad.State = StateEnum.Insert
        recruitment.value.RecruitmentBroads.push(recruitmentBroad)
    }
}

function handleRemove(council :RecruitmentBroadModel, index: number){
    if(council.RecruitmentBroadID){
        const isExist = recruitment.value.RecruitmentBroads.find((item => item.RecruitmentBroadID == council.RecruitmentBroadID))
        if(isExist){
            isExist.State = StateEnum.Delete
        }
    }else{
        recruitment.value.RecruitmentBroads.splice(index,1)
    }
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
</script>
<style lang="scss" scoped>
    .recruitment-infor{
        max-height: calc(100vh - 48px - 66px);
        overflow-y: auto;
        background-color: #F1F2F6;
        padding: 8px;
        min-height: 100%;
        .wrap-block{
            background-color: #ffffff;
            border-radius: 6px;
            width: 100%;
            padding: 16px 24px;
            margin-bottom: 16px;
            .heading-title{
                font-size: 16px;
                color: #1E2633;
                margin-bottom: 16px;
                text-transform: uppercase;
                font-weight: 700;
            }
            .sub-title{
                font-size: 14px;
                color: #6a727d;
            }
        }
    }
    .add-council{
        width: fit-content;
        font-weight: 500;
        color: #2680eb;
        font-size: 16px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
</style>