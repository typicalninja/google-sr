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

- No API key is needed 🔑
- First-party TypeScript support
- [Customizable selectors](https://github.com/typicalninja/google-sr/blob/master/apps/examples/src/custom-selector.ts) 🔍
- [Well tested 🔄](#tests)
- [Supports multiple runtimes](#runtime-support)

# Install 📦

### Runtime Support

`google-sr` does not support web environments, but it has been tested and confirmed to work on the following runtimes:

- [Node.js](https://nodejs.org/en)
- [Bun](https://bun.sh/)
- [Deno](https://deno.com/) (with the [`npm:` specifier](https://docs.deno.com/runtime/fundamentals/node/#using-npm-packages))

To get started, you can install **google-sr** using your preferred package manager:

```bash
npm install google-sr
# For pnpm/yarn/bun:
pnpm/yarn/bun add google-sr
# For Deno, the package will be automatically installed when running the script
```

# Usage

This example demonstrates some of the features of `google-sr`. For a bare minimum setup, refer to the [examples/basic](https://github.com/typicalninja/google-sr/blob/master/apps/examples/src/basic.ts) file.

```ts
import {
  search,
  OrganicResult, // Import the result types you need
  DictionaryResult,
  ResultTypes, // Import to filter results by type
} from "google-sr";

const queryResult = await search({
  query: "nodejs",
  // Specify the result types explicitly ([OrganicResult] is the default, but it is recommended to always specify the result type)
  resultTypes: [OrganicResult, DictionaryResult],
  // Optional: Customize the request using AxiosRequestConfig (e.g., enabling safe search)
  requestConfig: {
    params: {
      safe: "active",   // Enable "safe mode"
    },
  },
});

// will return a SearchResult[]
console.log(queryResult);
console.log(queryResult[0].type === ResultTypes.OrganicResult); // true
```

> Note: By default, only results of type [`ResultTypes.OrganicResult`](https://github.com/typicalninja/google-sr/blob/master/packages/google-sr/API.md#resulttypes) are returned. Use the [`resultTypes`](https://github.com/typicalninja/google-sr/blob/master/packages/google-sr/API.md#searchoptionsr--resultselector) option to customize the output.

- Additional examples can be found in [apps/examples](https://github.com/typicalninja/google-sr/tree/master/apps/examples) directory

# google-sr programatic API

Please refer to the google-sr API in [packages/google-sr](https://github.com/typicalninja/google-sr/blob/master/packages/google-sr/API.md)

# Disclaimer

This is not sponsored, supported, or affiliated with Google.

The source code within this repository is intended solely for **educational & research purposes**.
The author (typicalninja) & contributors takes **NO** responsibility for any issues that arise from its use, such as IP blocking by Google. Your discretion in usage is advised.

# Related projects 🥂

- [google-that](https://g-sr.vercel.app/google/that) - CLI wrapper around google-sr
- [google-sr-selectors](https://g-sr.vercel.app/google/selectors) - Selectors for google search results used by google-sr

# Tests

Tests are written using [vitest](https://vitest.dev/) and can be run by using the `test` script.

> Weekly tests are executed using a github action to ensure compatibility and catch breakage due to google changes

```bash
pnpm run test
```

# License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.
