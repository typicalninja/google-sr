import { ResultTypes, searchWithPages } from "../src";
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
})