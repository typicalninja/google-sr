[npm-gsr]: https://www.npmjs.com/package/google-sr
[stargazers]: https://github.com/typicalninja/google-sr/stargazers
[discord]: https://discord.gg/ynwckXS9T2
[test-action]: https://github.com/typicalninja/google-sr/actions/workflows/tests.yml
[api-docs]: https://typicalninja.github.io/google-sr/
[codefactor]: https://www.codefactor.io/repository/github/typicalninja/google-sr
[codeberg]: https://codeberg.org/typicalninja/google-sr

<h1 align="center">Google-sr</h1>

<p align="center">Scrape google search results without an API key with javascript/typescript.</p>

<div align="center">

[![testing workflow](https://img.shields.io/github/actions/workflow/status/typicalninja/google-sr/tests.yml?style=flat)][test-action]
[![GitHub Repo stars](https://img.shields.io/github/stars/typicalninja/google-sr?style=flat)][stargazers]
[![Monthly downloads](https://img.shields.io/npm/dm/google-sr?style=flat)][npm-gsr]
[![CodeFactor](https://www.codefactor.io/repository/github/typicalninja/google-sr/badge)][codefactor]
[![codecov](https://codecov.io/gh/typicalninja/google-sr/graph/badge.svg?token=NKZSQVTAAP)](https://codecov.io/gh/typicalninja/google-sr)
[![Discord](https://img.shields.io/discord/807868280387665970?style=flat)][discord]

</div>

<div align="center">

**[Installation](#install) |
[Getting started](#usage) |
[API Documentation][api-docs] |
[Disclaimer](#disclaimer)**

</div>

# Install

### Runtime Support

`google-sr` **not support web environments**, but it has been tested and 
confirmed to work in most common javascript server environments.

```bash
npm install google-sr
# For pnpm/yarn/bun:
pnpm/yarn/bun add google-sr
```

# Usage

```ts
import {
  search,
  OrganicResult,
  ResultTypes,
} from "google-sr";

const queryResult = await search({
  query: "nodejs",
  // Explicitly specify the results you want
  resultTypes: [OrganicResult],
});

console.log(queryResult[0].type === ResultTypes.OrganicResult); 
// true
```

> Note: By default, only results of type [`ResultTypes.OrganicResult`](https://typicalninja.github.io/google-sr/variables/google-sr_src.ResultTypes.html) are returned. Use the [`resultTypes`](https://typicalninja.github.io/google-sr/interfaces/google-sr_src.SearchOptions.html#resulttypes) option to customize the output.

- Additional examples can be found in [apps/examples](https://github.com/typicalninja/google-sr/tree/master/apps/examples) directory

# Disclaimer

This is not sponsored, supported, or affiliated with Google.

The source code within this repository is intended solely for **educational & research purposes**.
The author (typicalninja) & contributors takes **NO** responsibility for any issues that arise from its use. 
Your discretion in usage is advised.

# Mirror

The mirror of this repository can be found on [codeberg][codeberg].

# Tests

Tests are written using [vitest](https://vitest.dev/) and can be run by using the `test` script.

> Weekly tests are executed using a GitHub action to ensure compatibility and catch breakage due to google changes

```bash
pnpm run test
```

# License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.
