# Introduction to google-sr-selectors

::: warning ⚠️ Old documentation
You are viewing the the documentation for the v3.x.x version of google-sr.
Please see the latest documentation [here](https://github.com/typicalninja/google-sr/blob/master/packages/google-sr/README.md)
:::

Set of html selectors for parsing google search results with jquery like modules (ex: cheerio).

::: info 🌟 Show Your Support!
If you like the project, please give it a star on [Github](https://github.com/typicalninja/google-sr/) & [Codeberg](https://codeberg.org/typicalninja/google-sr) to express your support!
:::

:::warning 🕵️‍♂️ Note
   Please note that the included selectors are intended for the non-Javascript version of Google Search page. 
   These were obtained by appending `&gbv=1` to the regular query link.

   ex: (disable javascript, else it will redirect): [query `nodejs`](https://www.google.com/search?hl=en&q=nodejs&gbv=1)
:::

## Installation

[![NPM license](https://img.shields.io/npm/l/google-sr-selectors)](https://www.npmjs.com/package/google-sr-selectors)

[![npm downloads](https://img.shields.io/npm/dw/google-sr-selectors)](https://www.npmjs.com/package/google-sr-selectors)

::: code-group

```sh:no-line-numbers [npm]
npm i google-sr-selectors
```

```sh:no-line-numbers [pnpm]
pnpm add google-sr-selectors
```

```sh:no-line-numbers [yarn]
yarn add google-sr-selectors
```

:::


## What are selectors?

Selectors form the backbone of packages like google-sr. These are predefined strings that outline the structure of specific HTML code representing the desired value. 
By utilizing selectors, we gain the ability to parse the HTML and precisely extract the intended information.

This package exports the selectors used to extract search result values from, google html page data we receive.
Offered for purposes of contributors and other developers interested in parsing raw google search html.

:::warning
Google can update its HTML structure periodically, which could potentially disrupt the functionality of the package. 
While we do run a github action to test the package periodically, we may take time to patch package.

If you suspect that Google has updated all or some selectors and we have not yet patched the package, please [create a github issue](https://github.com/typicalninja/google-sr/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=[BUG]%20Selectors%20outdated).
:::


## License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](https://github.com/typicalninja/google-sr/blob/master/LICENSE) for more information.