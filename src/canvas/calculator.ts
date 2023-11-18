export const MAX_ITERATIONS = 64;
const getIterations = (c1: number, c2: number) => {
  let z1 = 0,
    z2 = 0,
    n = 1;
  for (; z1 * z1 + z2 * z2 <= 4 && n < MAX_ITERATIONS; n++) {
    [z1, z2] = [z1 * z1 - z2 * z2 + c1, 2 * z1 * z2 + c2];
  }
  return n;
};

export default getIterations;
