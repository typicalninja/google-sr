[npm]: https://www.npmjs.com/package/google-sr-selectors
[github-gsr]: https://github.com/typicalninja/google-sr/tree/master/packages/google-sr
[github-gt]: https://github.com/typicalninja/google-sr/tree/master/packages/google-that
[stargazers]: https://github.com/typicalninja/google-sr/stargazers
[discord]: https://discord.gg/ynwckXS9T2
[test-action]: https://github.com/typicalninja/google-sr/actions/workflows/tests.yml
[api-docs]: https://typicalninja.github.io/google-sr/modules/google-sr-selectors_src.html
[usage]: https://github.com/typicalninja/google-sr/blob/reformat-docs/packages/google-sr/src/results.ts

<h1 align="center">Google-sr-selectors</h1>

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
`Links (2.29; Linux 6.11.0-13-generic x86_64; GNU C 13.2; text)`.

#### Important Note:
Due to the constantly evolving nature of Google's search page structure, we cannot guarantee consistent 
usage/validity of these selectors. Unless you are an advanced user with specific requirements, **we highly recommend 
using the [google-sr][github-gsr] package instead** of 
relying directly on google-sr-selectors.

# Disclaimer

This is not sponsored, supported, or affiliated with Google.

The source code within this repository is intended solely for **educational & research purposes**.
The author & contributors takes **NO** responsibility for any issues that arise from its use.
Your discretion in usage is advised.

# Links

- [API Documentation][api-docs]
- [GitHub Repository](https://github.com/typicalninja/google-sr)
- [NPM Package][npm]
- [Discord][discord]


# Related projects 🥂

* [google-sr][github-gsr] - Simple tool to programmatically get google search results
* [google-that][github-gt] - CLI wrapper around google-sr

# License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.