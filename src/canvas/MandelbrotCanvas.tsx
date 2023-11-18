import React, { useEffect, useRef } from "react";
import { getColorFromNumber } from "./color-util.ts";
import getIterations from "./calculator.ts";

const MandelbrotCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const width = 450;
  const height = 350;
  const drawn = useRef<boolean>();
  drawn.current = false;

  useEffect(() => {
    if (drawn.current) return;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        for (let i = 0; i < width; i++) {
          for (let j = 0; j < height; j++) {
            const c1 = 4 * ((i - width / 2) / width);
            const c2 = 4 * ((j - height / 2) / height);

            ctx.fillStyle = getColorFromNumber(getIterations(c1, c2));
            ctx.fillRect(i, j, 1, 1);
          }
        }

        drawn.current = true;
      }
    }
  }, []);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default MandelbrotCanvas;
