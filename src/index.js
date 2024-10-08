import stringify from "json-stable-stringify";

/**
 * Properties described in the NPM package.json specification.
 * @see https://docs.npmjs.com/cli/v9/configuring-npm/package-json
 * @type {string[]}
 */
const packageJsonStandardProperties = [
  "name",
  "version",
  "description",
  "keywords",
  "homepage",
  "bugs",
  "license",
  "author",
  "contributors",
  "funding",
  "files",
  // "exports", // Sort along with `imports` in the Node.js section.
  "main",
  "browser",
  "bin",
  "man",
  "directories",
  "repository",
  "scripts",
  "config",
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "peerDependenciesMeta",
  "bundleDependencies",
  "optionalDependencies",
  "overrides",
  "engines",
  "os",
  "cpu",
  "devEngines",
  "private",
  "publishConfig",
  "workspaces",
];
/**
 * Properties used by Node.js.
 * @see https://nodejs.org/api/packages.html#nodejs-packagejson-field-definitions
 * @type {string[]}
 */
const packageJsonNodeJsProperties = [
  "packageManager",
  "type",
  "exports",
  "imports",
];

const rootProperties = /** @type {string[]} */ ([]).concat(
  packageJsonStandardProperties,
  packageJsonNodeJsProperties,
);

/**
 * Returns a new object that has the same properties as the given object but
 * sorted according the properties list. Any unlisted properties are just added
 * to the end.
 *
 * @param {object} object
 * @param {string[]} properties
 * @returns {object}
 */
function sortProperties(object, properties) {
  const sortedObject = {};
  // Add the specified properties in the given order then all the others in the
  // order they appear
  properties.concat(Object.keys(object)).forEach(function (property) {
    if (!Object.hasOwn(object, property)) {
      return;
    }
    const value = object[property];
    if (
      Array.isArray(value) &&
      value.every((element) => typeof element === "string")
    ) {
      // Sort the arrays of strings like `keywords`, `files`
      sortedObject[property] = value.sort();
      return;
    }
    if (property === "scripts") {
      // The `scripts` is a special case due to the pre and post scripts
      const scripts = Object.keys(value)
        .map((script) =>
          script.startsWith("pre")
            ? script.slice(3)
            : script.startsWith("post")
              ? script.slice(4)
              : script,
        )
        .sort()
        .map((script) => [`pre${script}`, script, `post${script}`])
        .flat();
      sortedObject[property] = sortProperties(value, scripts);
      return;
    }
    sortedObject[property] = value;
  });
  return sortedObject;
}

/**
 * Takes the contents of a `package.json` file and returns it sorted.
 *
 * @param {string} packageJsonStr
 * @returns {string}
 */
export function sortPackageJson(packageJsonStr) {
  const recursivelySorted = stringify(JSON.parse(packageJsonStr));
  const sorted = sortProperties(JSON.parse(recursivelySorted), rootProperties);
  return `${JSON.stringify(sorted, null, 2)}\n`;
}