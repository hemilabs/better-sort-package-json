const formatFiles = "prettier --ignore-unknown --write";
const lintFiles = "eslint --cache --fix --quiet";
const sortPackageJsonFiles = "node bin/cli.js";

const config = {
  "!(*.{js,md}|package.json)": [formatFiles],
  "*.{js,md}": [lintFiles, formatFiles],
  "package.json": [sortPackageJsonFiles, formatFiles],
};

export default config;
