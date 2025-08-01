<h1 align="center">google-sr</h1>

<p align="center">
	Monorepo for JavaScript / TypeScript tools to fetch Google search results.
</p>

<div align="center">

[![Run tests and collect coverage](https://github.com/typicalninja/google-sr/actions/workflows/tests.yml/badge.svg)][test-action]   
[![GitHub Repo stars](https://img.shields.io/github/stars/typicalninja/google-sr?style=flat)][stargazers]
[![Monthly downloads](https://img.shields.io/npm/dm/google-sr?style=flat)][npm-gsr]
[![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/typicalninja/google-sr)][github-issues]
[![CodeFactor](https://www.codefactor.io/repository/github/typicalninja/google-sr/badge)][codefactor]
[![codecov](https://codecov.io/gh/typicalninja/google-sr/graph/badge.svg?token=NKZSQVTAAP)][codecov]


</div>

<div align="center">

**[Documentation][api-docs] |
[Discord][discord] |
[Disclaimer](#disclaimer) |
[Mirror][mirror-codeberg]**

</div>

---


## Packages

- [`google-sr`][subdir-gsr]
- [`google-sr-selectors`][subdir-gsr-selectors]
- [`google-that`][subdir-gsr-that] (*cli tool*)


## Install

See Individual [package readme](#packages) for installation instructions.

#### CommonJS / ESM Notice

Currently packages in this repo provides both [CommonJS (CJS)][cjs-nodejs-docs] and [ES Modules (ESM)][esm-nodejs-docs] builds.

**Starting in version 7.x (subject to change), we plan to publish ESM-only releases and remove the CJS build.**  
As a result, you will no longer be able to use `require()` to import this package; you must use `import` instead.  
(*If you’re on Node.js v20 or later, you can still use `require()` with ESM modules natively.* [See release note][nodejs-v20-backport-note])

While Node.js v20+ supports ESM well, we’ll wait until its EOL before removing CJS to allow more time for transition.

> Note: This only affects Node.js users. Runtimes like Bun and Deno already support ESM natively.

See [this gist][esm-migration-pure-esm-gist] and our [GitHub discussion][cjs-build-notice-discussion] for migration help.


## Disclaimer

This project is **not sponsored, endorsed, or affiliated** with Google in any way.

This repository is provided **"as is" without warranty** of any kind and is intended solely for **educational and research purposes.** The authors and contributors assume no responsibility for any issues, damages, or losses that may arise from its use.

By using this project, you acknowledge that you are solely responsible for complying with applicable laws and platform Terms of Service. Use at your own discretion and risk.

## License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.

---

###### Like the project? [Star it on GitHub ★][github]


[subdir-gsr]: https://github.com/typicalninja/google-sr/tree/master/packages/google-sr  
[subdir-gsr-selectors]: https://github.com/typicalninja/google-sr/tree/master/packages/google-sr-selectors  
[subdir-gsr-that]: https://github.com/typicalninja/google-sr/tree/master/packages/google-that

[npm-gsr]: https://www.npmjs.com/package/google-sr  
[stargazers]: https://github.com/typicalninja/google-sr/stargazers  
[github]: https://github.com/typicalninja/google-sr  
[github-issues]: https://github.com/typicalninja/google-sr/issues
[discord]: https://discord.gg/ynwckXS9T2  
[test-action]: https://github.com/typicalninja/google-sr/actions/workflows/tests.yml  
[api-docs]: https://typicalninja.github.io/google-sr/  
[mirror-codeberg]: https://codeberg.org/typicalninja/google-sr  
[codefactor]: https://www.codefactor.io/repository/github/typicalninja/google-sr
[codecov]: https://codecov.io/gh/typicalninja/google-sr

[nodejs-v20-backport-note]: https://nodejs.org/en/blog/release/v20.19.0/  
[esm-nodejs-docs]: https://nodejs.org/api/esm.html#introduction  
[cjs-nodejs-docs]: https://nodejs.org/api/modules.html#modules-commonjs-modules  
[cjs-build-notice-discussion]: https://github.com/typicalninja/google-sr/discussions/86  
[esm-migration-pure-esm-gist]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c