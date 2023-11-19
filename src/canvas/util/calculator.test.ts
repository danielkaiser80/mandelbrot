import getIterations, { MAX_ITERATIONS } from "./calculator.ts";

describe("getIterations function", () => {
  it("should return the correct number of iterations", () => {
    expect(getIterations(0, 0)).toEqual(MAX_ITERATIONS);
    expect(getIterations(1, 1)).toEqual(3);
  });
});
