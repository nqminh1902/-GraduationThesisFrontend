<template>
    <div id="category-admin" class="w-full h-full px-6 pt-6 pb-3">
        <div class="bg-white w-full h-full rounded-lg">
            <div class="content-title">
                <Icon
                    :icon="'ic:outline-color-lens'"
                    :color="'#2563eb'"
                    width="24"
                    height="24"
                    class="mx-6"
                />
                <div class="text-3xl">Danh mục màu sắc sản phẩm</div>
            </div>
            <div class="toolbar">
                <base-text-box :config="searchDefaultConfig" />
                <base-button :config="buttonConfig" />
            </div>
            <div class="grid">
                <base-table
                    :config="tableConfig"
                    ref="baseTableRef"
                    @on-delete="handleDelete"
                    @on-edit="handleEdit"
                >
                    <template #image="data">
                        <div class="color-image">
                            <img
                                :src="data.data.data.ProductColorImage"
                                :title="data.data.data.ProductColorName"
                                style="width: 100%; height: 100%; border: 1px solid; object-fit: cover"
                            />
                        </div>
                    </template>
                </base-table>
            </div>
            <base-navigation
                :totalRecord="totalCount"
                @onNavigationChange="pagingChange"
            />
        </div>
        <base-popup
            v-if="isShowPopup"
            :config="popupConfig"
            :showBtnFooter="true"
            :popupVisible="isShowPopup"
            @close="isShowPopup = false"
            @save="handleSave"
        >
            <template #body>
                <div class="add-category-header text-3xl">
                    {{ popupTitle }}
                </div>
                <div class="add-category-body">
                    <div class="field">
                        <div class="lable">
                            Tên màu sắc<span style="color: red"> *</span>
                        </div>

                        <base-text-box
                            :config="textBoxConfig"
                            v-model="productColor.ProductColorName"
                            class="mb-6"
                        />
                        <p
                            class="error-message"
                            v-if="isError.ProductColorName"
                        >
                            Tên màu sẵc không được để trống
                        </p>
                    </div>
                    <div class="field">
                        <div class="lable">
                            Ảnh màu sắc<span style="color: red"> *</span>
                        </div>
                        <base-upload-image :list-image="imageColor" @on-upload="handleUploadFile" @on-delete="handleDeleteFile"/>
                        <p
                            class="error-message"
                            v-if="isError.ProductColorImage"
                        >
                            Ảnh màu sẵc không được để trống
                        </p>
                    </div>
                </div>
            </template>
        </base-popup>
        <base-popup
            v-if="showPopupDelete"
            :config="popupConfig"
            :popupVisible="showPopupDelete"
            :showBtnFooter="true"
            @close="showPopupDelete = false"
            @save="handleRemove"
        >
            <template #body>
                <div class="add-category-header text-3xl">Cảnh báo</div>
                <div class="add-category-body">
                    <div class="d-flex items-center">
                        <Icon
                            :icon="'ph:warning'"
                            :color="'yellow'"
                            width="30"
                            height="30"
                            class="mr-6"
                        />
                        Bạn có chắc chắn muốn xóa không?
                    </div>
                </div>
            </template>
        </base-popup>
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
    BaseUploadImage,
} from "../../../components/base";
import { Icon } from "@iconify/vue";
import type {
    DxButton,
    DxDataGrid,
    DxPopup,
    DxSelectBox,
} from "devextreme-vue";
import { ref } from "vue";
import CustomStore from "devextreme/data/custom_store";
import ProductColorApi from "../../../apis/product-color/product-color-api";
import { ProductColorModel, PagingRequest, ProductImageModel } from "../../../models";
import type { BaseNavigationType } from "@/types";
import type DxTextBox from "devextreme-vue/text-box";
import { ButtonStylingMode, ButtonType, ToastType } from "@/enums";
import { useToastStore } from "@/stores";

const { t, getLocale, setLocale } = useI18n();
const toastStore = useToastStore();
const productColorApi = new ProductColorApi();
const filterPaging = new PagingRequest();
const totalCount = ref<number>(0);
const baseTableRef = ref();
const isShowPopup = ref<boolean>(false);
const isUpdate = ref<boolean>(false);
const productColor = ref(new ProductColorModel());
const showPopupDelete = ref<boolean>(false);
const isError = ref({
    ProductColorName: false,
    ProductColorImage: false
});
const popupTitle = ref("Thêm bộ sưu tập");

const dataSource = new CustomStore({
    key: "ProductColorID",
    async load(loadOptions) {
        filterPaging.Collums = ["ProductColorName"];
        const res = await productColorApi.getFilterPaging(filterPaging);
        if (res) {
            totalCount.value = res.data.Data.TotalCount;
        }
        return res.data.Data.Data || [];
    },
    loadMode: "processed",
});

const tableConfig = ref<DxDataGrid>({
    columns: [
        {
            alignment: "left",
            caption: "Màu sắc",
            dataField: "ProductColorImage",
            dataType: "string",
            cellTemplate: "image-template",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Tên bộ sưu tập",
            dataField: "ProductColorName",
            dataType: "string",
        },
    ],
    dataSource: dataSource,
    keyExpr: "ProductColorID",
    onSelectionChanged(e) {
        console.log(e);
    },
});

const popupConfig = ref<DxPopup>({
    height: "auto",
    width: 400,
});

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
        filterPaging.SearchValue = e.value?.trim();
        filterPaging.PageIndex = 1;
        baseTableRef.value.getInstance().refresh();
    },
};

const textBoxConfig: DxTextBox = {
    placeholder: t("base.general.typeValue"),
    onValueChanged: (e) => {
        productColor.value.ProductColorName = e.value?.trim();
        if (e.value) {
            isError.value.ProductColorName = false;
        }
    },
};

const buttonConfig = ref<DxButton>({
    type: ButtonType.default,
    height: 36,
    text: "Thêm màu sắc",
    stylingMode: ButtonStylingMode.contained,
    icon: "plus",
    onClick(e) {
        productColor.value = new ProductColorModel();
        popupTitle.value = "Thêm màu sắc";
        isShowPopup.value = true;
        imageColor.value = []
        isUpdate.value = false;
    },
});

function pagingChange(e: BaseNavigationType) {
    filterPaging.PageIndex = e.pageIndex;
    filterPaging.PageSize = e.pageSize;
    baseTableRef.value.getInstance().refresh();
}

function validateForm() {
    if (!productColor.value.ProductColorName) {
        isError.value.ProductColorName = true;
        return false;
    }
    if (!productColor.value.ProductColorImage) {
        isError.value.ProductColorImage = true;
        return false;
    }
    return true;
}

async function handleSave() {
    if (validateForm()) {
        try {
            if (isUpdate.value) {
                await handleUpdate();
            } else {
                await handleInsert();
            }
        } catch {
            toastStore.toggleToast(true, "Thêm mới thất bại", ToastType.error);
        }
    }
}

async function handleUpdate() {
    const res = await productColorApi.update(
        productColor.value.ProductColorID,
        productColor.value
    );
    if (res?.data.Success) {
        toastStore.toggleToast(true, "Cập nhật thành công", ToastType.success);
        baseTableRef.value.getInstance().refresh();
        isShowPopup.value = false;
    } else {
        toastStore.toggleToast(true, "Cập nhật thất bại", ToastType.error);
    }
}

async function handleInsert() {
    const res = await productColorApi.insert(productColor.value);
    if (res?.data.Success) {
        toastStore.toggleToast(true, "Thêm mới thành công", ToastType.success);
        baseTableRef.value.getInstance().refresh();
        isShowPopup.value = false;
    } else {
        toastStore.toggleToast(true, "Thêm mới thất bại", ToastType.error);
    }
}

async function handleRemove() {
    const res = await productColorApi.delete(productColor.value.ProductColorID);
    if (res?.data.Success) {
        toastStore.toggleToast(true, "Xóa thành công", ToastType.success);
        baseTableRef.value.getInstance().refresh();
        showPopupDelete.value = false;
    } else {
        toastStore.toggleToast(true, "Xóa thất bại", ToastType.error);
    }
}

function handleDelete(event: any) {
    productColor.value = event;
    showPopupDelete.value = true;
}

async function handleEdit(event: any) {
    try {
        const res: any = await productColorApi.getByID(event.ProductColorID);
        if (res?.data.Success) {
            productColor.value = res?.data.Data;
            const productImageColor = new ProductImageModel()
            productImageColor.ImageUrl = productColor.value.ProductColorImage
            imageColor.value = [productImageColor]
            popupTitle.value = "Sửa màu sắc";
            isUpdate.value = true;
            isShowPopup.value = true;
        } else {
            toastStore.toggleToast(
                true,
                "Lấy thông màu sắc thất bại",
                ToastType.error
            );
        }
    } catch (error) {
        toastStore.toggleToast(true, "Lấy thông tin thất bại", ToastType.error);
    }
}

const imageColor = ref<ProductImageModel[]>([])

function handleUploadFile(image: ProductImageModel){
    productColor.value.ProductColorImage = image.ImageUrl
    imageColor.value.push(image)
}

function handleDeleteFile(image: ProductImageModel[]){
    imageColor.value = image
    
}
</script>

<style lang="scss" scoped>
#category-admin {
    .content-title {
        display: flex;
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
        padding: 0 16px;
        justify-content: space-between;
    }
    .grid {
        width: 100%;
        padding: 0 16px;
        height: calc(100% - 48px - 48px - 46px);
    }
}
.add-category-header {
    width: 100%;
    height: 48px;
    line-height: 1.25;
    font-weight: bold;
}
.add-category-body {
    margin-bottom: 24px;
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
.color-image{
    width: 26px;
    height: 26px;
}
</style>
