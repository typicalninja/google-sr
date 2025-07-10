---
"google-sr-selectors": major
---

Rename CurrencyConvertSelector to UnitConversionSelector

Rename `CurrencyConvertSelector` to `UnitConversionSelector` to better reflect its ability to handle all conversion queries (currency, units, measurements, etc.), not just currency conversions.

**Breaking Changes:**
- `CurrencyConvertSelector` → `UnitConversionSelector`


```diff
- import { CurrencyConvertSelector } from 'google-sr-selectors';
+ import { UnitConversionSelector } from 'google-sr-selectors';
```
