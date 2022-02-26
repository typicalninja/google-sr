const { search } = require('./index')
console.log(search)
search('javascript', { safeMode: true }).then(r => console.log(r))