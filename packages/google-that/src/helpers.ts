import c from "ansi-colors";
import boxen from "boxen";
import { html, stripIndents } from "common-tags";
import { ResultTypes, type ResultNode } from "google-sr";

export const log = {
  info: (...args: string[]) =>
    console.log(
      `${c.blue.bold("[INFO]")} @ ${new Date().toLocaleTimeString()} ${c.yellow(
        ">"
      )}`,
      ...args.map((s) => c.blueBright(s))
    ),
  success: (...args: string[]) =>
    console.log(
      `${c.green.bold(
        "[SUCCESS]"
      )} @ ${new Date().toLocaleTimeString()} ${c.yellow(">")}`,
      ...args.map((s) => c.greenBright(s))
    ),
  warn: (...args: string[]) =>
    console.log(
      `${c.yellowBright.bold(
        "[WARN]"
      )} @ ${new Date().toLocaleTimeString()} ${c.yellow(">")}`,
      ...args.map((s) => c.yellowBright(s))
    ),
  error: (...args: string[]) =>
    console.log(
      `${c.red.bold("[ERROR]")} @ ${new Date().toLocaleTimeString()} ${c.yellow(
        ">"
      )}`,
      ...args.map((s) => c.redBright(s))
    ),
};

export const getTimePerEachPage = (noOfPages: number) =>
  noOfPages > 10 ? 5000 : 2000;

export const delay = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export const formatter = {
  JSON: (results: ResultNode[][]) => JSON.stringify(results, null, 4),
  TXT: (results: ResultNode[][]) => {
    let startTxt = stripIndents(html)`
      ${results.map(
        (page, i) => html`
          ==============${i + 1}/${results.length}==================
          ${page.map((data) => {
            if (data.type === ResultTypes.SearchResult) {
              return boxen(stripIndents`
              🔍 ${data.title}
              🔗 ${data.link}
              📝 ${data.description}
              `);
            } else return `Not supported`;
          })}
        `
      )}
    `;

    return startTxt;
  },
};
