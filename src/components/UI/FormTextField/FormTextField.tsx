/* eslint-disable max-lines-per-function */
import React, {useEffect} from "react";
import LabeledTextField from "../LabeledTextField/LabeledTextField";
import TextField, {TextFieldProps} from "../TextField/TextField";
import {ReactComponent as ErrorIcon} from "../../../assets/icons/ErrorIcon.svg";
import cl from "./FormTextFieldStyle.module.scss";

interface FormTextFieldProps extends TextFieldProps {
  labelText?: string;
  validation?: {
    isRequired: boolean;
    validationState: {isValid: boolean; errMessage: null | string};
    setValidationState: (state: {
      isValid: boolean;
      errMessage: null | string;
    }) => void;
    validations: {message?: string; callbak: (value: string) => boolean}[];
  };
}

const FormTextField = ({
  controlParams,
  labelText,
  validation,
  cssClasses,
  ...props
}: FormTextFieldProps) => {
  const [value] = controlParams;
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
  const classes = [
    cl.FormTextField,
    validation?.validationState.errMessage ? cl.FormTextField_error : "",
    ...(cssClasses ?? []),
  ];
  return (
    <div className={classes.join(" ")}>
      {labelText ? (
        <LabeledTextField
          cssClasses={[cl.FormTextField__textField]}
          labelText={labelText}
          controlParams={controlParams}
          {...props}
        />
      ) : (
        <TextField
          cssClasses={[cl.FormTextField__textField]}
          controlParams={controlParams}
          {...props}
        />
      )}
      <div className={cl.FormTextField__errorWarning}>
        <ErrorIcon className={cl.FormTextField__errorWarningIcon} />
        <span className={cl.FormTextField__errorWarningText}>
          {validation?.validationState.errMessage}
        </span>
      </div>
    </div>
  );
};

export default FormTextField;
