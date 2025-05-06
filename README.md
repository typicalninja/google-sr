[npm-gsr]: https://www.npmjs.com/package/google-sr
[stargazers]: https://github.com/typicalninja/google-sr/stargazers
[discord]: https://discord.gg/ynwckXS9T2
[test-action]: https://github.com/typicalninja/google-sr/actions/workflows/tests.yml
[api-docs]: https://typicalninja.github.io/google-sr/
[codefactor]: https://www.codefactor.io/repository/github/typicalninja/google-sr
[codeberg]: https://codeberg.org/typicalninja/google-sr

<h1 align="center">google-sr</h1>

<p align="center">Scrape Google search results using JavaScript / TypeScript</p>

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
[Disclaimer](#disclaimer) |
[Mirror][codeberg]**

</div>


# Install

> Not supported in browser environments.

```bash
npm install google-sr
# For pnpm/yarn/bun:
pnpm add google-sr
yarn add google-sr
bun add google-sr
```

# Usage

```ts
import {
	search,
	OrganicResult,
	TranslateResult,
	ResultTypes,
} from "google-sr";

const results = await search({
	query: "translate hello to japanese",
	// Explicitly specify the results you want
	resultTypes: [TranslateResult, OrganicResult],
});

console.log(results[0].type === ResultTypes.TranslateResult);  // true
console.log(results) // see below
```

#### Output

```js
[
  {
    // type property is present in all results
    type: 'TRANSLATE',
    sourceLanguage: 'English (detected)',
    translationLanguage: 'Japanese',
    sourceText: 'hello',
    translatedText: 'こんにちは'
  },
  {
    type: 'ORGANIC',
    link: '...',
    description: "Konnichiwa – ...",
    title: '18 ...'
  },
  // ... and more
]
```

> Additional examples can be found in [apps/examples](https://github.com/typicalninja/google-sr/tree/master/apps/examples) directory

# Disclaimer

This is not sponsored, supported, or affiliated with Google.

The source code within this repository is intended solely for **educational & research purposes**.
The author (typicalninja) & contributors takes **NO** responsibility for any issues that arise from its use. 
Your discretion in usage is advised.

# Tests

Tests are written using [vitest](https://vitest.dev/) and can be run by using the `test` script.


```bash
pnpm run test
```

# License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.

---

Want to support the project? [Star it on GitHub ★][stargazers]