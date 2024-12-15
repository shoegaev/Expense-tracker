import React, {useId} from "react";
import MyTextField, {MyTextFieldProps} from "../MyTextField/MyTextField";
import cl from "./LabeledTextField.module.scss";

export interface LabeledTextFieldProps extends MyTextFieldProps {
  labelText: string;
  cssClasses?: string[];
  textFieldCssClasses?: string[];
}

const LabeledTextField = ({
  labelText,
  cssClasses,
  textFieldCssClasses,
  ...props
}: LabeledTextFieldProps) => {
  const id = useId();
  const classnameArr = [cl.LabeledTextField, ...(cssClasses ?? [])];
  return (
    <div className={classnameArr.join(" ")}>
      <label className={cl.LabeledTextField__label} htmlFor={id}>{labelText}</label>
      <MyTextField
        cssClasses={[
          cl.LabeledTextField__textField,
          ...(textFieldCssClasses ?? []),
        ]}
        id={id}
        {...props}
      />
    </div>
  );
};

export default LabeledTextField;
