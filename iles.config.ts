import { defineConfig } from 'iles'
import ViteYaml from '@modyfi/vite-plugin-yaml';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
    siteUrl: 'https://scoutmasterbucky.com/',
    vite: {
        clearScreen: false,
        plugins: [
            svelte(),
            ViteYaml(),
        ],
    }
})
