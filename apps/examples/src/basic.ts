/**
 * Basic usage of the library.
 * Uses the default result types. (OrganicResult)
 */

import { search } from "google-sr"

const results = await search({ query: "hello" });

console.log(results);