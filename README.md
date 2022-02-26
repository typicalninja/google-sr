## Google-sr

Yet another library to do google searches.

Below is a simple example of using this package

## Usage

#### with `.then`
##### Without safe mode
```ts
import search from 'google-sr'

search('node.js', { safeMode: false }).then(r => console.log(r))
```

##### With safe mode

```ts
import search from 'google-sr'

search('node.js').then(r => console.log(r))
```

### With async/await

```ts
import search from 'google-sr'

// use an iife to use await
(async () => {
  const result = await search('node.js')
  console.log(result)
  // search('node.js', { safeMode: false }) for without safe mode
})()
```

### Available options

* Page - default:- **1**
* Selectors - {
	 `DescriptionSelector`, 
	 `linkSelector`, 
	 `TitleSelector`
} - default: `DefaultSelectors`
* safeMode - default :- `true`

selectors default -
* DescriptionSelector - `#main > div > div > div > div:not(.v9i61e) > div.AP7Wnd`
* linkSelector - `div.ZINbbc > div:nth-child(1) > a`
* TitleSelector - `div.ZINbbc > div:nth-child(1) > a > h3`

# Support

Join my discord server for support: [discord](https://discord.gg/9s52pz6nWX)