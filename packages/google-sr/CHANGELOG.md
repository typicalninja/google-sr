# google-sr

## 4.1.0

### Minor Changes

- 0d21c7a: Implement knowledge graph results

### Patch Changes

- Updated dependencies [fabb572]
- Updated dependencies [0d21c7a]
  - google-sr-selectors@1.1.0

## 4.0.0

### Major Changes

- 563bfc4: Update dictionary selectors with accurate definitions

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

- c332095: Rewrite the api to be customizable

  google-sr has been completely rewritten to be more customizable. It is possible to create your own selector functions and use them to scrape the data you want.

  `filterResults` option was replaced by `resultTypes` which accepts a function instead of a string. This allows you to add your own custom selectors to be used as a parser.

  ```diff
  search({
  -      filterResults: [ResultTypes.SearchResult]
  +      resultTypes: []
  })
  ```

  Check the newly added api documentation [here](https://github.com/typicalninja/google-sr/tree/master/packages/google-sr#google-sr-api)

### Minor Changes

- 5676a7a: Support custom selectors

  Use the new `ResultNodeTyper` to create a custom node, and use the `ResultSelector` to create a function that will parse the raw html for results and return a node.

  ```ts
  import { ResultNodeTyper, ResultSelector } from "google-sr";
  // first argument is the "type" value (string) of the node, second is all the properties of the node
  type DidYouKnow = ResultNodeTyper<"SOMETYPE", "prop1" | "prop2"> & { // properties that are not string can be defined as this
    descriptions: string[];
  };
  const selector: ResultSelector<DidYouKnow> = ($, strictSelector) => {
    // return node
  };

  search({ resultTypes: [selector] });
  ```

- d98c496: Remove uneeded top level options

  Removed the `safemode` top-level options as the same result can be achieved using the requestConfig option.

  ```diff
  const queryResult = await search({
  -    safemode: true,
      // requestConfig is of type AxiosRequestConfig
  +    requestConfig: {
  +		params: {
  +            // enable "safe mode"
  +			safe: 'active'
  +		},
  +	},
  });
  ```

### Patch Changes

- Updated dependencies [563bfc4]
- Updated dependencies [e1a4af2]
  - google-sr-selectors@1.0.0
