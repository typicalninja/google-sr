const querystring = require('querystring')
let URL = 'https://www.google.com/search'
function parseUrl(url) {
    if (!url) {
        return undefined;
      }
     url = url.replace('/url?q=', '')
      return url;
}

function PrepareUrl(options) {
const optionsForQueryString = {
    q: options.query,
}
if(options.safeMode == 'active') optionsForQueryString.safe = 'active'

const url = URL + '?' + querystring.stringify(optionsForQueryString)

return url;
}

function getDescription(elem) {
    function findData(child) {
        if (!child.data) {
          return child.children.map((c) => c.data || findData(c));
        }
        return child.data;
      }

      return elem.children && elem.children.length > 0 ? elem.children.map((child) => Array(findData(child)).join('')).join('') : '';
}

module.exports = {
    parseUrl,
    getDescription,
    PrepareUrl
}