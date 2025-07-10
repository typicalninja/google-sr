<h1 align="center">google-sr</h1>

<p align="center">Scrape google search results without an API key with javascript/typescript.</p>

<div align="center">

[![testing workflow](https://img.shields.io/github/actions/workflow/status/typicalninja/google-sr/tests.yml?style=flat)][test-action]
[![GitHub Repo stars](https://img.shields.io/github/stars/typicalninja/google-sr?style=flat)][stargazers]
[![Discord](https://img.shields.io/discord/807868280387665970?style=flat)][discord]
[![Monthly downloads](https://img.shields.io/npm/dm/google-sr?style=flat)][npm-gsr]
[![codecov](https://codecov.io/gh/typicalninja/google-sr/graph/badge.svg?token=NKZSQVTAAP)](https://codecov.io/gh/typicalninja/google-sr)

</div>

<div align="center">

**[Installation](#install) |
[Getting started](#usage) |
[API Documentation][api-docs] |
[Disclaimer](#disclaimer)**

</div>

# Features

- 🔑 No API key is needed
- Full Typescript support
- ⚙️ Major runtimes supported (Node.js, Bun, Deno)
- [🔍 Customizable selectors](https://github.com/typicalninja/google-sr/blob/master/apps/examples/src/custom-selector.ts)
- [🔄 Well tested](#tests)

# Install

> Not supported in browser environments.

> If you are using CommonJS, please read the [important notice](#notice-for-commonjs-users) about future ESM-only support.

```bash
npm install google-sr
# For pnpm/yarn/bun:
pnpm add google-sr
yarn add google-sr
bun add google-sr
```

# Usage

```ts
import { search, OrganicResult, TranslateResult, ResultTypes } from "google-sr";

const results = await search({
	query: "translate hello to japanese",
	// Explicitly specify the results you want
	parsers: [TranslateResult, OrganicResult],
});

console.log(results[0].type === ResultTypes.TranslateResult); // true
console.log(results); // see below
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

# Links

- [API Documentation][api-docs]
- [GitHub Repository](https://github.com/typicalninja/google-sr)
- [NPM Package][npm-gsr]
- [Discord][discord]

# Notice for CommonJS users

This package currently includes both [CommonJS (CJS)][cjs-nodejs-docs] and [ES Modules (ESM)][esm-nodejs-docs] builds.

Starting with **v7.x** (subject to change), we plan to drop CJS support and publish only ESM-only builds.

#### Why ESM-only going forward?
- **Modern JavaScript**: ESM is now the standard, offering better support for tree-shaking and static analysis.
- **Reduces package size**: Maintaining a single build reduces package size and build complexity.
- [Node.js `v20`+ supports require() on ESM modules natively][nodejs-v20-backport-note] (no flags needed)

While Node.js v20 already supports ESM well, we will wait until its End-of-Life before removing CJS to give users and tooling more time to transition.

> Note: This applies only to Node.js users, other runtimes like Bun and Deno already support ESM natively

See this [gist for future migration tips][esm-migration-pure-esm-gist] and our [GitHub discussion][cjs-build-notice-discussion] for more details.

# Related projects 🥂

- [google-that][github-gt] - CLI wrapper around google-sr
- [google-sr-selectors][github-gsrs] - Cheerio selectors for Google search results used by google-sr

# Tests

Tests are written using [vitest](https://vitest.dev/) and can be run by using the `test` script.

```bash
pnpm run test
```

# Disclaimer

This project is **not sponsored, endorsed, or affiliated** with Google in any way.

This repository is provided **"as is" without warranty** of any kind and is intended solely for **educational and research purposes.** The authors and contributors assume no responsibility for any issues, damages, or losses that may arise from its use.

By using this project, you acknowledge that you are solely responsible for complying with applicable laws and platform Terms of Service. Use at your own discretion and risk.

# License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.

---

Want to support the project? [Star it on GitHub ★][stargazers]

[npm-gsr]: https://www.npmjs.com/package/google-sr
[stargazers]: https://github.com/typicalninja/google-sr/stargazers
[discord]: https://discord.gg/ynwckXS9T2
[test-action]: https://github.com/typicalninja/google-sr/actions/workflows/tests.yml
[api-docs]: https://typicalninja.github.io/google-sr/modules/google-sr_src.html
[github-gt]: https://github.com/typicalninja/google-sr/tree/master/packages/google-that
[github-gsrs]: https://github.com/typicalninja/google-sr/tree/master/packages/google-sr-selectors

[nodejs-v20-backport-note]:https://nodejs.org/en/blog/release/v20.19.0/
[esm-nodejs-docs]: https://nodejs.org/api/esm.html#introduction
[cjs-nodejs-docs]: https://nodejs.org/api/modules.html#modules-commonjs-modules
[cjs-build-notice-discussion]: https://github.com/typicalninja/google-sr/discussions/86
[esm-migration-pure-esm-gist]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c