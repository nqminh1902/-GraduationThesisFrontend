<template>
    <div class="p-[16px] w-full" style="height: 100vh;">
        <div class="heading">
            <base-text-box :config="searchDefaultConfig" />
            <DxDateRangeBox
                v-model:value="currentValue"
            />
        </div>
        <div class="content">

        </div>
    </div>
</template>
<script setup lang="ts">
import { DxTextBox } from "devextreme-vue";
// import DxDateRangeBox from 'devextreme-vue/date-range-box';
import { ref } from "vue";
import {
    BaseTextBox,
} from "../../components/base/index";

const searchDefaultConfig: DxTextBox = {
    width: 260,
    placeholder: "Tìm kiếm",
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
       
    },
};

const now = new Date();
const msInDay = 1000 * 60 * 60 * 24;
const initialDates = [
  new Date(now.getTime() - msInDay * 3),
  new Date(now.getTime() + msInDay * 3),
];
const currentValue = ref(initialDates);

</script>
<style lang="scss">
    
</style>