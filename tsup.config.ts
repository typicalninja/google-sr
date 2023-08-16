import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  clean: true,
  format: ['cjs'],
  platform: 'node',
  target: 'es2022',
  skipNodeModulesBundle: true,
  keepNames: true,
  dts: true,
  minify: true
})