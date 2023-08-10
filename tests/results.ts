import { search, searchWithPages } from "../src";
import { expect } from "chai";

describe("One page search", function() {
    it("Default search with query", async () => {
        const searchResult = await search({ query: 'nodejs' });
        // must be greater than 0 (no results)
        expect(searchResult).length.to.be.greaterThan(0)
        searchResult.every((result) => {
            expect(result.link).to.be.a('string');
            expect(result.description).to.be.a('string');
            expect(result.title).to.be.a('string');
        });
     });


     it("Search with safeMode", async () => {
        const nsfwTerm = 'pornhub'
        const searchResult = await search({ query: nsfwTerm, safeMode: true })

        searchResult.every((result) => {
            // if safe is enabled this term will not be present
            expect(result.link).to.not.contain(nsfwTerm)
        })
     })

     it("Search without safeMode", async () => {
        const nsfwTerm = 'pornhub'
        const searchResult = await search({ query: nsfwTerm, safeMode: false })

        const firstResult = searchResult[0]

        expect(firstResult.link).to.contain(nsfwTerm)
     });
});


describe("Multi page search", function() {
     // timeout required since this is fetching every page
    this.timeout(10000);
    it('search multiple pages', async () => {
        const pagesToSearch = 3;
        const result = await searchWithPages({ query: 'nodejs', pages: pagesToSearch })

        expect(result).to.be.lengthOf(pagesToSearch)
        result.every((page) => {
            expect(page).length.to.be.greaterThan(0)
        })
    })
})