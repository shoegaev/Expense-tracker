import {useEffect, useState} from "react";
import LabeledTextField, {
  LabeledTextFieldProps,
} from "../LabeledTextField/LabeledTextField";
import TextField from "../TextField/TextField";
import ErrorIcon from "../../../../assets/icons/ErrorIcon.svg?react";
import {ControlParams} from "../../../../types/ControlParamsType";
import cl from "./FormTextFieldStyle.module.scss";
import {
  StateWithValidation,
  ValidationRequirements,
} from "../../../../types/validationTypes";
import {validateValue} from "../../../../utils/validateData";

export type FormTextFieldProps = Omit<
  LabeledTextFieldProps,
  "controlParams"
> & {
  controlParams: ControlParams<StateWithValidation<string>>;
  labelText?: string;
  ValidationRequirements: ValidationRequirements<string>;
};

const FormTextField = ({
  controlParams: control,
  labelText,
  ValidationRequirements,
  cssClasses,
  ...props
}: FormTextFieldProps) => {
  const [state, setState] = control;
  const [textFieldValue, setTextFieldValue] = useState(state.value);
  // An effect triggered by manual data changes in TextField.
  useEffect(() => {
    if (textFieldValue !== state.value) {
      setState(validateValue(textFieldValue, ValidationRequirements));
    }
  }, [textFieldValue]);
  useEffect(() => {
    setTextFieldValue(state.value);
  }, [state]);
  const classes = [
    cl.FormTextField,
    state.validation.errMessage ? cl.FormTextField_error : "",
    ...(cssClasses ?? []),
  ];
  return (
    <div className={classes.join(" ")}>
      {labelText ? (
        <LabeledTextField
          cssClasses={[cl.FormTextField__textField]}
          labelText={labelText}
          controlParams={[textFieldValue, setTextFieldValue]}
          {...props}
        />
      ) : (
        <TextField
          cssClasses={[cl.FormTextField__textField]}
          controlParams={[textFieldValue, setTextFieldValue]}
          {...props}
        />
      )}
      <div className={cl.FormTextField__errorWarning}>
        <ErrorIcon className={cl.FormTextField__errorWarningIcon} />
        <span className={cl.FormTextField__errorWarningText}>
          {state.validation.errMessage}
        </span>
      </div>
    </div>
  );
};

export default FormTextField;
