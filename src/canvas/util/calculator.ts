const MAX_ITERATIONS = 64;
const getIterations = ([c1, c2]: [number, number]) => {
  let z1 = 0,
    z2 = 0,
    n = 1;
  for (; z1 * z1 + z2 * z2 <= 4 && n < MAX_ITERATIONS; n++) {
    [z1, z2] = [z1 * z1 - z2 * z2 + c1, 2 * z1 * z2 + c2];
  }
  return n;
};

const getStartValues = (
  i: number,
  width: number,
  j: number,
  height: number,
): [number, number] => {
  const c1 = 4 * ((i - width / 2) / width);
  const c2 = 4 * ((j - height / 2) / height);
  return [c1, c2];
};

export default { getIterations, getStartValues, MAX_ITERATIONS };
