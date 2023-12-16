<template>
    <base-popup 
        v-if="isShowPopup"
        :config="popupConfig"
        :popupVisible="isShowPopup"
        :showBtnFooter="false"
        @close="handleClose"
        ref="popupRef">
        <template #body>
            <h2>Nhập khẩu</h2>
            <div class="add-cv" v-show="step == 1">
                <div class="wrap-file" v-if="!fileName">
                    <div class="text-[#2970f6]">Bấm vào đây để tải file</div>
                    <div class="text-[#6a727d] mt-[12px]">{{ "\"Chấp nhận file xlsx\"(Dung lượng < hơn 15 Mb)" }} </div>
                </div>
                <div class="wrap-file" v-else><span> {{ fileName }} </span></div>
                <input type="file" accept=".xlsx" class="file-input" @change="handleFileChange"/>
            </div>
            <div class="flex w-full p-[8px] h-[40px]" v-if="step == 2">
                <div class="" style="color: green;">Hợp lệ: {{ listCandidate.length }}</div>
                <div class="ml-[8px]" style="color: red;">Không hợp lệ: {{ listError.length }}</div>
            </div>
            <div class="w-full h-[400px]" v-show="step == 2">
                <base-table :config="tableConfig" :isShowCustomButton="false" ref="baseTableRef"></base-table>
            </div>
            <div class="mb-[12px]" v-if="step == 2"><b>Lưu ý: </b><span class="text-[#6a727d]">Những dòng không hợp lệ sẽ không được thêm mới</span></div>
            <div class="flex items-center justify-end w-full" v-show="step == 1">
                <base-button ref="cancelRef" :config="closeBtn" />
                <base-button ref="saveRef" :config="nextBtn" class="m-l-8" />
            </div>
            <div class="flex items-center justify-end w-full" v-show="step == 2">
                <base-button  :config="previousBtn" />
                <base-button  :config="saveBtn" class="m-l-8" />
            </div>
        </template>
    </base-popup>
</template>
<script lang="ts" setup>
import { DxButton, DxDataGrid, DxPopup } from "devextreme-vue";
import { ref } from "vue";
import {
    BaseTable,
    BaseButton,
    BasePopup,
} from "../../../components/base/index";
import ImportApi from "../../../apis/import/import"
import CandidateApi from "@/apis/candidate/candidate-api";
import { CandidateModel } from "../../../models/CandidateModel";
import type { Column } from "devextreme/ui/data_grid";
import { ButtonStylingMode, ButtonType, ToastType } from "../../../enums";
import { RecruitmentDetailModel } from "../../../models";
import { forEach } from "lodash";
import { useToastStore } from "../../../stores";

const props = withDefaults(defineProps<{
    isShowPopup: boolean,
    recruitmentDetail?: RecruitmentDetailModel
}>(), {
    isShowPopup: false,
});

const step = ref<number>(1)

const importApi = new ImportApi()
const candidateApi = new CandidateApi()

const toastStore = useToastStore();
const emit = defineEmits(["onClose", "onSave"]);
const baseTableRef = ref<InstanceType<typeof DxDataGrid>>(null)
const saveRef = ref<InstanceType<typeof DxButton>>(null)
const cancelRef = ref<InstanceType<typeof DxButton>>(null)
const fileName = ref<string>("")
const listError = ref<any[]>([])
const listCandidate = ref<CandidateModel[]>([])

const popupConfig = ref<DxPopup>({
    height: "auto",
    width: "700px",
    wrapperAttr: {
        class: "popup-import-candidate"
    }
});

const saveBtn = ref<DxButton>({
    width: "auto",
    height: 30,
    text: "Nhập khẩu",
    onClick: async () => {
        if(props.recruitmentDetail){
            listCandidate.value.forEach(candidate => {
                candidate.RecruitmentDetail = props.recruitmentDetail
            })
        }
        const res = await candidateApi.insertBulk(listCandidate.value)
        if(res.data.Success){
            emit("onClose")
            emit("onSave")
            toastStore.toggleToast(true, "Nhập khẩu thành công", ToastType.success);
        }else{
            toastStore.toggleToast(true, "Nhập khẩu thất bại", ToastType.error);
        }
    },
});

const nextBtn = ref<DxButton>({
    width: "auto",
    height: 30,
    disabled: true,
    text: "Tiếp tục",
    onClick: () => {
        if(step.value == 1){
            step.value = 2
        }
    },
});

const previousBtn = ref<DxButton>({
    width: "auto",
    height: 30,
    stylingMode: ButtonStylingMode.contained,
    type: ButtonType.normal,
    text: "Quay lại",
    onClick: () => {
        if(step.value == 2){
            step.value = 1
        }
    },
});

const closeBtn = ref<DxButton>({
    width: "auto",
    height: 30,
    stylingMode: ButtonStylingMode.contained,
    type: ButtonType.normal,
    text: "Hủy",
    onClick: () => {
        emit("onClose")
    },
});

function handleClose(){
    emit("onClose")
}

const tableConfig = ref<DxDataGrid>({
    dataSource: listError.value,
    width: '100%',
    height: 'calc(100% - 20px)',
    selection: {
        mode: "none"
    },
    columns: [
        {
            alignment: "left",
            caption: "Dòng lỗi",
            dataField: "Row",
            dataType: "string",
            width: 100,
        },
        {
            alignment: "left",
            caption: "Lý do",
            dataField: "ErrorReason",
            dataType: "string",
            width: 300,
        },
    ] as (string | Column<any, any>)[],
})

async function handleFileChange(e: any){
    var selectedFile = e.target.files[0];
    fileName.value = selectedFile.name
    const formData = new FormData();
    formData.append("file", selectedFile);
    var res = await importApi.validateCandidateImportData(formData)
    if(res.data.Success){
        listError.value = res.data.Data.listRowsError
        listCandidate.value = res.data.Data.listCandidate
        if(listError.value){
            baseTableRef.value.getInstance().option("dataSource", listError.value)
        }
        
        saveRef.value.getInstance().option("disabled", false)
    }
    if(e.target.files) e.target.value = null;
}
</script>
<style lang="scss">
    .add-cv{
        margin-bottom: 12px;
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
</style>