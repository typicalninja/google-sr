import { ResultTypes, search } from "../src";
import { expect } from "chai";

describe('#search', () => {
    // default option testing
    it("Search one page on query", async () => {
        const queryResult =  await search({ query: 'nodejs' });
        
        expect(queryResult).length.to.be.greaterThan(0);
        queryResult.every((result) => {
            if(result.type === ResultTypes.SearchResult) {
                expect(result.link).to.be.a('string');
                expect(result.description).to.be.a('string');
                expect(result.title).to.be.a('string');
            }
            else throw new TypeError(`Expected result to be a #SearchResult received ${result.type}`)
        });
    });

    // translation testing
    it("Search for translation", async () => {
        const queryResult = await search({ query: 'translate hello to spanish', filterResults: [ResultTypes.TranslateResult] });
        expect(queryResult).length.to.be.greaterThan(0).and.lessThan(2)

        const translationResult = queryResult[0];
        if(translationResult.type === ResultTypes.TranslateResult) {
            expect(translationResult.translation.language).to.be.a('string')
            expect(translationResult.translation.text).to.be.a('string')

            expect(translationResult.source.language).to.be.a('string')
            expect(translationResult.source.text).to.be.a('string')
        }
        else throw new TypeError(`Expected result to only contain #TranslateResult received ${translationResult.type}`)
    });


    it("Search for dictionary definitions", async () => {
        const queryResult = await search({ query: 'define amazing', filterResults: [ResultTypes.DictionaryResult] });
        expect(queryResult).length.to.be.greaterThan(0).and.lessThan(2)
        const definitionResult = queryResult[0];
        if(definitionResult.type === ResultTypes.DictionaryResult) {
            expect(definitionResult.phonetic).to.be.a('string')
            expect(definitionResult.word).to.be.a('string')
            expect(definitionResult.definitions).length.to.be.greaterThan(0)
        }
        else throw new TypeError(`Expected result to only contain #DictionaryResult received ${definitionResult.type}`)
    });

    it("Search for current time", async () => {
        const queryResult = await search({ query: 'current time in usa', filterResults: [ResultTypes.TimeResult] });
        expect(queryResult).length.to.be.greaterThan(0).and.lessThan(2)
        const timeResult = queryResult[0];
        if(timeResult.type === ResultTypes.TimeResult) {
            expect(timeResult.location).to.be.a('string')
            expect(timeResult.time).to.be.a('string')
            expect(timeResult.timeInWords).to.be.a('string')
        }
        else throw new TypeError(`Expected result to only contain #TimeResult received ${timeResult.type}`)
    });

    it("Search for currency conversions", async () => {
        const queryResult = await search({ query: 'convert 10 usd to cad', filterResults: [ResultTypes.CurrencyResult] });
        expect(queryResult).length.to.be.greaterThan(0).and.lessThan(2);
        const currencyResult = queryResult[0];
        if(currencyResult.type === ResultTypes.CurrencyResult) {
            expect(currencyResult.formula).to.be.a('string')
            expect(currencyResult.to).to.be.a('string')
            expect(currencyResult.from).to.be.a('string')
        }
        else throw new TypeError(`Expected result to only contain #CurrencyResult received ${currencyResult.type}`)
    })
})