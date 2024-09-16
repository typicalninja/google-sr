# gsr-examples

This is a collection of examples for the [google-sr](https://github.com/typicalninja/google-sr) library.

# Cloning

To run the examples, clone the entire monorepo or use [`degit`](https://github.com/Rich-Harris/degit) (or [WEB DOWNLOAD](https://typicalninja.github.io/download-github-files/d?resolve=typicalninja/google-sr/tree/master/apps/examples)) to download only the examples directory from the repo.

```sh
# Using degit via npx (use your preferred package manager)
npx degit typicalninja/google-sr/apps/examples

# Using git clone
git clone https://github.com/typicalninja/google-sr.git
cd google-sr/apps/examples
```

# Usage

Examples are written in TypeScript. provided scripts/commands use [tsx](https://github.com/privatenumber/tsx) to run the examples directly.

Here [script] is the file name of any file in the `src` directory without the `.ts` extension.

```sh
# Will install tsx 
# NOTE: if you clone the entire monorepo this may take a while
pnpm install
# run the scripts provided that will execute "tsx src/<example>.ts"
pnpm run [script]
```
