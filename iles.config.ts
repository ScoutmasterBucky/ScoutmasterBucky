import { defineConfig } from 'iles';
import ViteYaml from '@modyfi/vite-plugin-yaml';

export default defineConfig({
    prettyUrls: false,
    siteUrl: 'https://scoutmasterbucky.com/',
    ssg: {
        sitemap: false,
    },
    vite: {
        clearScreen: false,
        plugins: [ViteYaml()],
    },
});
