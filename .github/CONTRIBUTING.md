# Contributing to google-sr

Thank you for your interest in contributing! ❤️ 
We welcome bug fixes, features, and documentation improvements.

> If you like the project, consider giving it a star! ⭐

## Code of Conduct

This project follows the [Code of Conduct](CODE_OF_CONDUCT.md).  
Please report violations via Discord or the issue tracker.

## How Can I Contribute?

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

### Setup

To get started, please follow these steps:

1. Fork and clone the repository to your local machine, make sure you're on the `master` branch.
2. Install the dependencies by running `pnpm install` in the root of the monorepo.
3. Run `pnpm run build` to build the packages.
4. Run `pnpm run dev` to start the development server.
5. Make your changes.
6. Run `pnpm run test` to run the tests.
7. Once you're done, commit your changes (make sure to follow the [Conventional Commit format](https://www.conventionalcommits.org/en/v1.0.0/))
8. Push & open a PR to `master` branch.

### Scraping search results

Always use this **user agent** when scraping:  
`Links (2.29; Linux 6.11.0-13-generic x86_64; GNU C 13.2; text)`

The `search-dump` script is provided to help you dump search results with an identical
setup to the one used in google-sr.

Run `search-dump.js` to dump search results:
```bash
# change directory to the search-dump script
cd apps/scraper

# run the script, all arguments are joined with a space as the search query
node search-dump.js "search query"
```

### Reporting Bugs

Before creating bug reports, please check the [existing issues](https://github.com/typicalninja/google-sr/issues) 
to see if the issue has already been reported.
If you find your issue already reported, please add a reaction to the issue to show that you are also facing the issue.

When you are creating a bug report, please include as many details as possible.
Please include the following information:
* A clear and descriptive title.
* A detailed description of the issue.
* Steps to reproduce the issue.
* The expected behavior.
* The actual behavior.
* Screenshots or videos of the issue.
* Any other relevant information.

A bug report template is available to guide you through the process.

### License

By contributing, you agree that your contributions will be licensed under the [MIT license](../LICENSE).