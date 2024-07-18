/**
 * Scrapes google and dumps a copy of the search html
 * Declutter by Removing styles / header / footer
 */

// uses same axios version as gsr to make it easier to compare
import axios from "axios";
import fs from "fs/promises";
import * as cheerio from "cheerio";
import path from "path";
import * as Selectors from "google-sr-selectors";
import { fileURLToPath } from "node:url";

// query is everything after "node scrape.js"
const query = process.argv.slice(2).join(" ") || "nodejs";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const destinationDir = path.resolve(__dirname, "sdump");

console.log(`Search query > ${query}`);

try {
  const queryRequest = await axios({
    url: "https://www.google.com/search",
    headers: {
      Accept: "text/html",
      "accept-encoding": "gzip, deflate",
      "Accept-language": "en-US,en",
      referer: "https://www.google.com/",
      "upgrade-insecure-requests": 1,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
    },
    params: {
      q: query,
      // required to get the non-js version of the page
      gbv: "1",
    },
    responseType: "text",
  });
  console.log(`Request success > received ${queryRequest.data.length} bytes`);
  const $ = cheerio.load(queryRequest.data);

  const mainContent = $("#main");
  // filter out uneeded parts
  mainContent.find("footer, header, script, svg, style").remove();
  const curDate = Date.now();
  const htmlDumpFile = path.resolve(destinationDir, `./${curDate}.dump.html`);
  const selectorDumpDir = path.resolve(
    destinationDir,
    `./${curDate}.selectors.md`
  );

  let selectorDumpData = "";

  /**
   * selectors.md content
   * [looped]:
   * {queryType}
   * {au} - {result}
   *
   */

  for (const [queryType, querySelectors] of Object.entries(Selectors)) {
    let queryTypeResults = `# ${queryType}`;
    for (const [selectorName, selector] of Object.entries(querySelectors)) {
      const result = $(selector);
      queryTypeResults += `\n\n## ${selectorName} [\`${selector}\`]\n### text: \n${result.text()}\n### html: \n${result.html()}`;
    }

    // add the result
    selectorDumpData += `\n\n${queryTypeResults}`;
  }

  // ensure the directory exists
  await fs.mkdir(path.dirname(htmlDumpFile), { recursive: true });

  console.log(`Dumping html to > ${htmlDumpFile}`);
  await fs.writeFile(htmlDumpFile, mainContent.html());
  console.log(
    `Successfully dumped content to ${htmlDumpFile} (${
      mainContent.html().length
    } bytes)`
  );

  console.log(`Dumping selector results to > ${selectorDumpDir}`);
  await fs.writeFile(selectorDumpDir, selectorDumpData);
  console.log(
    `Succefully dumpd selector results to > ${selectorDumpDir} (${selectorDumpDir.length} bytes)`
  );
} catch (err) {
  console.log("Failed to download content");
  console.log(err.toString());
}
