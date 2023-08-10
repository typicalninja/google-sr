# google-sr 🔍

Fast and efficient Package for scraping Google search results without the need for an API key. 🚀

## Features ✨

* Lightweight ⚡️
* Fast and efficient ⏱️
* Regularly updated 🔄
* Highly customizable 🛠️
* TypeScript compatibility 🧑‍💻

## Install 📦

To get started, you can install **google-sr** using your preferred package manager:

```bash

# npm

npm install google-sr

# pnpm 

pnpm add google-sr

# yarn

yarn add google-sr

```

# Usage

> All examples use typescript

### Single page

You can easily perform a single-page search like this:

```ts
import { search } from 'google-sr';

search({ query: 'nodejs' }).then(console.log);

// or if using await/async
const searchResults = await search({ query: 'nodejs' });
console.log(searchResults);
```

### Multiple pages

For more comprehensive results, you can search across multiple pages:

```ts
import { searchWithPages } from 'google-sr';

searchWithPages({ query: 'nodejs', pages: 5 }).then(console.log);

// or if using await/async
const searchResults = await searchWithPages({ query: 'nodejs', pages: 5 });
console.log(searchResults);
```

**Or alternatively** You can also specify the exact pages you want to fetch:

```ts
import { searchWithPages } from 'google-sr';

searchWithPages({ query: 'nodejs', pages: [1, 2, 5, 10] }).then(console.log);

// or if using await/async
const searchResults = await searchWithPages({ query: 'nodejs', pages: [1, 2, 5, 10] });
console.log(searchResults);
```

## API & Overview 📚🔍

> For a comprehensive list of available options, you can refer to the unofficial Typedoc [here](https://paka.dev/npm/google-sr).

In this section, we'll cover the fundamental options that you can use with **google-sr**.

1) `query` - This is a required parameter that specifies your search term. It accepts a `string` value. For example, `query: "nodejs"`.

2) `safeMode` - Enable or disable Google's safe mode for search results. When enabled, safe mode filters out explicit content from search results. You can set this option to `true` to activate safe mode, or `false` to turn it off. Keep in mind that while safe mode provides a more family-friendly experience, it might limit some search results. For instance, setting `safeMode: true` ensures a safer search environment, while `safeMode: false` offers unrestricted search results.

3) `page` - You can use this option to fetch results from a specific page. It defaults to `0` for the first page. If you intend to use it, it's recommended to use the `pageToGoogleQueryPage` helper to convert regular page numbers (like `1`, `2`) to the corresponding page parameter used by Google (e.g., `1 => 0`, `2 => 10`). If you're fetching results from multiple pages, use the `searchWithPages` function instead. It accepts a `number` value. Example: `page: 10`.

4) `selectors` - Selectors are jQuery-style selectors used to target the specific block of search results within the HTML. Usually, you won't need to set these manually. However, in case Google updates their HTML structure and the package has bee not yet officially patched, you can use this option to temporarily address the issue.

> As of `8/9/2023`, following selectors are used 
```js
selectors: {
    block: ".Gx5Zad.fP1Qef.xpd.EtOod.pkphOe",
    link: "[jsname][data-ved]",
    title: "h3.zBAuLc",
    description: ".BNeawe.s3v9rd.AP7Wnd",
}
```

## Important Notes 🚨

* google-sr scrapes the HTML of Google search results. This means it relies on Google's predefined HTML structure. If Google changes this structure, the package might seem to behave unexpectedly. To avoid this, it's best to keep your package updated to the latest version. (Note: we may take time to update it to any new structure)

* Make sure you are on the latest version before creating bug reports

* Fetching multiple pages can be slow, we recommended either fetching only small amount (i.e 5 max) or fetching pages in chunks as needed using specific page control of `searchWithPages` function 

# Tests

Tests are written using [mocha](https://mochajs.org/) and can be run by using `test` script

```bash

# npm

npm run test

# pnpm 

pnpm run test

# yarn

yarn run test

```

# Support & Bug Reporting 🛠️🐞

Support and bugs reporting both can be done on either my [discord server](https://discord.gg/9s52pz6nWX) or on [github issues](https://github.com/typicalninja493/google-sr/issues)

# License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.