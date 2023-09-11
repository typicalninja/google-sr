# google-sr 🔍

[![testing workflow](https://github.com/typicalninja/google-sr/actions/workflows/tests.yml/badge.svg)](https://github.com/typicalninja/google-sr)
[![npm downloads](https://img.shields.io/npm/dw/google-sr)](https://www.npmjs.com/package/google-sr)
[![GitHub issues](https://img.shields.io/github/issues/typicalninja/google-sr)](https://github.com/typicalninja/google-sr/issues)
[![NPM](https://img.shields.io/npm/l/google-sr)](https://www.npmjs.com/package/google-sr)
[![npm version](https://img.shields.io/npm/v/google-sr)](https://www.npmjs.com/package/google-sr)
[![Discord](https://img.shields.io/discord/807868280387665970)](https://discord.gg/ynwckXS9T2)
[![CodeFactor](https://www.codefactor.io/repository/github/typicalninja/google-sr/badge)](https://www.codefactor.io/repository/github/typicalninja/google-sr)


Simple & Fast Package for scraping Google search results without the need for an API key. 🚀

> View documentation [here](https://g-sr.vercel.app)

## Features ✨

* Simple & Fast ⚡️ *
* [Well tested 🔄](#tests)
* [Well documented 📚](https://g-sr.vercel.app)
* TypeScript compatible 🧑‍💻
* No API key is needed 🔑
* [Wide variety of search result types supported 🌴](https://g-sr.vercel.app/google/sr/types)

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

## Usage

You can easily perform a single-page search like this:

```ts
import { search } from 'google-sr';

search({ query: 'nodejs' }).then(console.log);

// or if using await/async
const searchResults = await search({ query: 'nodejs' });
console.log(searchResults);
```

* **Read about the returned types [here](https://g-sr.vercel.app/google/sr/types)**

* **More detailed examples & usage can be found [here](https://g-sr.vercel.app/google/sr/usage)**

> By default only [`ResultTypes.SearchResult`](https://g-sr.vercel.app/google/sr/types#regular-search-results) are returned, use the [filterResults](https://g-sr.vercel.app/google/sr/usage#filtering-search-results) option to configure it

* Additional examples can be found in [tests](#tests) and apps directory


## Disclaimer

This is not sponsored, supported, or affiliated with Google Inc.

Unlike the conventional recommendation of using the Google API, this module scrapes the Google search result page (which might potentially infringe upon Google's terms of service).

The source code within this repository is intended solely for educational purposes.

The author (typicalninja) & contributors takes **no** responsibility for any issues that arise from misuse, such as IP blocking by Google. Your discretion in usage is advised.

## Related projects 🥂

* [google-that](https://g-sr.vercel.app/google/that) - CLI wrapper around google-sr
* [google-sr-selectors](https://g-sr.vercel.app/google/selectors) - Selectors for google search results used by google-sr

# Tests

Tests are written using [mocha](https://mochajs.org/) and can be run by using the `test` script.

> Weekly tests a executed using a github action to ensure compatibility

Project uses pnpm as its package manager

```bash
pnpm run test
```

## Support & Bug Reporting 🛠️🐞

> Make sure you are on the latest version before creating bug reports

Support and bug reporting both can be done on  [github issues](https://github.com/typicalninja/google-sr/issues)

## License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.