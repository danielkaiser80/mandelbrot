import React, { useEffect, useRef, useState } from "react";
import { MAX_COLOR } from "./util/color-util.ts";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import InputSlider from "../components/InputSlider.tsx";
import { drawMandelbrot } from "./DrawMandelbrot.ts";

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
      drawMandelbrot({ canvas, width, height, maxColor });
      setDraw(false);
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
