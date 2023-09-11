# google-sr-selectors


[![testing workflow](https://github.com/typicalninja/google-sr/actions/workflows/tests.yml/badge.svg)](https://github.com/typicalninja/google-sr)
[![npm downloads](https://img.shields.io/npm/dw/google-sr-selectors)](https://www.npmjs.com/package/google-sr-selectors)
[![GitHub issues](https://img.shields.io/github/issues/typicalninja/google-sr)](https://github.com/typicalninja/google-sr/issues)
[![NPM license](https://img.shields.io/npm/l/google-sr-selectors)](https://www.npmjs.com/package/google-sr-selectors)
[![npm version](https://img.shields.io/npm/v/google-sr-selectors)](https://www.npmjs.com/package/google-sr-selectors)
[![Discord](https://img.shields.io/discord/807868280387665970)](https://discord.gg/ynwckXS9T2)
[![CodeFactor](https://www.codefactor.io/repository/github/typicalninja/google-sr/badge)](https://www.codefactor.io/repository/github/typicalninja/google-sr)

Set of html selectors for parsing google search results with jquery like modules (ex: cheerio).


* View documentation [here](https://g-sr.vercel.app/google/selectors)

* Come chat with us on [our discord](https://discord.gg/ynwckXS9T2)


Please note that the included selectors are intended for the **non-Javascript** version of Google Search page. 
These were obtained by appending `&gbv=1` to the regular query link.

ex: (disable javascript, else it will redirect): [query `nodejs`](https://www.google.com/search?hl=en&q=nodejs&gbv=1)

## What are selectors?

Selectors form the backbone of packages like google-sr. These are predefined strings that outline the structure of specific HTML code representing the desired value. 
By utilizing selectors, we gain the ability to parse the HTML and precisely extract the intended information.

This package exports the selectors used to extract search result values from, google html page data we receive.
Offered for purposes of contributors and other developers interested in parsing raw google search html.

## Supported types

The package currently only supports a limited amount of selectors

You can view them in the [documentation](https://g-sr.vercel.app/google/selectors)

🌟 Suggest more to be added [here](https://github.com/typicalninja/google-sr/discussions/new?category=ideas)

## Related projects 🥂

* [google-sr](https://g-sr.vercel.app/google/sr) - Simple tool to programmatically get google search results
* [google-that](https://g-sr.vercel.app/google/that) - CLI wrapper around google-sr


## Disclaimer

This is not sponsored, supported, or affiliated with Google Inc.

The source code within this repository is intended solely for educational purposes.

The author (typicalninja) & contributors takes **no** responsibility for any issues that arise from misuse, such as IP blocking by Google. Your discretion in usage is advised.

## License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.