/* eslint-disable max-lines-per-function */
import React from "react";
import {ControlParams} from "../../../../types/ControlParamsType";
import {changeValueOnInputHandler} from "../../../../types/validationTypes";
import cl from "./TextField.module.scss";

export interface TextFieldProps {
  controlParams: ControlParams<string>;
  cssClasses?: string[];
  inputMode?: "text" | "decimal" | "numeric";
  changeValueOnInputHandler?: changeValueOnInputHandler<string>;
  lineType?: "multi-line" | "single-line";
  innerElements?: {
    left?: React.JSX.Element[];
    right?: React.JSX.Element[];
  };
  placeholder?: string;
  disabled?: boolean;
  id?: string;
}

const TextField = ({
  cssClasses,
  controlParams,
  changeValueOnInputHandler,
  lineType = "single-line",
  placeholder,
  disabled,
  innerElements,
  ...props
}: TextFieldProps) => {
  const [value, setValue] = controlParams;
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
          const newValue = e.currentTarget.value;
          const data = (e.nativeEvent as InputEvent).data ?? undefined;
          setValue(
            changeValueOnInputHandler
              ? changeValueOnInputHandler(newValue, value, data)
              : newValue,
          );
        }}
        {...props}
      />
      {innerElements?.right}
    </label>
  );
};

export default TextField;
