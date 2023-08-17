import { defineConfig, Options } from 'tsup';

export function createTsupConfig({
	entry = ['src/index.ts'],
	external = [],
	noExternal = [],
	platform = 'node',
	format = ['cjs', 'esm'],
	target = 'es2022',
	skipNodeModulesBundle = true,
	clean = true,
	shims = false,
	minify = false,
	splitting = false,
	keepNames = true,
	dts = true,
	sourcemap = false,
	esbuildPlugins = [],
	outDir = 'dist',
}: Options = {}) {
	return defineConfig({
		entry,
		external,
		noExternal,
		platform,
		format,
		skipNodeModulesBundle,
		target,
		clean,
		shims,
		minify,
		splitting,
		keepNames,
		dts,
		sourcemap,
		esbuildPlugins,
		outDir,
	});
}