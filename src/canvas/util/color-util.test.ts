import { colors, getColorFromNumber, MAX_COLOR } from "./color-util.ts";
import { describe } from "vitest";

describe(getColorFromNumber, () => {
  test("returns black for index 0", () => {
    const color = getColorFromNumber(0);
    expect(color).toBe("black");
  });

  test("returns color for valid index within the range", () => {
    const color = getColorFromNumber(3);
    expect(color).toBe("olive");
  });

  test("returns last color for index exceeding the maximum", () => {
    const color = getColorFromNumber(100);
    expect(color).toBe(colors[MAX_COLOR]);
  });

  test("returns custom maxColor if provided", () => {
    const customMaxColor = 5;
    const color = getColorFromNumber(8, customMaxColor);
    expect(color).toBe(colors[customMaxColor]);
  });
});
