
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            dts: true,
            imports: [
                {
                    vue: ['ref', 'computed', 'watch'],
                },
            ],
        }),
    ],
    css: {
        postcss: {
            plugins: [require('tailwindcss'), require('autoprefixer')],
        },
    },
    resolve: {
        alias: {
            inferno: 'inferno/dist/index.dev.esm.js',
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
