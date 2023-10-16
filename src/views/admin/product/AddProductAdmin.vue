<template>
    <div id="category-admin" class="w-full h-full px-6 pt-6 pb-3">
        <div class="bg-white w-full h-full rounded-lg">
            <div class="content-title">
                <div class="flex items-center">
                    <Icon
                        :icon="'majesticons:arrow-left'"
                        width="24"
                        height="24"
                        class="mr-6 cursor-pointer"
                        @click="backPage"
                    />
                    <div class="text-3xl">{{isEdit ? "Sửa sản phẩm": "Thêm sản phẩm"}}</div>
                </div>
                <base-button :config="buttonAddConfig" />
            </div>
            <div class="product-form">
                <dx-scroll-view :height="'100%'">
                    <div class="flex ">
                        <div class="flex-1 pr-4">
                            <div class="field">
                                <div class="lable">
                                    Mã sản phẩm<span style="color: red"> *</span>
                                </div>
                                <base-text-box
                                    :config="codeConfig"
                                    class="mb-6"
                                    v-model="product.ProductCode"
                                />
                            </div>
                            <div class="field">
                                <div class="lable">
                                    Tên sản phẩm<span style="color: red"> *</span>
                                </div>
                                <base-text-box
                                    :config="nameConfig"
                                    class="mb-6"
                                    v-model="product.ProductName"
                                />
                            </div>
                            <div class="field">
                                <div class="lable">
                                    Giá sản phẩm<span style="color: red"> *</span>
                                </div>
                                <base-number-box 
                                    :config="priceConfig"
                                    class="mb-6" 
                                    v-model="product.ProductPrice"
                                />
                            </div>
                            <div class="field">
                                <div class="lable">
                                    Chất liệu sản phẩm<span style="color: red"> *</span>
                                </div>
                                <base-text-box
                                    :config="materialConfig"
                                    class="mb-6"
                                    v-model="product.Material"
                                />
                            </div>
                            <div class="field">
                                <div class="lable">
                                    Bộ sưu tập sản phẩm<span style="color: red"> *</span>
                                </div>
                                <base-select-box :config="collectionConfig" v-model:model-value="product.CollectionID"/>
                            </div>
                            <div class="field">
                                <div class="lable">
                                    Danh mục sản phẩm<span style="color: red"> *</span>
                                </div>
                                <base-select-box :config="categoryConfig" v-model:model-value="product.CategoryID"/>
                            </div>
                        </div>
                        <div class="flex-1 pl-4">
                            <div class="field">
                                <div class="lable">
                                    Hình ảnh sản phẩm<span style="color: red"> *</span>
                                </div>
                                <base-upload-image :list-image="productImages" :allow-multiple="true" @on-upload="handleUploadFile" @on-delete="handleDeleteFile" @image-delete="getImageDelete"/>
                            </div>
                            <div class="field">
                                <div class="lable">
                                    Mô tả nhanh<span style="color: red"> *</span>
                                </div>
                                <base-text-area :config="textAreaConfig" v-model="product.QuickDescription"/>
                            </div>
                            <div class="field">
                                <div class="lable">
                                    Trạng thái<span style="color: red"> *</span>
                                </div>
                                <base-select-box :config="statusConfig" v-model:model-value="product.Status"/>
                            </div>
                            <div class="field">
                                <div class="lable">
                                    Mô tả<span style="color: red"> *</span>
                                </div>
                                <DxHtmlEditor v-bind="htmlEditerConfig" v-model:value="product.Description">
                                    <DxToolbar :multiline="true">
                                        <DxItem name="undo" />
                                        <DxItem name="redo" />
                                        <DxItem name="separator" />
                                        <DxItem
                                            name="size"
                                            :accepted-values="sizeValues"
                                        />
                                        <DxItem
                                            name="font"
                                            :accepted-values="fontValues"
                                        />
                                        <DxItem name="separator" />
                                        <DxItem name="bold" />
                                        <DxItem name="italic" />
                                        <DxItem name="strike" />
                                        <DxItem name="underline" />
                                        <DxItem name="separator" />
                                        <DxItem name="alignLeft" />
                                        <DxItem name="alignCenter" />
                                        <DxItem name="alignRight" />
                                        <DxItem name="alignJustify" />
                                        <DxItem name="separator" />
                                        <DxItem name="orderedList" />
                                        <DxItem name="bulletList" />
                                        <DxItem name="separator" />
                                        <DxItem
                                            name="header"
                                            :accepted-values="headerValues"
                                        />
                                        <DxItem name="separator" />
                                        <DxItem name="color" />
                                        <DxItem name="background" />
                                        <DxItem name="separator" />
                                        <DxItem name="link" />
                                        <DxItem name="image" />
                                        <DxItem name="separator" />
                                        <DxItem name="clear" />
                                    </DxToolbar>
                                    <DxTableContextMenu :enabled="true" />
                                    <DxMediaResizing :enabled="true" />
                                </DxHtmlEditor>
                            </div>
                        </div>
                    </div>
                    <div class="flex py-4 justify-between">
                        <div class="text-3xl">Biến thể sản phẩm</div>
                        <base-button :config="buttonConfig" />
                    </div>
                    <div class="flex py-4 table-grid">
                        <base-table ref="tableRef" :config="tableConfig" :is-show-custom-button="false">
                            <template #status="data">
                                <base-number-box :config="quantityConfig" v-model="data.data.data.Quantity"/>
                            </template>
                        </base-table>
                    </div>
                </dx-scroll-view>
            </div>    
        </div>
        <popup-add-variant v-if="isShowPopup" :visible="isShowPopup" :product-variant="product.ProductVariants" @on-close="isShowPopup = false" @on-save="handleSaveVariant"/>
    </div>
</template>
<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { DxButton, DxDataGrid, DxNumberBox, DxSelectBox, DxTextArea, DxTextBox } from "devextreme-vue";
import PopupAddVariant from "./PopupAddVariant.vue" 
import { DxScrollView } from "devextreme-vue/scroll-view";
import CategoryApi from "../../../apis/category/category-api";
import CollectionApi from "@/apis/collection/collection-api";
import ProductApi from "@/apis/product/product-api";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
    BaseNumberBox,
    BaseTable,
    BaseTextBox,
    BaseStatus,
    BaseButton,
    BasePopup,
    BaseSelectBox,
    BaseUploadImage,
    BaseTextArea
} from "../../../components/base";
import CustomStore from "devextreme/data/custom_store";
import { ProductImageModel, ProductModel } from "../../../models";
import { useI18n } from "vue3-i18n";
import {
    DxToolbar,
    DxItem,
    DxHtmlEditor,
    DxTableContextMenu,
    DxMediaResizing
} from 'devextreme-vue/html-editor';
import { ButtonStylingMode, ButtonType, ToastType } from "@/enums";
import type { ProductVariantModel } from "@/models/ProductVariants";
import { useToastStore } from "@/stores";

const toastStore = useToastStore();
const route = useRoute()
const router = useRouter()
const categoryApi = new CategoryApi();
const collectionApi = new CollectionApi();
const producApi = new ProductApi()
const codeConfig = ref<DxTextBox>({})
const nameConfig = ref<DxTextBox>({})
const priceConfig = ref<DxNumberBox>({
    min: 0
})
const quantityConfig = ref<DxNumberBox>({
    height: 30,
    min: 0,
    showSpinButtons: false
})
const product = ref(new ProductModel())
const materialConfig = ref<DxTextBox>({})
const isShowPopup = ref(false)
const isEdit = ref(false)
const { t } = useI18n();
const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt']
const fontValues = ['Arial', 'Georgia', 'Tahoma', 'Times New Roman', 'Verdana']
const headerValues = [false, 1, 2, 3, 4, 5]
let listProductVariantClone: ProductVariantModel[] = []
let listProductImageClone: ProductImageModel[] = []

const buttonConfig = ref<DxButton>({
    type: ButtonType.default,
    height: 36,
    text: "Thêm biến thể",
    stylingMode: ButtonStylingMode.contained,
    icon: "plus",
    onClick(e) {
        isShowPopup.value = true
        console.log(product.value.ProductVariants);
        
    },
});

const buttonAddConfig = ref<DxButton>({
    type: ButtonType.default,
    height: 36,
    text: "Lưu",
    stylingMode: ButtonStylingMode.contained,
    icon: "plus",
    onClick(e) {
        handleSaveProduct()
    },
});

if(route && parseInt(route?.params.id.toString()) > 0){
    getProductById(route.params.id)
    isEdit.value = true
}

const tableConfig = ref<DxDataGrid>({
    columns: [
        {
            alignment: "left",
            caption: "Kích cỡ",
            dataField: "ProductSizeName",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Màu sắc",
            dataField: "ProductColorName",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Số lượng",
            dataField: "Quantity",
            dataType: "number",
            cellTemplate: "status-template"
        },
    ],
    keyExpr: "ProductVariantID",
    onSelectionChanged(e) {
        console.log(e);
    },
})

const tableRef = ref<InstanceType<typeof DxDataGrid>>();

const htmlEditerConfig = ref<DxHtmlEditor>({
    allowSoftLineBreak: true,
    height: 500,
    activeStateEnabled: true,
    hoverStateEnabled: true,
    onValueChanged(e) {
        if(e){
            product.value.Description = e.value
        }
    },
})

const dataSourceCategory = new CustomStore({
    key: "CategoryID",
    async load(loadOptions) {
        const res = await categoryApi.getAll();
        return res.data.Data || [];
    },
    async byKey(key) {
        const res = await categoryApi.getAll();
        return res.data.Data || [];
    },
    loadMode: "raw",
})


const categoryConfig = ref<DxSelectBox>({
    width: '100%',
    placeholder: 'Chọn danh mục',
    valueExpr: 'CategoryID',
    displayExpr: 'CategoryName',
    noDataText: 'Không có dữ liệu',
    dataSource: dataSourceCategory,
    onValueChanged(e: any) {
        if(e){
            product.value.CategoryID = e.value
        }
    },
});

const dataSourceCollection = new CustomStore({
    key: "CollectionID",
    async load(loadOptions) {
        const res = await collectionApi.getAll();
        return res.data.Data || [];
    },
    async byKey(key) {
        const res = await collectionApi.getAll();
        return res.data.Data || [];
    },
    loadMode: "raw",
})

const collectionConfig = ref<DxSelectBox>({
    width: '100%',
    placeholder: 'Chọn bộ sưu tập',
    valueExpr: 'CollectionID',
    displayExpr: 'CollectionName',
    noDataText: 'Không có dữ liệu',
    dataSource: dataSourceCollection,
    onValueChanged(e: any) {
        if(e){
            product.value.CollectionID = e.value
        }
    },
});

const statusConfig = ref<DxSelectBox>({
    width: '100%',
    placeholder: 'Chọn trạng thái',
    noDataText: 'Không có dữ liệu',
    displayExpr: "name",
    valueExpr: "id",
    dataSource: [
        {
            id: 0,
            name: "Không kích hoạt",
        },
        {
            id: 1,
            name: "Kích hoạt",
        },
        {
            id: 2,
            name: "Hết hàng",
        },
    ],
    searchEnabled: false,
    onValueChanged: (e) => {
        if(e){
            product.value.Status = e.value
        }
    },
});

const textAreaConfig: DxTextArea = {
    height: 96,
    maxHeight: 96,
    placeholder: t('base.textArea.message'),
};

function backPage(){
    router.go(-1)
}

const productImages = ref<ProductImageModel[]>([])

function handleUploadFile(image: ProductImageModel){
    productImages.value.push(image)
}

function handleDeleteFile(image: ProductImageModel[]){
    productImages.value = image
}

function getImageDelete(image: ProductImageModel){
    product.value.ProductImages.forEach((productImage) => {
        if(productImage.ProductImageID == image.ProductImageID){
            productImage.State = 3
        }
    })
}

function handleSaveVariant(variants: ProductVariantModel[]){
    isShowPopup.value = false
    product.value.ProductVariants = variants
    tableRef.value.getInstance().option("dataSource", product.value.ProductVariants)
}

async function getProductById(id: any){
    const res = await producApi.getByID(id)
    if(res){
        product.value = res.data.Data
        productImages.value = res.data.Data.ProductImages
        tableRef.value.getInstance().option("dataSource", product.value.ProductVariants)
        listProductImageClone = productImages.value
        listProductVariantClone = product.value.ProductVariants
        
    }else{
        toastStore.toggleToast(true, "Lấy thoogn tin sản phẩm thất bại", ToastType.error);
    } 

}

function handleValidate(){
    return true
}

function handleDataBeforeSave(){
    if(isEdit){
        // listProductVariantClone.forEach(variantClone => {
        //     let isDelete = true
        //     product.value.ProductVariants.forEach(variant => {
        //         if(variant.ProductSizeID == variantClone.ProductSizeID && variant.ProductColorID == variantClone.ProductColorID && !variant.State){
        //             if(variant.Quantity != variantClone.Quantity){
        //                 variant.State = 2
        //             }
        //             else{
        //                 isDelete = false
        //             }
        //         }  
        //     });
        //     if(isDelete){
        //         product.value.ProductVariants.push({...variantClone, State: 3})
        //     }
        // });
        // product.value.ProductVariants.forEach(variant => {
        //     let isInsert = true
        //     for (const variantClone of listProductVariantClone) {
        //         if(variant.ProductSizeID == variantClone.ProductSizeID && variant.ProductColorID == variantClone.ProductColorID && !variant.State){
        //             isInsert = false
        //             return
        //         }
        //     }
        //     if(isInsert){
        //         variant.State = 1
        //     }
        // });
        if(productImages.value?.length > 0){
            productImages.value.forEach(image => {
                if(image.State == 1){
                    product.value.ProductImages.push(image)
                }
            })
        }
    }else{
        if(productImages.value?.length > 0){
            product.value.ProductImages = productImages.value
        }
    }
    product.value.TotalQuantity = product.value.ProductVariants.reduce((total, variant) => {
        return total += variant.Quantity
    },0)
}

async function handleSaveProduct(){
    handleDataBeforeSave()
    if(handleValidate()){
        if(isEdit.value){
            const res = await producApi.update(product.value.ProductID,product.value)
            if(res && res.data.Success){
                toastStore.toggleToast(true, "Cập nhật thành công", ToastType.success);
                router.push({name: "product-admin"})
            }else{
                toastStore.toggleToast(true, "Cập nhật thất bại", ToastType.error);
            }

        }else{
            const res = await producApi.insert(product.value)
            if(res && res.data.Success){
                toastStore.toggleToast(true, "Thêm thành công", ToastType.success);
                router.push({name: "product-admin"})
            }else{
                toastStore.toggleToast(true, "Thêm thất bại", ToastType.error);
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.content-title {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 56px;
    align-items: center;
    padding: 0 16px;
    line-height: 1.25;
}
.product-form{
    height: calc(100% - 48px);
    width: 100%;
    padding: 0 16px 16px;

}
.table-grid{
    width: 100%;
    height: 300px;
}
.field {
    position: relative;
}
.lable {
    margin-bottom: 8px;
}
</style>
