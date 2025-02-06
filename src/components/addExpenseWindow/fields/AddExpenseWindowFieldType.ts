import {ControlParams} from "../../../types/ControlParamsType";
import {StateWithValidation} from "../../../types/validationTypes";

export interface AddExpenseWindowFieldProps {
  cssClasses: string[];
  controlParams: ControlParams<StateWithValidation<string>>;
}
