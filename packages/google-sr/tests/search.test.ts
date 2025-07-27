import { afterEach, describe, expect, it } from "vitest";
import { OrganicResult, ResultTypes } from "../src/index.js";
import { search, searchWithPages } from "../src/search.js";

// Live tests require querying google, which can lead to rate limiting or blocking.
// on development machines, we run live tests only if explicitly enabled
// or in CI environments where it's safe to do so.
const runLiveTests = process.env.RUN_LIVE_TESTS === "1";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

if (runLiveTests) {
	afterEach(async () => {
		// Cooldown of 5 seconds between tests to avoid rate limiting
		await delay(5000);
	});
}

const GLOBAL_SEARCH_OPTIONS = {
	requestConfig: {
		queryParams: {
			gl: "us", // Country code
			hl: "en", // Language code
		},
	},
};

describe("search", () => {
	it("throws if options are missing", async () => {
		// @ts-expect-error Testing missing options
		await expect(search()).rejects.toThrow(TypeError);
	});

	it("throws if options are invalid", async () => {
		// @ts-expect-error Testing invalid options
		await expect(search({ query: null })).rejects.toThrow(TypeError);
	});
});

describe("searchWithPages", () => {
	it("throws if options are missing", async () => {
		// @ts-expect-error Testing missing options
		await expect(searchWithPages()).rejects.toThrow(TypeError);
	});

	it("throws if pages parameter is invalid", async () => {
		await expect(
			// @ts-expect-error Testing invalid pages type
			searchWithPages({ query: "test", pages: "1" }),
		).rejects.toThrow(TypeError);
		await expect(
			// @ts-expect-error Testing invalid pages type
			searchWithPages({ query: "test", pages: {} }),
		).rejects.toThrow(TypeError);
		await expect(
			// @ts-expect-error Testing invalid pages type
			searchWithPages({ query: "test", pages: null }),
		).rejects.toThrow(TypeError);
	});

	it("throws if query is invalid", async () => {
		// @ts-expect-error Testing invalid query
		await expect(searchWithPages({ query: null, pages: 1 })).rejects.toThrow(
			TypeError,
		);
		await expect(
			// @ts-expect-error Testing invalid query
			searchWithPages({ query: undefined, pages: [0, 10] }),
		).rejects.toThrow(TypeError);
		// @ts-expect-error Testing invalid query
		await expect(searchWithPages({ query: 123, pages: 1 })).rejects.toThrow(
			TypeError,
		);
	});

	it(
		"handles number-based page count correctly",
		{ skip: !runLiveTests },
		async ({ expect }) => {
			const results = await searchWithPages({
				query: "nodejs",
				pages: 2,
				parsers: [OrganicResult],
				...GLOBAL_SEARCH_OPTIONS,
			});

			expect(results).to.be.an("array").with.lengthOf(2);
			// Each page should have results
			for (const pageResults of results) {
				expect(pageResults).to.be.an("array").and.not.empty;
				// Verify each result is an OrganicResult
				for (const result of pageResults) {
					expect(result.type).toBe(ResultTypes.OrganicResult);
					expect(result.link).to.be.a("string").and.not.empty;
					expect(result.title).to.be.a("string").and.not.empty;
				}
			}
		},
	);

	it(
		"handles array-based page selection correctly",
		{ skip: !runLiveTests },
		async ({ expect }) => {
			const results = await searchWithPages({
				query: "silksong",
				pages: [0, 20], // First and third page
				parsers: [OrganicResult],
				...GLOBAL_SEARCH_OPTIONS,
			});

			expect(results).to.be.an("array").with.lengthOf(2);
			// Each page should have results
			for (const pageResults of results) {
				expect(pageResults).to.be.an("array").and.not.empty;
				// Verify each result is an OrganicResult
				for (const result of pageResults) {
					expect(result.type).toBe(ResultTypes.OrganicResult);
					expect(result.link).to.be.a("string").and.not.empty;
					expect(result.title).to.be.a("string").and.not.empty;
				}
			}
		},
	);
});
