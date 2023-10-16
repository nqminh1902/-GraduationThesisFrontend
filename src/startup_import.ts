import type { App } from 'vue';
import 'devextreme/dist/css/dx.light.css';
import '@/assets/styles/index.css';
import '@/assets/styles/index.scss';
import { clickOutside, copyToClipboard } from './plugins';
import i18n from './locales/i18n';

export const startup = (app: App) => {
    app.use(i18n);
    app.use(clickOutside);
    app.use(copyToClipboard);

    return app;
};
