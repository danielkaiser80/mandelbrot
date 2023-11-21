import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { MAX_COLOR } from "./util/color-util.ts";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import InputSlider from "../components/InputSlider.tsx";
import { drawMandelbrot, DrawMandelbrotParams } from "./DrawMandelbrot.ts";
import RadioButtonsGroup from "../components/RadioButtonsGroup.tsx";

export type FractalType = "Mandelbrot" | "Julia";

const MandelbrotCanvas: FC = () => {
  const [maxColor, setMaxColor] = useState(MAX_COLOR);
  const [draw, setDraw] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const width = 450;
  const height = 350;

  const [fractalType, setFractalType] = useState<FractalType>("Mandelbrot");
  const [c1, setC1] = useState(0);
  const [c2, setC2] = useState(0);

  useEffect(() => {
    if (!draw) return;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const drawMandelbrotParams = {
        type: fractalType,
        canvas,
        width,
        height,
        maxColor,
        ...(fractalType === "Julia" && { cStart: [c1, c2] }),
      } as DrawMandelbrotParams;
      drawMandelbrot(drawMandelbrotParams);
      setDraw(false);
    }
  }, [c1, c2, draw, fractalType, maxColor]);

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

          {fractalType === "Julia" && (
            <Box>
              <TextField
                sx={{ marginTop: 1, marginBottom: 1, marginRight: 1 }}
                value={c1}
                label="c1"
                size="small"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  const data = event.target.value;
                  setC1(Number(data));
                }}
                inputProps={{
                  type: "number",
                }}
              />
              <TextField
                sx={{ marginTop: 1, marginBottom: 1 }}
                value={c2}
                label="c2"
                size="small"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  const data = event.target.value;
                  setC2(Number(data));
                }}
                inputProps={{
                  type: "number",
                }}
              />
            </Box>
          )}

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
