import type { FeatureName } from '@/enums';

export interface HeaderItemType {
    name: FeatureName;
    icon: string;
    isShowNoti: boolean;
    noti?: number;
}
