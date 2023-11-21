import type { Params } from "./util/calculator.ts";
import { getColorFromNumber } from "./util/color-util.ts";
import getIterations from "./util/calculator.ts";
import { FractalType } from "./MandelbrotCanvas.tsx";

interface CommonParams {
  type: FractalType;
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  maxColor: number;
}

interface MandelbrotParams extends CommonParams {
  type: "Mandelbrot";
}

interface JuliaParams extends CommonParams {
  cStart: [number, number];
  type: "Julia";
}

export type DrawMandelbrotParams = MandelbrotParams | JuliaParams;

export const drawMandelbrot = (
  drawMandelbrotParams: DrawMandelbrotParams,
): void => {
  const { type, canvas, width, height, maxColor } = drawMandelbrotParams;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const params = {
        type,
        width,
        height,
        ...(type === "Julia" && { cStart: drawMandelbrotParams.cStart }),
        i,
        j,
      } as Params;
      ctx.fillStyle = getColorFromNumber(getIterations(params), maxColor);
      ctx.fillRect(i, j, 1, 1);
    }
  }
};
