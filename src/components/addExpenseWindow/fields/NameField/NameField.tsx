import React from "react";
import FormTextField from "../../../UI/FormTextField/FormTextField";
import {AddExpenseWindowFieldProps} from "../AddExpenseWindowFieldType";

const NameField = ({...props}: AddExpenseWindowFieldProps) => {
  return (
    <FormTextField
      {...props}
      placeholder="Expense name"
      labelText="Name:"
      ValidationRequirements={{
        isRequired: true,
        validations: [
          {
            message: "Maximum length is exceed",
            callbak: value => value.length <= 25,
          },
        ],
      }}
    />
  );
};

export default NameField;
