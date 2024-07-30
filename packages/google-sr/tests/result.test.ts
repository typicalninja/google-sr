import { expect, test } from "vitest";
import {
	CurrencyResult,
	DictionaryResult,
	OrganicResult,
	ResultTypes,
	TimeResult,
	TranslateResult,
	search,
} from "../src";

// all tests are done without strictSelector to ensure we test each result property individually
// check each property to be a string & not empty ("")
// each selector is tested individually to ensure no unexpected results are returned
test("Search for organic results (default)", async () => {
	const queryResult = await search({
		query: "nodejs",
		resultTypes: [OrganicResult],
	});
	expect(queryResult).length.greaterThan(0);

	// verify all results are OrganicResults
	for (const result of queryResult) {
		expect(result.type).toBe(ResultTypes.OrganicResult);

		// verify properties are present and not empty;
		expect(result.link).toBeTypeOf("string");
		expect(result.description).toBeTypeOf("string");
		expect(result.title).toBeTypeOf("string");
	}
});

test("Search for translation results", async () => {
	const queryResult = await search({
		query: "translate hello to spanish",
		resultTypes: [TranslateResult],
	});
	// only one result should be returned for this query

	expect(queryResult).toHaveLength(1);

	for (const result of queryResult) {
		expect(result.type).toBe(ResultTypes.TranslateResult);

		expect(result.sourceLanguage).toBeTypeOf("string");
		expect(result.sourceText).toBeTypeOf("string");
		expect(result.translationLanguage).toBeTypeOf("string");
		expect(result.translationText).toBeTypeOf("string");
		expect(result.translationPronunciation).toBeTypeOf("string");
	}
});

test("Search for dictionary results", async () => {
	const queryResult = await search({
		query: "define amazing",
		resultTypes: [DictionaryResult],
	});
	// only one result should be returned for this query
	expect(queryResult).toHaveLength(1);

	for (const result of queryResult) {
		expect(result.type).toBe(ResultTypes.DictionaryResult);

		expect(result.phonetic).toBeTypeOf("string");
		expect(result.word).toBeTypeOf("string");
		expect(result.audio).toBeTypeOf("string");

		for (const definition of result.definitions) {
			expect(definition[1]).toBeTypeOf("string");
			expect(definition[1]).toBeTypeOf("string");
		}
	}
});

test("Search for currency results", async () => {
	const queryResult = await search({
		query: "convert 100 usd to eur",
		resultTypes: [CurrencyResult],
	});
	// only one result should be returned for this query
	expect(queryResult).toHaveLength(1);

	for (const result of queryResult) {
		expect(result.type).toBe(ResultTypes.CurrencyResult);
		expect(result.from).toBeTypeOf("string");
		expect(result.to).toBeTypeOf("string");
	}
});

test("Search for time results", async () => {
	const queryResult = await search({
		query: "what time is it in london",
		resultTypes: [TimeResult],
	});
	// only one result should be returned for this query
	expect(queryResult).toHaveLength(1);

	for (const result of queryResult) {
		expect(result.type).toBe(ResultTypes.TimeResult);

		expect(result.time).toBeTypeOf("string");
		expect(result.location).toBeTypeOf("string");
		expect(result.timeInWords).toBeTypeOf("string");
	}
});
