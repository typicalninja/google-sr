import { searchWithPages } from "../src";
import { expect } from "chai";

describe("#searchWithPages", () => {
    it("Search 3 pages", async function () {
        this.timeout(5000)
        const queryWithPages = await searchWithPages({ query: 'npm js', pages: 3 })
        expect(queryWithPages).to.have.lengthOf(3)
        queryWithPages.every((entry) => {
            expect(entry).length.to.be.greaterThan(1)
        });
    });

    it("Search with delay", async function () {
        const start = Date.now()
        this.timeout(10000)
        const queryWithPages = await searchWithPages({ query: 'npm js', pages: 3, searchDelay: 1000 });
        const end = Date.now()
        // just a simple check to make sure took more than 3 s (3 pages, 1s per page)
        expect(end-start).greaterThan(3000)
        expect(queryWithPages).to.have.lengthOf(3)
        queryWithPages.every((entry) => {
            expect(entry).length.to.be.greaterThan(1)
        });
    });
})