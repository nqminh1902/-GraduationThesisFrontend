import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { startup } from './startup_import';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
startup(app);
app.mount('#app');