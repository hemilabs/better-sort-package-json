#!/usr/bin/env node

import * as fs from "node:fs";
import * as path from "node:path";

import { sortPackageJson } from "../src/index.js";

const defaultPath = path.join(process.cwd(), "package.json");
const [filePath = defaultPath] = process.argv.slice(2);

fs.writeFileSync(filePath, sortPackageJson(fs.readFileSync(filePath, "utf8")));
