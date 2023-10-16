<template>
    <div id="category-admin" class="w-full h-full px-6 pt-6 pb-3">
        <div class="bg-white w-full h-full rounded-lg">
            <div class="content-title">
                <Icon
                    :icon="'tabler:category'"
                    :color="'#2563eb'"
                    width="24"
                    height="24"
                    class="mx-6"
                />
                <div class="text-3xl">Danh sách sản phẩm</div>
            </div>
            <div class="toolbar">
                <base-text-box :config="searchDefaultConfig" />
                <base-button :config="buttonConfig" />
            </div>
            <div class="grid-table">
                <base-table
                    :config="tableConfig"
                    ref="baseTableRef"
                    @on-delete="handleDelete"
                    @on-edit="handleEdit"
                >
                    <template #status="data">
                        <base-status :status="data.data.data.Status" />
                    </template>
                    <template #image="data">
                        <div class="color-image">
                            <img
                                :src="`${data.data.data.Images.split(';')[0]}`"
                                :title="data.data.data.ProductName"
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
            v-if="showPopupDelete"
            :config="popupConfig"
            :showBtnFooter="true"
            :popupVisible="showPopupDelete"
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
import ProductApi from "@/apis/product/product-api";
import { ProductModel, PagingRequest } from "../../../models";
import type { BaseNavigationType } from "@/types";
import type DxTextBox from "devextreme-vue/text-box";
import { ButtonStylingMode, ButtonType, ToastType } from "@/enums";
import { useToastStore } from "@/stores";
import { useRoute, useRouter } from "vue-router";

const { t, getLocale, setLocale } = useI18n();
const toastStore = useToastStore();
const productApi = new ProductApi();
const filterPaging = new PagingRequest();
const totalCount = ref<number>(0);
const baseTableRef = ref();
const product = ref(new ProductModel());
const showPopupDelete = ref<boolean>(false);
const route = useRoute()
const router = useRouter()

const dataSource = new CustomStore({
    key: "ProductID",
    async load(loadOptions) {
        filterPaging.Collums = ["Name"];
        const res = await productApi.getFilterPaging(filterPaging);
        if (res) {
            totalCount.value = res.data.Data.TotalCount;
        }
        return res.data.Data.Data || [];
    },
    loadMode: "processed",
});

const selectBoxConfig = ref<DxSelectBox>({
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
    ],
    searchEnabled: false,
    onValueChanged: (e) => {},
});

const tableConfig = ref<DxDataGrid>({
    columns: [
        {
            alignment: "left",
            caption: "Ảnh sản phẩm",
            dataField: "Images",
            dataType: "string",
            width: 200,
            cellTemplate: "image-template",
        },
        {
            alignment: "left",
            caption: "Tên sản phẩm",
            dataField: "ProductName",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Giá sản phẩm",
            dataField: "ProductPrice",
            dataType: "number",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Tên bộ sưu tập",
            dataField: "CollectionName",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Tên danh mục",
            dataField: "CategoryName",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Tổng sản phẩm",
            dataField: "TotalQuantity",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Chât liệu",
            dataField: "Material",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Mô tả nhanh",
            dataField: "QuickDescription",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Trạng thái",
            dataField: "ProductStatus",
            dataType: "number",
            width: 150,
            cellTemplate: "status-template",
        },
    ],
    dataSource: dataSource,
    keyExpr: "ProductID",
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

const buttonConfig = ref<DxButton>({
    type: ButtonType.default,
    height: 36,
    text: "Thêm bộ sưu tập",
    stylingMode: ButtonStylingMode.contained,
    icon: "plus",
    onClick(e) {
        router.push({name: 'add-product-admin', params: {id: 0}})
    },
});

function pagingChange(e: BaseNavigationType) {
    filterPaging.PageIndex = e.pageIndex;
    filterPaging.PageSize = e.pageSize;
    baseTableRef.value.getInstance().refresh();
}

async function handleRemove() {
    const res = await productApi.delete(product.value.ProductID);
    if (res?.data.Success) {
        toastStore.toggleToast(true, "Xóa thành công", ToastType.success);
        baseTableRef.value.getInstance().refresh();
        showPopupDelete.value = false;
    } else {
        toastStore.toggleToast(true, "Xóa thất bại", ToastType.error);
    }
}

function handleDelete(event: any) {
    product.value = event;
    showPopupDelete.value = true;
}

function handleEdit(event: any) {
    router.push({name: "add-product-admin", params: {id: event.ProductID}})
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
    .grid-table {
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
