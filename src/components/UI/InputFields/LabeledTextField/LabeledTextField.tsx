import { useId } from "react";
import TextField, { TextFieldProps } from "../TextField/TextField";
import cl from "./LabeledTextField.module.scss";

export interface LabeledTextFieldProps extends TextFieldProps {
  labelText?: string;
  cssClasses?: string[];
  fieldCssClasses?: string[];
}

const LabeledTextField = ({
  labelText,
  cssClasses,
  fieldCssClasses,
  ...props
}: LabeledTextFieldProps) => {
  const id = useId();
  const classnameArr = [cl.LabeledTextField, ...(cssClasses ?? [])];
  return (
    <div className={classnameArr.join(" ")}>
      <label className={cl.LabeledTextField__label} htmlFor={id}>
        {labelText}
      </label>
      <TextField
        cssClasses={[
          cl.LabeledTextField__textField,
          ...(fieldCssClasses ?? []),
        ]}
        id={id}
        {...props}
      />
    </div>
  );
};

export default LabeledTextField;
