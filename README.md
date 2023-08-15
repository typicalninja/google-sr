# google-sr 🔍

![testing workflow](https://github.com/typicalninja/google-sr/actions/workflows/tests.yml/badge.svg)
![npm](https://img.shields.io/npm/dw/google-sr)
![GitHub issues](https://img.shields.io/github/issues/typicalninja/google-sr)
![NPM](https://img.shields.io/npm/l/google-sr)
![npm version](https://img.shields.io/npm/v/google-sr)
[![CodeFactor](https://www.codefactor.io/repository/github/typicalninja/google-sr/badge)](https://www.codefactor.io/repository/github/typicalninja/google-sr)

Simple & Fast Package for scraping Google search results without the need for an API key. 🚀

> View documentation [here](https://typicalninja.github.io/google-sr/)

## Features ✨

* Lightweight 💨
* Simple & Fast ⚡️ *
* [Well tested 🔄](#tests)
* TypeScript compatible 🧑‍💻
* [Ability to retrieve multiple types of search results](https://typicalninja.github.io/google-sr/types)

> \* depends on amount of pages fetched and host internet speed (avg of 500ms per page in testing )
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

> More detailed examples & usage can be found [here](https://typicalninja.github.io/google-sr#usage)


# Tests

Tests are written using [mocha](https://mochajs.org/) and can be run by using the `test` script.

> Tests are also executed on a schedule every week to make sure all selectors are updated

```bash

# npm

npm run test

# pnpm 

pnpm run test

# yarn

yarn run test

```

# Support & Bug Reporting 🛠️🐞

> Make sure you are on the latest version before creating bug reports

Support and bug reporting both can be done on either my [discord server](https://discord.gg/9s52pz6nWX) or on [github issues](https://github.com/typicalninja/google-sr/issues)

# License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.