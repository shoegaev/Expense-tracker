import {ControlParams} from "../../../types/ControlParamsType";
export interface AddExpenseWindowField {
  cssClasses: string[];
  controlParams: ControlParams<string>;
  validation: {
    validationState: {isValid: boolean; errMessage: null | string};
    setValidationState: (state: {
      isValid: boolean;
      errMessage: null | string;
    }) => void;
  };
}
