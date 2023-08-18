#!/usr/bin/env node

import enquirer from "enquirer";
import { ResultTypes } from "google-sr";
import prettyMilliseconds from "pretty-ms";
import boxen from 'boxen'
import fsPromises from 'fs/promises'
import path from 'path';
import c from 'ansi-colors'
import slugify from "slugify";
import { stripIndents } from 'common-tags'

import type { InputForm } from "./constants.js";
import { SearchQuery } from "./query.js";
import { delay, getTimePerEachPage, log } from "./helpers.js";

async function main() {
  // get the query
  const queryInput = await enquirer.prompt<InputForm>([
    {
      type: "list",
      name: "queries",
      message: 'Search queries (separate by a ",")',
      required: true,
    },
    {
      type: "number",
      name: "pages",
      initial: 1,
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
      type: "input",
      name: "savePath",
      message: "Output location (use %query% placeholder for query slug)",
      required: true,
      initial: "downloaded-%query%.%format%",
    },
    {
      type: "select",
      name: "resultType",
      message:
        "Format of the result (ENTER to Select / ↑↓ to change selection)",
      choices: [
        {
          message: "Json",
          name: "JSON",
          enabled: true,
        },
        { message: "HTML", name: "HTML" },
        { message: "Text", name: "TXT" },
      ],
      required: true,
    },
  ]);

  const { queries, pages, savePath, resultType } = queryInput;

  // validation
  if (!queries.length) return log.error(`Query/Queries option is required`);
  if (pages <= 0) return log.error(`Pages must be greater than 0`);

  // check pages counts
  if (pages > 10)
    log.warn(
      `Fetching more than 10 pages per query, will fetch in delayed chunks to prevent rate limit`
    );

  // calculate estimates
  const perPage = getTimePerEachPage(pages);
  const totalTime = perPage * pages * queries.length;
  log.info(
    `It will take ${prettyMilliseconds(totalTime)} with ${prettyMilliseconds(
      perPage
    )} for ${pages} pages with ${queries.length} queries / query`
  );

  log.info(
    `Searching for ${
      queries.length > 1
        ? `multiple queries (${queries.length}) [${queries}]`
        : `query on "${queries[0]}"`
    }`
  );

  const downloads: { pathName: string; query: string, total: number }[] = []

  // run each query
  for (const query of queries) {
    log.info(
      `Starting search for query of "${query}" [${pages} page(s) to search]`
    );
    const searchQuery = new SearchQuery(query, queryInput, perPage);
    try {
      const results = await searchQuery.search();
      log.success(`Retrieved ${results.length} result(s)`);
      // @ts-ignore
      const saveAt = savePath.replace('%query%', slugify(query, { lower: false, })).replace('%format%', resultType.toLowerCase())
      const pathName = path.join(process.cwd(), saveAt)
      log.info(`Saving results for query "${query}" to ${pathName}`)

      switch(resultType) {
        case 'JSON':
          await fsPromises.writeFile(pathName, JSON.stringify(results, null, 4))
      }
      const totalResults = results.reduce((a, b) => a.concat(b)).length
      downloads.push({ query, pathName, total: totalResults })
    } catch {
      log.error(`Failed to search query`);
    }
  }

  // wait for save message to appear
  await delay(2000)

  // print end message
  console.clear()
  console.log(boxen(stripIndents`
  ✅ google-that download finished.


  ⭐ Star us here: ${c.blue('https://github.com/typicalninja/google-sr')}
  📦 Github here: ${c.blue('https://github.com/typicalninja/google-sr/tree/master/packages/cli')}

  ${c.bgCyanBright.underline('Downloads')}
  ↧↧↧↧
  ${downloads.map((download) => `→ ${c.bold.magenta(path.basename(download.pathName))} ("${c.italic.yellow(download.query)}" [${download.total} results])`).join('\n')}
`));
}

main().catch(() => {
  log.error(`Failed to run, process exited abnormally.`);
});
