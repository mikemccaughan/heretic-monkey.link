import { describe, it } from "node:test";
import { nameGenerator } from "./characters.mjs";

describe("nameGenerator", {}, () => {
  it("returns a stream that eventually has : in it", (_, done) => {
    (async () => {
      for await (const char of nameGenerator()) {
        // eslint-disable-next-line no-undef
        console.log(char);
        if (char === ":") {
          done();
        }
      }
    })();
});
});
