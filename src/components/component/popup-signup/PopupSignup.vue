<template>
    <base-popup
        v-if="internalValue"
        :config="popupSignupConfig"
        :popupVisible="internalValue"
        @close="internalValue = false"
        ><template #body>
            <div class="popup-signup-content d-flex">
                <div class="left">
                    <img src="/src/assets/images/common/register.png" alt="" />
                    <div class="text" @click="handleClickLogin">
                        {{ t('popupSignup.login') }}
                    </div>
                </div>
                <div class="right">
                    <div class="above">
                        <div class="title">{{ t('popupSignup.register') }}</div>
                        <div class="d-flex-center" :style="{ height: '38px' }">
                            <div class="m-r-10">
                                <base-text-box
                                    ref="firstNameRef"
                                    :config="firstNameSignupConfig"
                                />
                            </div>
                            <div class="m-l-10">
                                <base-text-box
                                    ref="lastNameRef"
                                    :config="lastNameSignupConfig"
                                />
                            </div>
                        </div>
                        <base-text-box
                            ref="accountRef"
                            :config="accountSignupConfig"
                        />
                        <base-text-box
                            ref="passwordRef"
                            :config="passwordSignupConfig"
                        />
                        <base-text-box
                            ref="confirmPasswordRef"
                            :config="confirmPasswordConfig"
                        />
                        <div class="more-option-wrapper d-flex-center">
                            <base-check-box
                                ref="acceptRef"
                                :config="checkboxSignupConfig"
                            />
                        </div>
                        <base-button
                            ref="btnRegisterRef"
                            :config="btnRegisterConfig"
                        />
                    </div>
                </div>
            </div> </template
    ></base-popup>
</template>

<script setup lang="ts">
import {
    BaseButton,
    BaseCheckBox,
    BasePopup,
    BaseTextBox,
} from '@/components/base';
import {
    popupSignupConfig,
    accountSignupConfig,
    passwordSignupConfig,
    checkboxSignupConfig,
    btnRegisterConfig,
    firstNameSignupConfig,
    lastNameSignupConfig,
    confirmPasswordConfig,
} from '@/constants/components/component';
import { useI18n } from 'vue3-i18n';

// #region common
const { t, getLocale } = useI18n();

const props = defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'onClickLogin'): void;
}>();

const internalValue = computed({
    get() {
        return props.modelValue;
    },
    set(newValue) {
        emit('update:modelValue', newValue);
    },
});
// #endregion

// #region config
const accountRef = ref();
const passwordRef = ref();
const confirmPasswordRef = ref();
const acceptRef = ref();
const btnRegisterRef = ref();
const firstNameRef = ref();
const lastNameRef = ref();

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            firstNameRef.value
                ?.getInstance()
                .option('label', t('popupSignup.firstName'));
            lastNameRef.value
                ?.getInstance()
                .option('label', t('popupSignup.lastName'));
            accountRef.value
                ?.getInstance()
                .option('label', t('popupSignup.account'));
            passwordRef.value
                ?.getInstance()
                .option('label', t('popupSignup.password'));
            acceptRef.value
                ?.getInstance()
                .option('text', t('popupSignup.accept'));
            btnRegisterRef.value
                ?.getInstance()
                .option('text', t('popupSignup.register'));
        }
    }
);
// #endregion

// #region handle events
const handleClickLogin = () => {
    emit('onClickLogin');
};
// #endregion
</script>

<style lang="scss">
.popup-signup {
    .popup-signup-content {
        height: 100%;
        padding: 24px 24px 20px;
        .left {
            width: 45%;
            height: 100%;
            overflow: hidden;
            padding-right: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            img {
                width: 100%;
                object-fit: cover;
            }
            .text {
                text-decoration: underline;
                &:hover {
                    cursor: pointer;
                    color: var(--app-color-primary);
                }
            }
        }
        .right {
            width: 55%;
            height: 100%;
            padding-left: 24px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .above {
                .title {
                    font-size: 30px;
                    font-weight: 700;
                    margin-bottom: 28px;
                }
                .more-option-wrapper {
                    margin-bottom: 28px;
                    justify-content: space-between;
                }
                .firstName,
                .lastName,
                .confirmPassword,
                .account-text-box,
                .password-text-box {
                    margin-bottom: 16px;
                }
            }
        }
    }
}
</style>
