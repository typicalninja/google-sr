---
"google-sr-selectors": major
---

Update knowledge panel result selectors

Following selectors are no longer available.

```json5
{
    catalogBlock: "...", 
    catalogTitle: "...",
    catalogItem: "...",
    catalogItemImage: "...",
    catalogItemTitle: "...",    
    catalogItemCaption: "...",
}
```

Following selectors have some changes on how they are used (or new).

```json5
{
  // Direct children of the first element 
  // obtained via the `headerBlock` selector.
  title: "...",
  label: "...",
  // This is a child of the second element 
  // obtained via `headerBlock` selector
  imageUrl: "...",
  // description block contains description and metadata (description source link)
  // the first span is the description
  // and the first "<a>" is the source link
  descriptionBlock: "...",
}
```