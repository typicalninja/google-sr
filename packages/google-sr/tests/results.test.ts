import { afterEach, describe, it } from "vitest";
import {
	DictionaryResult,
	KnowledgePanelResult,
	NewsResult,
	OrganicResult,
	RelatedSearchesResult,
	ResultTypes,
	search,
	TimeResult,
	TranslateResult,
	UnitConversionResult,
} from "../src/index.js";

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

// Due to network latency and potential rate limiting,
// we set a longer timeout for the tests that query Google.
const testTimeouts = 60 * 1000; // 60 seconds (1 minute)

const GLOBAL_SEARCH_OPTIONS = {
	requestConfig: {
		queryParams: {
			// force results to be in english and from the US
			// SEE https://github.com/typicalninja/google-sr/pull/70
			gl: "us", // Country code
			hl: "en", // Language code
		},
	},
};

describe(
	"search results",
	{ skip: !runLiveTests, timeout: testTimeouts },
	() => {
		it("Search for organic results", async ({ expect }) => {
			const results = await search({
				query: "nodejs",
				parsers: [OrganicResult],
				...GLOBAL_SEARCH_OPTIONS,
			});

			// Expect at least 5 results
			expect(results).to.be.an("array").and.have.lengthOf.at.least(5);

			// verify all results are OrganicResults
			for (const res of results) {
				expect(res.type).toBe(ResultTypes.OrganicResult);
				expect(res.link).to.be.a("string").and.not.empty;
				// description is optional, check if its a string or undefined
				expect(["string", "undefined"]).toContain(typeof res.description);
				expect(res.source).to.be.a("string").and.not.empty;
				expect(res.title).to.be.a("string").and.not.empty;
				expect(res.isAd).to.be.a("boolean");
			}
		});

		it("Search for translation results", async ({ expect }) => {
			const results = await search({
				query: "translate hello to spanish",
				parsers: [TranslateResult],
				...GLOBAL_SEARCH_OPTIONS,
			});

			// Expect only one result
			expect(results).to.be.an("array").and.have.lengthOf(1);
			const res = results[0];
			expect(res.type).toBe(ResultTypes.TranslateResult);
			expect(res.sourceLanguage)
				.to.be.a("string")
				.and.equal("English (detected)");
			expect(res.sourceText).to.be.a("string").and.equal("hello");
			expect(res.translationLanguage).to.be.a("string").and.equal("Spanish");
			expect(res.translatedText).to.be.a("string").and.equal("Hola");
		});

		it("Search for knowledge panel results", async ({ expect }) => {
			const results = await search({
				query: "Albert Einstein",
				parsers: [KnowledgePanelResult],
				...GLOBAL_SEARCH_OPTIONS,
			});

			// Expect only one result
			expect(results).to.be.an("array").and.have.lengthOf(1);
			const res = results[0];
			expect(res.type).toBe(ResultTypes.KnowledgePanelResult);
			expect(res.title).to.be.a("string").and.not.empty;
			expect(res.description).to.be.a("string").and.not.empty;
			// while imageLink is optional, we expect it to be present for this specific query
			expect(res.imageLink).to.be.a("string").and.not.empty;
			expect(res.label).to.be.a("string").and.not.empty;
			expect(res.sourceLink).to.be.a("string").and.not.empty;

			expect(res.metadata).to.be.an("array").and.not.empty;

			// needed to satisfy the type checker
			if (res.metadata) {
				for (const meta of res.metadata) {
					expect(meta.label).to.be.a("string").and.not.empty;
					expect(meta.value).to.be.a("string").and.not.empty;
				}
			}
		});

		it("Search for unit conversion results", async ({ expect }) => {
			const results = await search({
				query: "100 USD to EUR",
				parsers: [UnitConversionResult],
				...GLOBAL_SEARCH_OPTIONS,
			});

			// Expect only one result
			expect(results).to.be.an("array").and.have.lengthOf(1);
			const res = results[0];
			expect(res.type).toBe(ResultTypes.UnitConversionResult);
			expect(res.from).to.be.a("string").and.equal("100 United States Dollar");
			// unless we have some magic power to predict the future, the value will change
			// so just check it at least contains "Euro"
			expect(res.to).to.be.a("string").and.contains("Euro");
		});

		it("Search for dictionary results", async ({ expect }) => {
			const results = await search({
				query: "define serendipity",
				parsers: [DictionaryResult],
				...GLOBAL_SEARCH_OPTIONS,
			});

			// Expect only one result
			expect(results).to.be.an("array").and.have.lengthOf(1);
			const res = results[0];
			expect(res.type).toBe(ResultTypes.DictionaryResult);
			// cannot reliably check the word and phonetic, so just check they are strings and not empty
			expect(res.word).to.be.a("string").and.not.empty;
			expect(res.phonetic).to.be.a("string").and.not.empty;
			expect(res.meanings).to.be.a("array").and.not.empty;
			// needed to satisfy the type checker
			if (res.meanings) {
				for (const meaning of res.meanings) {
					expect(meaning.partOfSpeech).to.be.a("string").and.not.empty;
					expect(meaning.definitions).to.be.an("array").and.not.empty;
					for (const definition of meaning.definitions) {
						expect(definition.definition).to.be.a("string").and.not.empty;
						expect(definition.example).to.be.a("string");
					}
				}
			}
		});

		it("Search for time results", async ({ expect }) => {
			const results = await search({
				query: "time in new york",
				parsers: [TimeResult],
				...GLOBAL_SEARCH_OPTIONS,
			});

			// Expect only one result
			expect(results).to.be.an("array").and.have.lengthOf(1);
			const res = results[0];
			expect(res.type).toBe(ResultTypes.TimeResult);
			// time can be variable, so just check it's a string and not empty
			expect(res.time).to.be.a("string").and.not.empty;
			expect(res.location).to.be.a("string").and.not.empty;
			expect(res.timeInWords).to.be.a("string").and.not.empty;
		});

		it("Search for related searches results", async ({ expect }) => {
			const results = await search({
				query: "javascript frameworks",
				parsers: [RelatedSearchesResult],
				...GLOBAL_SEARCH_OPTIONS,
			});

			expect(results).to.be.an("array").and.have.lengthOf(1);
			const res = results[0];
			expect(res.type).toBe(ResultTypes.RelatedSearchesResult);
			expect(res.queries).to.be.an("array");
			// Verify queries are strings and not empty
			if (res.queries) {
				for (const query of res.queries) {
					expect(query).to.be.a("string").and.not.empty;
				}
			}
		});

		it("Search for news results", async ({ expect }) => {
			const globalSearchOptionsCopy = {
				...GLOBAL_SEARCH_OPTIONS,
			};
			// switch tab to news
			Object.defineProperty(
				globalSearchOptionsCopy.requestConfig.queryParams,
				"tbm",
				{
					value: "nws", // tbm=nws for news search
					writable: false,
					configurable: false,
					enumerable: true,
				},
			);

			const results = await search({
				query: "latest news on AI",
				parsers: [NewsResult],
				...globalSearchOptionsCopy,
			});
			// Expect at least 5 results
			expect(results).to.be.an("array").and.have.lengthOf.at.least(5);

			// verify all results are NewsResults
			for (const res of results) {
				expect(res.type).toBe(ResultTypes.NewsResult);
				expect(res.title).to.be.a("string").and.not.empty;
				expect(res.link).to.be.a("string").and.not.empty;
				expect(res.source).to.be.a("string").and.not.empty;
			}
		});
	},
);
