---
"google-sr": major
---

Update dictionary selectors with accurate definitions

This uses the updated dictionary definitions from google-sr-selectors as a response to google updating their result structure.

Previously, dictionary definitions were returned as a [string, string]. Now, they are returned as an object with the following properties:

```ts
interface DictionaryDefinition {
	partOfSpeech: string;
	definition: string;
	example: string;
	synonyms: string[];
}
```

Please take steps to update your code to use the new dictionary definition structure.