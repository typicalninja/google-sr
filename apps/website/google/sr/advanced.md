# Advanced usage guide

## Custom selectors

### What are selectors

google-sr is fully customizable allowing you to fine tune it to your liking. One important part
of this is to customize the selectors used by the module.

By default google-sr uses [google-sr-selectors](/google/selectors/) internally for its selectors.
However you can customize them using the [searchOptions.selectors](https://typicalninja.github.io/google-sr/interfaces/google_sr.SearchOptions.html#selectors) option.
See the available selectors types in [google-sr-selectors API Documentation](https://typicalninja.github.io/google-sr/modules/google_sr_selectors.html)


### Customizing default selectors

Following example will show how to customize the [TimeSearchSelector](https://typicalninja.github.io/google-sr/variables/google_sr_selectors.TimeSearchSelector.html)


```ts
import { search, ResultTypes } from 'google-sr';
// using async/await
const searchResults = await search({ 
    query: 'what is the time in uk',
    filterResults: [ResultTypes.TimeResult],
    // modify the selectors
    // other selectors will get deep merged with this option
    selectors: { // [!code focus:7]
        TimeSearchSelector: {
            location: 'some selector',
            time: 'another selector for time',
            timeInWords: 'new selector for timeInwords'
        }
    }
});
```

## Query operators

:::tip
For more info on operators check [this blog (`blog by moz.com`)](https://moz.com/learn/seo/search-operators)
:::

### What are query operators?

Google search operators are special characters and commands sometimes called “advanced operators” or search parameters that extend the capabilities of regular text searches. Search operators can be useful for everything from content research to technical SEO audits.
([moz.com](https://moz.com/learn/seo/search-operators))

### Using query operators

```ts
import { search } from 'google-sr';
 
// using async/await
const searchResults = await search({ query: 'google site:npmjs.com' });
```

Thats it. since search operators are part of the query itself there is no special configuration you have to do here.