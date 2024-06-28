# google search dump

Used to dump google search result pages. send requests identical to gsr for easier comparison

# Usage

> Run with a script

```sh
# Make sure to install the required packages
pnpm install

node search-dump.js [query]
```

Output will be at `/sdump/{date}.dump.html`.