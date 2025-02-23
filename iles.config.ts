import { defineConfig } from 'iles'
import ViteYaml from '@modyfi/vite-plugin-yaml';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
    prettyUrls: false,
    siteUrl: 'https://scoutmasterbucky.com/',
    ssg: {
        sitemap: false,
    },
    vite: {
        clearScreen: false,
        plugins: [
            svelte(),
            ViteYaml(),
        ],
    }
})
