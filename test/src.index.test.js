import * as chai from "chai";

import { sortPackageJson } from "../src/index.js";

chai.should();

describe("Sort a package.json", function () {
  it("should sort the root properties", function () {
    const input = `{"prettier":{},"type":"module","keywords":["last","first"],
      "scripts":{"test":"mocha","pretest":"npm run lint",
      "postinstall":"echo Done!"}}`;
    const output = `{
  "keywords": [
    "first",
    "last"
  ],
  "scripts": {
    "postinstall": "echo Done!",
    "pretest": "npm run lint",
    "test": "mocha"
  },
  "type": "module",
  "prettier": {}
}
`;
    sortPackageJson(input).should.equal(output);
  });
});
