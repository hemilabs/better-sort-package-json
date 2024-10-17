#!/usr/bin/env node

import * as fs from "node:fs";
import * as path from "node:path";

import { sortPackageJson } from "../src/index.js";

const defaultFile = path.join(process.cwd(), "package.json");
const args = process.argv.slice(2);
const files = args.length ? args : [defaultFile];

files.forEach(function (file) {
  fs.writeFileSync(file, sortPackageJson(fs.readFileSync(file, "utf8")));
});
