import { expect, test } from "vitest";
import {
	CurrencyResult,
	DictionaryResult,
	KnowledgePanelResult,
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
		// on some platforms (i.e github actions) it returns some weird results that does not have a link/description/title
		// so we set strictSelector to true to ignore those results
		//TODO: recheck in future as the tests pass on local machines (tested on 2 different machines)
		strictSelector: true,
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
		query: "translate hello to japanese",
		resultTypes: [TranslateResult],
	});
	// only one result should be returned for this query

	expect(queryResult).toHaveLength(1);

	for (const result of queryResult) {
		expect(result.type).toBe(ResultTypes.TranslateResult);

		expect(result.sourceLanguage).to.be.a("string").and.not.empty;
		expect(result.sourceText).to.be.a("string").and.not.empty;
		expect(result.translationLanguage).to.be.a("string").and.not.empty;
		expect(result.translatedText).to.be.a("string").and.not.empty;
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

test("Search for Knowledge panel results", async () => {
	const queryResult = await search({
		// just a great movie
		query: "Interstellar",
		resultTypes: [KnowledgePanelResult],
	});
	// only one result should be returned for this query
	expect(queryResult).toHaveLength(1);
	// only 1 result expected
	const result = queryResult[0];
	// validate base data
	expect(result.title).to.be.a("string");
	expect(result.description).to.be.a("string");

	// validate metadata
	for (const meta of result.metadata) {
		expect(meta.label).to.be.a("string");
		expect(meta.value).to.be.a("string");
	}

	const meta1 = result.metadata[0];
	// validate 1st metadata, if 1st is correct, others should be correct too
	expect(meta1.label).toBe("Release date");
	expect(meta1.value).toBe("October 26, 2014 (USA)");

	// validate images
	for (const image of result.images) {
		expect(image.source).to.be.a("string");
		expect(image.url).to.be.a("string");
		// validate urls
		expect(image.url).to.match(/^https?:\/\//);
		expect(image.source).to.match(/^https?:\/\//);
	}

	// validate catalog
	for (const catalog of result.catalog) {
		expect(catalog.title).to.be.a("string");
		// validate each item in catalog
		for (const item of catalog.items) {
			expect(item.title).to.be.a("string");
			expect(item.image).to.be.a("string");
			expect(item.image).to.match(/^https?:\/\//);
			expect(item.caption).to.be.a("string");
		}
	}

	// validate 1st catalog
	const catalog1 = result.catalog[0];
	expect(catalog1.title).toBe("Cast");
	const item1 = catalog1.items[0];
	expect(item1.title).toBe("Matthew McConaughey");
	expect(item1.caption).toBe("Cooper");
});
