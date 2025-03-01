import { render, fireEvent } from "@testing-library/react";
import Input from "./Input"; // adjust the import path as needed

describe("Input Component", () => {
  it("renders with the correct placeholder and value", () => {
    const placeholder = "Enter text";
    const value = "initial value";
    const handleChange = jest.fn();

    const { getByPlaceholderText } = render(
      <Input placeholder={placeholder} value={value} onchange={handleChange} />
    );

    const inputElement = getByPlaceholderText(placeholder) as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe(value);
  });

  it("calls onchange callback when the input value changes", () => {
    const placeholder = "Enter text";
    const value = "initial value";
    const handleChange = jest.fn();

    const { getByPlaceholderText } = render(
      <Input placeholder={placeholder} value={value} onchange={handleChange} />
    );

    const inputElement = getByPlaceholderText(placeholder);
    fireEvent.change(inputElement, { target: { value: "new value" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("new value");
  });

});
