import React from "react";
import FormTextField from "../../../UI/InputFields/FormTextField/FormTextField";
import {AddExpenseWindowFieldProps} from "../AddExpenseWindowFieldType";

const DescribtionField = ({...props}: AddExpenseWindowFieldProps) => {
  return (
    <FormTextField
      {...props}
      placeholder="Describtion"
      labelText="Describtion:"
      lineType="multi-line"
      ValidationRequirements={{
        isRequired: false,
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