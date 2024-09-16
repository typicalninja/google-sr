# google-sr 🔍

[![testing workflow](https://github.com/typicalninja/google-sr/actions/workflows/tests.yml/badge.svg)](https://github.com/typicalninja/google-sr)
[![npm downloads](https://img.shields.io/npm/dw/google-sr)](https://www.npmjs.com/package/google-sr)
[![GitHub issues](https://img.shields.io/github/issues/typicalninja/google-sr)](https://github.com/typicalninja/google-sr/issues)
[![NPM](https://img.shields.io/npm/l/google-sr)](https://www.npmjs.com/package/google-sr)
[![npm version](https://img.shields.io/npm/v/google-sr)](https://www.npmjs.com/package/google-sr)
[![Discord](https://img.shields.io/discord/807868280387665970)](https://discord.gg/ynwckXS9T2)
[![CodeFactor](https://www.codefactor.io/repository/github/typicalninja/google-sr/badge)](https://www.codefactor.io/repository/github/typicalninja/google-sr)

Simple & Fast Package for scraping Google search results without the need for an API key. 🚀

# Features

* No API key is needed 🔑
* 1st party typescript support
* [Customizable selectors](https://github.com/typicalninja/google-sr/blob/master/apps/examples/src/custom-selector.ts) 🔍
* [Well tested 🔄](#tests)

# Install 📦

> google-sr is not supported on browser environments.

```bash
npm install google-sr
# or other supported runtimes/package managers
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

> By default only `ResultTypes.OrganicResult` result type are returned, use the [resultTypes](#searchoptionsr--resultselector) option to configure it

* Additional examples can be found in [apps/examples](https://github.com/typicalninja/google-sr/tree/master/apps/examples) directory

# google-sr programatic API

Please refer to the google-sr API in [packages/google-sr](https://github.com/typicalninja/google-sr/blob/master/packages/google-sr/API.md)


# Related projects 🥂

* [google-that](https://g-sr.vercel.app/google/that) - CLI wrapper around google-sr
* [google-sr-selectors](https://g-sr.vercel.app/google/selectors) - Selectors for google search results used by google-sr

# ⚠️ Disclaimer

This is not sponsored, supported, or affiliated with Google Inc.

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