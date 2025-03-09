import {ControlParams} from "../../../../types/ControlParamsType";
import {StateWithValidation} from "../../../../types/validationTypes";

export interface FieldWithSpecifiedValifationProps {
  cssClasses: string[];
  controlParams: ControlParams<StateWithValidation<string>>;
  placeholder?: string;
  labelText?: string;
}
