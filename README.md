# google-sr 🔍

[![testing workflow](https://github.com/typicalninja/google-sr/actions/workflows/tests.yml/badge.svg)](https://github.com/typicalninja/google-sr)
[![npm downloads](https://img.shields.io/npm/dw/google-sr)](https://www.npmjs.com/package/google-sr)
[![GitHub issues](https://img.shields.io/github/issues/typicalninja/google-sr)](https://github.com/typicalninja/google-sr/issues)
[![NPM](https://img.shields.io/npm/l/google-sr)](https://www.npmjs.com/package/google-sr)
[![npm version](https://img.shields.io/npm/v/google-sr)](https://www.npmjs.com/package/google-sr)
[![CodeFactor](https://www.codefactor.io/repository/github/typicalninja/google-sr/badge)](https://www.codefactor.io/repository/github/typicalninja/google-sr)


Simple & Fast Package for scraping Google search results without the need for an API key. 🚀

> View documentation [here](https://typicalninja.github.io/google-sr/)

## Features ✨

* Simple & Fast ⚡️ *
* [Well tested 🔄](#tests)
* [Well documented 📚](https://typicalninja.github.io/google-sr/)
* TypeScript compatible 🧑‍💻
* No API key is needed 🔑
* [Wide variety of search result types supported 🌴](https://typicalninja.github.io/google-sr/types)

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

* **Read about the returned types [here](https://typicalninja.github.io/google-sr/types)**

> By default only **ResultTypes.SearchResult** are returned, use the [filterResults](https://typicalninja.github.io/google-sr/advanced.html#filtering-result) option to configure it

> **More detailed examples & usage can be found [here](https://typicalninja.github.io/google-sr#usage)**

> Additional examples can be found in [tests](#tests)


# Disclaimer

This is not sponsored, supported, or affiliated with Google Inc.

`The module scrapes the google search result page instead of using the API as suggested by google. Author is **NOT** responsible for any issue (ip block from google, etc...) that occurs due to misuse.


# Tests

Tests are written using [mocha](https://mochajs.org/) and can be run by using the `test` script.

> Weekly tests a executed using a github action to ensure compatibility

Project uses pnpm as its package manager

```bash
pnpm run test
```

# Support & Bug Reporting 🛠️🐞

> Make sure you are on the latest version before creating bug reports

Support and bug reporting both can be done on  [github issues](https://github.com/typicalninja/google-sr/issues)

# License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.