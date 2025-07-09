---
"google-sr-selectors": major
"google-sr": major
"google-that": minor
---

Rename CurrencyResult to UnitConversionResult

Rename `CurrencyResult` to `UnitConversionResult` to better reflect its ability to handle all conversion queries (currency, units, measurements, etc.), not just currency conversions.

**Breaking Changes:**
- `CurrencyResult` → `UnitConversionResult`
- `CurrencyResultNode` → `UnitConversionResultNode` 
- `ResultTypes.CurrencyResult` → `ResultTypes.UnitConversionResult`

```diff
- import { CurrencyResult, CurrencyResultNode } from 'google-sr';
+ import { UnitConversionResult, UnitConversionResultNode } from 'google-sr';

const results = search({
  query: "100 USD to EUR",
-  parsers: [CurrencyResult]
+  parsers: [UnitConversionResult]
});

- if (result.type === ResultTypes.CurrencyResult) {
+ if (result.type === ResultTypes.UnitConversionResult) {
  // handle unit conversion result
}
```
