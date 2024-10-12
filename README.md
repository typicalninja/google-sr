# google-sr

[![testing workflow](https://github.com/typicalninja/google-sr/actions/workflows/tests.yml/badge.svg)](https://github.com/typicalninja/google-sr)
[![GitHub issues](https://img.shields.io/github/issues/typicalninja/google-sr)](https://github.com/typicalninja/google-sr/issues)
[![GitHub Repo stars](https://img.shields.io/github/stars/typicalninja/google-sr)](https://github.com/typicalninja/google-sr/stargazers)
[![CodeFactor](https://www.codefactor.io/repository/github/typicalninja/google-sr/badge)](https://www.codefactor.io/repository/github/typicalninja/google-sr)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
[![Discord](https://img.shields.io/discord/807868280387665970)](https://discord.gg/ynwckXS9T2)

Scrape google-sr search results without an API key with javascript/typescript.

# Install

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

# Disclaimer

This is not sponsored, supported, or affiliated with Google.

The source code within this repository is intended solely for **educational & research purposes**.
The author (typicalninja) & contributors takes **NO** responsibility for any issues that arise from its use, such as IP blocking by Google. Your discretion in usage is advised.

# Mirror

GSR project has a mirror repository on codeberg
You can find it [here](https://codeberg.org/typicalninja/google-sr)

- All issues and discussion are limited to github & discord

# Tests

Tests are written using [vitest](https://vitest.dev/) and can be run by using the `test` script.

> Weekly tests are executed using a github action to ensure compatibility and catch breakage due to google changes

```bash
pnpm run test
```

# License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.
