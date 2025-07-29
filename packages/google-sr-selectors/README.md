<h1 align="center">google-sr-selectors</h1>

<p align="center">CSS Selectors for Google search page</p>

<div align="center">

[![testing workflow](https://img.shields.io/github/actions/workflow/status/typicalninja/google-sr/tests.yml?style=flat)][test-action]
[![GitHub Repo stars](https://img.shields.io/github/stars/typicalninja/google-sr?style=flat)][stargazers]
[![Discord](https://img.shields.io/discord/807868280387665970?style=flat)][discord]
[![Monthly downloads](https://img.shields.io/npm/dm/google-sr-selectors?style=flat)][npm]

</div>

<div align="center">

**[Usage example][usage] |
[API Documentation][api-docs] |
[Disclaimer](#disclaimer)**

</div>

**For simple use cases, refer to [google-sr][github-gsr]**

This package provides a set of CSS selectors for parsing Google search results, using tools such as [cheerio](https://github.com/cheeriojs/cheerio), etc...

These selectors are compatible only with the search results page returned when the following user-agent is used:
`Mozilla/5.0 (MSIE 10.0; Windows NT 6.1; Trident/5.0)`.

#### Important Note:
Due to the constantly evolving nature of Google's search page structure, we cannot guarantee consistent
usage/validity of these selectors. Unless you are an advanced user with specific requirements, **we highly recommend
using the [google-sr][github-gsr] package instead** of
relying directly on google-sr-selectors.


# Links

- [API Documentation][api-docs]
- [GitHub Repository](https://github.com/typicalninja/google-sr)
- [NPM Package][npm]
- [Discord][discord]


#### CommonJS / ESM Notice

Currently this package provides both [CommonJS (CJS)][cjs-nodejs-docs] and [ES Modules (ESM)][esm-nodejs-docs] builds.

**Starting in version 7.x (subject to change), we plan to publish ESM-only releases and remove the CJS build.**  
As a result, you will no longer be able to use `require()` to import this package; you must use `import` instead.  
(*If you’re on Node.js v20 or later, you can still use `require()` with ESM modules natively.* [See release note][nodejs-v20-backport-note])

While Node.js v20+ supports ESM well, we’ll wait until its EOL before removing CJS to allow more time for transition.

> Note: This only affects Node.js users. Runtimes like Bun and Deno already support ESM natively.

See [this gist][esm-migration-pure-esm-gist] and our [GitHub discussion][cjs-build-notice-discussion] for migration help.

# Related projects 🥂

* [google-sr][github-gsr] - Simple tool to programmatically get google search results
* [google-that][github-gt] - CLI wrapper around google-sr

# Disclaimer

This project is **not sponsored, endorsed, or affiliated** with Google in any way.

This repository is provided **"as is" without warranty** of any kind and is intended solely for **educational and research purposes.** The authors and contributors assume no responsibility for any issues, damages, or losses that may arise from its use.

By using this project, you acknowledge that you are solely responsible for complying with applicable laws and platform Terms of Service. Use at your own discretion and risk.

# License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.

---

Want to support the project? [Star it on GitHub ★][stargazers]

[npm]: https://www.npmjs.com/package/google-sr-selectors
[github-gsr]: https://github.com/typicalninja/google-sr/tree/master/packages/google-sr
[github-gt]: https://github.com/typicalninja/google-sr/tree/master/packages/google-that
[stargazers]: https://github.com/typicalninja/google-sr/stargazers
[discord]: https://discord.gg/ynwckXS9T2
[test-action]: https://github.com/typicalninja/google-sr/actions/workflows/tests.yml
[api-docs]: https://typicalninja.github.io/google-sr/modules/google-sr-selectors_src.html
[usage]: https://github.com/typicalninja/google-sr/blob/reformat-docs/packages/google-sr/src/results.ts

[nodejs-v20-backport-note]:https://nodejs.org/en/blog/release/v20.19.0/
[esm-nodejs-docs]: https://nodejs.org/api/esm.html#introduction
[cjs-nodejs-docs]: https://nodejs.org/api/modules.html#modules-commonjs-modules
[cjs-build-notice-discussion]: https://github.com/typicalninja/google-sr/discussions/86
[esm-migration-pure-esm-gist]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
