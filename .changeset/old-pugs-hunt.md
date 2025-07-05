---
"google-sr": major
---

Remove strictSelector in favor of noPartialResults

The `strictSelector` option has been removed and replaced with `noPartialResults` for improved clarity. The new option name accurately describes its behavior.

```diff
search({
- strictSelector: true,
+ noPartialResults: true,
});
```
