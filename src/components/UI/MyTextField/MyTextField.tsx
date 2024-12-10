/* eslint-disable max-lines-per-function */
import React, {FormEventHandler} from "react";
import cl from "./MyTextField.module.scss";

// Default value - hidden
type scrollProperty = "Hidden" | "Auto" | "Visible" | "Scroll";

interface MyTextFieldProps {
  controllParams: [string, React.Dispatch<React.SetStateAction<string>>];
  cssClasses?: string[];
  inputMode?: "text" | "decimal" | "numeric";
  symbolsRestrictions?: RegExp;
  onInput?: FormEventHandler<HTMLTextAreaElement>;
  wrap?: "off" | "hard";
  overflow?: {
    x: scrollProperty;
    y: scrollProperty;
  };
  placeholder?: string;
  disabled?: boolean;
}

const MyTextField = ({
  cssClasses,
  controllParams,
  symbolsRestrictions,
  onInput,
  wrap = "off",
  overflow = {x: "Hidden", y: "Hidden"},
  placeholder,
  disabled,
  ...props
}: MyTextFieldProps) => {
  const [value, setValue] = controllParams;
  const classNameArr = [
    cl.TextField,
    disabled ? cl.TextField_disabled : "",
    ...(cssClasses ?? []),
  ];
  if (overflow) {
    classNameArr.push(
      cl[`textArea_overflowY${overflow.y}`],
      cl[`textArea_overflowX${overflow.x}`],
    );
  }

  return (
    <div className={classNameArr.join(" ")}>
      <textarea
        disabled={disabled}
        placeholder={placeholder}
        wrap={wrap}
        className={cl.TextField__textArea}
        value={value}
        onInput={e => {
          const nativeE = e.nativeEvent;
          if (onInput) onInput(e);
          const currValue = e.currentTarget.value;

          if (
            !symbolsRestrictions ||
            (nativeE instanceof InputEvent &&
              (nativeE.data?.match(symbolsRestrictions) ||
                nativeE.data === null))
          ) {
            setValue(currValue);
          } else {
            return;
          }
        }}
        {...props}
      />
    </div>
  );
};

export default MyTextField;
