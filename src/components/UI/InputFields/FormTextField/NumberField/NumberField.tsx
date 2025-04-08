/* eslint-disable max-lines-per-function */
import React from "react";
import FormTextField from "../FormTextField";
import {FieldWithSpecifiedValifationProps} from "../FieldWithSpecifiedValifationType";
import StepperButtons from "../../../StepperButtons/StepperButtons";
import {ValidationRequirements} from "../../../../../types/validationTypes";
import {validateValue} from "../../../../../utils/validateData";

const NumberField = ({
  validationRequirements,
  changeValueOnInputHandler,
  ...props
}: FieldWithSpecifiedValifationProps) => {
  const [state, setState] = props.controlParams;
  const ValidationRequirements: ValidationRequirements<string> = {
    isRequired: validationRequirements?.isRequired ?? true,
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
      ...(validationRequirements?.validations || []),
    ],
  };
  return (
    <FormTextField
      {...props}
      changeValueOnInputHandler={(newValue, prevValue, data) => {
        const newValueSymbols = newValue.split("");
        let dotIndex: null | number = null;
        let result = "";
        for (let i = 0; i < newValueSymbols.length; i++) {
          const symbol = newValueSymbols[i];
          if (symbol.match(/[0-9]/)) {
            result += symbol;
          } else if (symbol.match(/[.,]/) && !dotIndex) {
            result += ".";
            dotIndex = i;
          } else {
            break;
          }
        }
        if (dotIndex === 0 && result.length > 1) {
          result = "0" + result;
        }
        if (dotIndex && result.length > dotIndex + 3) {
          result = result.slice(0, dotIndex + 3);
        }
        return changeValueOnInputHandler
          ? changeValueOnInputHandler(result, prevValue, data)
          : result;
      }}
      innerElements={{
        right: [
          <StepperButtons
            key="button"
            disabled={
              state.validation.errMessage
                ? {
                    plus: true,
                    minus: true,
                  }
                : undefined
            }
            controlParams={[
              state.value,
              valueOrHandler => {
                if (typeof valueOrHandler === "string") {
                  setState(
                    validateValue(valueOrHandler, ValidationRequirements),
                  );
                } else {
                  setState(prev => {
                    return validateValue(
                      valueOrHandler(prev.value),
                      ValidationRequirements,
                    );
                  });
                }
              },
            ]}
          />,
        ],
      }}
      ValidationRequirements={ValidationRequirements}
    />
  );
};

export default NumberField;
