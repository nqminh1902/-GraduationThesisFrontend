<template>
    <div class="p-[16px] w-full h-full" style="background-color: #EBECEF; overflow-y: scroll;">
        <div class="flex h-[500px]">
            <div class="flex-1 container min-w-[300px] h-full">
                <div class="font-bold text-[20px] mb-[8px]">
                    Hiệu quả tuyển dụng
                </div>
                <div class="flex" style="height: calc(100% - 30px);">
                    <DxChart
                        id="chart"
                        :data-source="recruitmentEfficiency"
                        palette="Soft"
                    >
                        <DxCommonSeriesSettings
                        :ignore-empty-points="true"
                        argument-field="Name"
                        value-field="Value"
                        type="bar"
                        />
                        <DxTooltip
                            :enabled="true"
                            :customize-tooltip="customizeTooltipEfficiency"
                        >
                        </DxTooltip>
                        <DxSeriesTemplate name-field="Name"/>
                    </DxChart>
                    <div class="">
                        <div class="">Cần tuyển: <span class="ml-[4px] font-bold">{{ textEfficiency.Quantity }}</span></div>
                        <div class="">Đã tuyển: <span class="ml-[4px] font-bold">{{ textEfficiency.Hired }}</span></div>
                        <div class="">Hiệu quả: <span class="ml-[4px] font-bold">{{ textEfficiency.Percent }}%</span></div>
                    </div>
                </div>
            </div>
            <div class="w-[12px]"></div>
            <div class="flex-1 container min-w-[300px] h-full">
                <div class="font-bold text-[20px] mb-[8px]">
                    Nguồn ứng viên
                </div>

                <DxPieChart
                    id="pie"
                    :data-source="recruitmentChannel"
                    type="doughnut"
                    title=""
                    palette="Soft Pastel"
                >
                    <DxSeries argument-field="ChannelName">
                        <DxLabel
                            :visible="true"
                            :customize-text="customizeText"
                        >
                            <DxConnector :visible="true"/>
                        </DxLabel>
                    </DxSeries>
                    <DxTooltip
                        :enabled="true"
                        :customize-tooltip="customizeTooltip"
                    >
                    <DxFormat
                        type="percent"
                    />
                    </DxTooltip>
                </DxPieChart>
            </div>
        </div>
        <div class="flex h-[500px] mt-[16px]">
            <div class="flex-1 flex container min-w-[300px] h-full">
                <div class="mr-[20px] ">
                    <div class="font-bold text-[20px] mb-[8px]">
                        Số lượng ứng viên theo thời gian
                    </div>
                    <div class="flex" style="height: calc(100% - 30px);">
                        <DxChart
                            id="chart"
                            :data-source="listCandidateApply"
                            palette="Violet"
                            >
                            <DxCommonSeriesSettings
                                type="line"
                                argument-field="ColumnName"
                            >
                                <DxPoint :visible="true" :size="8"></DxPoint>
                            </DxCommonSeriesSettings>
                            <DxSeries
                                value-field="Value" name="Số lượng ứng viên" color="#009218"
                            />
                            <DxMargin :bottom="20"/>
                            <DxCommonAxisSettings :allow-decimal="true">
                                <DxGrid :visible="true"></DxGrid>
                            </DxCommonAxisSettings>
                            <DxArgumentAxis
                                :allow-decimals="false"
                                :axis-division-factor="60"
                            >
                                <DxLabel>
                                    <DxFormat type="decimal"/>
                                </DxLabel>
                            </DxArgumentAxis>
                            <DxLegend
                                vertical-alignment="top"
                                horizontal-alignment="right"
                                :visible="false"
                            >
                                <DxFont :size="13"/>
                            </DxLegend>
                            <DxTooltip :enabled="true"/>
                        </DxChart>
                    </div>
                </div>
                <div class="" v-if="!currentPeriod">
                    <DatePicker :is-range="true" v-model.range="range" mode="dateTime" :columns="2" :popover="{visibility: 'click'}" 
                         @dayclick="handleCalendarClick"
                        :locale="
                        {
                            firstDayOfWeek: 2,
                        }">
                            <template  v-slot="{ inputValue, inputEvents }">
                                <div class="flex bg-white h-[32px] rounded-[4px] p-[8px] cursor-pointer items-center" style="border: 1px solid #ddd;">
                                    <div class=""  v-on="inputEvents.start">{{ inputValue.start.split(" ")[0]}}</div>
                                    <label class="mx-[8px]">-</label>
                                    <div class=""  v-on="inputEvents.end">{{ inputValue.end.split(" ")[0] }}</div>
                                    <Icon
                                        :icon="'uim:schedule'"
                                        :color="'#2563eb'"
                                        width="20"
                                        height="20"
                                        class="ml-[8px]"
                                    />
                                </div>
                            </template>
                        </DatePicker>
                    <div class="text-[16px] mt-[10px] font-medium">Từ {{ formatDate(range.start) }} đến {{ formatDate(range.end) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import DxPieChart, {
  DxLegend,
  DxSeries,
  DxTooltip,
  DxFormat,
  DxLabel,
  DxConnector
} from 'devextreme-vue/pie-chart';

import { Calendar, DatePicker  } from 'v-calendar';

import {
  DxChart,
  DxSeriesTemplate,
  DxCommonSeriesSettings,
  DxTitle,
  DxArgumentAxis,
  DxGrid,
  DxMargin,
  DxSubtitle,
  DxPoint,
  DxFont,
  DxCommonAxisSettings,
  DxAdaptiveLayout
} from 'devextreme-vue/chart';
import { ref, watch } from 'vue';
import ReportApi from "../../../../apis/report/report-api.ts"
import { formatDate } from "../../../../utils";
import { Icon } from "@iconify/vue";

const props = withDefaults(defineProps<{
    recruitmentID: number
    currentPeriod: number
}>(), {
});

const reportApi = new ReportApi()

watch(() => props.currentPeriod, (newValue) => {
    getDataReport()
    getCandidateByTime()
})

// Lấy ngày hiện tại
var currentDate = new Date();

// Lấy ngày thứ 2 trong tuần hiện tại
var monday = new Date(currentDate);
monday.setDate(currentDate.getDate() - (currentDate.getDay() - 1));
if (monday > currentDate) {
  monday.setDate(currentDate.getDate() - (currentDate.getDay() + 6));
}

// Lấy ngày Chủ nhật trong tuần hiện tại
var sunday = new Date(currentDate);
sunday.setDate(currentDate.getDate() + (7 - currentDate.getDay()));
if (sunday < currentDate) {
  sunday.setDate(currentDate.getDate() + (7 - currentDate.getDay() + 7));
}


const range = ref({
  start: new Date(monday),
  end: new Date(sunday),
});

async function getDataReport(){
    let period = -1
    if(props.currentPeriod){
        period = props.currentPeriod
    }
    const res = await reportApi.getDataReportByRecruitment(props.recruitmentID, period)
    if(res.data.Success){
        buildChannelReport(res.data.Data.recruitmentChannel)
        textEfficiency.value = res.data.Data.recruitmentEfficiency[0]
        buildRecruitmentEfficiencyReport(res.data.Data.recruitmentEfficiency)
    }
}

async function getCandidateByTime(){
    const param = {
        FromDate: range.value.start,
        ToDate: range.value.end,
        periodID: props.currentPeriod ? props.currentPeriod : -1
    }
    const res = await reportApi.getCandidateByTime(props.recruitmentID, param)
    if(res.data.Success){
        buildCandidateApply(res.data.Data.reportData);
    }
}

getDataReport()
getCandidateByTime()

const recruitmentEfficiency = ref<any[]>([])
const recruitmentChannel = ref<any[]>([])
const noCandidateApply = ref(false)
const listCandidateApply = ref<any[]>([])
const textEfficiency = ref({})

function buildCandidateApply(data: any[]){
    const result:any[] = []
    const rowNameKeyName = "RecruitmentID"
    const dataSumary = data.filter(e => e[rowNameKeyName] === 0)

    let candidateNeed
    dataSumary.forEach(item => {
        const elementDate = new Date(item.Date)
        const colName = `${elementDate.getDate()}/${elementDate.getMonth() + 1}/${elementDate.getFullYear()}`
        candidateNeed = {
            ColumnName: colName,
            Value: item.Total,
            FieldValue: ""
        }
        result.push(candidateNeed)
    })

    let countTotal = 0
    result.forEach(item => {
        countTotal += item.Value
    })

    if(countTotal == 0){
        noCandidateApply.value = true
    }else{
        noCandidateApply.value = false
    }
    listCandidateApply.value =  result
    
    
}


let countClick = 0

function handleCalendarClick(e:any){
    countClick++
    if(countClick == 2){
        getCandidateByTime()
        countClick = 0
    }    
    setTimeout(() => {countClick = 0}, 5000)
}

function buildRecruitmentEfficiencyReport(data: any[]){
    const result:any[] = []
    for (const key in data[0]) {

        let channel = {
            Name: `${key == "Quantity" ? "Cần tuyển" : "Đã tuyển"}`,
            Value: data[0][key]
        }
        if(key != "Percent"){
            result.push(channel)
        }
    }

    recruitmentEfficiency.value = result
}

function buildChannelReport(data: any[]){
    const result:any[] = []
    for (const key in data[0]) {
        let channel = {
            ChannelName: `${key }`,
            val: data[0][key]
        }
        result.push(channel)
    }

    recruitmentChannel.value = result
}

function customizeTooltip({ percent }) {
    return {
        text: `${(percent * 100).toFixed(2)}%`,
    };
}

function customizeTooltipEfficiency(pointInfo:any){
    return 1
}

function customizeText(pointInfo:any){
    return pointInfo.value
}
</script>


<style lang="scss" scoped>
.container{
    background-color: #fff;
    padding: 24px;
    overflow: hidden;
    border-radius: 3px;
}
</style>

<style>
#chart .dxc-legend{
    display: none
}
</style>