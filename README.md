## Google-sr

Yet another library to do google searches.

Below is a simple example of using this package

## Usage

<<<<<<< HEAD
#### with `.then`
##### Without safe mode
```ts
import search from 'google-sr'

search('node.js', { safeMode: false }).then(r => console.log(r))
```

##### With safe mode

```ts
import search from 'google-sr'
=======
### with .then
#### Without safe mode
```
const search = require('google-sr');

search('node.js', { safe: false }).then(r => console.log(r))
```

#### With safe mode

```
const search = require('google-sr');
>>>>>>> 177d5b64b530df36c47743da1ea86b103c45e835

search('node.js').then(r => console.log(r))
```

### With async/await

<<<<<<< HEAD
```ts
import search from 'google-sr'

// use an iife to use await
(async () => {
  const result = await search('node.js')
  console.log(result)
  // search('node.js', { safeMode: false }) for without safe mode
})()
=======
```
const search = require('google-sr');

const res = await search('node.js')

// search('node.js', { safe: false }) for without safe mode

console.log(res)
>>>>>>> 177d5b64b530df36c47743da1ea86b103c45e835
```

### Available options

* Page - default:- **1**
<<<<<<< HEAD
* Selectors - {
	 `DescriptionSelector`, 
	 `linkSelector`, 
	 `TitleSelector`
} - default: `DefaultSelectors`
* safeMode - default :- `true`
=======
* Selectors - `DescriptionSelector`, `linkSelector`, `TitleSelector`
* safe - default:- `true`
>>>>>>> 177d5b64b530df36c47743da1ea86b103c45e835

selectors default -
* DescriptionSelector - `#main > div > div > div > div:not(.v9i61e) > div.AP7Wnd`
* linkSelector - `div.ZINbbc > div:nth-child(1) > a`
* TitleSelector - `div.ZINbbc > div:nth-child(1) > a > h3`

<<<<<<< HEAD
=======
* selectors **MUST** be in the object options.selectors
 ex- options.selectors.DescriptionSelector = 'some-selector'
>>>>>>> 177d5b64b530df36c47743da1ea86b103c45e835
# Support

Join my discord server for support: [discord](https://discord.gg/9s52pz6nWX)