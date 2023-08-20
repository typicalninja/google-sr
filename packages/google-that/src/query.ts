import type { InputForm } from "./constants.js";
import cliProgress from "cli-progress";
import { delay, log } from "./helpers.js";
import { search, type ResultNode, pageToGoogleQueryPage } from "google-sr";

export class SearchQuery {
  constructor(
    public query: string,
    public inputOptions: InputForm,
    private delayPerPage: number
  ) {}
  async search() {
    const queryBar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    );
    console.log("\n");
    queryBar.start(this.inputOptions.pages, 0, { speed: "N/A" });
    const result: ResultNode[][] = [];
    for (let i = 1; i <= this.inputOptions.pages; i++) {
      try {
        queryBar.update(i);
        const QueryResult = await this.doSearch(i);
        result.push(QueryResult);
        await delay(this.delayPerPage);
      } catch (err) {
        queryBar.stop();
        log.error(`Failed to download page ${i} of query ${this.query}`)
      }
    }
    queryBar.stop();
    return result;
  }
  doSearch(page: number) {
    return search({ query: this.query , page: pageToGoogleQueryPage(page), filterResults: this.inputOptions.searchType })
  }
}
