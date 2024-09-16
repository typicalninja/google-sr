# google-sr-selectors


[![testing workflow](https://github.com/typicalninja/google-sr/actions/workflows/tests.yml/badge.svg)](https://github.com/typicalninja/google-sr)
[![npm downloads](https://img.shields.io/npm/dw/google-sr-selectors)](https://www.npmjs.com/package/google-sr-selectors)
[![GitHub issues](https://img.shields.io/github/issues/typicalninja/google-sr)](https://github.com/typicalninja/google-sr/issues)
[![NPM license](https://img.shields.io/npm/l/google-sr-selectors)](https://www.npmjs.com/package/google-sr-selectors)
[![npm version](https://img.shields.io/npm/v/google-sr-selectors)](https://www.npmjs.com/package/google-sr-selectors)
[![Discord](https://img.shields.io/discord/807868280387665970)](https://discord.gg/ynwckXS9T2)
[![CodeFactor](https://www.codefactor.io/repository/github/typicalninja/google-sr/badge)](https://www.codefactor.io/repository/github/typicalninja/google-sr)

Set of html selectors for parsing google search results with jquery like modules (ex: cheerio).

Please note that the included selectors are intended for the **non-Javascript** version of Google Search page. 
These were obtained by appending `&gbv=1` to the regular query link.

ex: (disable javascript, else it will redirect): [query `nodejs`](https://www.google.com/search?hl=en&q=nodejs&gbv=1)

# Supported types

The package currently only supports a limited amount search result types

See the [api docs](https://github.com/typicalninja/google-sr/blob/master/packages/google-sr-selectors/API.md) for more information.

🌟 Suggest more to be added [here](https://github.com/typicalninja/google-sr/discussions/new?category=ideas)

# Related projects 🥂

* [google-sr](https://g-sr.vercel.app/google/sr) - Simple tool to programmatically get google search results
* [google-that](https://g-sr.vercel.app/google/that) - CLI wrapper around google-sr


# Disclaimer

This is not sponsored, supported, or affiliated with Google Inc.

Unlike the conventional recommendation of using the Google API, this module scrapes the Google search result page (which might potentially infringe upon Google's terms of service).

The source code within this repository is intended solely for educational & research purposes.

The author (typicalninja) & contributors takes **NO** responsibility for any issues that arise from misuse, such as IP blocking by Google. Your discretion in usage is advised.

# License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.