import { getColorFromNumber } from "./util/color-util.ts";
import Calculator from "./util/calculator.ts";

interface DrawMandelbrotParams {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  maxColor: number;
}

export const drawMandelbrot = ({
  canvas,
  width,
  height,
  maxColor,
}: DrawMandelbrotParams): void => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const c = Calculator.getStartValues(i, width, j, height);
      ctx.fillStyle = getColorFromNumber(Calculator.getIterations(c), maxColor);
      ctx.fillRect(i, j, 1, 1);
    }
  }
};
