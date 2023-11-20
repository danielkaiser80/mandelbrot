import "@testing-library/jest-dom";
import "vitest-canvas-mock";

// hint: the following code should not be necessary, as it is defined in the vitest-canvas-mock;
// but for undocumented reasons, it does not work without, when just 'vitest' is calls
// it would work without this code, when vitest is run with any option in the command line, i.e. coverage or CI
import { afterAll, vi } from "vitest";
global.jest = vi;

declare global {
  // @ts-ignore
  let jest: typeof vi | undefined;
}

afterAll(() => {
  delete global.jest;
  // @ts-ignore
  delete global.window.jest;
});
