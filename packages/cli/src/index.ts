import enquirer from "enquirer";
import { ResultTypes } from "google-sr";

interface Result {
  query: string[];
  searchType: ResultTypes;
  safeMode: boolean;
}

async function main() {
  // get the query
  const queryInput = await enquirer.prompt<Result>([
    {
      type: "input",
      name: "query",
      message: 'Search queries (separate by a ",")',
      required: true,
    },
    {
      type: "input",
      name: "pages",
      message:
        'Pages to retrieve (separate by a ","  / defaults to first page)',
    },
    {
      type: "toggle",
      name: "safeMode",
      message: "Enable safe mode?",
    },
    {
      type: "multiselect",
      name: "searchType",
      message:
        "Pick the type of search result to be returned (SPACE to select / ENTER to submit / ↑↓ to change selection)",
      choices: [
        {
          message: "Organic search",
          name: ResultTypes.SearchResult,
          enabled: true,
        },
        { message: "Translate Result", name: ResultTypes.TranslateResult },
        { message: "Dictionary Result", name: ResultTypes.DictionaryResult },
        { message: "Current time search", name: ResultTypes.TimeResult },
        { message: "Currency conversions", name: ResultTypes.CurrencyResult },
      ],
      required: true,
      multiple: true,
    },
    {
        type: "select",
        name: "resultType",
        message:
          "Format of the result (ENTER to Select / ↑↓ to change selection)",
        choices: [
          {
            message: "Json",
            name: 'JSON',
            enabled: true,
          },
          { message: "HTML", name: 'HTML' },
          { message: "Text", name: 'TXT' },
        ],
        required: true,
      },
  ]);

  if (queryInput.searchType.length === 0) console.log(`WARN Using ResultType:Search since ResultType option was not modified`)

    console.log(`Searching for query on ${queryInput.query}`)
}

main();
