import React from "react";
import FormTextField from "../../../UI/FormTextField/FormTextField";
import {AddExpenseWindowField} from "../AddExpenseWindowFieldType";

const NameField = ({validation, ...props}: AddExpenseWindowField) => {
  return (
    <FormTextField
      {...props}
      placeholder="Expense name"
      labelText="Name:"
      validation={{
        isRequired: true,
        validationState: validation.validationState,
        setValidationState: validation.setValidationState,
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
