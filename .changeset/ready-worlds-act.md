---
"google-sr": major
---

Fixed types and improved all result parsers

Fixed generic types for partial results. Now `search` and `searchWithPages` return the correct types based on the `noPartialResults` option.

**Breaking Changes:**
- `DictionaryResultNode` interface: `phonetic` and `word` properties are now required when `noPartialResults` is `true`. This makes all result types consistent.
- All parsers now convert empty strings to `undefined` (this was in the types but not working). This may break your code if you expected empty strings in the previous versions.

**Other Changes:**
- Refactored all internal parsers for better consistency
- Added better documentation and examples
- Improved parsing reliability