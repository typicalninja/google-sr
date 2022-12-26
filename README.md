## Google-sr

Yet another library to do Google Searches.

Below is a simple example of using this package

## Install

```
npm install google-sr
```

* Typescript and Javascript compatible

## Usage

### with `.then`
```ts
import search from 'google-sr'

search('node.js').then(r => console.log(r))

// add "{ safeMode: false }" for turning off safe mode
// ex search('node.js', { safeMode: false }).then(r => console.log(r))
```

### With async/await

```ts
import search from 'google-sr'

// use an iife to use await
(async () => {
  const result = await search('node.js')
  console.log(result)
  // add "{ safeMode: false }" for turning off safe mode
  // ex await search('node.js', { safeMode: false })
})()
```

### Multiple pages

### Available options

* Page - default:- **1**

* Selectors - {
	 `DescriptionSelector`, 
	 `linkSelector`, 
	 `TitleSelector`
} - default: `DefaultSelectors`

* safeMode - default :- `true`

* Selectors are the respective elements of the returned WebPage (google.com search page)

Selectors default -
* DescriptionSelector - `#main > div > div > div > div:not(.v9i61e) > div.AP7Wnd`
* linkSelector - `div.ZINbbc > div:nth-child(1) > a`
* TitleSelector - `div.ZINbbc > div:nth-child(1) > a > h3`

# Support

Join my discord server for support: [discord](https://discord.gg/9s52pz6nWX)

# License
This repository and the code inside it is licensed under the MIT License. Read [LICENSE](https://github.com/typicalninja493/google-sr/blob/master/LICENSE) for more information.