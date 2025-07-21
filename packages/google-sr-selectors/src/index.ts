export const GeneralSelector = {
	// almost all results are within same structured container
	// data-hveid attr blocks are for time search selectors
	block: "div:not([data-hveid]) > div.ezO2md",
};

export const OrganicSearchSelector = {
	link: "div > div > a.fuLhoc.ZWRArf",
	title: "span.CVA68e.qXLe6d.fuLhoc.ZWRArf",
	description: "span.qXLe6d.FrIlee > span.fYyStc",
	metaContainer: "span.qXLe6d.dXDvrc",
	// choose the last span as, if the result is an ad
	// there can be a middle span that contains the "-"
	metaSource: "span.fYyStc:last-of-type",
	// if this element is present and contains non empty text, its an ad
	metaAd: "span.dloBPe.fYyStc",
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

export const UnitConversionSelector = {
	from: "div > div.kk667b > span.F9iS2e > span.fYyStc.YVIcad",
	to: "div > table.Mw6wOc > tbody > tr > td > div > div > span.qXLe6d.epoveb > span.fYyStc",
};

export const KnowledgePanelSelector = {
	headerBlock: "table.ZuwI5d > tbody > tr > td",
	// the headerBlock contains title and label
	title: "span.qXLe6d.x3G5ab > span.fYyStc",
	label: "span.qXLe6d.F9iS2e > span.fYyStc",
	// the second td contains the image
	imageUrl: "a > img.qPa7sb",
	// description block contains description and metadata (description source link)
	// the first span is the description
	// and the first "<a>" is the source link
	descriptionBlock: "div.AS66f > div > span.qXLe6d.FrIlee",

	metadataBlock: "div.omMllc",
	metadataLabel: "span.FrIlee > span.fYyStc",
	metadataValue: "span.F9iS2e",
};

export const NewsSearchSelector = {
	title: ".CVA68e.qXLe6d.fuLhoc.ZWRArf",
	link: "a",
	published_date: ".fYyStc.YVIcad",
	description: ".qXLe6d.FrIlee .fYyStc:first-of-type",
	source: ".qXLe6d.dXDvrc .fYyStc",
	thumbnail_image: "table.gNEi4d > tbody > tr > td > div > img",
};
