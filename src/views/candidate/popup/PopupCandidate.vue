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
                <h2>{{ !isEdit ? "Thêm ứng viên" : "Sửa ứng viên" }}</h2>
                <div class="flex h-full">
                    <div class="flex-1 py-[16px]" style="height: calc(100% - 27px);">
                        <div class="add-cv">
                            <div class="wrap-file" v-if="!candidate.AttachmentName">
                                <div class="text-[#2970f6]">Kéo thả hoặc bấm vào đây để tải CV lên</div>
                                <div class="text-[#6a727d] mt-[12px]">{{ "\"Chấp nhận file .pdf và .doc\"(Dung lượng < hơn 15 Mb)" }} </div>
                            </div>
                            <div class="wrap-file" v-else><span> {{ candidate.AttachmentName }} </span></div>
                            <input type="file" accept=".docx, .pdf, .doc" class="file-input" @change="setCVAttachment"/>
                        </div>
                        <div class="w-full d-flex items-center my-1" v-if="recruitmentDetails.length" id="list-recruitment">
                            <div class="cursor-pointer">Danh sách tin tuyển dụng của ứng viên</div>
                            <Icon
                                :icon="'icon-park-outline:down'"
                                :color="'#FF0000'"
                                width="16"
                                height="16"
                                class="cursor-pointer"
                                
                            />
                        </div>
                        <dx-scroll-view :height="'calc(100% - 116px)'">
                            <div class="flex w-full mt-[16px]">
                                <div class="candidate-avatar">
                                    <div class="avatar">
                                        <div class="show-image flex items-center justify-center cursor-pointer overflow-hidden">
                                            <span v-if="!candidate.Avatar">Ảnh</span>
                                            <img :src="candidate.Avatar" v-else/>
                                        </div>
                                        <input accept="image/*" type="file" class="opacity-0 file-input" @change="setCandidateAvatar"/>
                                    </div>
                                </div>
                                <div class="candidate-infor flex-1">
                                    <div class="field">
                                        <div class="lable">Tên ứng viên <span style="color: red;">*</span></div>
                                        <base-text-box
                                            :config="candidateNameConfig" v-model="candidate.CandidateName"
                                        />
                                    </div>
                                    <div class="flex">
                                        <div class="field flex-1">
                                            <div class="lable">Ngày sinh <span style="color: red;">*</span></div>
                                            <base-date-box :config="dateOfBirdthConfig" v-model="candidate.Birthday"/>
                                        </div>
                                        <div class="w-[12px]"></div>
                                        <div class="field flex-1">
                                            <div class="lable">Giới tính <span style="color: red;">*</span></div>
                                            <base-radio-group :config="GenderConfig" v-model="candidate.Gender"/>
                                        </div>
                                    </div>
                                    <div class="flex">
                                        <div class="field flex-1">
                                            <div class="lable">Số điện thoại <span style="color: red;">*</span></div>
                                            <base-number-box :config="phoneConfig" v-model="candidate.Mobile"/>
                                        </div>
                                        <div class="w-[12px]"></div>
                                        <div class="field flex-1">
                                            <div class="lable">Email <span style="color: red;">*</span></div>
                                            <base-text-box
                                                :config="emailConfig" v-model="candidate.Email"
                                            />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="lable">Địa chỉ <span style="color: red;">*</span></div>
                                        <base-text-box
                                            :config="addressConfig" v-model="candidate.Address"
                                        />
                                    </div>
                                    <div class="flex">
                                        <div class="field flex-1">
                                            <div class="lable">Trình độ đào tạo <span style="color: red;">*</span></div>
                                            <base-select-box :config="degreeConfig" v-model="candidate.EducationDegreeID"/>
                                        </div>
                                        <div class="w-[12px]"></div>
                                        <div class="field flex-1">
                                            <div class="lable">Nơi đào tạo <span style="color: red;">*</span></div>
                                            <base-select-box :config="trainingPlaceConfig" v-model="candidate.EducationPlaceID"/>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="lable">Chuyên ngành <span style="color: red;">*</span></div>
                                        <base-select-box
                                            :config="specializedConfig" v-model="candidate.EducationMajorID"
                                        />
                                    </div>
                                    <div class="flex">
                                        <div class="field flex-1">
                                            <div class="lable">Ngày ứng tuyển <span style="color: red;">*</span></div>
                                            <base-date-box :config="applyDateConfig" v-model="candidate.ApplyDate"/>
                                        </div>
                                        <div class="w-[12px]"></div>
                                        <div class="field flex-1">
                                            <div class="lable">Nguồn ứng viên <span style="color: red;">*</span></div>
                                            <base-select-box :config="candidateSourceConfig" v-model="candidate.ChannelID"/>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="lable">Nơi làm việc gần đây </div>
                                            <base-text-box
                                                :config="workAddressConfig" v-model="candidate.WorkPlaceRecent"
                                            />
                                        </div>
                                    <hr>
                                    <div class="heading-title">
                                        Kinh nghiệm làm việc
                                    </div>
                                    <div class="flex cursor-pointer py-[12px]" @click="handleAddWorkExperient">
                                        <Icon
                                            :icon="'ic:round-plus'"
                                            :color="'#2680eb'"
                                            width="16"
                                            height="16"
                                        />
                                        <div class="text-[#2680eb] text-[13px]">Thêm nơi kinh nghiệm làm việc</div>
                                    </div>
    
                                    <div class="work-experient" v-for="(work,index) in workExperients" :key="work.WorkExperientID">
                                        <ng-template v-if="work.State != StateEnum.Delete">
                                            <div class="field">
                                                <div class="lable">Tên công ty </div>
                                                <div class="flex items-center">
                                                    <base-text-box class="flex-1" :config="companyNameConfig" v-model="work.CompanyName"/>
                                                    <Icon
                                                        :icon="'typcn:delete-outline'"
                                                        :color="'red'"
                                                        width="16"
                                                        height="16"
                                                        class="mx-[12px] cursor-pointer"
                                                        @click="handleDeleteWorkExperient(work, index)"
                                                    />
                                                </div>
                                            </div>
                                            <div class="flex">
                                                <div class="field flex-1">
                                                    <div class="lable">Thời gian </div>
                                                    <base-date-box :config="workExperientFromConfig" v-model="work.FromDate"/>
                                                </div>
                                                <div class="w-[12px] pt-[30px] text-center">-</div>
                                                <div class="field flex-1">
                                                    <div class="lable"></div>
                                                    <base-date-box :config="workExperientToConfig" v-model="work.ToDate"/>
                                            </div>
                                            </div>
                                            <div class="field">
                                                <div class="lable">Vị trí công việc </div>
                                                    <base-text-box
                                                        :config="jobPositionConfig" v-model="work.JobPosition"
                                                    />
                                            </div>
                                            <div class="field">
                                                <div class="lable">Mô tả công việc </div>
                                                    <base-text-area
                                                        :config="decriptionPositionConfig" v-model="work.JobDescription"
                                                    />
                                            </div>
                                            <hr class="pt-[12px]">
                                        </ng-template>
                                    </div>
                                </div>
                            </div>
                        </dx-scroll-view>
                    </div>  
                    <div class="mx-[12px]" v-if="candidate.AttachmentCV && isEdit"></div>
                    <div class="flex-1 pdfContainer"  v-if="candidate.AttachmentCV && isEdit" >
                        <iframe :src="candidate.AttachmentCV" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>
                    </div>
                </div>
            </template>
        </base-popup>

        <DxPopover 
        target="#list-recruitment"
        show-event="click"
        :visible="false"
        :hideOnOutsideClick="true"
        position="bottom"
        width="372px"
        >
        <div class="">
            <div class="" v-for="item in recruitmentDetails" :key="item.RecruitmentDetailID">
                <div class="">{{ item.Title }} <span>Vòng tuyển dụng: {{ item.RecruitmentRoundName }}</span></div>
                <div class="">Trạng thái: {{ getStatus(item) }}</div>
            </div>
        </div>
        </DxPopover>
</template>
<script lang="ts" setup>
import { DxDateBox, DxNumberBox, DxPopup, DxRadioGroup, DxScrollView, DxSelectBox, DxTextArea, DxTextBox } from "devextreme-vue";
import { onMounted, onUpdated, ref, watch } from "vue";
import {
    BaseTable,
    BasePaging,
    BaseNavigation,
    BaseTextBox,
    BaseStatus,
    BaseButton,
    BasePopup,
    BaseSelectBox,
    BaseDateBox,
    BaseRadioGroup,
    BaseNumberBox,
    BaseTextArea
} from "../../../components/base/index";
import { degrees, trainingPlaces, specializeds, candidateFrom } from "../../../mocks";
import { Icon } from "@iconify/vue";
import { CandidateModel, WorkExperientModel } from "../../../models/CandidateModel";
import { DxPopover } from 'devextreme-vue/popover';
import CandidateApi from "../../../apis/candidate/candidate-api"
import RecruitmentDetailApi from "@/apis/recruitment-detail-api/recruitment-detail-api";
import { useToastStore } from "../../../stores";
import { StateEnum, ToastType } from "../../../enums";
import axios from "axios";
import _ from 'lodash';    
import { isEnumDeclaration } from "typescript";
import { RecruitmentDetailModel } from "../../../models";

const props = withDefaults(defineProps<{
    isShowPopup: boolean
    isEdit: boolean
    candidateID? : number
    recruitmentDetail?: RecruitmentDetailModel
}>(), {
    isShowPopup: false,
    isEdit: false
});

const emit = defineEmits(["onClose", "onSave"]);

const recruitmentDetails = ref<RecruitmentDetailModel[]>([])

const candidateApi = new CandidateApi()

const recruitmentDetailApi = new RecruitmentDetailApi()

const toastStore = useToastStore();

const popupRef = ref<InstanceType<typeof DxPopup>>();

const popupConfig = ref<DxPopup>({
    height: "calc(100vh - 32px)",
    wrapperAttr: {
        class: "popup-candidate"
    }
});

const widthPopup = ref(500)

if(props.isEdit && props.candidateID){
    getCandidateByID()
    getRecruitmentDetailID()
}

const candidateNameConfig = ref<DxTextBox>({
    placeholder: "Tên ứng viên",
})

const emailConfig = ref<DxTextBox>({
    placeholder: "Nhập email",
})

const jobPositionConfig = ref<DxTextBox>({
    placeholder: "Nhập vị trí công việc",
})

const companyNameConfig = ref<DxTextBox>({
    placeholder: "Tên công ty",
})

const workAddressConfig = ref<DxTextBox>({
    placeholder: "Nơi làm việc gần đây",
})

const decriptionPositionConfig = ref<DxTextArea>({
    placeholder: "Nhập mô tả công việc",
    height: 100
})

const addressConfig = ref<DxTextBox>({
    placeholder: "Nhập địa chỉ",
})

const dateOfBirdthConfig = ref<DxDateBox>({
    placeholder: "dd/MM/yyyy"
})

const applyDateConfig = ref<DxDateBox>({
    placeholder: "dd/MM/yyyy"
})

const workExperientFromConfig = ref<DxDateBox>({
    placeholder: "dd/MM/yyyy"
})

const workExperientToConfig = ref<DxDateBox>({
    placeholder: "dd/MM/yyyy"
})

const phoneConfig = ref<DxNumberBox>({
    placeholder: "Nhập số điện thoại",
    showSpinButtons: false,
    format:""
})

const trainingPlaceConfig = ref<DxSelectBox>({
    width: '100%',
    placeholder: 'Chọn nơi đào tạo',
    noDataText: 'Không có dữ liệu',
    displayExpr: "text",
    valueExpr: "id",
    dataSource: trainingPlaces,
    searchEnabled: true,
    onItemClick(e) {
        candidate.value.EducationPlaceName = e.itemData.text 
    },
})

const degreeConfig = ref<DxSelectBox>({
    width: '100%',
    placeholder: 'Chọn trình độ ứng viên',
    noDataText: 'Không có dữ liệu',
    displayExpr: "text",
    valueExpr: "id",
    dataSource: degrees,
    searchEnabled: true,
    onItemClick(e) {
        candidate.value.EducationDegreeName = e.itemData.text 
    },
})

const specializedConfig = ref<DxSelectBox>({
    width: '100%',
    placeholder: 'Chuyên ngành',
    noDataText: 'Không có dữ liệu',
    displayExpr: "text",
    valueExpr: "id",
    dataSource: specializeds,
    searchEnabled: true,
    onItemClick(e) {
        candidate.value.EducationMajorName = e.itemData.text
    },
})

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

const candidateSourceConfig = ref<DxSelectBox>({
    width: '100%',
    placeholder: 'Chọn nguồn ứng viên',
    noDataText: 'Không có dữ liệu',
    displayExpr: "text",
    valueExpr: "id",
    dataSource: candidateFrom,
    searchEnabled: true,
    onItemClick(e) {
        candidate.value.ChannelName =  e.itemData.text 
    },
})


const candidate = ref<CandidateModel>(new CandidateModel())

const workExperients = ref<WorkExperientModel[]>([
    new WorkExperientModel()
]) 

function handleAddWorkExperient(){
    workExperients.value.push(new WorkExperientModel())
}

function handleDeleteWorkExperient(items: WorkExperientModel, index: number){
    if(props.isEdit){
        items.State = StateEnum.Delete
    }else{
        workExperients.value.splice(index, 1)
    }
}

async function getCandidateByID(){
    const res = await candidateApi.getByID(props.candidateID + "")
    if(res.data.Success){
        candidate.value = res.data.Data
        workExperients.value = _.cloneDeep(candidate.value.WorkExperients)
        if(candidate.value.AttachmentCV){
            widthPopup.value = 1000
        }
    }
}

async function getRecruitmentDetailID(){
    const res = await recruitmentDetailApi.getByCandidateID(props.candidateID + "")
    if(res.data.Success){
        recruitmentDetails.value = res.data.Data
        console.log(recruitmentDetails.value);
        
    }
}


function beforeSave(){
    workExperients.value.forEach((item) => {
        const isExist = candidate.value.WorkExperients.find( work => work.WorkExperientID == item.WorkExperientID)
        if(isExist && item?.State != StateEnum.Delete && item?.State != StateEnum.Insert){
            if(JSON.stringify(isExist) != JSON.stringify(item)){
                item.State = StateEnum.Update
            }else{
                item.State = StateEnum.None
            }
        }
    })
}

async function handleSave(){
    candidate.value.Mobile = candidate.value.Mobile?.toString()
    if(!props.isEdit){
        candidate.value.WorkExperients = workExperients.value
        if(props.recruitmentDetail){
            candidate.value.RecruitmentDetail = props.recruitmentDetail
        }
        const res = await candidateApi.insert(candidate.value)
        if(res.data.Success){
            emit("onClose")
            emit("onSave")
            toastStore.toggleToast(true, "Thêm thành công", ToastType.success);
        }else{
            toastStore.toggleToast(true, "Thêm thất bại", ToastType.error);
        }
    }else{
        beforeSave()
        candidate.value.WorkExperients = workExperients.value
        const res = await candidateApi.update(candidate.value.CandidateID,candidate.value)
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
    .post("https://localhost:7236/api/Upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (response?.data) {
        const resposeImage = response.data[0];
        candidate.value.Avatar = resposeImage.url
      }
    })
    .catch((error) => {
      console.error(error);
    });
}


function setCVAttachment(e: any){
    var selectedFile = e.target.files[0];
    candidate.value.AttachmentName = selectedFile.name
    const formData = new FormData();
    formData.append("files", selectedFile);
    axios
    .post("https://localhost:7236/api/Upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (response?.data) {
        const resposeImage = response.data[0];
        candidate.value.AttachmentCV = resposeImage.url
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function handleClose(){
    emit("onClose")
}

function getStatus(item: RecruitmentDetailModel){
    if(item.Status == 1 && item.IsEmployee == 1){
        return "Nhân viên"
    }else if(item.Status == 1){
        return "Đang tuyển dụng"
    }else{
        return "Bị loại"
    }
}
</script>
<style lang="scss">
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
        .lable{
            font-size: 14px;
            color: #1e2633;
            height: 25px!important;
            line-height: 25px!important;
            font-family: Roboto;
            font-weight: 500;
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