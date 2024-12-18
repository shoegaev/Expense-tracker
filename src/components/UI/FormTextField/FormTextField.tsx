/* eslint-disable max-lines-per-function */
import React, {FormEventHandler, useEffect} from "react";
import cl from "./FormTextFieldStyle.module.scss";
import {ReactComponent as Asterisk} from "../../../assets/icons/Asterisk.svg";
import {ReactComponent as ErrorIcon} from "../../../assets/icons/ErrorIcon.svg";

export interface FormTextFieldProps {
  controlParams: [
    value: string,
    setValue: (newValue: string | ((prevValue: string) => string)) => void,
  ];
  placeholder: string;
  labelText: string;
  labelTextPosition: "left" | "top";
  symbolsRestrictions?: RegExp;
  onInput?: FormEventHandler<HTMLTextAreaElement>;
  disabled?: boolean;
  className?: string;
  inputMode?: "text" | "decimal" | "numeric";
  validation?: {
    isRequired: boolean;
    validationState: {isValid: boolean; errMessage: null | string};
    setValidationState: (state: {
      isValid: boolean;
      errMessage: null | string;
    }) => void;
    validations: {message?: string; callbak: (value: string) => boolean}[];
  };
  paddingRight?: number;
  textAreaRef?: React.MutableRefObject<HTMLTextAreaElement | null>;
}

const FormTextField = ({
  className,
  controlParams,
  onInput,
  labelText,
  labelTextPosition,
  symbolsRestrictions,
  validation,
  paddingRight,
  textAreaRef,
  ...props
}: FormTextFieldProps) => {
  const [value, setValue] = controlParams;
  const classes: string[] = [cl.FormTextField];
  if (className) classes.push(className);
  if (labelTextPosition === "top") classes.push(cl.FormTextField_labelTextTop);
  if (validation?.validationState.errMessage) classes.push(cl.FormTextField_error);
  if (paddingRight) {
    const remainder = paddingRight % 10;
    const padding =
      remainder >= 5
        ? paddingRight + (10 - remainder)
        : paddingRight - remainder;
    classes.push(cl[`FormTextField_paddingRight${padding}px`] ?? "");
  }
  useEffect(() => {
    if (!validation) return;
    if (value.trim() === "") {
      validation.setValidationState({
        isValid: !validation.isRequired,
        errMessage: null,
      });
      return;
    }
    let isDataValid = true;
    let errMessage: null | string = null;
    for (const v of validation.validations) {
      if (!v.callbak(value)) {
        isDataValid = false;
        errMessage = v.message ?? null;
        break;
      }
    }
    validation.setValidationState({
      isValid: isDataValid,
      errMessage: errMessage,
    });
  }, [value]);
  return (
    <label className={classes.join(" ")}>
      <span className={cl.FormTextField__labelText}>{labelText}</span>
      <div className={cl.FormTextField__content}>
        <div className={cl.FormTextField__field}>
          {validation?.isRequired && (
            <Asterisk className={cl.FormTextField__asterisk} />
          )}
          <textarea
            ref={textAreaRef}
            className={cl.FormTextField__textArea}
            value={value}
            wrap={labelTextPosition === "left" ? "off" : "hard"}
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
          <div className={cl.FormTextField__errorWarning}>
            <ErrorIcon className={cl.FormTextField__errorWarningIcon} />
            <span className={cl.FormTextField__errorWarningText}>
              {validation?.validationState.errMessage}
            </span>
          </div>
        </div>
      </div>
    </label>
  );
};

export default FormTextField;
