import type { RecruitmentRoundModel } from "@/models"

export const jobPositions = [
    {
        JobPositionID: 1,
        JobPositionName: "Quản đốc công việc",
    },
    {
        JobPositionID: 2,
        JobPositionName: "Giáo viên tiếng anh",
    },
    {
        JobPositionID: 3,
        JobPositionName: "Lập trình viên",
    },
]

export const carrers = [
    {
        CareerID: 1,
        CarrerName: "Chăm sóc khách hàng",
    },
    {
        CareerID: 2,
        CarrerName: "Thư kí",
    },
    {
        CareerID: 3,
        CarrerName: "Kế toán",
    },
]

export const workLocations = [
    {
        WorkLocationID: 1,
        WorkLocationName: "Văn phòng Hà Nội",
    },
    {
        WorkLocationID: 2,
        WorkLocationName: "Văn phòng thành phố Hồ Chí Minh",
    },
    {
        WorkLocationID: 3,
        WorkLocationName: "Chi nhánh Cầu Giấy",
    },
]

export const currencys = [
    {
        id: 1,
        value: "VND"
    },
    {
        id: 2,
        value: "USA"
    },
    {
        id: 3,
        value: "SGD"
    },
    {
        id: 4,
        value: "JPY"
    },
    {
        id: 5,
        value: "CNY"
    },
]

export const workTypes = [
    {
        TypeOfWorkID: 1,
        TypeOfWorkName: "Toàn thời gian",
    },
    {
        TypeOfWorkID: 2,
        TypeOfWorkName: "Bán thời gian",
    },
    {
        TypeOfWorkID: 3,
        TypeOfWorkName: "Hợp đồng thời vụ",
    },
    {
        TypeOfWorkID: 4,
        TypeOfWorkName: "Thực tập sinh",
    },
    {
        TypeOfWorkID: 5,
        TypeOfWorkName: "Cộng tác viên",
    },
    {
        TypeOfWorkID: 6,
        TypeOfWorkName: "Freelance",
    }
]

export const recruitmentRounds = [
    {
        RecruitmentRoundID: 1,
        RecruitmentRoundName: "Ứng tuyển",
        IsSystem: true,
        SordOrder: 1,
        RecruitmentID: 0
    },
    {
        RecruitmentRoundID: 2,
        RecruitmentRoundName: "Sơ loại hồ sơ",
        IsSystem: true,
        SordOrder: 2,
        RecruitmentID: 0
    },
    {
        RecruitmentRoundID: 3,
        RecruitmentRoundName: "Thi tuyển",
        IsSystem: true,
        RecruitmentID: 0,
        SordOrder: 3
    },
    {
        RecruitmentRoundID: 4,
        RecruitmentRoundName: "Phỏng vấn",
        IsSystem: true,
        RecruitmentID: 0,
        SordOrder: 4
    },
    {
        RecruitmentRoundID: 5,
        RecruitmentRoundName: "Học việc",
        IsSystem: true,
        RecruitmentID: 0,
        SordOrder: 5
    },
    {
        RecruitmentRoundID: 0,
        IsSystem: true,
        RecruitmentID: 0,
        RecruitmentRoundName: "Đã tuyển",
        SordOrder: 6
    }
] as RecruitmentRoundModel[]