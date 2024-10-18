# better-sort-package-json

Sorts a `package.json` file following these rules:

1. The root properties follow the order they appear in the [NPM `package.json` specification](https://docs.npmjs.com/cli/v9/configuring-npm/package-json), then [the Node.JS fields](https://nodejs.org/api/packages.html#nodejs-packagejson-field-definitions), and finally all the other properties.
1. The string arrays in the root, such as `keywords` and `files`, are sorted alphabetically.
1. The properties in `script` are sorted alphabetically but placing the "pre" and "post" scripts along with before and after its target.
1. All other nested objects have their properties sorted in alphabetical order.

## Motivation and prior art

Other packages like [`sort-package-json`](https://github.com/keithamus/sort-package-json) already exist but there is no way to customize the sorting rule applied and I was looking for a simpler set matching current practices at [Hemi](https://github.com/hemilabs).

## CLI

This package can be installed globally, then used to sort `package.json` files:

```sh
npm install --global better-sort-package-json
better-sort-package-json <path-to-a-package-json-file-to-sort>
```

In addition, it can be used without installing it:

```sh
npx better-sort-package-json <path-to-a-package-json-file-to-sort>
```

## API

Install the package:

```sh
npm install better-sort-package-json
```

Then use it to sort the contents of a `package.json`:

```js
import * as fs from "node:fs";
import { sortPackageJson } from "better-sort-package-json";

fs.writeFileSync(path, sortPackageJson(fs.readFileSync(path, "utf8")));
```

## Automatically sort on commit

To i.e. let [`lint-staged`](https://github.com/lint-staged/lint-staged) take care of sorting the `package.json` automatically, but without altering the formatting done by [`Prettier`](https://prettier.io/), this configuration can be used:

```json
{
  "!(package.json)": ["prettier --ignore-unknown --write"],
  "package.json": ["better-sort-package-json", "prettier --write"]
}
```
