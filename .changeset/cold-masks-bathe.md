---
"google-sr-selectors": major
---

Update dictionary result selectors

Following selectors were replaced with new ones / removed.

```json5
{
  audio: "...",
  definition: "...",
  definitionPartOfSpeech: "...",
  definitionExample: "...",
  definitionSynonyms: "..."
}
```

The following selectors are the replacement for the above selectors.

```json5
{
  definitionsContainer: "...",
  // container has multiple of these blocks
  definitionsBlock: "...",
  // within a definition block
  definitionPartOfSpeech: "...",
  definitionList: "...",
  // the selector for synonyms and examples are the same
  definitionTextBlock: "...",
}
```