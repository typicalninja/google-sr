---
"google-that": major
---

Update CLI to use renamed parser API

The CLI now uses the new `parsers` option and `ResultParser` type from `google-sr` instead of the old `resultTypes` and `ResultSelector` names.

**Breaking Change:**
- The CLI option `--resultTypes`/`-r` is now `--parsers`/`-r` to match the new API.
