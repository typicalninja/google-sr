export const OrganicSearchSelector = {
	block: ".Gx5Zad.fP1Qef.xpd.EtOod.pkphOe",
	link: "[data-ved]",
	title: "h3.zBAuLc",
	description: ".BNeawe.s3v9rd.AP7Wnd",
};

export const TranslateSearchSelector = {
	sourceLanguage: "#tsuid_2 option:selected",
	targetLanguage: "#tsuid_4 option:selected",
	translationText: '[id="lrtl-translation-text"]',
	sourceText: '#lrtl-source-text input[name="tlitetxt"]',
	pronunciation: '[id="lrtl-transliteration-text"]',
};

export const DictionarySearchSelector = {
	// use attr('src') to get the audio url
	audio: "h3.zBAuLc.l97dzf > div.BNeawe > audio",
	phonetic: "span > div.BNeawe.tAd8D.AP7Wnd",
	word: "span.lU7jec > h3.zBAuLc.l97dzf > div.BNeawe",
	// there can be multiple definitions
	// use definitionPartOfSpeech as reference to how many definitions there are
	// there are no reliable way other than that to get definitions
	definition: "div.v9i61e > div.BNeawe.s3v9rd.AP7Wnd:not(:has(span))",
	definitionPartOfSpeech:
		"div.Ap5OSd > div.BNeawe.s3v9rd.AP7Wnd > span.r0bn4c.rQMQod",
	definitionExample: "div.v9i61e > div.BNeawe.s3v9rd.AP7Wnd:has(span)",
	definitionSynonyms:
		"div:not(.v9i61e):not(.Ap5OSd) > div.BNeawe.s3v9rd.AP7Wnd > span.r0bn4c.rQMQod",
};

export const TimeSearchSelector = {
	location: "span.BNeawe.tAd8D.AP7Wnd > span.r0bn4c.rQMQod",
	time: "div.BNeawe.iBp4i.AP7Wnd > div > div.BNeawe.iBp4i.AP7Wnd",
	timeInWords: "div.BNeawe.tAd8D.AP7Wnd > div > div.BNeawe.tAd8D.AP7Wnd",
};

export const CurrencyConvertSelector = {
	from: "span.BNeawe.tAd8D.AP7Wnd > span.r0bn4c.rQMQod",
	to: "div.BNeawe.iBp4i.AP7Wnd > div > div.BNeawe.iBp4i.AP7Wnd",
};
