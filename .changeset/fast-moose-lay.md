---
"google-sr-selectors": major
"google-sr": major
"google-that": minor
---

Rename CurrencyResult to UnitConversionResult

## Breaking Changes

- `CurrencyResult` selector renamed to `UnitConversionResult`
- `CurrencyResultNode` interface renamed to `UnitConversionResultNode`
- Result type constant `ResultTypes.CurrencyResult` renamed to `ResultTypes.UnitConversionResult`
- The selector now handles all conversion queries (currency, units, measurements, etc.)

The original `CurrencyResult` selector was found to work effectively for all types of conversion queries (currency, distance, weight, temperature, etc.), not just currency conversions. The rename better captures its actual functionality and makes the API more intuitive for users performing various conversion searches.

```diff
// Before
- import { CurrencyResult, CurrencyResultNode } from 'google-sr';
+ import { UnitConversionResult, UnitConversionResultNode } from 'google-sr';
import { ResultTypes } from 'google-sr';

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
