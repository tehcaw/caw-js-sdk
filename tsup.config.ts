import { defineConfig } from 'tsup'

export default defineConfig((options) => {
    return {
        entry: ['src/**/*.ts'],
        format: ['cjs', 'esm'],
        clean: true,
        splitting: true,
        treeshake: true,
        minify: !options.watch,
    }
});
