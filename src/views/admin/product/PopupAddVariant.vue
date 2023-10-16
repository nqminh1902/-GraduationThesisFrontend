<template>
    <base-popup
            v-if="visible"
            :config="popupConfig"
            :popupVisible="visible"
            :showBtnFooter="true"
            @close="handleClose"
            @save="handleSave"
        >
            <template #body>
                <div class="text-3xl">Chọn biến thể</div>
                <div class="add-category-body mb-4">
                    <div class="d-flex items-center">
                        <div class="field w-1/2 pr-4">
                            <div class="lable">
                                Màu sắc sản phẩm<span style="color: red"> *</span>
                            </div>
                            <base-tag-box :config="colorConfig" v-model:model-value="colorValues" ref="productColorRef" @onValueChange="handleColorChange"/>
                        </div>
                        <div class="field w-1/2 pl-4">
                            <div class="lable">
                                Kích cỡ sản phẩm<span style="color: red"> *</span>
                            </div>
                            <base-tag-box :config="sizeConfig" v-model:model-value="sizeValues" ref="productSizeRef" @onValueChange="handleSizeChange"/>
                        </div>
                    </div>
                </div>
            </template>
        </base-popup>
</template>
<script setup lang="ts">
import { ProductVariantModel } from '@/models/ProductVariants';
import type {
    DxPopup,
    DxSelectBox,
    DxTagBox,
} from "devextreme-vue";
import {
    BasePopup,
    BaseSelectBox,
    BaseTagBox
} from "../../../components/base";
import { computed, onMounted, ref, watch } from 'vue';
import CustomStore from 'devextreme/data/custom_store';
import ProductColorApi from '@/apis/product-color/product-color-api';
import ProductSizeApi from '@/apis/product-size/product-size-api'
import { ProductColorModel, ProductSizeModel } from '../../../models';

const props = defineProps<{
    visible:boolean,
    productVariant: ProductVariantModel[]
}>()

const productColorApi = new ProductColorApi()
const productSizeApi = new ProductSizeApi()
let selectedColor: ProductColorModel[] = []
let selectedSize: ProductSizeModel[] = []
const listVariant: ProductVariantModel[] = props.productVariant
const productColorRef = ref()
const productSizeRef = ref()
let dataSourceColor: ProductColorModel[] = []
let dataSourceSize: ProductSizeModel[] = []

const colorValues = [...new Set(props.productVariant.map(variant => variant.ProductColorID))]
const sizeValues = [...new Set(props.productVariant.map(variant => variant.ProductSizeID))]

const popupConfig = ref<DxPopup>({
    height: "auto",
    width: 700,
});
const emit = defineEmits(["onSave", "onClose"])

const colorConfig = ref<DxTagBox>({
    value: colorValues,
    width: '100%',
    placeholder: 'Chọn bộ màu sắc',
    valueExpr: 'ProductColorID',
    displayExpr: 'ProductColorName',
    noDataText: 'Không có dữ liệu',
    dataSource: dataSourceColor,
    selectAllMode: 'page',
    showSelectionControls: true,
});

const sizeConfig = ref<DxTagBox>({
    width: '100%',
    value: sizeValues,
    placeholder: 'Chọn bộ sưu tập',
    valueExpr: 'ProductSizeID',
    displayExpr: 'ProductSizeName',
    noDataText: 'Không có dữ liệu',
    dataSource: dataSourceSize,
    selectAllMode: 'page',
    showSelectionControls: true,
});
getData()
async function getData(){
    const resSize = await productSizeApi.getAll();
    if(resSize){
        dataSourceSize = resSize.data.Data
        productSizeRef.value.getInstance()?.option('dataSource', dataSourceSize)
    }
    const resColor = await productColorApi.getAll();
    if(resColor){
        dataSourceColor = resColor.data.Data
        productColorRef.value.getInstance()?.option('dataSource', dataSourceColor)
    }
}

    function handleClose(){
        emit("onClose")
    }
function handleSave(){
    let id = 0
    selectedColor.forEach((color) => {
        selectedSize.forEach((size) => {
            id++
            const variant = new ProductVariantModel()
            variant.ProductVariantID = id
            variant.ProductColorID = color.ProductColorID
            variant.ProductColorName = color.ProductColorName
            variant.ProductSizeID = size.ProductSizeID
            variant.ProductSizeName = size.ProductSizeName
            variant.State = 1
            listVariant.push(variant)
        })
    })
    emit("onSave", listVariant)
}

function handleColorChange(values: ProductColorModel[]){
    selectedColor = values
}

function handleSizeChange(values: ProductSizeModel[]){
    selectedSize = values
}

</script>
<style lang="scss">
.dx-texteditor.dx-state-hover {
    border-color: var(--app-color-primary)
}
.dx-texteditor.dx-state-active.dx-editor-filled, .dx-texteditor.dx-state-active.dx-editor-outlined, .dx-texteditor.dx-state-active.dx-editor-underlined, .dx-texteditor.dx-state-focused.dx-editor-filled, .dx-texteditor.dx-state-focused.dx-editor-outlined, .dx-texteditor.dx-state-focused.dx-editor-underlined{
    border-color: var(--app-color-primary)
}
.dx-list:not(.dx-list-select-decorator-enabled) .dx-list-item.dx-state-hover{
    background-color: var(--app-color-primary);
    color: #ffffff;
}
.dx-list.dx-list-select-decorator-enabled .dx-list-item.dx-state-focused .dx-checkbox-icon, .dx-list.dx-list-select-decorator-enabled .dx-list-item.dx-state-focused .dx-radiobutton-icon::before, .dx-list.dx-list-select-decorator-enabled .dx-list-select-all.dx-state-focused .dx-checkbox-icon, .dx-list.dx-list-select-decorator-enabled .dx-list-select-all.dx-state-focused .dx-radiobutton-icon::before{
    border: 1px solid var(--app-color-primary) !important;
}
.dx-checkbox-checked .dx-checkbox-icon{
    color: var(--app-color-primary) !important;
}
.dx-checkbox-indeterminate .dx-checkbox-icon{
    color: var(--app-color-primary) !important;
}
.dx-list.dx-list-select-decorator-enabled .dx-list-item.dx-state-hover .dx-checkbox-icon, .dx-list.dx-list-select-decorator-enabled .dx-list-item.dx-state-hover .dx-radiobutton-icon::before, .dx-list.dx-list-select-decorator-enabled .dx-list-select-all.dx-state-hover .dx-checkbox-icon, .dx-list.dx-list-select-decorator-enabled .dx-list-select-all.dx-state-hover .dx-radiobutton-icon::before{
    color: var(--app-color-primary) !important;
}
</style>

<style scoped>
.field {
    position: relative;
}
.lable {
    margin-bottom: 8px;
}
</style>