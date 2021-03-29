const cheerio = require('cheerio')
const fetch = require('node-fetch')
const querystring = require('querystring')
const { getDescription, parseUrl, PrepareUrl } = require('./utils.js');


const DescriptionSelector = '#main > div > div > div > div:not(.v9i61e) > div.AP7Wnd'
const linkSelector = 'div.ZINbbc > div:nth-child(1) > a'
const TitleSelector = 'div.ZINbbc > div:nth-child(1) > a > h3'



async function search(query, options = {}) {
    const Poptions = {
        query: query,
        safeMode: options.safe && options.safe !== 'active' ? options.safe : 'active'
    }
     let URL = PrepareUrl(Poptions)
     console.log(URL)
    const resp = await fetch(URL).then(r => r.text())
    const $ = cheerio.load(resp);
    const response = {
        url: URL,
        searchResults: [],
        raw: resp,

    }


    const titles = $(TitleSelector).contents();

    titles.each((index, elem) => {
        if (elem.data) {
            response.searchResults.push({ title: elem.data });
        } else {
            response.searchResults.push({ title: elem.children[0].data });
        }
      });

      $(linkSelector).map((index, elem) => {
        if (index < response.searchResults.length) {
            response.searchResults[index] = Object.assign(response.searchResults[index], {
            link: parseUrl(elem.attribs.href)
          });
        }
      });

      
  $(DescriptionSelector).map((index, elem) => {
    if (index < response.searchResults.length) {
        response.searchResults[index] = Object.assign(response.searchResults[index], {
        description: getDescription(elem),
      });
    }
  });
    

      return response;
    
}

module.exports = search;

/*
$(linkSel).each((index, elem) => {
        const EscapedLink = elem.attribs.href.replace('/url?q=', "")
        var titleElem = $(elem).find(titlesel)
        const item = {
            title: $(titleElem).contents(),
            link: EscapedLink,
            elem: elem,
            atr: elem.attribs
        }
    res.searchResults.push(item)
      });
    */