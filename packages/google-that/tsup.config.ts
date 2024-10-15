// due to type: module this needs to be imported as a .js file
import { createTsupConfig } from "../../tsup.config.js";

export default [
	createTsupConfig({
		format: ["esm"],
		// cli only, no need for dts
		dts: false,
		minify: true,
	}),
];
