import { render, fireEvent } from "@testing-library/react";
import RadioButtonsGroup from "./RadioButtonsGroup";

describe("RadioButtonsGroup component", () => {
  const heading = "Test Heading";
  const values = ["Option 1", "Option 2", "Option 3"];
  const handleChange = vi.fn();

  test("renders with default values", () => {
    const { getByLabelText, getByText } = render(
      <RadioButtonsGroup
        heading={heading}
        values={values}
        handleChange={handleChange}
      />,
    );

    // Check if heading is rendered
    expect(getByText(heading)).toBeInTheDocument();

    // Check if radio buttons are rendered
    values.forEach((option) => {
      expect(getByLabelText(option)).toBeInTheDocument();
    });

    // Check if the first option is selected by default
    expect(getByLabelText(values[0])).toBeChecked();
  });

  test("handles change event", () => {
    const { getByLabelText } = render(
      <RadioButtonsGroup
        heading={heading}
        values={values}
        handleChange={handleChange}
      />,
    );

    // Simulate a change event
    fireEvent.click(getByLabelText(values[1]));

    // Check if the handleChange function is called with the correct value
    expect(handleChange).toHaveBeenCalledWith(values[1]);
  });

  test("does not render if values array is empty", () => {
    const { container } = render(
      <RadioButtonsGroup
        heading={heading}
        values={[]}
        handleChange={handleChange}
      />,
    );

    // Check if the component renders nothing when values array is empty
    expect(container.firstChild).toBeNull();
  });
});
