<template>
    <base-popup
        v-if="internalValue"
        :config="popupConfig"
        :popupVisible="internalValue"
        @close="internalValue = false"
        ><template #body>
            <div class="popup-signin-content d-flex">
                <div class="left">
                    <img src="/src/assets/images/common/login.jpg" alt="" />
                    <div class="text" @click="handleClickCreate">
                        {{ t('popupSignin.create') }}
                    </div>
                </div>
                <div class="right">
                    <div class="above">
                        <div class="title">{{ t('popupSignin.login') }}</div>
                        <base-text-box
                            ref="accountRef"
                            :config="accountConfig"
                        />
                        <base-text-box
                            ref="passwordRef"
                            :config="passwordConfig"
                        />
                        <div class="more-option-wrapper d-flex-center">
                            <base-check-box
                                ref="rememberRef"
                                :config="rememberConfig"
                            />
                            <span>{{ t('popupSignin.forgot') }}</span>
                        </div>
                        <base-button
                            ref="btnLoginRef"
                            :config="btnLoginConfig"
                        />
                    </div>
                    <div class="text d-flex-center">
                        <span>{{ t('popupSignin.orLogin') }}</span>
                        <Icon icon="devicon:facebook" :width="26" />
                        <Icon icon="skill-icons:twitter" :width="26" />
                        <Icon icon="flat-color-icons:google" :width="26" />
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
    popupConfig,
    accountConfig,
    passwordConfig,
    rememberConfig,
    btnLoginConfig,
} from '@/constants/components/component';
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue3-i18n';

// #region common
const { t, getLocale } = useI18n();

const props = defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'onClickCreate'): void;
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
const rememberRef = ref();
const btnLoginRef = ref();

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            accountRef.value
                ?.getInstance()
                .option('label', t('popupSignin.account'));
            passwordRef.value
                ?.getInstance()
                .option('label', t('popupSignin.password'));
            rememberRef.value
                ?.getInstance()
                .option('text', t('popupSignin.rememberMe'));
            btnLoginRef.value
                ?.getInstance()
                .option('text', t('popupSignin.login'));
        }
    }
);
// #endregion

// #region handle events
const handleClickCreate = () => {
    emit('onClickCreate');
};
// #endregion
</script>

<style lang="scss">
.popup-signin {
    .popup-signin-content {
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
                    span {
                        &:hover {
                            cursor: pointer;
                            color: var(--app-color-primary);
                        }
                    }
                }
                .account-text-box,
                .password-text-box {
                    margin-bottom: 16px;
                }
            }
            .text {
                span {
                    margin-right: 16px;
                }
                svg {
                    margin-right: 8px;
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
