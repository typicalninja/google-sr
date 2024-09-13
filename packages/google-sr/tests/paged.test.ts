import { expect, test } from "vitest";
import { OrganicResult, ResultTypes, searchWithPages } from "../src";

// since other search types are tested in result.test.ts, we only need to generic test paged results
test("Search for paged search results", async () => {
	const queryResult = await searchWithPages({
		query: "nodejs",
		resultTypes: [OrganicResult],
		pages: 2,
		// on some platforms (i.e github actions) it returns some weird results that does not have a link/description/title
		// so we set strictSelector to true to ignore those results
		//TODO: recheck in future as the tests pass on local machines (tested on 2 different machines)
		strictSelector: true,
	});
	expect(queryResult).toHaveLength(2);

	// verify all results are OrganicResults
	for (const page of queryResult) {
		expect(page).length.greaterThan(0);
		for (const result of page) {
			expect(result.type).toBe(ResultTypes.OrganicResult);

			// verify properties are present and not empty;
			expect(result.link).to.be.a("string").and.not.empty;
			expect(result.description).to.be.a("string").and.not.empty;
			expect(result.title).to.be.a("string").and.not.empty;
		}
	}
});
