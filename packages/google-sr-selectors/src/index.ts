export const OrganicSearchSelector = {
    block: ".Gx5Zad.fP1Qef.xpd.EtOod.pkphOe",
    link: "[jsname][data-ved]",
    title: "h3.zBAuLc",
    description: ".BNeawe.s3v9rd.AP7Wnd",
}

export const TranslateSearchSelector = {
    sourceLanguage: "#tsuid_2 option:selected",
    targetLanguage: "#tsuid_4 option:selected",
    translationText: '[id="lrtl-translation-text"]',
    sourceText: '#lrtl-source-text input[name="tlitetxt"]',
    pronunciation: '[id="lrtl-transliteration-text"]',
}

export const DictionarySearchSelector = {
    audio: "audio:first",
    phonetic: "span > div.BNeawe.tAd8D.AP7Wnd",
    word: "h3 > div.BNeawe.deIvCb.AP7Wnd",
    examples: "div.v9i61e > div.BNeawe > span.r0bn4c.rQMQod",
    definitions:
      "div.v9i61e > div.BNeawe.s3v9rd.AP7Wnd:not(:has(span.r0bn4c.rQMQod))",
}

export const TimeSearchSelector = {
    location: "span.BNeawe.tAd8D.AP7Wnd > span.r0bn4c.rQMQod",
    time: "div.BNeawe.iBp4i.AP7Wnd > div > div.BNeawe.iBp4i.AP7Wnd",
    timeInWords: "div.BNeawe.tAd8D.AP7Wnd > div > div.BNeawe.tAd8D.AP7Wnd",
}

export const CurrencyConvertSelector = {
    from: "span.BNeawe.tAd8D.AP7Wnd > span.r0bn4c.rQMQod",
    to: "div.BNeawe.iBp4i.AP7Wnd > div > div.BNeawe.iBp4i.AP7Wnd",
}
