[npm-gsr]: https://www.npmjs.com/package/google-sr
[stargazers]: https://github.com/typicalninja/google-sr/stargazers
[discord]: https://discord.gg/ynwckXS9T2
[test-action]: https://github.com/typicalninja/google-sr/actions/workflows/tests.yml
[api-docs]: https://typicalninja.github.io/google-sr/modules/google-sr_src.html
[github-gt]: https://github.com/typicalninja/google-sr/tree/master/packages/google-that
[github-gsrs]: https://github.com/typicalninja/google-sr/tree/master/packages/google-sr-selectors

<h1 align="center">Google-sr</h1>

<p align="center">Scrape google search results without an API key with javascript/typescript.</p>

<div align="center">

[![testing workflow](https://img.shields.io/github/actions/workflow/status/typicalninja/google-sr/tests.yml?style=flat)][test-action]
[![GitHub Repo stars](https://img.shields.io/github/stars/typicalninja/google-sr?style=flat)][stargazers]
[![Discord](https://img.shields.io/discord/807868280387665970?style=flat)][discord]
[![Monthly downloads](https://img.shields.io/npm/dm/google-sr?style=flat)][npm-gsr]

</div>

<div align="center">

**[Installation](#install) |
[Getting started](#usage) |
[API Documentation][api-docs] |
[Disclaimer](#disclaimer)**

</div>

# Features

- No API key is needed 🔑
- First-party TypeScript support
- [Customizable selectors](https://github.com/typicalninja/google-sr/blob/master/apps/examples/src/custom-selector.ts) 🔍
- [Well tested 🔄](#tests)
- [Supports multiple runtimes](#runtime-support)

# Install

### Runtime Support

`google-sr` does not support web environments, but it has been tested and confirmed to work on the following runtimes:

- [Node.js](https://nodejs.org/en)
- [Bun](https://bun.sh/)
- [Deno](https://deno.com/)

To get started, you can install **google-sr** using your preferred package manager:

```bash
npm install google-sr
# For pnpm/yarn/bun:
pnpm/yarn/bun add google-sr
# For Deno, either use the npm: specifier
# or import from esm.sh
# https://esm.sh/google-sr
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

> Note: By default, only results of type [`ResultTypes.OrganicResult`](https://typicalninja.github.io/google-sr/variables/google-sr_src.ResultTypes.html) are returned. Use the [`resultTypes`](https://typicalninja.github.io/google-sr/interfaces/google-sr_src.SearchOptions.html#resulttypes) option to customize the output.

- Additional examples can be found in [apps/examples](https://github.com/typicalninja/google-sr/tree/master/apps/examples) directory

# Disclaimer

This is not sponsored, supported, or affiliated with Google.

The source code within this repository is intended solely for **educational & research purposes**.
The author & contributors takes **NO** responsibility for any issues that arise from its use. 
Your discretion in usage is advised.

# Links

- [API Documentation][api-docs]
- [GitHub Repository](https://github.com/typicalninja/google-sr)
- [NPM Package][npm-gsr]
- [Discord][discord]

# Related projects 🥂

- [google-that][github-gt] - CLI wrapper around google-sr
- [google-sr-selectors][github-gsrs] - Selectors for Google search results used by google-sr

# Tests

Tests are written using [vitest](https://vitest.dev/) and can be run by using the `test` script.

> Weekly tests are executed using a GitHub action to ensure compatibility and catch breakage due to google changes

```bash
pnpm run test
```

# License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.
