const axios = require('axios');
const fsAsync = require('fs/promises')
const cheerio = require('cheerio');
const path = require('path')

const query = process.argv[process.argv.length - 1] || 'nodejs'

console.log(`
===============Query===============


Search: ${query}


====================================
`)

axios.get('https://www.google.com/search', {
    headers: {
        'Accept': 'text/html',
        'accept-encoding': 'gzip, deflate',
        'Accept-language': 'en-US,en',
        'referer': 'https://www.google.com/',
        'upgrade-insecure-requests': 1,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
    },
    params: {
        q: query,
        gbv: '1'
    },
    responseType: "text",
    responseEncoding: 'utf-8',
}).then((response) => {
    console.log(`Downloaded content`);
    const html = response.data;
    const $ = cheerio.load(html);

    const mainContent = $('#main')
    // filter out uneeded parts
    mainContent.find('footer, header, script, svg, style').remove();

    fsAsync.writeFile(path.join(__dirname, `./downloaded-${Date.now()}.html`), mainContent.html()).then(() => {
        console.log(`Created file`)
    })
    .catch(() => {
        console.log(`================Failed==================`)
    })
})