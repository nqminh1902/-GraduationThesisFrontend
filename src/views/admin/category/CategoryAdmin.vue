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
                <div class="text-3xl">Danh mục sản phẩm</div>
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
                    <template #status="data">
                        <base-status :status="data.data.data.Status" />
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
                            Tên danh mục<span style="color: red"> *</span>
                        </div>

                        <base-text-box
                            :config="textBoxConfig"
                            v-model="category.CategoryName"
                            class="mb-6"
                        />
                        <p class="error-message" v-if="isError.CategoryName">
                            Tên danh mục không được để trống
                        </p>
                    </div>
                    <div class="field">
                        <div class="lable">
                            Trạng thái<span style="color: red"> *</span>
                        </div>

                        <base-select-box
                            v-model="category.Status"
                            :config="selectBoxConfig"
                        />
                    </div>
                </div>
            </template>
        </base-popup>
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
                        Bạn có chắc chắn muốn xóa danh mục không
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
import CategoryApi from "../../../apis/category/category-api";
import { CategoryModel, PagingRequest } from "../../../models";
import type { BaseNavigationType } from "@/types";
import type DxTextBox from "devextreme-vue/text-box";
import { ButtonStylingMode, ButtonType, ToastType } from "@/enums";
import { useToastStore } from "@/stores";

const { t, getLocale, setLocale } = useI18n();
const toastStore = useToastStore();
const categoryApi = new CategoryApi();
const filterPaging = new PagingRequest();
const totalCount = ref<number>(0);
const baseTableRef = ref();
const isShowPopup = ref<boolean>(false);
const isUpdate = ref<boolean>(false);
const category = ref(new CategoryModel());
const showPopupDelete = ref<boolean>(false);
const isError = ref({
    CategoryName: false,
});
const popupTitle = ref("Thêm danh mục sản phẩm");

const dataSource = new CustomStore({
    key: "CategoryID",
    async load(loadOptions) {
        filterPaging.Collums = ["CategoryName"];
        const res = await categoryApi.getFilterPaging(filterPaging);
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
            caption: "Tên danh mục",
            dataField: "CategoryName",
            dataType: "string",
            width: 200,
        },
        {
            alignment: "left",
            caption: "Trạng thái",
            dataField: "Status",
            dataType: "number",
            width: 150,
            cellTemplate: "status-template",
        },
    ],
    dataSource: dataSource,
    keyExpr: "CategoryID",
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
        category.value.CategoryName = e.value?.trim();
        if (e.value) {
            isError.value.CategoryName = false;
        }
    },
};

const buttonConfig = ref<DxButton>({
    type: ButtonType.default,
    height: 36,
    text: "Thêm danh mục",
    stylingMode: ButtonStylingMode.contained,
    icon: "plus",
    onClick(e) {
        category.value = new CategoryModel();
        popupTitle.value = "Thêm danh muc sản phẩm";
        isShowPopup.value = true;
        isUpdate.value = false;
    },
});

function pagingChange(e: BaseNavigationType) {
    filterPaging.PageIndex = e.pageIndex;
    filterPaging.PageSize = e.pageSize;
    baseTableRef.value.getInstance().refresh();
}

function validateForm() {
    if (!category.value.CategoryName) {
        isError.value.CategoryName = true;
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
    const res = await categoryApi.update(
        category.value.CategoryID,
        category.value
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
    const res = await categoryApi.insert(category.value);
    if (res?.data.Success) {
        toastStore.toggleToast(true, "Thêm mới thành công", ToastType.success);
        baseTableRef.value.getInstance().refresh();
        isShowPopup.value = false;
    } else {
        toastStore.toggleToast(true, "Thêm mới thất bại", ToastType.error);
    }
}

async function handleRemove() {
    const res = await categoryApi.delete(category.value.CategoryID);
    if (res?.data.Success) {
        toastStore.toggleToast(true, "Xóa thành công", ToastType.success);
        baseTableRef.value.getInstance().refresh();
        showPopupDelete.value = false;
    } else {
        toastStore.toggleToast(true, "Xóa thất bại", ToastType.error);
    }
}

function handleDelete(event: any) {
    category.value = event;
    showPopupDelete.value = true;
}

async function handleEdit(event: any) {
    try {
        const res: any = await categoryApi.getByID(event.CategoryID);
        if (res?.data.Success) {
            category.value = res?.data.Data;
            popupTitle.value = "Sửa danh mục sản phẩm";
            isUpdate.value = true;
            isShowPopup.value = true;
        } else {
            toastStore.toggleToast(
                true,
                "Lấy thông danh mục thất bại",
                ToastType.error
            );
        }
    } catch (error) {
        toastStore.toggleToast(
            true,
            "Lấy thông danh mục thất bại",
            ToastType.error
        );
    }
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
</style>
