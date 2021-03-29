## Google-sr

Yet another library to do google searches.

Below is a simple example of using this package

## Usage

### with .then
#### Without safe mode
```
const search = require('google-sr');

search('node.js', { safe: false }).then(r => console.log(r))
```

#### With safe mode

```
const search = require('google-sr');

search('node.js').then(r => console.log(r))
```

### With async/await

```
const search = require('google-sr');

const res = await search('node.js')

// search('node.js', { safe: false }) for without safe mode

console.log(res)
```

# Support

Join my discord server for support: [discord](https://discord.gg/9s52pz6nWX)