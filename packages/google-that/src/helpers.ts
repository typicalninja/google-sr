import type { CLIArguments } from "./constants.js";

// validates the options passed in
// Follows following rules:
// - query is required
// - pages and page are mutually exclusive
// - start and pages are mutually exclusive
export function validateOptions(options: CLIArguments): boolean {
	if (!options.query) {
		console.log("Query is required");
		return false;
	}

	if (options.pages && options.page) {
		console.log("Cannot use both pages and page");
		return false;
	}

	if (options.start && !options.pages) {
		console.log("Start can only be used with pages");
		return false;
	}
	// TODO: implement
	return true;
}
