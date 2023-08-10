import { expect } from "chai";
import { search } from "../src";

describe("Check validation of functions", function() {
    it('Should error on invalid query provided', async () => {
        try {
            await search({ })
        }
        catch(error) {
            expect(error).to.be.instanceOf(TypeError);
            expect((error as TypeError).message).to.be.equal('Search query must be a string, received undefined')
        }
    })
})