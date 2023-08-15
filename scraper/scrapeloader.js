/** Loads scraped content for tests */
const fs = require('fs/promises')
const path = require('path');
const { load } = require('cheerio');

const file = process.argv[process.argv.length - 1] || './downloaded.html'


fs.readFile(path.join(__dirname, file)).then(content => {
    const string = content.toString('utf-8');
    const $ = load(string);
    // do test
    // * $('audio:first').attr('src') audio
    // * $('span > div.BNeawe.tAd8D.AP7Wnd').text().trim() phonetic
    // * $('h3 > div.BNeawe.deIvCb.AP7Wnd').text().trim() word
    // * $('div.v9i61e > div.BNeawe > span.r0bn4c.rQMQod').text().trim() examples
    // * div.v9i61e > div.BNeawe.s3v9rd.AP7Wnd:not(:has(span.r0bn4c.rQMQod))
    const definitions = []
    $('div.v9i61e > div.BNeawe.s3v9rd.AP7Wnd:not(:has(span.r0bn4c.rQMQod))').each((index, el) => {
        definitions[index] = [];
        definitions[index].push($(el).text().trim())
    })

    $('div.v9i61e > div.BNeawe > span.r0bn4c.rQMQod').each((index, el) => {
        if(definitions[index]) {
            definitions[index].push($(el).text().trim())
        }
    })
    //! $('.v9i61e').text() synonyms, defs, and examples
  console.log(definitions)
})