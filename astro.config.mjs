// @ts-check
import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';
import { literalsHtmlCssMinifier } from '@literals/rollup-plugin-html-css-minifier';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [literalsHtmlCssMinifier(), yaml()],
    },
});
