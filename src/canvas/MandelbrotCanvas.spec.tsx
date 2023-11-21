import { fireEvent, render, screen } from "@testing-library/react";
import MandelbrotCanvas from "./MandelbrotCanvas";
import * as DrawMandelbrotModule from "./DrawMandelbrot";
import { MAX_COLOR } from "./util/color-util.ts";

// Mock the DrawMandelbrot module
vi.mock("./DrawMandelbrot", () => ({
  drawMandelbrot: vi.fn(),
}));

describe("MandelbrotCanvas", () => {
  test("renders MandelbrotCanvas component", () => {
    render(<MandelbrotCanvas />);
    expect(screen.getByText("Settings...")).toBeInTheDocument();
  });

  test("clicking Redraw button triggers drawMandelbrot with the correct parameters", () => {
    render(<MandelbrotCanvas />);

    // Set up mock data
    const width = 450;
    const height = 350;
    const maxColor = 10;

    // Verify that drawMandelbrot is called with the correct parameters
    expect(DrawMandelbrotModule.drawMandelbrot).toHaveBeenCalledWith(
      expect.objectContaining({
        width,
        height,
        maxColor: MAX_COLOR,
      }),
    );

    // Find and interact with the input field
    const inputField = screen.getByRole("spinbutton");
    fireEvent.change(inputField, { target: { value: "10" } }); // Change the value as needed

    // Trigger Redraw button click
    fireEvent.click(screen.getByText("Redraw"));

    // Verify that drawMandelbrot is called with the correct parameters
    expect(DrawMandelbrotModule.drawMandelbrot).toHaveBeenCalledWith(
      expect.objectContaining({
        width,
        height,
        maxColor,
      }),
    );
  });

  test("changing to 'Julia' shows extra parameters which need to be set", () => {
    const { queryByText } = render(<MandelbrotCanvas />);
    const expectedText = "c1";
    expect(queryByText(expectedText)).toBeNull();

    // Find and interact with the radio button
    const radioButtonJulia = screen.getByText("Julia");
    fireEvent.click(radioButtonJulia);

    // we get a label and a span, this is by design
    expect(screen.getAllByText(expectedText)[0]).toBeInTheDocument();
  });
});
