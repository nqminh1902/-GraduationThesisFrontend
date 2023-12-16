<template>
    <div id="recruiment-news">
        <div class="container-candidate">
            <div class="content-title">
                <div class="flex">
                    <Icon
                        :icon="'tabler:news'"
                        :color="'#2563eb'"
                        width="24"
                        height="24"
                        class="mr-6"
                    />
                    <div class="text-title">Tin tuyển dụng</div>
                </div>
                <div class="">
                    <base-button :config="buttonConfig" />
                </div>
            </div>
            <div class="toolbar">
                <base-text-box :config="searchDefaultConfig" />
            </div>
            <div class="list-recruitment" ref="recruitmentBlock" @scroll="handleScroll">
                <div class="list-item" v-for="recruiment in recruitments" :key="recruiment.RecruitmentID">
                    <div class="recruitment-news-infor">
                        <div class="recruitment-status">
                            <div :class="'recruitment-status-' + recruiment.Status"></div>
                        </div>
                        <div class="recruitment-infor">
                            <div class="flex justify-between ">
                                <div class="recruitment-news-name" @click="detailPage(recruiment.RecruitmentID)">{{ recruiment.Title }}</div>
                                <div class="recruitment-option">
                                    <Icon
                                        :icon="'entypo:dots-three-vertical'"
                                        :color="'#7a8188'"
                                        width="16"
                                        height="16"
                                        class="cursor-pointer"
                                        :id="'recruiment-'+recruiment.RecruitmentID"
                                        @click="handleOpenOptionBtn(recruiment.RecruitmentID)"
                                    />
                                </div>
                            </div>
                            <div class="flex pt-[8px] pb-[16px] items-center">
                                <div class="news-sub-content">{{ recruiment.JobPositionName }}</div>
                                <div class="bg-[#6a727d] w-[6px] h-[6px] rounded-full mx-[7px]"></div>
                                <div class="news-sub-content mr-[15px] pr-[15px] border-solid border-[#e0e0e0] border-r-[1px]">{{ recruiment.WorkLocationName }}</div>
                                <div class="sub-content mr-[15px] pr-[15px] border-solid border-[#e0e0e0] border-r-[1px]">Số lượng cần tuyển: <b>{{ recruiment.ActualQuantity }}</b></div>
                                <div class="sub-content mr-[15px] pr-[15px] border-solid border-[#e0e0e0] border-r-[1px]">Hạn nộp hồ sơ: <b>{{ formatDate(recruiment.RegistrationExpiryDate) }}</b></div>
                                <div class="sub-content cursor-pointer" @click="handleOpenMoreInfor(recruiment.RecruitmentID)" :id="'more-'+recruiment.RecruitmentID">Xem thêm</div>
                            </div>
                        </div>
                    </div>
                    <div class="recruitment-news-rounds">
                        <div class="flex items-center">
                            <div class="item-content" v-for="item in recruiment.RecruitmentRounds" :key="item.RecruitmentRoundID">
                                <div class="text-center text-xl font-bold"> - </div>
                                <div class="round-name">{{ item.RecruitmentRoundName }}</div>
                            </div>
                        </div>
                    </div>
                    <DxPopover 
                        :target="'#recruiment-'+recruiment.RecruitmentID"
                        show-event="click"
                        @onHidden="isShowPopover = 0"
                        :visible="isShowPopover == recruiment.RecruitmentID"
                        :hideOnOutsideClick="true"
                        position="bottom"
                        width="150px"
                        >
                        <div class="item-btn" @click="handleEditRecruitment(recruiment.RecruitmentID)">
                            <Icon
                                :icon="'material-symbols:edit-outline'"
                                :color="'#7a8188'"
                                width="20"
                                height="20"
                                class="cursor-pointer"
                            />
                            <div class="">Sửa</div>
                        </div>
                        <div class="item-btn">
                            <Icon
                                :icon="'humbleicons:duplicate'"
                                :color="'#7a8188'"
                                width="20"
                                height="20"
                                class="cursor-pointer"
                            />
                            <div class="">Nhân bản</div>
                        </div>
                        <div class="item-btn" @click="handleDeleteRecruitment(recruiment.RecruitmentID)">
                            <Icon
                                :icon="'ic:baseline-delete'"
                                :color="'#FF0000'"
                                width="20"
                                height="20"
                                class="cursor-pointer"
                            />
                            <div class="" style="color: #FF0000;">Xóa</div>
                        </div>
                    </DxPopover>
                    <DxPopover 
                        :target="'#more-'+recruiment.RecruitmentID"
                        show-event="click"
                        @onHidden="isMoreInfor = 0"
                        :visible="isMoreInfor == recruiment.RecruitmentID"
                        :hideOnOutsideClick="true"
                        position="bottom"
                        width="372px"
                        >
                        <div class="p-[16px]">
                            <div class="py-[8px]">Người tạo: <span class="font-bold">{{ recruiment.CreatedBy }}</span></div>
                            <div class="py-[8px]">Ngày tạo: <span class="font-bold">{{ formatDate(recruiment.CreatedDate) }}</span></div>
                            <div class="py-[8px]">Thời hạn dự kiến: <span class="font-bold">{{ formatDate(recruiment.ExpectedTime) }}</span></div>
                        </div>
                    </DxPopover>
                </div>
            </div>
        </div>
    </div>
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
    DxDataGrid,
    DxPopup,
    DxSelectBox,
} from "devextreme-vue";
import { ref } from "vue";
import CustomStore from "devextreme/data/custom_store";
import CollectionApi from "../../apis/collection/collection-api";
import { CollectionModel, PagingRequest, RecruitmentModel } from "../../models";
import type { BaseNavigationType } from "../../types";
import type DxTextBox from "devextreme-vue/text-box";
import { ButtonStylingMode, ButtonType, ToastType } from "../../enums";
import { useToastStore } from "../../stores";
import { formatDate } from "../../utils";
import { DxPopover } from 'devextreme-vue/popover';
import { useRouter } from "vue-router";
import RecruitmentApi from "../../apis/recruitment/recruitment-api"

const toastStore = useToastStore();
const { t, getLocale, setLocale } = useI18n();
const router = useRouter()
const filterPaging = new PagingRequest();
const recruitmentApi = new RecruitmentApi()

const searchDefaultConfig: DxTextBox = {
    width: 260,
    placeholder: t("base.general.typeValue"),
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
        recruitments.value = []
        getRecruitmentNews()
    },
};


const buttonConfig = ref<DxButton>({
    type: ButtonType.default,
    height: 36,
    text: "Thêm bộ sưu tập",
    stylingMode: ButtonStylingMode.contained,
    icon: "plus",
    onClick(e) {
        router.push({name: 'setting-recruitment', params: {id: 0}})
    },
});

const recruitments = ref<RecruitmentModel[]>([])
const totalCount = ref(0)
const isShowPopover = ref(0)

const isMoreInfor = ref(0)

function handleOpenOptionBtn(recruimnetID: number){
    isShowPopover.value = recruimnetID
}

function handleOpenMoreInfor(recruimnetID: number){
    isMoreInfor.value = recruimnetID
}

async function getRecruitmentNews(){
    filterPaging.Collums = ["Title", "JobPositionName"]
    filterPaging.PageIndex = 1
    filterPaging.PageSize = 1000
    const res = await recruitmentApi.getFilterPaging(filterPaging);
        if (res) {
            recruitments.value.push(...res.data.Data.Data);
            totalCount.value = res.data.Data.TotalCount
        }
        return res.data.Data.Data || [];
}

getRecruitmentNews()

function handleScroll() {
    const container = document.querySelector(".list-recruitment")
    if(container){
          const scrollHeight =  container?.scrollHeight;
          const scrollTop = container?.scrollTop;
          const clientHeight =  container?.clientHeight;
          
          // Kiểm tra nếu đã cuộn đến cuối phần tử
          if (scrollTop + clientHeight >= scrollHeight && recruitments.value.length < totalCount.value) {
            filterPaging.PageIndex++;
            getRecruitmentNews()
          }
    }
}

function handleEditRecruitment(recruitmentID: number){
    router.push({name: 'setting-recruitment', params: {id: recruitmentID}})
}

async function handleDeleteRecruitment(recruitmentID: number){
    const res = await recruitmentApi.delete(recruitmentID)
    if(res.data.Success){
        toastStore.toggleToast(true, "Xóa thành công", ToastType.success);
        recruitments.value = recruitments.value.filter(recruitment => recruitment.RecruitmentID !== recruitmentID)
        totalCount.value--
    }else{
        toastStore.toggleToast(true, "Xóa thất bại", ToastType.error);
    }
}

function detailPage(recruitmentId: number){
    router.push({name: "recruitment-news-detail", params:{id: recruitmentId}})
}

</script>

<style lang="scss" scoped>
.container-candidate{
    width: 100%;
    height: calc(100vh - 48px);
    background-color: #EBECEF;
    padding-bottom: 16px;
    padding-left: 16px;
    padding-right: 16px;
}
#recruiment-news {
    .content-title {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 48px;
        align-items: center;
        line-height: 1.25;
    }
    .toolbar {
        height: 48px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .list-recruitment{
        width: 100%;
        margin-bottom: 12px;
        height: fit-content;
        border-radius: 5px;
        height: calc(100% - 80px);
        overflow-y: auto;
        .list-item{
            padding: 24px;
            width: 100%;
            margin-bottom: 16px;
            background-color: #ffffff;
            .recruitment-news-infor{
                position: relative;
                border-bottom: solid 1px #e0e6ec;
                display: flex;
                .recruitment-status{
                    margin-right: 12px;
                    height: 58px;
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
                .recruitment-infor{
                    flex: 1;
                    .recruitment-news-name{
                        max-width: 80%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        height: 23px;
                        line-height: 24px;
                        font-size: 20px!important;
                        font-weight: 500;
                        color: #1e2633;
                        cursor: pointer;
                    }
                    .recruitment-option{
    
                    }
                    .news-sub-content{
                        font-size: 14px;
                        max-width: 200px;
                        color: #1E2633;
                        line-height: 20px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .sub-content{
                        font-size: 14px;
                        color: #6a727d;
                        line-height: 20px;
                    }
                }
            }
            .recruitment-news-rounds{
                width: 100%;
                overflow-x: auto;
                .item-content{
                    padding: 2px 10px;
                    height: 58px;
                    margin-top: 14px;
                    margin-bottom: 16px;
                    min-width: 120px;
                    border-radius: 5px;
                    cursor: pointer;
                    flex: 1;
                }
                .round-name{
                    color: #6a727d;
                    text-align: center;
                    font-size: 14px;
                    font-weight: 500;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }
        }
    }
}
.item-btn{
    display: flex;
    align-items: center ;
    padding: 8px 8px;
    cursor: pointer;
    &:hover{
        background-color: rgba(225,238,255,.8);
    }
}
.text-title{
    font-size: 20px;
    font-weight: 700;
}
.error-message {
    color: red;
    position: absolute;
    bottom: -16px;
}
.field {
    position: relative;
}
.lable {
    margin-bottom: 8px;
}
</style>

<style>
.dx-popup-content{
    padding: 8px;
}
</style>