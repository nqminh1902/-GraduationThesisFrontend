import { LanguageEnum, UnitOption } from '@/enums';
import type { UserType } from '@/types';
import { defineStore } from 'pinia';
import { readonly } from 'vue';

function getUserOptionStorage(): UserType {
    const userOptions = localStorage.getItem('userOptions');
    if (userOptions) {
        return JSON.parse(userOptions);
    } else {
        return {
            UserName: 'nnhiep',
            Age: 21,
            Email: 'nnhiep582k2@gmail.com',
            LanguageOption: LanguageEnum.en,
            UnitOption: UnitOption.USD,
            IsLogin: false,
        };
    }
}

export const useUserOptionStore = defineStore('user', () => {
    const userOptions = ref<UserType>(getUserOptionStorage());

    const initData = () => {
        userOptions.value = getUserOptionStorage();
    };

    const changeLanguageOption = (newLanguage: string) => {
        userOptions.value.LanguageOption = newLanguage;
        localStorage.setItem('userOptions', JSON.stringify(userOptions.value));
    };

    const changeUnitOption = (newUnit: UnitOption) => {
        userOptions.value.UnitOption = newUnit;
        localStorage.setItem('userOptions', JSON.stringify(userOptions.value));
    };

    return {
        userOptions: readonly(userOptions),
        initData,
        changeLanguageOption,
        changeUnitOption,
    };
});
