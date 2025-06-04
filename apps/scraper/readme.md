# Google Search Result Dumper

Used to dump google search result pages. send requests identical to gsr for easier comparison

# Usage

Run using the `dump` script.

```sh
# Install dependencies
pnpm install

pnpm run dump [query]
```


Raw HTML output will be at `/sdump/{date}/dump.html`.
Output relevant for google-sr-selectors will be in `/sdump/{date}/selectors.md`.
Output summary will be in `/sdump/{date}/summary.md`.

> `{date}` will be a Unix timestamp (number of milliseconds elapsed since January 1, 1970).

Use a Markdown viewer that supports HTML rendering. This is necessary to view the output of summary and selector reports.
Viewers Like vscode built-in markdown viewer or Obsidian work well.