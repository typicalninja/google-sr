---
"google-sr": major
---

Bypass JavaScript requirement for Google search

In a recent Google update, the ability to access search result pages without enabling JavaScript was disabled. 
(See [#51](https://github.com/typicalninja/google-sr/issues/51) for more details.)

A workaround that bypasses the JavaScript requirement by utilizing an alternate page version served to specific user agents
is now implemented. However, this alternate page lacks certain 
features available on the standard page, resulting in the removal of some properties.

#### Changes to results

* `OrganicResult` - No user facing changes
* `TranslateResult` - `translationPronunciation` property was removed
* `DictionaryResult` - `definition` property was removed in favour of a `meaning` property, check the documentation for more details
* `CurrencyResult` - No user facing changes
* `TimeResult` - No user facing changes
* `KnowledgePanelResult` - `images` and `catalog` properties were removed, new properties `sourceLink` and `imageLink` were added.