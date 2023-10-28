# Overview of selectors

:::tip 🌟 Suggestions
Suggest more types to be added in our [github discussions](https://github.com/typicalninja/google-sr/discussions/new?category=ideas)
:::

:::info
The selector list was last updated on `8/24/23` for the non-Javascript version of Google Search by [TypicalNinja](https://github.com/typicalninja/).
:::




All selector descriptions will feature an accompanying image that visually represents the element targeted by the selector.
Additionally, each image will be accompanied by its corresponding selector, along with illustrative examples derived from the image.

## Regular search results

Organic search results / Regular or normal search results

![Regular Search](/images/DefaultSearch.png)

#### Selectors for Regular search results


```json
{
    "block": ".Gx5Zad.fP1Qef.xpd.EtOod.pkphOe", // the entire block (the picture contains a block)
    "link": "[jsname][data-ved]", // https://nodejs.org
    "title": "h3.zBAuLc", // Node.js
    "description": ".BNeawe.s3v9rd.AP7Wnd", // Node.js is an open...
}
```


## Translations

Search result that are obtained via translation queries

![Google translation result](/images/Translate.png)

#### Selectors for translation queries

```json
{
    "sourceLanguage": "#tsuid_2 option:selected", // English
    "targetLanguage": "#tsuid_4 option:selected", // Spanish
    "sourceText": "#lrtl-source-text input[name=\"tlitetxt\"]", // hello world
    "translationText": '[id="lrtl-translation-text"]', // Hola Mundo
    "pronunciation": "[id=\"lrtl-transliteration-text\"]", // [not present in image]
}
```


## Dictionary

Search results obtained via "define" queries

![Search result for definition](/images/Dictionary.png)

#### Selectors for dictionary queries

```json
{
    "audio": "audio:first", // the audio link
    "phonetic": "span > div.BNeawe.tAd8D.AP7Wnd", // 
    "word": "h3 > div.BNeawe.deIvCb.AP7Wnd", // amazing
    "examples": "div.v9i61e > div.BNeawe > span.r0bn4c.rQMQod", // "she makes..."
    "definitions":"div.v9i61e > div.BNeawe.s3v9rd.AP7Wnd:not(:has(span.r0bn4c.rQMQod))", // very impressive...
}
```

## Current time

Search results obtained via "current time" queries

![Search result for current time](/images/Time.png)

#### Selectors for time queries

```json
{
    "location": "span.BNeawe.tAd8D.AP7Wnd > span.r0bn4c.rQMQod", // Time in united...
    "time": "div.BNeawe.iBp4i.AP7Wnd > div > div.BNeawe.iBp4i.AP7Wnd", // 18:37
    "timeInWords": "div.BNeawe.tAd8D.AP7Wnd > div > div.BNeawe.tAd8D.AP7Wnd", // wednesday, August...
}
```

## Currency conversions

Search results obtained via "Currency conversions" queries

![Currency](/images/Currency.png)

#### Selectors for Currency conversions queries

```json
{
    "from": "span.BNeawe.tAd8D.AP7Wnd > span.r0bn4c.rQMQod", // 10 united...
    "to": "div.BNeawe.iBp4i.AP7Wnd > div > div.BNeawe.iBp4i.AP7Wnd", // 13.53...
}
```