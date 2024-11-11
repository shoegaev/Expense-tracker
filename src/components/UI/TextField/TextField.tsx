/* eslint-disable max-lines-per-function */
import React, {FormEventHandler} from "react";
import cl from "./TextFieldStyle.module.scss";

interface TextFieldProps {
  className?: string;
  type?: "text" | "number";
  controlParams: [value: string, setValue: (newValue: string) => void];
  onInput?: FormEventHandler<HTMLTextAreaElement>;
  placeholder: string;
  labelText: string;
  labelTextPosition: "left" | "top";
  disabled?: boolean;
  validation?: {
    validationState: {isValid: boolean; errMessage: null | string};
    setValidationState: (state: {
      isValid: boolean;
      errMessage: null | string;
    }) => void;
    validations: {message: string; callbak: (value: string) => boolean}[];
  };
}

const TextField = ({
  className,
  // type = "text",
  controlParams,
  onInput,
  labelText,
  labelTextPosition,
  validation,
  ...props
}: TextFieldProps) => {
  const [value, setValue] = controlParams;
  const classes: string[] = [cl.TextField];
  if (className) classes.push(className);
  if (labelTextPosition === "top") classes.push(cl.TextField_labelTextTop);
  if (validation?.validationState.errMessage) classes.push(cl.TextField_error);

  return (
    <label className={classes.join(" ")}>
      <span className={cl.TextField__labelText}>{labelText}</span>
      <textarea
        className={cl.TextField__textArea}
        // type={type}
        value={value}
        wrap={labelTextPosition === "left" ? "off" : "hard"}
        onInput={e => {
          if (onInput) onInput(e);
          const currValue = e.currentTarget.value;
          setValue(currValue);
          if (!validation) return;
          if (currValue === "") {
            validation.setValidationState({isValid: false, errMessage: null});
            return;
          }
          let isDataValid = true;
          let errMessage: null | string = null;
          for (const value of validation.validations) {
            if (!value.callbak(currValue)) {
              isDataValid = false;
              errMessage = value.message;
              break;
            }
          }
          validation.setValidationState({
            isValid: isDataValid,
            errMessage: errMessage,
          });
        }}
        {...props}
      />
    </label>
  );
};

export default TextField;
