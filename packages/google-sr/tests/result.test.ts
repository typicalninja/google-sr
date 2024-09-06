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
		expect(result.link).to.be.a("string").and.not.empty;
		expect(result.description).to.be.a("string").and.not.empty;
		expect(result.title).to.be.a("string").and.not.empty;
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

		expect(result.sourceLanguage).to.be.a("string").and.not.empty;
		expect(result.sourceText).to.be.a("string").and.not.empty;
		expect(result.translationLanguage).to.be.a("string").and.not.empty;
		expect(result.translationText).to.be.a("string").and.not.empty;
		expect(result.translationPronunciation).to.be.a("string").and.not.empty;
	}
});

test("Search for dictionary results", async () => {
	const queryResult = await search({
		query: "define war",
		resultTypes: [DictionaryResult],
	});
	// only one result should be returned for this query
	expect(queryResult).toHaveLength(1);

	for (const result of queryResult) {
		expect(result.type).toBe(ResultTypes.DictionaryResult);

		expect(result.phonetic).to.be.a("string").and.not.empty;
		expect(result.word).to.be.a("string").and.not.empty;
		expect(result.audio).to.be.a("string").and.not.empty;
		// we only expect 2 definitions for this query
		expect(result.definitions).to.be.an("array").and.toHaveLength(2);

		for (const definition of result.definitions) {
			expect(definition.partOfSpeech).to.be.a("string").and.not.empty;
			// check if partOfSpeech is a valid part of speech
			expect(definition.partOfSpeech).to.be.oneOf([
				// these are only the expected part of speeches for this test query
				// mismatch might indicate a issue
				"noun",
				"verb",
			]);

			expect(definition.definition).to.be.a("string").and.not.empty;
			expect(definition.example).to.be.a("string").and.not.empty;

			expect(definition.synonyms)
				.to.be.an("array")
				.and.to.length.be.greaterThan(0);
			console.log(definition);
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
		expect(result.from).to.be.a("string").and.not.empty;
		expect(result.to).to.be.a("string").and.not.empty;
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

		expect(result.time).to.be.a("string").and.not.empty;
		expect(result.location).to.be.a("string").and.not.empty;
		expect(result.timeInWords).to.be.a("string").and.not.empty;
	}
});
