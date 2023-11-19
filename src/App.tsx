import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MandelbrotCanvas from "./canvas/MandelbrotCanvas.tsx";

const theme = createTheme({
  typography: {
    fontFamily: `"Roboto"`,
    fontSize: 11,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <h1>Mandelbrot set in 2023</h1>
    <MandelbrotCanvas />
  </ThemeProvider>
);

export default App;
