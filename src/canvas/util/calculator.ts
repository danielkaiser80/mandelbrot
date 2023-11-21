import { FractalType } from "../MandelbrotCanvas.tsx";

export const MAX_ITERATIONS = 64;

interface CommonParams {
  type: FractalType;
  i: number;
  width: number;
  j: number;
  height: number;
}

interface MandelbrotParams extends CommonParams {
  type: "Mandelbrot";
}
interface JuliaParams extends CommonParams {
  cStart: [number, number];
  type: "Julia";
}

export type Params = MandelbrotParams | JuliaParams;

const getIterations = (params: Params) => {
  const { type, i, width, j, height } = params;
  let c: [number, number];
  let z: [number, number];

  if (type === "Mandelbrot") {
    c = getStartValues(i, width, j, height);
    z = [0, 0];
  } else {
    c = params.cStart;
    z = getStartValues(i, width, j, height);
  }

  let n = 1;
  for (; z[0] * z[0] + z[1] * z[1] <= 4 && n < MAX_ITERATIONS; n++) {
    [z[0], z[1]] = [z[0] * z[0] - z[1] * z[1] + c[0], 2 * z[0] * z[1] + c[1]];
  }
  return n;
};

const getStartValues = (
  i: number,
  width: number,
  j: number,
  height: number,
): [number, number] => {
  const first = 4 * ((i - width / 2) / width);
  const second = 4 * ((j - height / 2) / height);
  return [first, second];
};

export default getIterations;
