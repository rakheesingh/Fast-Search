// Button.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  it("renders the button with children", () => {
    const { getByText } = render(<Button onClick={() => {}}>Click Me</Button>);
    expect(getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onClick when button is clicked", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <Button onClick={handleClick}>Click Me</Button>
    );
    fireEvent.click(getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when the button is disabled", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <Button disabled onClick={handleClick}>
        Click Me
      </Button>
    );
    fireEvent.click(getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("does not call onClick when the button is loading", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <Button loading onClick={handleClick}>
        Click Me
      </Button>
    );
    fireEvent.click(getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies custom className if provided", () => {
    const { getByRole } = render(
      <Button className="custom-class">Click Me</Button>
    );
    expect(getByRole("button")).toHaveClass("custom-class");
  });
});
