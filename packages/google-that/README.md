[npm]: https://www.npmjs.com/package/google-that
[github-gsr]: https://github.com/typicalninja/google-sr/tree/master/packages/google-sr
[github-gsrs]: https://github.com/typicalninja/google-sr/tree/master/packages/google-sr-selectors
[stargazers]: https://github.com/typicalninja/google-sr/stargazers
[discord]: https://discord.gg/ynwckXS9T2
[test-action]: https://github.com/typicalninja/google-sr/actions/workflows/tests.yml

<h1 align="center">Google-that</h1>

<p align="center">CLI tool to scrape google search results without an api key</p>

<div align="center">

[![testing workflow](https://img.shields.io/github/actions/workflow/status/typicalninja/google-sr/tests.yml?style=flat)][test-action]
[![GitHub Repo stars](https://img.shields.io/github/stars/typicalninja/google-sr?style=flat)][stargazers]
[![Discord](https://img.shields.io/discord/807868280387665970?style=flat)][discord]
[![Monthly downloads](https://img.shields.io/npm/dm/google-that?style=flat)][npm]

</div>

<div align="center">

**[Installation](#install) |
[Getting started](#usage) |
[Disclaimer](#disclaimer)**

</div>


> This is a demo project to showcase the usage and performance of the [google-sr][github-gsr] package.

# Install

To get started, you can install **google-that** using your preferred package manager:

> You can also use `npx` (or similar tools like `pnpm dlx`) to run the tool without needing to install it globally.

```bash
# npm
npm install -g google-that

# pnpm
pnpm add -g google-that

# yarn
yarn add -g google-that
```

# Usage

If installation succeeded you can proceed to this step, run the following command in a **NEW** terminal window. it will show you the help page for the tool.

```bash
google-that --help
```

### Example query

```bash
google-that -q "Nodejs"

# Multiple queries
# Separate queries with a space, the option is case insensitive (Q)
google-that -Q query1 "queries with spaces need to be quoted"

# Writing the results to a file
google-that -q "Nodejs" -w
```

# Disclaimer

This is not sponsored, supported, or affiliated with Google.

The source code within this repository is intended solely for **educational & research purposes**.
The author & contributors takes **NO** responsibility for any issues that arise from its use. Your discretion in usage is advised.

# Links

- [GitHub Repository](https://github.com/typicalninja/google-sr)
- [NPM Package][npm]
- [Discord][discord]

# Related projects 🥂

- [google-sr][github-gsr] - Core project used in google-that
- [google-sr-selectors][github-gsrs] - Selectors for Google search results used by google-sr

# License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.
