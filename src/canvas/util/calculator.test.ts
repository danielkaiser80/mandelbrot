import { MAX_ITERATIONS, Params } from "./calculator.ts";
import getIterations from "./calculator.ts";

describe(getIterations, () => {
  const base = { width: 10, height: 10 };

  it.each([
    [
      "Mandelbrot start",
      {
        ...base,
        type: "Mandelbrot",
        i: 0,
        j: 0,
      },
      2,
    ],
    [
      "Julia start",
      {
        ...base,
        type: "Julia",
        i: 0,
        j: 0,
        cStart: [1, 1],
      },
      1,
    ],
    [
      "Mandelbrot middle",
      {
        ...base,
        type: "Mandelbrot",
        i: 5,
        j: 5,
      },
      MAX_ITERATIONS,
    ],
  ] as [string, Params, number][])(
    "should return the correct number of iterations for %s",
    (_name: string, params: Params, expected: number) => {
      expect(getIterations(params)).toEqual(expected);
    },
  );
});

// describe(Calculator.getStartValues, () => {
//   it("should return the correct number of iterations", () => {
//     expect(Calculator.getStartValues(0, 10, 0, 10)).toEqual([-2, -2]);
//     expect(Calculator.getStartValues(1, 10, 1, 10)).toEqual([-1.6, -1.6]);
//   });
// });
