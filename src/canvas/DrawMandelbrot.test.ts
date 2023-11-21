import { drawMandelbrot } from "./DrawMandelbrot.ts";
import { CanvasRenderingContext2DEvent } from "jest-canvas-mock";
import { groupedMap } from "./util/grouped-map.ts";

describe("drawMandelbrot", () => {
  const width = 2;
  const height = 2;
  const maxColor = 5;

  it("should draw Mandelbrot set on canvas", () => {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);

    drawMandelbrot({ type: "Mandelbrot", canvas, width, height, maxColor });

    const ctx: CanvasRenderingContext2D & {
      __getEvents: () => CanvasRenderingContext2DEvent[];
    } = canvas.getContext("2d")!;

    const events = ctx.__getEvents();

    const groupedEvents = groupedMap(events, "type");

    const fillRectEvents = groupedEvents.get("fillRect")!;
    expect(fillRectEvents).toHaveLength(width * height);
    expect(fillRectEvents[0].props).toStrictEqual({
      x: 0,
      y: 0,
      width: 1,
      height: 1,
    });

    const colors = groupedEvents
      .get("fillStyle")!
      .map(({ props }) => props)
      .map(({ value }) => String(value));

    expect(colors).toStrictEqual(["#ff00ff", "#800080", "#808000", "#800080"]);
  });

  it("should not draw Mandelbrot set, if no canvas exists", () => {
    const contextIdMock = vi.fn();
    const canvas = {
      getContext: (contextId: "2d") => {
        contextIdMock(contextId);
        return null;
      },
    } as HTMLCanvasElement;

    drawMandelbrot({
      type: "Julia",
      canvas,
      width,
      height,
      maxColor,
      cStart: [0, 0],
    });
    expect(contextIdMock).toBeCalledWith("2d");
  });
});
