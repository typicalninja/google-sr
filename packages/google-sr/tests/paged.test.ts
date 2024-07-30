import { expect, test } from "vitest";
import { OrganicResult, ResultTypes, searchWithPages } from "../src";

// since other search types are tested in result.test.ts, we only need to generic test paged results
test("Search for paged search results", async () => {
	const queryResult = await searchWithPages({
		query: "nodejs",
		resultTypes: [OrganicResult],
		pages: 2,
	});
	expect(queryResult).toHaveLength(2);

	// verify all results are OrganicResults
	for (const page of queryResult) {
		expect(page).length.greaterThan(0);
		for (const result of page) {
			expect(result.type).toBe(ResultTypes.OrganicResult);

			// verify properties are present and not empty;
			expect(result.link).toBeTypeOf("string");
			expect(result.description).toBeTypeOf("string");
			expect(result.title).toBeTypeOf("string");
		}
	}
});
