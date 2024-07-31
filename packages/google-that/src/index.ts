#!/usr/bin/env node

import { ResultTypes } from "google-sr";
import yargs from "yargs/yargs";
import { resultTypeArray } from "./constants.js";
import { validateOptions } from "./helpers.js";

// modes
import { runInteractiveSearch } from "./interactive.js";

// for running commands with args we use yargs
const argv = yargs(process.argv.slice(2))
	.options({
		// if we should run in interactive mode, where we will use prompts instead of args
		interactive: { type: "boolean", alias: "i", default: false },
		// main query
		query: { type: "string", alias: "q", demandOption: true },
		// in default mode, output will go to stdout
		write: { type: "boolean", alias: "w", default: false },
		// fetch specific page
		page: { type: "number", alias: "p" },
		// fetch multiple specific pages
		pages: { type: "number", alias: "P" },
		// the cursor start for pages
		start: { type: "number", alias: "s" },
	})
	.option("resultTypes", {
		type: "array",
		alias: "r",
		choices: resultTypeArray,
		default: [ResultTypes.OrganicResult],
	})
	.parseSync();

if (!validateOptions(argv)) {
	process.exit(1);
}

if (argv.interactive) {
	// run in interactive mode
	await runInteractiveSearch();
} else {
	// run in non interactive mode
	console.log("Non interactive mode is not implemented yet");
}
