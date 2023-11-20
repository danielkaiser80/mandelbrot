import { render, screen, fireEvent } from "@testing-library/react";
import InputSlider from "./InputSlider";
import { describe } from "vitest";

describe(InputSlider, () => {
  test("renders InputSlider component with default values", () => {
    const handleChange = vi.fn();
    render(
      <InputSlider
        description="Test Slider"
        handleChange={handleChange}
        minValue={0}
      />,
    );

    // Ensure the component renders correctly
    expect(screen.getByText("Test Slider")).toBeInTheDocument();
    expect(screen.getByRole("slider")).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  test("handles slider change correctly", () => {
    const handleChange = vi.fn();
    render(
      <InputSlider
        description="Test Slider"
        handleChange={handleChange}
        minValue={0}
      />,
    );

    // Simulate slider change
    fireEvent.change(screen.getByRole("slider"), { target: { value: 50 } });

    // Ensure handleChange function is called with the correct value
    expect(handleChange).toHaveBeenCalledWith(50);
  });

  test("handles input change correctly", () => {
    const handleChange = vi.fn();
    render(
      <InputSlider
        description="Test Slider"
        handleChange={handleChange}
        minValue={0}
      />,
    );

    // Simulate input change
    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "30" },
    });

    // Ensure handleChange function is called with the correct value
    expect(handleChange).toHaveBeenCalledWith(30);
  });

  test("handles input blur correctly", () => {
    const handleChange = vi.fn();
    render(
      <InputSlider
        description="Test Slider"
        handleChange={handleChange}
        minValue={0}
      />,
    );

    // Simulate entering an invalid value and blur
    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "abc" },
    });
    fireEvent.blur(screen.getByRole("spinbutton"));

    // Ensure handleChange function is called with the minValue
    expect(handleChange).toHaveBeenCalledWith(0);
  });

  test.each([
    ["min", "-10", 0],
    ["max", "60", 50],
  ])("handles input value exceeding %s value correctly", (_, input, output) => {
    const handleChange = vi.fn();
    render(
      <InputSlider
        description="Test Slider"
        handleChange={handleChange}
        minValue={0}
        maxValue={50}
      />,
    );

    // Simulate entering a value exceeding max value and blur
    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: input },
    });
    fireEvent.blur(screen.getByRole("spinbutton"));

    // Ensure handleChange function is called with the maxValue
    expect(handleChange).toHaveBeenCalledWith(output);
  });
});
