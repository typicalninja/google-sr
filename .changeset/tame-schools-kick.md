---
"google-sr": major
---

Make OrganicResult description field optional

The `description` field in `OrganicResultNode` is now optional (`string | undefined`) to handle cases where search results don't include a description. This is a breaking change as existing code may need to be updated to handle the undefined case.