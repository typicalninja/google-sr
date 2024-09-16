# google-sr
[![testing workflow](https://github.com/typicalninja/google-sr/actions/workflows/tests.yml/badge.svg)](https://github.com/typicalninja/google-sr)
[![GitHub issues](https://img.shields.io/github/issues/typicalninja/google-sr)](https://github.com/typicalninja/google-sr/issues)
[![GitHub Repo stars](https://img.shields.io/github/stars/typicalninja/google-sr)](https://github.com/typicalninja/google-sr/stargazers)
[![CodeFactor](https://www.codefactor.io/repository/github/typicalninja/google-sr/badge)](https://www.codefactor.io/repository/github/typicalninja/google-sr)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md) 
[![Discord](https://img.shields.io/discord/807868280387665970)](https://discord.gg/ynwckXS9T2)

Easy to use, updated tools for scraping google search results. 🚀

# Install

To get started, you can install **google-sr** using your preferred package manager.
google-sr is tested on following runtimes:

* node.js
* bun

Other runtimes might work, but are not tested (web is unsupported)

```bash
npm install google-sr

[pnpm/yarn/bun] add google-sr
```

# Usage

```ts
import { 
    search, 
    // import the result types you want
    OrganicResult, 
    DictionaryResult,
    // helpful to import ResultTypes to filter results
    ResultTypes 
} from 'google-sr';

const queryResult = await search({
    query: "nodejs",
    // OrganicResult is the default, however it is recommended to ALWAYS specify the result type
    resultTypes: [OrganicResult, DictionaryResult],
    // to add additional configuration to the request, use the requestConfig option
    // which accepts a AxiosRequestConfig object
    // OPTIONAL
    requestConfig: {
		params: {
            // enable "safe mode"
			safe: 'active'
		},
	},
});

// will return a SearchResult[]
console.log(queryResult);
console.log(queryResult[0].type === ResultTypes.OrganicResult); // true
```

> **By default only `ResultTypes.OrganicResult` result type are returned, use the `resultTypes` option to configure it**

* Additional examples in [apps/examples](https://github.com/typicalninja/google-sr/tree/master/apps/examples) directory

# google-sr API

Please refer to the google-sr API in [packages/google-sr](https://github.com/typicalninja/google-sr/blob/master/packages/google-sr/API.md)

# Monorepo

Welcome to the 📦 monorepo of GSR Project.
 
🏠 This is the home to google-sr and its related packages & applications.

> **[google-sr](https://github.com/typicalninja/google-sr/blob/master/packages/google-sr)**

[![npm downloads for google-sr](https://img.shields.io/npm/dw/google-sr)](https://www.npmjs.com/package/google-sr)
[![NPM license for google-sr](https://img.shields.io/npm/l/google-sr)](https://www.npmjs.com/package/google-sr)
[![npm version for google-sr](https://img.shields.io/npm/v/google-sr)](https://www.npmjs.com/package/google-sr)

> **[google-sr-selectors](https://github.com/typicalninja/google-sr/blob/master/packages/google-sr-selectors)**

[![npm downloads for google-sr-selectors](https://img.shields.io/npm/dw/google-sr-selectors)](https://www.npmjs.com/package/google-sr-selectors)
[![NPM license for google-sr-selectors](https://img.shields.io/npm/l/google-sr-selectors)](https://www.npmjs.com/package/google-sr-selectors)
[![npm version for google-sr-selectors](https://img.shields.io/npm/v/google-sr-selectors)](https://www.npmjs.com/package/google-sr-selectors)


> **[google-that](https://github.com/typicalninja/google-sr/tree/master/packages/google-that)**

[![npm downloads for google-that](https://img.shields.io/npm/dw/google-that)](https://www.npmjs.com/package/google-that)
[![NPM license for google-that](https://img.shields.io/npm/l/google-that)](https://www.npmjs.com/package/google-that)
[![npm version for google-that](https://img.shields.io/npm/v/google-that)](https://www.npmjs.com/package/google-that)


This monorepo is managed with [turborepo](https://turbo.build/repo) and uses [pnpm workspaces](https://pnpm.io/workspaces).

# Mirror

GSR project has a mirror repository on codeberg 
You can find it [here](https://codeberg.org/typicalninja/google-sr)

* All issues and discussion are limited to github & discord

# Disclaimer

This is not sponsored, supported, or affiliated with Google Inc.

Unlike the conventional recommendation of using the Google API, this module scrapes the Google search result page (which might potentially infringe upon Google's terms of service).

The source code within this repository is intended solely for educational & research purposes.
The author (typicalninja) & contributors takes **NO** responsibility for any issues that arise from misuse, such as IP blocking by Google. Your discretion in usage is advised.

# Tests

Tests are written using [vitest](https://vitest.dev/) and can be run by using the `test` script.

> Weekly tests are executed using a github action to ensure compatibility and catch breakage due to google changes

```bash
pnpm run test
```

# License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.