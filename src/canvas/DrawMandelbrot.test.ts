import { drawMandelbrot } from "./DrawMandelbrot.ts";

describe("drawMandelbrot", () => {
  it("should draw Mandelbrot set on canvas", () => {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);

    const width = 2;
    const height = 2;
    const maxColor = 5;

    drawMandelbrot({ canvas, width, height, maxColor });

    const ctx = canvas.getContext("2d")!;

    expect(ctx.fillRect).toHaveBeenCalledTimes(width * height);
  });
});
