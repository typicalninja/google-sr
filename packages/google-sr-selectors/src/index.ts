export const OrganicSearchSelector = {
	block: "div:not([data-hveid]):not(.yStFkb) > div.Gx5Zad.xpd.EtOod.pkphOe",
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

export const KnowledgePanelSelector = {
	title: "div.kCrYT > span.lU7jec > h3.zBAuLc.l97dzf > div.BNeawe",
	label: "span > div.BNeawe.tAd8D.AP7Wnd",
	description: "div.BNeawe.s3v9rd.AP7Wnd > div > div.BNeawe.s3v9rd.AP7Wnd",
	metadataBlock: "div.vbShOe.kCrYT > div.AVsepf > div.BNeawe.s3v9rd.AP7Wnd",
	metadataLabel: "span > span.BNeawe.s3v9rd.AP7Wnd",
	metadataValue: "span > span.BNeawe.tAd8D.AP7Wnd",
	imageSource: "div.idg8be > a.BVG0Nb.OxTOff",
	// imageUrl is a direct child of the imageSource
	imageUrl: "div > img.WddBJd",

	catalogBlock: "div:has(> div.kCrYT > span.punez)",
	catalogTitle: "div.kCrYT > span.punez",
	catalogItem: "div.Xdlr0d > div.idg8be > a.BVG0Nb.OxTOff > div",
	catalogItemImage: "div > div.l7d08 > img.h1hFNe",
	catalogItemTitle: "div > div.RWuggc.kCrYT > div > div.BNeawe.s3v9rd.AP7Wnd",
	catalogItemCaption: "div > div.RWuggc.kCrYT > div > div.BNeawe.tAd8D.AP7Wnd",
};
