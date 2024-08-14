# google-that

[![npm downloads](https://img.shields.io/npm/dw/google-that)](https://www.npmjs.com/package/google-that)
[![GitHub issues](https://img.shields.io/github/issues/typicalninja/google-sr)](https://github.com/typicalninja/google-sr/issues)
[![NPM](https://img.shields.io/npm/l/google-that)](https://www.npmjs.com/package/google-that)
[![npm version](https://img.shields.io/npm/v/google-that)](https://www.npmjs.com/package/google-that)
[![Discord](https://img.shields.io/discord/807868280387665970)](https://discord.gg/ynwckXS9T2)
[![CodeFactor](https://www.codefactor.io/repository/github/typicalninja/google-sr/badge)](https://www.codefactor.io/repository/github/typicalninja/google-sr)

CLI tool to scrape google search results without an api key 🚀.
This is a demo project to showcase the usage and performance of the [google-sr](https://npmjs.com/package/google-sr) package. google-that is able to output parsed results to a file or to stdout, please check the help page for more info.

## Install 📦

To get started, you can install **google-that** using your preferred package manager:

> We suggest you install the package as a global module

```bash

# npm
npm install -g google-that

# pnpm 
pnpm add -g google-that

# yarn
yarn add -g google-that
```

## Usage

If installation succeeded you can proceed to this step, run the following command in a **NEW** terminal window. it will show you the help page for the tool.

```bash

google-that --help

```

### Example query

```bash
google-that -q "Nodejs"

# Multiple queries
# Seperate queries with a space, the option is case insensitive (Q)
google-that -Q query1 "queries with spaces need to be quoted"

# Writing the results to a file
google-that -q "Nodejs" -w

```

# Related projects 🥂

* [google-sr](https://g-sr.vercel.app/google/sr) - Core project used in google-that
* [google-sr-selectors](https://g-sr.vercel.app/google/selectors) - Selectors for google search results used by google-sr

# Disclaimer

This is not sponsored, supported, or affiliated with Google Inc.

Unlike the conventional recommendation of using the Google API, this module scrapes the Google search result page (which might potentially infringe upon Google's terms of service).

The source code within this repository is intended solely for educational & research purposes.

The author (typicalninja) & contributors takes **NO** responsibility for any issues that arise from misuse, such as IP blocking by Google. Your discretion in usage is advised.

# License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.