
<template >
    <div class="w-full h-full">
        <div class="setting-content">
            <div class="setting-sidebar">
                <div class="setting-sidebar-item" :class="routeActive == 'job-position' && 'active'" @click="ChangeRouter('job-position')">
                    <Icon icon="material-symbols:edit-outline"  
                    width="20"
                    height="20"
                    :color="'#7a8188'"
                    class="cursor-pointer mr-[8px]"/>
                    <div  class="">Vị trí tuyển dụng</div>
                </div>
                <div class="setting-sidebar-item" :class="routeActive == 'university' && 'active'" @click="ChangeRouter('university')">
                    <Icon icon="mdi:floor-plan"  
                    width="20"
                    height="20"
                    :color="'#7a8188'"
                    class="cursor-pointer mr-[8px]"/>
                    <div class="">Trường đại học</div>
                </div>
                <div class="setting-sidebar-item" :class="routeActive == 'education-major' && 'active'" @click="ChangeRouter('education-major')">
                    <Icon icon="carbon:ibm-process-mining"  
                    width="20"
                    height="20"
                    :color="'#7a8188'"
                    class="cursor-pointer mr-[8px]"/>
                    <div  class="">Chuyên ngành học</div>
                </div>
                <div class="setting-sidebar-item" :class="routeActive == 'reason-eliminate' && 'active'" @click="ChangeRouter('reason-eliminate')">
                    <Icon icon="pepicons-pop:people"  
                    width="20"
                    height="20"
                    :color="'#7a8188'"
                    class="cursor-pointer mr-[8px]"
                    />
                    <div class="">Lý do loại ứng viên</div>
                </div>
                <div class="setting-sidebar-item" :class="routeActive == 'work-location' && 'active'" @click="ChangeRouter('work-location')">
                    <Icon icon="pepicons-pop:people"  
                    width="20"
                    height="20"
                    :color="'#7a8188'"
                    class="cursor-pointer mr-[8px]"
                    />
                    <div class="">Địa điểm công ty</div>
                </div>
            </div>
            <div class="flex-1 h-full overflow-hidden">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const routeActive = ref("job-position")
const route = useRoute()
const router = useRouter()
function ChangeRouter(name: string){
    routeActive.value = name
    switch (name) {
        case "job-position":
            router.push({ name: 'setting-position'})
            break;
        case "university":
            router.push({ name: 'setting-university' })
            break;
        case "education-major":
            router.push({ name: 'setting-education-major' })
            break;
        case "reason-eliminate":
            router.push({ name: 'setting-reason-eliminate' })
            break;
        case "work-location":
            router.push({ name: 'setting-work-location'})
            break;
        default:
            router.push({ name: 'setting-position'})
            break;
    }
}
</script>
<style lang="scss" scoped>
    .setting-header{
    width: 100%;
    height: 66px;
    padding: 16px 16px;
    z-index: 10;
    align-items: center;
    display: flex;
    background-color: #ffffff;
    border-bottom: 1px solid #e0e6ec;
    .title{
        margin-left: 16px;
        max-width: 550px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 20px!important;
        font-weight: 700;
    }
}
.setting-content{
    width: 100%;
    height: 100% ;
    display: flex;
    .setting-sidebar{
        width: 212px;
        height: 100%;
        background: #FFFFFF;
        border-top-left-radius: 3px;
        padding: 12px;
        .setting-sidebar-item{
            width: 100%;
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #1E2633;
            padding: 12px;
            justify-content: flex-start;
            cursor: pointer;
            white-space: nowrap;
            text-align: center;
            background-color: #ffffff;
            
        }
    }
    .setting-btn{
        right: 0;
        width: 230px;
        padding: 8px;
        height: 100%;
        background-color: #F1F2F6;
        border-top-left-radius: 3px;
        .group-btn{
            background: #ffffff;
            padding: 24px;
            border-radius: 6px;
        }
    }
}
.active {
    color: #2680eb !important;
    border-radius: 4px;
    font-weight: 700;
    border-bottom: none;
    background-color: rgba(225, 238, 255, 0.8) !important;
}
</style>