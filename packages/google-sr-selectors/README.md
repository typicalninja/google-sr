# google-sr-selectors

Set of html selectors for parsing google search results with jquery like modules (ex: cheerio).


Please note that the included selectors are intended for the **non-Javascript** version of Google Search page. 
These were obtained by appending `&gbv=1` to the regular query link.

ex: (disable javascript, else it will redirect): [query `nodejs`](https://www.google.com/search?hl=en&q=nodejs&gbv=1)

## What are selectors?

Selectors form the backbone of packages like google-sr. These are predefined strings that outline the structure of specific HTML code representing the desired value. 
By utilizing selectors, we gain the ability to parse the HTML and precisely extract the intended information.

This document outlines the selectors used to extract search result values from, html page data we receive
for purposes of contributors and other developers interested in parsing raw google search html.

## Disclaimer

This is not sponsored, supported, or affiliated with Google Inc.

Unlike the conventional recommendation of using the Google API, this module scrapes the Google search result page (which might potentially infringe upon Google's terms of service).

The source code within this repository is intended solely for educational purposes.

The author (typicalninja) & contributors takes **no** responsibility for any issues that arise from misuse, such as IP blocking by Google. Your discretion in usage is advised.

## License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.