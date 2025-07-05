---
"google-sr": major
---

Deprecate strictSelector in favor of noPartialResults

The `strictSelector` option has been deprecated and replaced with `noPartialResults` for improved clarity. The new option name accurately describes its behavior.

```diff
search({
- strictSelector: true,
+ noPartialResults: true,
});
```
