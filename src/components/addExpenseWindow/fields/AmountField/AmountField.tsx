/* eslint-disable max-lines-per-function */
import React from "react";
import FormTextField from "../../../UI/FormTextField/FormTextField";
import {AddExpenseWindowField} from "../AddExpenseWindowFieldType";
import StepperButtons from "../../../UI/StepperButtons/StepperButtons";

const AmountField = ({validation, ...props}: AddExpenseWindowField) => {
  return (
    <FormTextField
      {...props}
      placeholder="Amount"
      labelText="Amount:"
      symbolsRestrictions={/[0-9.]/}
      innerElements={{
        right: [
          <StepperButtons key="button" controlParams={props.controlParams} />,
        ],
      }}
      validation={{
        isRequired: true,
        validationState: validation.validationState,
        setValidationState: validation.setValidationState,
        validations: [
          {
            message: "Invalid symbols",
            callbak: value => !value.match(/[a-zA-Z]/),
          },
          {
            message: "Maximum length is exceed",
            callbak: value => value.length <= 12,
          },
          {
            message: "Invalid decimal fraction",
            callbak: value => {
              const valueTrimed = value.trim();
              const arr = valueTrimed.split(".");
              if (arr.length > 2 || (arr.length === 2 && arr[0].length === 0)) {
                return false;
              }
              return true;
            },
          },
          {
            message: "Two decimal places max",
            callbak: value => {
              const valueTrimed = value.trim();
              const arr = valueTrimed.split(".");
              if (arr.length === 1) {
                return true;
              } else {
                if (arr[1].length > 2) {
                  return false;
                }
                return true;
              }
            },
          },
          {
            callbak: value => {
              return !value.match(/^0\.{0,1}0{0,}$/);
            },
          },
        ],
      }}
    />
  );
};

export default AmountField;
