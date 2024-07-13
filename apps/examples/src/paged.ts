import { searchWithPages } from "google-sr"

const results = await searchWithPages({
    query: "hello world",
    pages: 1,
    flattenResults: true,
});

console.log(results);