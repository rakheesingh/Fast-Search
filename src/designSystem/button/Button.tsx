import classNames from "classnames";
import React, { Ref } from "react";

interface ButtonProps {
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  disabled?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

export default function Button({
  className,
  variant,
  children,
  loading,
  onClick,
  disabled,
  ref,
  ...props
}: ButtonProps) {


  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isDisabled = disabled || loading;
    if (isDisabled) {
      return null;
    }
    onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      ref={ref}
      className={classNames(
        //   common for all variants
        "px-2.5 py-3 text-base items-center justify-center flex rounded disabled:opacity-30 disabled:cursor-not-allowed",
        {
          "bg-blue-600 text-white font-medium hover:bg-blue-400 bg-brand" :
            variant === "primary",
        },
        {
          "bg-white border-secondary border-medium-gray  text-coolGray-500 font-medium hover:text-brand-blue-2 hover:border-brand-blue-2  active:text-brand-blue-3 active:border-brand-blue-3":
            variant === "secondary",
        },
        {
          "bg-transparent text-gray-700 font-medium hover:text-brand-blue-1 active:text-brand-blue-3 ":
            variant === "tertiary",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  variant: "primary",
  loading: false,
  disabled: false,
  onClick: () => null,
};
