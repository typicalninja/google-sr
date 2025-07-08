/**
 * Translate a phrase to another language.
 * Uses the TranslateResult type.
 * Teaches how to filter for certain types of results.
 */

import { ResultTypes, search, TranslateResult } from "google-sr";

const results = await search({
	query: "translate hello to spanish",
	// we only want the results for the translation
	parsers: [TranslateResult],
});

// find the first translated result
// NOTE: if parsers is set to only one type [ex: TranslateResult] then this will always be the only result
// this is only for demonstration purposes
const translated = results.find(
	(result) => result.type === ResultTypes.TranslateResult,
);

if (!translated) {
	throw new Error("No translated result found");
}

console.log(
	`"${translated.sourceText}" in ${translated.sourceLanguage} translated to ${translated.translationLanguage} is "${translated.translatedText}"`,
);
