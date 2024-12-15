/* eslint-disable max-lines-per-function */
import React, {FormEventHandler} from "react";
import {ControlParams} from "../../../types/ControlParamsType";
import cl from "./MyTextField.module.scss";

export interface MyTextFieldProps {
  controllParams: ControlParams<string>;
  cssClasses?: string[];
  inputMode?: "text" | "decimal" | "numeric";
  symbolsRestrictions?: RegExp;
  onInput?: FormEventHandler<HTMLTextAreaElement>;
  lineType?: "multi-line" | "single-line";
  innerElements?: {
    left?: React.JSX.Element[];
    right?: React.JSX.Element[];
  };
  placeholder?: string;
  disabled?: boolean;
  id?: string;
}

const MyTextField = ({
  cssClasses,
  controllParams,
  symbolsRestrictions,
  onInput,
  lineType = "single-line",
  placeholder,
  disabled,
  innerElements,
  ...props
}: MyTextFieldProps) => {
  const [value, setValue] = controllParams;
  const classNameArr = [
    cl.TextField,
    disabled ? cl.TextField_disabled : "",
    ...(cssClasses ?? []),
  ];
  if (lineType === "multi-line") {
    classNameArr.push(cl.TextField_miltiLine);
  }

  return (
    <label className={classNameArr.join(" ")}>
      {innerElements?.left}
      <textarea
        disabled={disabled}
        placeholder={placeholder}
        wrap={lineType === "multi-line" ? "hard" : "off"}
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
      {innerElements?.right}
    </label>
  );
};

export default MyTextField;
