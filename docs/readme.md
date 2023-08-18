# google-sr 🔍

[![testing workflow](https://github.com/typicalninja/google-sr/actions/workflows/tests.yml/badge.svg)](https://github.com/typicalninja/google-sr)
[![npm downloads](https://img.shields.io/npm/dw/google-sr)](https://www.npmjs.com/package/google-sr)
[![GitHub issues](https://img.shields.io/github/issues/typicalninja/google-sr)](https://github.com/typicalninja/google-sr/issues)
[![NPM](https://img.shields.io/npm/l/google-sr)](https://www.npmjs.com/package/google-sr)
[![npm version](https://img.shields.io/npm/v/google-sr)](https://www.npmjs.com/package/google-sr)
[![CodeFactor](https://www.codefactor.io/repository/github/typicalninja/google-sr/badge)](https://www.codefactor.io/repository/github/typicalninja/google-sr)

Simple & Fast Package for scraping Google search results without the need for an API key. 🚀

> View typedoc [here](https://paka.dev/npm/google-sr/api)

## Features ✨

* Simple & Fast ⚡️ *
* [Well tested 🔄](#tests)
* TypeScript compatible 🧑‍💻
* No API key is needed 🔑
* [Wide variety of search result types supported 🌴](./types.md)

## Install 📦

To get started, you can install **google-sr** using your preferred package manager:

```bash

# npm

npm install google-sr

# pnpm 

pnpm add google-sr

# yarn

yarn add google-sr

```
# Usage


> All Usage examples are written in typescript (compiled to common js)

* [**Searching one page**](./onepage)
    * [*Searching the first page*](./onepage#searching-the-first-page)
    * [*Searching a specific page*](./onepage.md##searching-a-specific-page)
* [**Searching multiple pages**](./multipage.md)
    * [*Searching multiple pages with maxPages*](./multipage.md#searching-multiple-pages-with-maxpages)
    * [*Searching specific pages*](./multipage.md#searching-specific-pages)
    * [*Searching specific range of pages*](./multipage.md#searching-specific-range-of-pages)


> By default only **ResultTypes.SearchResult** are returned, use the [filterResults](./advanced.md#filtering-result) option to configure it

> Additional examples can be found in [tests](#tests)

> For a comprehensive list of available options, you can refer to the unofficial Typedoc [here](https://paka.dev/npm/google-sr/api).

# Html selectors

For scraping we use jquery like selectors, view current selectors [here](./selectors.md). This document will be updated when a update for google occurs

# Disclaimer

This is not sponsored, supported, or affiliated with Google Inc.

Unlike the conventional recommendation of using the Google API, this module scrapes the Google search result page (which might potentially infringe upon Google's terms of service).

The source code within this repository is intended solely for educational purposes.

The author (typicalninja) & contributors takes **no** responsibility for any issues that arise from misuse, such as IP blocking by Google. Your discretion in usage is advised.

# Tests

Tests are written using [mocha](https://mochajs.org/) and can be run by using the `test` script.

> Tests are also executed on a schedule every week to make sure all selectors are updated

Project uses pnpm as its package manager

```bash
pnpm run test
```

# Support & Bug Reporting 🛠️🐞

> Make sure you are on the latest version before creating bug reports

Support and bug reporting both can be done on  [github issues](https://github.com/typicalninja/google-sr/issues)

# License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.