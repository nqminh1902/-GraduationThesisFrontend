<template>
  <div class="upload-file">
    <div class="image-preview" v-for="image of listImage" :key="image.ImageID">
      <img
        :src="image.ImageUrl"
        :alt="image.PathName"
        srcset=""
        class="image"
      />
      <div class="delete-image" @click="handleDeleteImage(image)">
        <Icon
          icon="iconamoon:close-duotone"
          color="#ffffff"
          width="18"
          height="18"
        />
      </div>
    </div>
    <div class="add-image-btn" @click="showPopup = true" v-if="allowMultiple">
      <Icon icon="iconoir:plus" color="#ff6000" width="24" height="24" />
    </div>
    <div class="add-image-btn" @click="showPopup = true" v-else-if="!allowMultiple && listImage.length < 1">
      <Icon icon="iconoir:plus" color="#ff6000" width="24" height="24" />
    </div>
  </div>
  <base-popup
    :config="popupConfig"
    v-if="showPopup"
    :popupVisible="showPopup"
    @close="showPopup = false"
  >
    <template #body>
      <div class="add-category-header text-3xl">Cảnh báo</div>
      <div class="add-category-body">
        <file-pond
          name="test"
          ref="pond"
          label-idle="Drop files here..."
          v-bind:allow-multiple="allowMultiple"
          accepted-file-types="image/jpeg, image/png"
          :server="null"
          :files="myFiles"
          @addfile="handleUploadFile"
          @removefile="handleRemoveFile"
        />
      </div>
    </template>
  </base-popup>
</template>
<script setup lang="ts">
import vueFilePond from "vue-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { BasePopup } from "..";
import axios from "axios";
import { ProductImageModel } from "../../../models";
import { DxPopup } from "devextreme-vue";

const props = defineProps<{
  listImage: ProductImageModel[]
  allowMultiple?: boolean
}>()
const emit = defineEmits(["onUpload", "onDelete", "imageDelete"])
// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);
const pondRef = ref<HTMLElement | null>(null);
const showPopup = ref<boolean>(false);
const myFiles = ref([]);

const popupConfig = ref<DxPopup>({
  height: 300,
  width: 400,
});

function handleUploadFile(error: any, file: any) {
  const formData = new FormData();
  formData.append("files", file.file);
  axios
    .post("https://localhost:7236/api/Upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (response?.data) {
        const resposeImage = response.data[0];
        const image = new ProductImageModel();
        image.ImageID = resposeImage.fileId;
        image.ImageUrl = resposeImage.url;
        image.ImageThumbnail = resposeImage.thumbnailUrl;
        image.PathName = resposeImage.name;
        image.State = 1
        emit("onUpload", image)
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function handleRemoveFile(error: any, file: any) {
    const imageDelete = props.listImage.find(item => item.PathName == file.file?.name)
    if(imageDelete){
          axios
              .delete(`https://localhost:7236/api/Upload/${imageDelete.ImageID}`)
              .then((response) => {
                const listImage = props.listImage.filter(item => item.PathName !== file.file?.name)
                emit("onDelete", listImage)
              })
              .catch((error) => {
                  console.error(error);
              });
    }    
}

function handleDeleteImage(image: ProductImageModel){
  const imageDelete = props.listImage.find(item => item.ImageID == image.ImageID)
    if(imageDelete){
          axios
              .delete(`https://localhost:7236/api/Upload/${imageDelete.ImageID}`)
              .then((response) => {
                const listImage = props.listImage.filter(item => item.ImageID !== image.ImageID)
                emit("onDelete", listImage)
                emit('imageDelete', {...imageDelete, State: 3})
              })
              .catch((error) => {
                  console.error(error);
              });
    }
}
</script>
<style lang="scss">
.upload-file {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .image-preview {
    position: relative;
    width: 80px;
    height: 80px;
    margin-right: 8px;
    .delete-image {
      position: absolute;
      top: -5px;
      right: -8px;
      background-color: var(--color-blaze-orange);
      border-radius: 50%;
      cursor: pointer;
    }
    .image {
      width: 100%;
      height: 100%;

      object-fit: cover;
    }
  }
  .add-image-btn {
    border: 1px dashed var(--color-blaze-orange);
    display: inline-block;
    border-radius: 50%;
    padding: 3px;
    cursor: pointer;
  }
}
.filepond--image-preview {
  max-width: 100%;
  max-height: 100%;
}
.filepond--item {
  width: calc(33.33333% - 0.5em);
}
@media (min-width: 30em) {
  .filepond--item {
    width: calc(33.33333% - 0.5em);
  }
}

@media (min-width: 50em) {
  .filepond--item {
    width: calc(33.33% - 0.5em);
  }
}
</style>
