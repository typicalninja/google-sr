# google-sr 🔍

Fast and efficient Package for scraping Google search results without the need for an API key. 🚀

> View documentation [here](https://typicalninja493.github.io/google-sr/)

## Features ✨

* Lightweight 💨
* Fast and efficient ⚡️ *
* Well tested 🔄
* TypeScript compatibility 🧑‍💻

> \* depends on amount of pages fetched (avg of 1s per page in testing)
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

### Simple example

You can easily perform a single-page search like this:

```ts
import { search } from 'google-sr';

search({ query: 'nodejs' }).then(console.log);

// or if using await/async
const searchResults = await search({ query: 'nodejs' });
console.log(searchResults);
```

> More detailed examples & usage can be found [here](https://typicalninja493.github.io/google-sr#usage)


## Important Notes 🚨

* google-sr scrapes the HTML of Google search results. This means it relies on Google's predefined HTML structure. If Google changes this structure, the package might seem to behave unexpectedly. To avoid this, it's best to keep your package updated to the latest version. (Note: we may take time to update it to any new structure)


> View current selectors [here](https://typicalninja493.github.io/google-sr/selectors)

* Fetching multiple pages can be slow, we recommended either fetching only small amount (i.e 5 max) or fetching pages in chunks as needed using specific page control of `searchWithPages` function 

# Tests

Tests are written using [mocha](https://mochajs.org/) and can be run by using the `test` script

```bash

# npm

npm run test

# pnpm 

pnpm run test

# yarn

yarn run test

```

# Support & Bug Reporting 🛠️🐞

* Make sure you are on the latest version before creating bug reports

Support and bugs reporting both can be done on either my [discord server](https://discord.gg/9s52pz6nWX) or on [github issues](https://github.com/typicalninja493/google-sr/issues)

# License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.