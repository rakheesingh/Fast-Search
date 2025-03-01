import classNames from "classnames";

interface Type {
    type?: "xs" | "sm" | "base" | "large" | "xl";
}

interface Typography extends Type {
  className?: string;
  textColor?: string;
  inline?: boolean;
  children: React.ReactNode;
}

function Typography({
  type = "base",
  className,
  textColor,
  inline = false,
  children,
} : Typography) {
  return (
    <div
      className={classNames(
        "wm-typography",
        textColor,
        {
          "inline-block": inline,
        },
        {
          "text-xs  font-medium": type === "xs",
        },
        {
          "text-sm  font-medium": type === "sm",
        },
        {
          "text-base   font-medium ": type === "base",
        },
        {
          "text-large   font-medium ": type === "large",
        },
        {
          "text-xl  font-medium ": type === "xl",
        },
        className
      )}
    >
      {children}
    </div>
  );
}


const TextXS = (props : Typography) => {
  return <Typography type="xs" {...props}></Typography>;
};

TextXS.defaultProps = {
  textColor: "text-coolGray-500",
};

/**
 * Used for smaller text
 */
const TextSM = (props : Typography) => {
  return <Typography type="sm" {...props}></Typography>;
};

TextSM.defaultProps = {
  textColor: "text-coolGray-500",
};

/**
 * Use for all information
 */
const TextBase = (props  : Typography) => {
  return <Typography type="base" {...props}></Typography>;
};

TextBase.defaultProps = {
  textColor: "text-coolGray-900",
};

/**
 * Use for subheaders etc
 */
const TextLarge = (props : Typography) => {
  return <Typography type="large" {...props} />;
};

TextLarge.defaultProps = {
  textColor: "text-coolGray-900",
};

export { TextXS, TextSM, TextBase, TextLarge };
