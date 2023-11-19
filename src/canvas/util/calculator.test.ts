import Calculator from "./calculator.ts";

describe(Calculator.getIterations, () => {
  it("should return the correct number of iterations", () => {
    expect(Calculator.getIterations([0, 0])).toEqual(Calculator.MAX_ITERATIONS);
    expect(Calculator.getIterations([1, 1])).toEqual(3);
  });
});

describe(Calculator.getStartValues, () => {
  it("should return the correct number of iterations", () => {
    expect(Calculator.getStartValues(0, 10, 0, 10)).toEqual([-2, -2]);
    expect(Calculator.getStartValues(1, 10, 1, 10)).toEqual([-1.6, -1.6]);
  });
});
