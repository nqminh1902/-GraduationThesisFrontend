<template>
    <div class="recruitment-infor">
        <div class="wrap-block">
            <div class="heading-title">
                QUY TRÌNH TUYỂN DỤNG
            </div>
            <div class="sub-title">
                Xây dựng quy trình tuyển dụng cho vị trí đang đăng tuyển
            </div>
            <div class="w-full">
                <div class="">
                    <DxSortable
                        id="list"
                        :drop-feedback-mode="'push'"
                        :item-orientation="'vertical'"
                        :drag-direction="'vertical'"
                        :scroll-speed="30"
                        :scroll-sensitivity="60"
                        :handle="'.handle'"
                        @drag-start="onDragStart"
                        @reorder="onReorder"
                    >
                        <template #content>
                            <template v-for="(round, index) in recruitment.RecruitmentRounds" :key="round.RecruitmentRoundID">
                                <div
                                    v-if="round.RecruitmentRoundName != 'Đã tuyển'"
                                    :class="'item-with-handle'"
                                    class="item flex dx-card dx-theme-text-color dx-theme-background-color"
                                >
                                    <div class="flex w-full justify-between">
                                        <div class="flex flex-1">
                                            <i class="handle dx-icon dx-icon-dragvertical"></i>
                                            {{ round.RecruitmentRoundName }}
                                        </div>
                                        <div class="flex">
                                            <Icon
                                                :icon="'material-symbols:edit-outline'"
                                                :color="'#2563eb'"
                                                width="20"
                                                height="20"
                                                class="cursor-pointer"
                                                @click="handleEdit(round, index)"
                                            />
                                            <Icon
                                                v-if="!round.IsSystem"
                                                :icon="'material-symbols:delete-outline'"
                                                :color="'red'"
                                                width="20"
                                                height="20"
                                                class="ml-1.5 cursor-pointer"
                                                @click="handleDelete(round, index)"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </DxSortable>
                    <div class="flex w-full border h-[43px] mb-[10px] border-dashed border-[#aaa] items-center cursor-pointer justify-center" @click="handleAddRound">
                        <Icon
                            :icon="'ic:round-plus'"
                            :color="'#2563eb'"
                            width="20"
                            height="20"
                            class="cursor-pointer"
                        />
                        <div class="">Thêm vòng tuyển dụng</div>
                    </div>
                    <div class="flex w-full border h-[43px]  mb-[10px] border-[#ddd] items-center bg-[#f5f5f5] rounded-[4px] px-[8px]">
                        <Icon
                            :icon="'mingcute:check-fill'"
                            :color="'green'"
                            width="20"
                            height="20"
                            class="cursor-pointer mr-[12px]"
                        />
                        <div class="">Đã tuyển</div>
                    </div>
                </div>
                <div class="field flex">
                    <DxSwitch
                        v-model:value="isSendEmail"
                        switchedOnText= ""
                        switchedOffText=""
                    />
                    <div class="lable">
                        Tự động gửi mail xác nhận ứng tuyển
                    </div>
                </div>
                <div class="sub-title">
                    Khi ứng viên ứng tuyển vào tin tuyển dụng này, hệ thống sẽ tự động gửi email cho ứng viên
                </div>
            </div>
        </div>
    </div>

    <base-popup 
        v-if="isShowPopup"
        :config="popupConfig"
        :popupVisible="isShowPopup"
        @close="isShowPopup = false">

        <template #body>
            <h2 class="mb-[12px]">{{isEdit ? 'Sửa vòng tuyển dụng' : 'Thêm vòng tuyển dụng'}}</h2>
            <div class="field">
                <div class="lable"> Tên đợt tuyển dụng <span style="color: red;">*</span></div>
                <base-text-box 
                    :config="roundNameConfig"
                    v-model="recruitmentRound.RecruitmentRoundName"
                />
            </div>
            <div class="w-full py-[16px] flex justify-end">
                <base-button :config="saveButton"/>
            </div>
        </template>
    </base-popup>
</template>
<script lang="ts" setup>
import { DxSwitch } from 'devextreme-vue/switch';
import {
    BaseNumberBox,
    BaseTable,
    BaseTextBox,
    BaseStatus,
    BaseButton,
    BasePopup,
    BaseSelectBox,
    BaseUploadImage,
    BaseTextArea,
    BaseDateBox,
    BaseCheckBox,
} from "../../../components/base";
import { ref } from 'vue';
import DxSortable from 'devextreme-vue/sortable';
import { Icon } from "@iconify/vue";
import { DxButton, DxPopup, DxTextBox } from 'devextreme-vue';
import { ButtonStylingMode, ButtonType, ToastType } from '../../../enums';
import { RecruitmentRoundModel } from '../../../models';
import { useRoute } from 'vue-router';
import { useRecruitmentStore } from "../../../stores";
import { storeToRefs } from "pinia";
import RecruitmentRoundApi from "../../../apis/recruitment/recruitment-round-api"
import { useToastStore } from "../../../stores";

const route = useRoute()

const recruitmentStore = useRecruitmentStore()

const { recruitment } = storeToRefs(recruitmentStore);

const toastStore = useToastStore();

let isEditRecruitment = route.params.id !== "0"

const recruitmentRoundApi = new RecruitmentRoundApi()

const isSendEmail = ref(false)

const isShowPopup = ref(false)

let editPosition = 0

const isEdit = ref(false)

const recruitmentRound = ref<RecruitmentRoundModel>(new RecruitmentRoundModel)

const popupConfig: DxPopup = {
    width: 500,
    height: 'auto',
    wrapperAttr: {
        class: 'popup-process base-popup',
    },
}

const roundNameConfig = ref<DxTextBox>({
    placeholder: "Tên vòng tuyển dụng"
})

const saveButton = ref<DxButton>({
    type: ButtonType.default,
    height: 36,
    width: 'auto',
    text: "Lưu",
    stylingMode: ButtonStylingMode.contained,
    onClick(e) {
        if(!isEdit.value){
            recruitment.value.RecruitmentRounds.splice(recruitment.value.RecruitmentRounds.length-1,0,recruitmentRound.value)
        }else{
            recruitment.value.RecruitmentRounds.splice(editPosition, 1, recruitmentRound.value);
        }
        isShowPopup.value = false
    },
})

function onDragStart(e: any){
    e.itemData = recruitment.value.RecruitmentRounds[e.fromIndex];
}

function onReorder(e: any){
    recruitment.value.RecruitmentRounds.splice(e.fromIndex, 1);
    recruitment.value.RecruitmentRounds.splice(e.toIndex, 0, e.itemData);
}

function handleAddRound(){
    isEdit.value = false
    recruitmentRound.value = new RecruitmentRoundModel()
    isShowPopup.value = true
}

function handleEdit(round: RecruitmentRoundModel, index:number){
    editPosition = index
    isEdit.value = true
    isShowPopup.value = true
    recruitmentRound.value =  {...round}
}

async function handleDelete(round: RecruitmentRoundModel, index:number){
    recruitment.value.RecruitmentRounds.splice(index, 1);
    if(isEditRecruitment){
        const res = await recruitmentRoundApi.delete(round.RecruitmentRoundID)
        if(res.data.Success){
            toastStore.toggleToast(true, "Xóa thành công", ToastType.success);
        }else{
            toastStore.toggleToast(true, "Xóa thất bại", ToastType.success);
        }
    }
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
            .field{
                margin-bottom: 12px;
                .lable{
                    font-size: 14px;
                    color: #1e2633;
                    height: 25px!important;
                    line-height: 25px!important;
                    font-family: Roboto;
                    font-weight: 500;
                }
            }
            .title-time{
                font-size: 16px;
                color: #1E2633;
                font-weight: 700;
                margin-bottom: 8px;
            }
        }
    }
    .field{
        margin-bottom: 12px;
        .lable{
            font-size: 14px;
            color: #1e2633;
            height: 25px!important;
            line-height: 25px!important;
            font-family: Roboto;
            font-weight: 500;
        }
    }
    .widget-container {
  margin-right: 320px;
}

#scroll {
  height: 500px;
}

#scroll.horizontal {
  margin-top: 170px;
  display: block;
  width: auto;
  height: auto;
  white-space: nowrap;
}

.handle {
  position: absolute;
  left: 4px;
  top: 10px;
  font-size: 18px;
  line-height: 19px;
  cursor: move;
}

.horizontal .handle {
  margin-right: 10px;
}

.item {
  box-sizing: border-box;
  position: relative;
  padding: 10px 20px;
  margin-bottom: 10px;
  background: white;
  cursor: pointer;
}

.item-with-handle {
  padding-left: 30px;
  cursor: default;
}

.horizontal .item {
  display: inline-block;
  width: 200px;
  height: 100px;
  margin-bottom: 0;
  margin-right: 10px;
  white-space: normal;
}

.options {
  padding: 20px;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 260px;
  top: 0;
  background-color: rgba(191, 191, 191, 0.15);
}

.caption {
  font-size: 18px;
  font-weight: 500;
}

.option {
  margin-top: 10px;
}

.disable-bg{
    background-color: #f5f5f5;
}
</style>

<style>
.dx-switch-container{
    border-radius: 16px;
    height: 22px;
}
.dx-switch-handle::before{
    width: 16px;
    height: 16px;
    border-radius: 50%;
}
.dx-switch-handle{
}
</style>