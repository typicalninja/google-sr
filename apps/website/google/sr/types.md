# Search result types

Currently google-sr support the following types of results.

:::tip 🌟 Suggestions
Suggest more types to be added in our [github discussions](https://github.com/typicalninja/google-sr/discussions/new?category=ideas)
:::


## Regular search results

Organic search results / Regular or normal search results

> ex: "**node js**"

![Regular Search](/images/DefaultSearch.png)


:::info
These will contain [`type: ResultTypes.SearchResult`](https://typicalninja.github.io/google-sr/enums/google_sr.ResultTypes.html#SearchResult) in returned objects
:::

## Translations Results

Search result that are obtained via translation queries

> ex: "**Translate hello to spanish**"

![Google translation result](/images/Translate.png)

:::info
These will contain [`type: ResultTypes.TranslateResult`](https://typicalninja.github.io/google-sr/enums/google_sr.ResultTypes.html#TranslateResult) in returned objects
:::


## Dictionary Results

Search results obtained via "define" queries

> ex: "**define amazing**"

![Search result for definition](/images/Dictionary.png)

:::info
These will contain [`type: ResultTypes.DictionaryResult`](https://typicalninja.github.io/google-sr/enums/google_sr.ResultTypes.html#DictionaryResult) in returned objects
:::

## Current time

Search results obtained via "current time" queries

> ex: "**what is the current time in uk**"

![Search result for current time](/images/Time.png)

:::info
These will contain [`type: ResultTypes.TimeResult`](https://typicalninja.github.io/google-sr/enums/google_sr.ResultTypes.html#TimeResult) in returned objects
:::


## Currency conversions

Search results obtained via "Currency conversions" queries

> ex: "**Convert 10 usd to cad**"

![Currency](/images/Currency.png)

:::info
These will contain [`type: ResultTypes.CurrencyResult`](https://typicalninja.github.io/google-sr/enums/google_sr.ResultTypes.html#CurrencyResult) in returned objects
:::