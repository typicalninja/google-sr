#!/usr/bin/env node

import enquirer from "enquirer";
import { ResultTypes } from "google-sr";
import prettyMilliseconds from "pretty-ms";
import boxen from "boxen";
import fsPromises from "fs/promises";
import path from "path";
import c from "ansi-colors";
import slugify from "slugify";
import { stripIndents } from "common-tags";

import { estimateOffset, type InputForm } from "./constants.js";
import { SearchQuery } from "./query.js";
import { delay, getTimePerEachPage, log } from "./helpers.js";
import { getHTMLFormat, getJSONFormat, getTXTFormat } from "./formatters.js";

async function main() {
  console.clear();
  console.log(
    boxen(
      c.yellow(stripIndents`
  🎨 This CLI tool may sprinkle emojis for a touch of flair.
    If your terminal doesn't support emojis, they might appear as question marks.
    No worries though! The functionality of the CLI tool remains intact.
    If you spot this rocket emoji, you're all set for takeoff! 🚀
  `),
      { padding: 1 }
    )
  );
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
  if (!queries.length) return log.error(`Query option is required`);
  if (pages <= 0) return log.error(`Amount of pages must be greater than 0`);
  if (/[\\/:*?"<>|]/.test(savePath) || savePath.includes(" "))
    return log.error(
      `Invalid file name. File names cannot contain spaces or the following characters: \\ / : * ? \" < > |`
    );

  // check pages counts
  if (pages > 10)
    log.warn(
      `Fetching more than 10 pages per query. To prevent rate limits, the fetching will be done in delayed chunks.`
    );

  // calculate estimates
  const perPage = getTimePerEachPage(pages);
  const perQuery = perPage * pages
  const estimatedTime = (perQuery * queries.length) + estimateOffset;

  console.log(
    boxen(
      stripIndents`
  ⏰ ETA: ${c.green(prettyMilliseconds(estimatedTime))}
  📃 Per page: ${c.green(prettyMilliseconds(perPage))} 
  📖 Pages: ${pages} pages
  ❓ ${c.yellow(String(queries.length))} ${
        queries.length > 2 ? "queries" : "query"
      }
  💭 ${c.italic.yellowBright(queries.join(","))}
  `,
      { padding: 2, margin: 1 }
    )
  );

  const downloads: { pathName: string; query: string; total: number }[] = [];
  const start = Date.now();
  // run each query
  for (const query of queries) {
    log.info(
      `Starting search for query of "${query}" [${pages} page(s) to search]`
    );
    const searchQuery = new SearchQuery(query, queryInput, perPage);
    const searchStart = Date.now();
    try {
      const results = await searchQuery.search();
      const saveAt = savePath
        .replace("%query%", slugify.default(query, { lower: false }))
        .replace("%format%", resultType.toLowerCase());
      const pathName = path.join(process.cwd(), saveAt);
      if(!results.length) {
        log.warn(`Query "${query}" did not return any results (likely error logs are above), skipping`);
        continue;
      }
      let saveData: string;
      const totalResults = results.reduce((a, b) => a.concat(b)).length;


      switch (resultType) {
        case "JSON":
          saveData = getJSONFormat(results);
          break;
        case "TXT":
          saveData = getTXTFormat(results);
          break;
        case 'HTML':
          saveData = getHTMLFormat(results, query, totalResults)
        break;
        default:
          // use in dev env when new types are added
          saveData = "Unsupported TYPE";
      }

      await fsPromises.writeFile(pathName, saveData);
      const searchEnd = Date.now() - searchStart
      log.info(
        `Saved results for query "${query}" to ${pathName} took ${prettyMilliseconds(searchEnd)}`
      );
      downloads.push({ query, pathName, total: totalResults });
    } catch {
      log.error(`Failed to search query "${query}"`);
    }
  }

  // wait for save message to appear
  await delay(2000);
  const end = Date.now() - start;
  // print end message
  console.clear();

  if (!downloads.length) {
    return console.log(
      boxen(
        stripIndents`
    ❌ ${c.red('google-that process finished. [FAILED]')}
    🕰️ Finished in ${c.blue(
      prettyMilliseconds(end)
    )} with a deviation of ${c.yellow(
          prettyMilliseconds(end - estimatedTime)
        )} from estimated time (${prettyMilliseconds(estimatedTime)})
  
    ⭐ Star us here: ${c.blue("https://github.com/typicalninja/google-sr")}
    📦 Github here: ${c.blue(
      "https://github.com/typicalninja/google-sr/tree/master/packages/cli"
    )}
    📚 Documentation: ${c.blue("https://typicalninja.github.io/google-sr/")}
  
    ${c.cyanBright.underline("Downloads")}
    ↧↧↧↧
    ${c.red('Failed')}
  `,
        { padding: 1, margin: 1 }
      )
    );
  } else {
    console.log(
      boxen(
        stripIndents`
    ✅ ${c.green('google-that process finished. [SUCCESS]')}
    🕰️ Finished in ${c.blue(
      prettyMilliseconds(end)
    )} with a deviation of ${c.yellow(
          prettyMilliseconds(end - estimatedTime)
        )} from estimated time (${prettyMilliseconds(estimatedTime)})
  
    ⭐ Star us here: ${c.blue("https://github.com/typicalninja/google-sr")}
    📦 Github here: ${c.blue(
      "https://github.com/typicalninja/google-sr/tree/master/packages/cli"
    )}
    📚 Documentation: ${c.blue("https://typicalninja.github.io/google-sr/")}
  
    ${c.cyanBright.underline("Downloads")}
    ↧↧↧↧
    ${downloads
      .map(
        (download) =>
          `→ ${c.bold.grey(
            path.basename(download.pathName)
          )} ("${c.italic.yellow(download.query)}" [${c.green(
            String(download.total)
          )} results across ${pages} page${pages > 1 ? "s" : ""}])`
      )
      .join("\n")}
  `,
        { padding: 1, margin: 1 }
      )
    );
  }
}

main().catch(() => {
  log.error(`Failed to run, process exited abnormally.`);
});
