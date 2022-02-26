const cheerio = require('cheerio')
const fetch = require('node-fetch')
const querystring = require('querystring')
const { getDescription, parseUrl, PrepareUrl } = require('./utils.js');


let DescriptionSelector = '#main > div > div > div > div:not(.v9i61e) > div.AP7Wnd'
let linkSelector = 'div.ZINbbc > div:nth-child(1) > a'
let TitleSelector = 'div.ZINbbc > div:nth-child(1) > a > h3'



async function search(query, options = {}) {
    const Poptions = {
        query: query,
        safeMode: options.safe ? options.safe !== 'active' ? false : 'active' : options.safe !== false ? 'active' : 'false',
        page: options.page ? options.page : false
    }
     let URL = PrepareUrl(Poptions)
     if(options.selectors){
       if(options.selectors.linkSelector) linkSelector = options.selectors.linkSelector
       if(options.selectors.DescriptionSelector) DescriptionSelector = options.selectors.DescriptionSelector
       if(options.selectors.TitleSelector) linkSelector = options.selectors.TitleSelector
     }
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

