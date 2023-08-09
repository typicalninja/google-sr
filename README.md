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

## Important Notes 🚨

* google-sr scrapes the HTML of Google search results. This means it relies on Google's predefined HTML structure. If Google changes this structure, the package might seem to behave unexpectedly. To avoid this, it's best to keep your package updated to the latest version. (Note: we may take time to update it to any new structure)

* Make sure you are on the latest version before creating bug reports

# Support & Bug Reporting 🛠️🐞

Support and bugs reporting both can be done on either my [discord server](https://discord.gg/9s52pz6nWX) or on [github issues](https://github.com/typicalninja493/google-sr/issues)

# License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.