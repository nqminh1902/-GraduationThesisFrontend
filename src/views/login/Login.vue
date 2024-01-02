<template>
    <div class="login-wrapper">
        <div class="login-form">
            <div class="login-title">
                <b>Đăng nhập</b>
            </div>
            <div class="field">
                <div class="lable">Tên tài khoản <span style="color: red;">*</span></div>
                <base-text-box
                    :config="userNameConfig" v-model="user.userName" :class="{'border-red': validate.userName}"
                />
            </div>
            <div class="field">
                <div class="lable">Mật khẩu <span style="color: red;">*</span></div>
                <base-text-box
                    :config="passwordConfig" v-model="user.password" :class="{'border-red': validate.password}"
                />
            </div>
            <div class="validate-string">{{ passwordMessage }}</div>
            <div class="login-footer">
                <base-button
                    :config="buttonConfig"
                />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { DxButton, DxTextBox } from "devextreme-vue"
import { ref, watch } from "vue"
import { useUserStore, useToastStore } from "@/stores"
import {BaseButton, BaseTextBox} from "../../components/base"
import { ButtonStylingMode, ButtonType, ToastType } from "../../enums"
import UserApi from "../../apis/user/user-api"
import PermissionApi from "../../apis/role/permission-api"
import { UserModel } from "../../models"
import { useRouter } from "vue-router"

const userApi = new UserApi()
const permissionApi = new PermissionApi()

const userStore = useUserStore()

const router = useRouter()

const toastStore = useToastStore()

const userNameConfig = ref<DxTextBox>({
    placeholder: "Tên tài khoản",
})

const passwordConfig = ref<DxTextBox>({
    placeholder: "Mật khẩu",
    mode: "password"
})

const validate = ref({
    userName: false,
    password: false,
})
const user = ref({
    userName: "",
    password: "",
})
const passwordMessage = ref("")

const buttonConfig = ref<DxButton>({
    type: ButtonType.default,
    height: 32,
    text: "Đăng nhập",
    stylingMode: ButtonStylingMode.contained,
    width: "100%",
    async onClick(e) {
        if(validateSave()){
            const userLogin = new UserModel()
            userLogin.Password = user.value.password
            userLogin.UserName = user.value.userName
            const res = await userApi.userLogin(userLogin)
            if(res.data){
                sessionStorage.setItem("token", res.data.Token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(res.data.User)
                );
                userStore.setUser(res.data.User)
                const per = await permissionApi.getByRoleID(res.data.User.RoleID)
                if(per.data.Success){
                    userStore.setPermission(per.data.Data)
                }
                toastStore.toggleToast(true, "Đăng nhập thành công", ToastType.success);
                router.push("/")
            }else{
                validate.value.password = true;
                validate.value.userName = true;
                passwordMessage.value =
                    "Tên đăng nhập hoặc mật khẩu không chính xác";
            }
        }
    },
})

function validateSave(){
    let result = true
    if(!user.value.password){
        passwordMessage.value = "Mật khẩu không được để trống"
        result = false
    }
    if(!user.value.userName){
        passwordMessage.value = "Tên đăng nhập không được để trống"
        result = false
    }

    return result
}

watch(() => user.value.userName, (newVal) => {
    if(newVal){
        validate.value.userName = false
        passwordMessage.value = ""
    }else{
        validate.value.userName = true
        passwordMessage.value = "Tên đăng nhập không được để trống"
    }
})

watch(() => user.value.password, (newVal) => {
    if(newVal){
        validate.value.password = false
        passwordMessage.value = ""
    }else{
        validate.value.password = true
        passwordMessage.value = "Mật khẩu không được để trống"
    }
})
</script>
<style lang="scss" scoped>
    .login-wrapper {
    width: 100%;
    height: 100vh;
    background-image: url("https://ik.imagekit.io/2hun4xkhf/web%20image/2812_hinh-nen-tet-2024-14.jpg?updatedAt=1704208270502");
    display: flex;
    align-items: center;
    justify-content: center;
    background-repeat: no-repeat;
    background-size: cover;
}
.login-form {
    background-color: #ffffff;
    border-radius: 6px;
    width: 400px;
    height: auto;
    padding: 24px;
}
.login-title {
    width: 100%;
    height: 56px;
    text-align: center;
    font-size: 24px;
}
.login-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 56px;
    width: 100%;
}
.field{
        margin-bottom: 12px;
        position: relative;
        .lable{
            font-size: 14px;
            color: #1e2633;
            height: 25px!important;
            line-height: 25px!important;
            font-family: Roboto;
            font-weight: 500;
        }
        .validate-string{
            position: absolute;
            width: 100%;
            text-overflow: ellipsis;
            color: red;
            overflow: hidden;
            white-space: nowrap;
        }
    }
</style>