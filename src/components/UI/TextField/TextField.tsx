import React, {FormEventHandler} from "react";
import cl from "./TextFieldStyle.module.scss";

interface TextFieldProps {
  className?: string;
  type?: "text" | "number";
  controlParams: [value: string, setValue: (newValue: string)=>void];
  onInput?: FormEventHandler<HTMLInputElement>;
  placeholder: string;
  labelText: string;
  labelTextPosition: "left" | "top";
  disabled?: boolean;
  validation?: {
    validationState: {isValid: boolean; errMessage: null | string};
    setValidationState: (state: {isValid: boolean; errMessage: null | string}) => void;
    validations: {message: string; callbak: (value: string) => boolean}[];
  };
}
// состояния валидности:
//  {message: null, isValid: false} - данные в инпуте не валидны но не показывается
// уведомление об неавлидности данных (например когда инпут пуст).
//  {message: string, isValid: false} - данные в инпуте не валидны, и показывается сообщение
// с ошибкой 
//  {message: null, isValid: true} - данные валидны, сообщение не показывается




const TextField = ({
  className,
  type = "text",
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
  if (labelTextPosition === "top") classes.push(cl.TextField__labelTextTop);
  if (!validation?.validationState) classes.push(cl.TextField__dataIsNotValid);

  return (
    <label className={classes.join(" ")}>
      {labelText}
      <input
        type={type}
        value={value}
        onInput={e => {
          if (onInput) onInput(e);
          const currValue = e.currentTarget.value;
          setValue(currValue)
          if (!validation) return;
          if (currValue === ""){
            validation.setValidationState({isValid: false, errMessage: null})
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
          validation.setValidationState({isValid: isDataValid, errMessage: errMessage})
        }}
        {...props}
      />
    </label>
  );
};

export default TextField;
