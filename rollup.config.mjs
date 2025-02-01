import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: 'js-bundle/index.mjs',
    output: {
        file: 'site/js/bundle.js',
        format: 'iife',
    },
    plugins: [nodeResolve()],
};
