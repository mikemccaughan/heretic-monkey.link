import { describe, it } from "node:test";
import { nameGenerator } from "./characters.mjs";

describe("nameGenerator", {}, () => {
  it("returns a stream that eventually has : in it", (_, done) => {
    (async () => {
      let result = false;
      for await (const char of nameGenerator()) {
        if (char === ":") {
          result = true;
          done(true);
        }
      }
      if (!result) {
        done(false);
      }
    })();
});
});
