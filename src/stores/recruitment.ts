import type { ProductModel, RecruitmentPeriodModel, RecruitmentRoundModel } from '@/models';
import { defineStore } from 'pinia';
import { RecruitmentModel } from '@/models/Recruitment';



export const useRecruitmentStore = defineStore('recruitmentStore', {
    state: () => {
        return ({
            recruitment: new RecruitmentModel()
        });
    },
    getters: {
        getRecruitment(): RecruitmentModel {
            return this.recruitment
        }
    },
    actions: {
        addRecruitmentRound(recruitmentRounds: RecruitmentRoundModel[]) {
            recruitmentRounds.forEach((round, index) => {
                round.SordOrder = index + 1
            })
            recruitmentRounds.push({
                RecruitmentRoundID: 0,
                IsSystem: true,
                RecruitmentID: 0,
                RecruitmentRoundName: "Đã tuyển",
                SordOrder: recruitmentRounds.length + 1,
                IsHired: true
            })
            this.recruitment.RecruitmentRounds = recruitmentRounds
        },
        adRecruitmentPeriod(recruitmentPeriods: RecruitmentPeriodModel[]) {
            this.recruitment.RecruitmentPeriods = recruitmentPeriods
        }
    },
});
