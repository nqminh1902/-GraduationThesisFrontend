<template>
    <div class="login-wrapper">
        <div class="login-form">
            <div class="login-title">
                <b>Đăng nhập</b>
            </div>
            <div class="login-footer">
                <base-button
                    :config="buttonConfig"
                />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { DxButton } from "devextreme-vue"
import { ref } from "vue"
import {BaseButton, BaseTextBox} from "../../components/base"
import { ButtonStylingMode, ButtonType } from "../../enums"

const validate = ref({
    userName: false,
    password: false,
})
const user = ref({
    userName: "",
    password: "",
})
const  passwordMessage = "Không được để trống"

const buttonConfig = ref<DxButton>({
    type: ButtonType.default,
    height: 32,
    text: "Đặt lịch",
    stylingMode: ButtonStylingMode.contained,
    icon: "plus",
    onClick(e) {
    },
})
</script>
<style lang="scss" scoped>
    .login-wrapper {
    width: 100%;
    height: 100vh;
    background-color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
}
.login-form {
    background-color: #ffffff;
    border-radius: 6px;
    width: 500px;
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
</style>