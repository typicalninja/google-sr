# google-sr 🔍

Fast and efficient Package for scraping Google search results without the need for an API key. 🚀

## Features ✨

* Lightweight 💨
* Fast and efficient ⚡️ *
* Well tested 🔄
* TypeScript compatible 🧑‍💻

> \* depends on amount of pages fetched (avg of 1s per page in testing)

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

More examples can be found in [/tests](../tests/) directory


# Html selectors

For scraping we use jquery like selectors view current selectors [here](./selectors.md). This document will be update when a update for google occurs

# Testing

Test are written to the [/tests](../tests/) folder. Tests are written using [mocha](https://mochajs.org/) and can be run by using the `test` script

```bash

# npm

npm run test

# pnpm 

pnpm run test

# yarn

yarn run test

```

# Support & Bug Reporting 🛠️🐞

> Make sure you are on the latest version before creating bug reports

Support and bug reporting both can be done on either my [discord server](https://discord.gg/9s52pz6nWX) or on [github issues](https://github.com/typicalninja493/google-sr/issues)


# License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.