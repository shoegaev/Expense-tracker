import React from "react";
import FormTextField from "../../../UI/FormTextField/FormTextField";
import {AddExpenseWindowField} from "../AddExpenseWindowFieldType";

const DescribtionField = ({validation, ...props}: AddExpenseWindowField) => {
  return (
    <FormTextField
      {...props}
      placeholder="Describtion"
      labelText="Describtion:"
      lineType="multi-line"
      validation={{
        isRequired: false,
        validationState: validation.validationState,
        setValidationState: validation.setValidationState,
        validations: [
          {
            message: "Maximum length is exceed",
            callbak: value => value.length <= 1000,
          },
        ],
      }}
    />
  );
};

export default DescribtionField;
