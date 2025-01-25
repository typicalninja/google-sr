---
"google-sr-selectors": major
---

Update translate result selectors

Following selectors were replaced with new ones / removed.

```json5
{

  translationText: "...",
  sourceLanguage: "...",
  targetLanguage: "...",
}
```

The following selectors are the replacement for the above selectors.

* `translateFromTo` -> `sourceLanguage` and `targetLanguage`
   * translateFromTo is a string in the format of `sourceLanguage to targetLanguage`
* `translatedText` -> `translationText`