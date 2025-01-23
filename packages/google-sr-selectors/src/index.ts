export const GeneralSelector = {
	// almost all results are within same structured container
	// data-hveid attr blocks are for time search selectors
	block: "div:not([data-hveid]) > div.ezO2md",
};

export const OrganicSearchSelector = {
	link: "div > div > a.fuLhoc.ZWRArf",
	title: "span.CVA68e.qXLe6d.fuLhoc.ZWRArf",
	description: "span.qXLe6d.FrIlee > span.fYyStc",
};

export const TranslateSearchSelector = {
	// old version does not have separate source and target language
	// instead it has ex "English (detected) to Spanish "
	translateFromTo: "div.kk667b > span.FrIlee > span.fYyStc",
	translatedText: "td > div > div > span.qXLe6d.epoveb > span.fYyStc",
	// source text is in the format "hello" in Japanese
	sourceText: "td > div > div > span.qXLe6d.F9iS2e > span.fYyStc",
};

export const DictionarySearchSelector = {
	phonetic: "td > span.qXLe6d.F9iS2e > span",
	word: "td > span.qXLe6d.x3G5ab > span.fYyStc",
	// there can be multiple definitions
	// use definitionPartOfSpeech as reference to how many definitions
	// there are no reliable ways other than that to get definitions
	// the main container
	definitionsContainer: "div.AS66f",
	// container has multiple of these blocks
	definitionsBlock: "div.CSfvHb",
	// within a definition block
	definitionPartOfSpeech: "span.qXLe6d.FrIlee > span.fYyStc.YVIcad",
	definitionList: "div.CSfvHb > ol > li",
	// the selector for synonyms and examples are the same
	definitionTextBlock: "span.qXLe6d.FrIlee > span.fYyStc",
};

export const TimeSearchSelector = {
	block: "div[data-hveid] > div.ezO2md > div",
	location: "div.kk667b > span.F9iS2e > span.fYyStc.YVIcad",
	// the time and tiw is within a table for layouting
	// this makes it efficient the container before taking the actual content itself
	timeLayoutTable: "table.Mw6wOc > tbody > tr > td > div",
	time: "div > span.qXLe6d.epoveb > span.fYyStc",
	timeInWords: "div > span.qXLe6d.F9iS2e > span.fYyStc.YVIcad",
};

export const CurrencyConvertSelector = {
	block: "div[data-hveid] > div.ezO2md",
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
