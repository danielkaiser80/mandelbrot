import React, { useRef, useEffect } from "react";

const MandelbrotCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Draw a point
        ctx.fillStyle = "red";
        ctx.fillRect(10, 10, 1, 1);

        // Draw a line
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(20, 20);
        ctx.lineTo(100, 100);
        ctx.stroke();

        // Draw a rectangle
        ctx.fillStyle = "green";
        ctx.fillRect(50, 50, 30, 30);
      }
    }
  }, []);

  return <canvas ref={canvasRef} width={500} height={500} />;
};

export default MandelbrotCanvas;
