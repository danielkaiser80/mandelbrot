import React, { useEffect, useRef, useState } from "react";
import { MAX_COLOR } from "./util/color-util.ts";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import InputSlider from "../components/InputSlider.tsx";
import { drawMandelbrot } from "./DrawMandelbrot.ts";
import RadioButtonsGroup from "../components/RadioButtonsGroup.tsx";

type FractalType = "Mandelbrot" | "Julia";

const MandelbrotCanvas: React.FC = () => {
  const [maxColor, setMaxColor] = useState(MAX_COLOR);
  const [draw, setDraw] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const width = 450;
  const height = 350;

  const [fractalType, setFractalType] = useState<FractalType>("Mandelbrot");

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

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            p: 1,
            m: 1,
            border: 1,
            marginTop: "75px",
          }}
        >
          <Typography
            sx={{ fontSize: 20 }}
            color="text.secondary"
            gutterBottom
            paragraph
          >
            Settings...
          </Typography>

          <RadioButtonsGroup<FractalType>
            values={["Mandelbrot", "Julia"]}
            handleChange={(newValue) => {
              setFractalType(newValue);
            }}
            heading="Choose the desired fractal!"
          />

          {fractalType === "Julia" && <Box>For Julia only...</Box>}

          <InputSlider
            description="Number of colors"
            handleChange={setMaxColor}
            minValue={5}
            maxValue={MAX_COLOR}
          />
        </Box>
      </CardContent>
      <CardActions>
        <Button
          sx={{ border: 1, padding: 2, marginLeft: 2 }}
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
