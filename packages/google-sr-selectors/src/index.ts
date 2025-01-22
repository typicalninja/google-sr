export const OrganicSearchSelector = {
	block: "div > div.ezO2md",
	link: "div > div > a.fuLhoc.ZWRArf",
	title: "span.CVA68e.qXLe6d.fuLhoc.ZWRArf",
	description: "span.qXLe6d.FrIlee > span.fYyStc",
};

export const TranslateSearchSelector = {
	block: "div > div.ezO2md",
	// old version does not have seperate source and target language
	// instead it has ex "English (detected) to Spanish "
	translateFromTo: "div.kk667b > span.FrIlee > span.fYyStc",
	translatedText: "td > div > div > span.qXLe6d.epoveb > span.fYyStc",
	// source text is in the format "hello" in Japanese
	sourceText: "td > div > div > span.qXLe6d.F9iS2e > span.fYyStc",
};

export const DictionarySearchSelector = {
	block: "div > div.ezO2md",
	phonetic: "td > span.qXLe6d.F9iS2e > span",
	word: "td > span.qXLe6d.x3G5ab > span.fYyStc",
	// there can be multiple definitions
	// use definitionPartOfSpeech as reference to how many definitions
	// there are no reliable ways other than that to get definitions
	// the main container
	definitionsContainer: "div.AS66f",
	// container has multiple of these blocks
	definitionsBlock: "div.CSfvHb",
	// within each definition block
	definitionPartOfSpeech: "span.qXLe6d.FrIlee > span.fYyStc.YVIcad",
	definitionList: "div.CSfvHb > ol > li",
	// each li contains multiple spans (TextBlocks)
	// the selector for synonyms and examples are the same
	definitionTextBlock: "span.qXLe6d.FrIlee > span.fYyStc",
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
