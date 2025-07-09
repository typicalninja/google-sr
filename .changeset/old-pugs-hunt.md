---
"google-sr": major
---

Remove strictSelector in favor of noPartialResults

Replace `strictSelector` option with `noPartialResults` for improved clarity and better description of its behavior.

```diff
search({
- strictSelector: true,
+ noPartialResults: true,
});
```
