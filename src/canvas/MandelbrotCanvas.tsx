import React, { useEffect, useRef, useState } from "react";
import { getColorFromNumber, MAX_COLOR } from "./color-util.ts";
import getIterations from "./calculator.ts";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import InputSlider from "../components/InputSlider.tsx";

const MandelbrotCanvas: React.FC = () => {
  const [maxColor, setMaxColor] = useState(MAX_COLOR);
  const [draw, setDraw] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const width = 450;
  const height = 350;

  useEffect(() => {
    if (!draw) return;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        for (let i = 0; i < width; i++) {
          for (let j = 0; j < height; j++) {
            const c1 = 4 * ((i - width / 2) / width);
            const c2 = 4 * ((j - height / 2) / height);

            ctx.fillStyle = getColorFromNumber(getIterations(c1, c2), maxColor);
            ctx.fillRect(i, j, 1, 1);
          }
        }

        setDraw(false);
      }
    }
  }, [draw, maxColor]);

  return (
    <Card>
      <CardContent>
        <canvas ref={canvasRef} width={width} height={height} />
        <Typography
          sx={{ fontSize: 20, marginTop: "75px" }}
          color="text.secondary"
          gutterBottom
          paragraph
        >
          Choose your settings...
        </Typography>

        <InputSlider
          description="Number of colors"
          handleChange={setMaxColor}
          minValue={5}
          maxValue={MAX_COLOR}
        />
      </CardContent>
      <CardActions>
        <Button
          sx={{ border: 1, padding: 2, marginLeft: 1 }}
          onClick={() => {
            setDraw(true);
          }}
          disabled={draw}
        >
          Redraw
        </Button>
      </CardActions>
    </Card>
  );
};

export default MandelbrotCanvas;
