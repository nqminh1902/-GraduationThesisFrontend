import type { OrdersType } from '@/types';
import i18n from '@/locales/i18n';
const t = i18n.t;
const getLocale = i18n.getLocale;

export const ordersData = ref<OrdersType>({
    dataSource: [
        {
            color: t('color.black'),
            hasService: true,
            newPrice: 53000,
            quantity: 1,
            src: '/src/assets/images/demo/sabo.jpg',
            status: 'Đơn hàng đang được chuẩn bị',
            title: 'Balo học sinh da cao cấp Quảng Châu',
            total: 49000,
            alt: '',
            isHot: true,
            oldPrice: 68000,
        },
        {
            color: t('color.black'),
            hasService: true,
            newPrice: 53000,
            quantity: 1,
            src: '/src/assets/images/demo/ace.png',
            status: 'Đơn hàng đang được chuẩn bị',
            title: 'Balo học sinh da cao cấp Quảng Châu',
            total: 49000,
            alt: '',
            isHot: true,
            oldPrice: 68000,
        },
        {
            color: t('color.black'),
            hasService: true,
            newPrice: 53000,
            quantity: 1,
            src: '/src/assets/images/demo/luffy.jpg',
            status: 'Đơn hàng đang được chuẩn bị',
            title: 'Balo học sinh da cao cấp Quảng Châu',
            total: 49000,
            alt: '',
            isHot: true,
            oldPrice: 68000,
        },
    ],
});

watch(
    () => getLocale(),
    (currentLanguage) => {
        if (currentLanguage) {
            ordersData.value.dataSource = [
                {
                    color: t('color.black'),
                    hasService: true,
                    newPrice: 53000,
                    quantity: 1,
                    src: '/src/assets/images/demo/sabo.jpg',
                    status: 'Đơn hàng đang được chuẩn bị',
                    title: 'Balo học sinh da cao cấp Quảng Châu',
                    total: 49000,
                    alt: '',
                    isHot: true,
                    oldPrice: 68000,
                },
            ];
        }
    }
);
