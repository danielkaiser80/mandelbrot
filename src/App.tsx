import "./App.css";
import MandelbrotCanvas from "./canvas/MandelbrotCanvas.tsx";

const App = () => (
  <>
    <h1>Mandelbrot set in 2023</h1>
    <div className="card">
      <MandelbrotCanvas />
    </div>
  </>
);

export default App;
