import classNames from "classnames";
import React from "react";

interface InputType {
  placeholder: string;
  value: string;
  onchange: (value: string) => void;
  className?: string;
  role?: string;
}
export default function Input({
  placeholder,
  value,
  onchange,
  className,
  ...props
}: InputType) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    onchange(target.value);
  };
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={classNames(
        "border border-gray-600 focus:border-gray-500 outline-none p-3 rounded-xl",
        className
      )}
      {...props}
    />
  );
}
