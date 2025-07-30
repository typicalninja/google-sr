# google-that

## 2.0.0

### Major Changes

- [#85](https://github.com/typicalninja/google-sr/pull/85) [`85bae81`](https://github.com/typicalninja/google-sr/commit/85bae810fdf33643545ae289d578cbc3ffa97f41) Thanks [@typicalninja](https://github.com/typicalninja)! - Update CLI to use renamed parser API

  The CLI now uses the new `parsers` option and `ResultParser` type from `google-sr` instead of the old `resultTypes` and `ResultSelector` names.

  **Breaking Change:**

  - The CLI option `--resultTypes`/`-r` is now `--parsers`/`-r` to match the new API.

### Minor Changes

- [#79](https://github.com/typicalninja/google-sr/pull/79) [`ae54adf`](https://github.com/typicalninja/google-sr/commit/ae54adf075c39771c09a1cfb719d5affe0dfd49d) Thanks [@typicalninja](https://github.com/typicalninja)! - Rename CurrencyResult to UnitConversionResult

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

- [#94](https://github.com/typicalninja/google-sr/pull/94) [`6c08082`](https://github.com/typicalninja/google-sr/commit/6c08082c298be3ec26c152764de5f05281b375ca) Thanks [@typicalninja](https://github.com/typicalninja)! - Migrate packages to ESM-first with CJS compatibility via dual build

  All packages have been migrated from CJS-first to ESM-first architecture. Existing users can continue using the packages without any code changes as both ESM and CJS builds are provided.

### Patch Changes

- [#65](https://github.com/typicalninja/google-sr/pull/65) [`fe575b5`](https://github.com/typicalninja/google-sr/commit/fe575b56fb8080d155a54f3b0310f209a44c247c) Thanks [@typicalninja](https://github.com/typicalninja)! - Update dependencies to latest versions

- Updated dependencies [[`33993c9`](https://github.com/typicalninja/google-sr/commit/33993c99bcb6f5626f0330f39a441b0de650dac4), [`51828ad`](https://github.com/typicalninja/google-sr/commit/51828ad0e2a94646ddba8727aea5f6bfce1274c4), [`52d4ed8`](https://github.com/typicalninja/google-sr/commit/52d4ed8229f7c897531904f90bcf0aa5924faa35), [`ae54adf`](https://github.com/typicalninja/google-sr/commit/ae54adf075c39771c09a1cfb719d5affe0dfd49d), [`cae9f30`](https://github.com/typicalninja/google-sr/commit/cae9f30d98a10b031c8f1833819e30d692f4bfde), [`bb1cc1a`](https://github.com/typicalninja/google-sr/commit/bb1cc1afcd931948b1ebe02bd5627fdc6bc3287e), [`352ba4c`](https://github.com/typicalninja/google-sr/commit/352ba4c68b19c74596b5f7fed0f243855da50346), [`592ea47`](https://github.com/typicalninja/google-sr/commit/592ea4764a5947ab8c90aa51b06d50cdcb6ff607), [`2722f6d`](https://github.com/typicalninja/google-sr/commit/2722f6d1b39e9103c5f105ca893dcd90ead98193), [`fe575b5`](https://github.com/typicalninja/google-sr/commit/fe575b56fb8080d155a54f3b0310f209a44c247c), [`6c08082`](https://github.com/typicalninja/google-sr/commit/6c08082c298be3ec26c152764de5f05281b375ca), [`4ac1402`](https://github.com/typicalninja/google-sr/commit/4ac14024070f16db370de4c51fa6ce956b16eaa0), [`51580a6`](https://github.com/typicalninja/google-sr/commit/51580a698cb9f465d00edcf5f64ba56add0c5814), [`f462148`](https://github.com/typicalninja/google-sr/commit/f462148023b580d10703b5e767dafd7811ff5a58), [`85bae81`](https://github.com/typicalninja/google-sr/commit/85bae810fdf33643545ae289d578cbc3ffa97f41)]:
  - google-sr@6.0.0

## 1.1.1

### Patch Changes

- Updated dependencies [f9d57ea]
  - google-sr@5.0.0

## 1.1.0

### Minor Changes

- 0d21c7a: Add support for knowledge graph results

### Patch Changes

- Updated dependencies [0d21c7a]
  - google-sr@4.1.0

## 1.0.0

### Major Changes

- 891587e: Updates the tool to be simpler and use the new api. "google-that" now completely removes the prompts and uses the cli options to run the tool.

### Patch Changes

- Updated dependencies [563bfc4]
- Updated dependencies [5676a7a]
- Updated dependencies [d98c496]
- Updated dependencies [c332095]
  - google-sr@4.0.0
